import React, { useEffect, useRef, useState } from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import { WORLD, FOV, spawnPlayer, moveCamera, castRay } from './cub3dEngine';

const bindings = { w: 'forward', ArrowUp: 'forward', s: 'back', ArrowDown: 'back', a: 'strafeLeft', d: 'strafeRight', ArrowLeft: 'left', ArrowRight: 'right' };
const controls = [[ArrowLeft, 'left', 'Turn left'], [ArrowUp, 'forward', 'Move forward'], [ArrowDown, 'back', 'Move backward'], [ArrowRight, 'right', 'Turn right']];

function renderScene(ctx, player, textures) {
  const { width, height } = ctx.canvas;
  ctx.imageSmoothingEnabled = false;
  ctx.fillStyle = '#1e1419';
  ctx.fillRect(0, 0, width, height / 2);
  const floor = ctx.createLinearGradient(0, height / 2, 0, height);
  floor.addColorStop(0, '#250606'); floor.addColorStop(1, '#940e0e');
  ctx.fillStyle = floor; ctx.fillRect(0, height / 2, width, height / 2);
  const projection = width / (2 * Math.tan(FOV / 2));
  for (let x = 0; x < width; x += 2) {
    const hit = castRay(player, 2 * (x + 1) / width - 1);
    const wallHeight = projection / hit.distance;
    const top = (height - wallHeight) / 2;
    const texture = textures[hit.texture];
    if (texture) ctx.drawImage(texture, Math.floor(hit.u * texture.width), 0, 1, texture.height, x, top, 2, wallHeight);
    else { ctx.fillStyle = hit.side ? '#824342' : '#77716a'; ctx.fillRect(x, top, 2, wallHeight); }
    ctx.fillStyle = `rgba(0,0,0,${Math.min(0.85, hit.distance * 0.045 + (hit.side ? 0.12 : 0))})`;
    ctx.fillRect(x, top, 2, wallHeight);
  }
  // Live minimap and view direction.
  const scale = width > 400 ? 7 : 5, ox = width - WORLD[0].length * scale - 10, oy = 10;
  ctx.fillStyle = '#090909cc'; ctx.fillRect(ox - 4, oy - 4, WORLD[0].length * scale + 8, WORLD.length * scale + 8);
  WORLD.forEach((row, y) => [...row].forEach((tile, x) => {
    ctx.fillStyle = tile === '1' ? '#64606e' : '#19171f';
    ctx.fillRect(ox + x * scale, oy + y * scale, scale - 1, scale - 1);
  }));
  const px = ox + player.x * scale, py = oy + player.y * scale;
  ctx.strokeStyle = '#c4b5fd'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + Math.cos(player.angle) * 9, py + Math.sin(player.angle) * 9); ctx.stroke();
  ctx.fillStyle = '#c4b5fd'; ctx.beginPath(); ctx.arc(px, py, 2, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#ffffff80'; ctx.fillRect(width / 2 - 3, height / 2, 6, 1); ctx.fillRect(width / 2, height / 2 - 3, 1, 6);
}

export default function Cub3dPreview({ expanded = false }) {
  const container = useRef(null), canvas = useRef(null);
  const player = useRef(spawnPlayer()), pressed = useRef(new Set()), redraw = useRef(true);
  const drag = useRef(null);
  const [assetError, setAssetError] = useState(false);
  const reset = () => { player.current = spawnPlayer(); pressed.current.clear(); redraw.current = true; container.current?.focus({ preventScroll: true }); };
  useEffect(() => { if (expanded) container.current?.focus({ preventScroll: true }); }, [expanded]);
  useEffect(() => {
    const ctx = canvas.current?.getContext('2d');
    if (!ctx) return;
    let disposed = false, frame, last = 0, visible = true;
    const textures = {};
    const images = ['brick', 'stone8', 'stone21'].map(name => {
      const img = new Image();
      img.onload = () => { if (!disposed) { textures[name] = img; redraw.current = true; } };
      img.onerror = () => { if (!disposed) setAssetError(true); };
      img.src = `${import.meta.env.BASE_URL}cub3d/${name}.png`;
      return img;
    });
    const clear = () => { pressed.current.clear(); drag.current = null; };
    window.addEventListener('blur', clear);
    document.addEventListener('visibilitychange', clear);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; redraw.current = true; if (!visible) clear(); });
    observer.observe(canvas.current);
    const loop = time => {
      const dt = last ? Math.min((time - last) / 1000, 0.05) : 0;
      last = time;
      if (visible && !document.hidden) {
        const keys = pressed.current;
        if (keys.size) {
          player.current = moveCamera(player.current, Number(keys.has('forward')) - Number(keys.has('back')), Number(keys.has('strafeRight')) - Number(keys.has('strafeLeft')), Number(keys.has('right')) - Number(keys.has('left')), dt);
          redraw.current = true;
        }
        if (redraw.current) { renderScene(ctx, player.current, textures); redraw.current = false; }
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    const activeKeys = pressed.current;
    return () => { disposed = true; cancelAnimationFrame(frame); observer.disconnect(); activeKeys.clear(); images.forEach(img => { img.onload = null; img.onerror = null; }); window.removeEventListener('blur', clear); document.removeEventListener('visibilitychange', clear); };
  }, []);
  return (
    <div ref={container} tabIndex={0} role="group" aria-label="Cub3d playable raycasting demo. WASD to move, arrow keys to turn."
      className={`cub3d-demo ${expanded ? 'cub3d-expanded' : ''}`}
      onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) pressed.current.clear(); }}
      onKeyDown={event => {
        if (event.ctrlKey || event.metaKey || event.altKey) return;
        const action = bindings[event.key] || bindings[event.key.toLowerCase()];
        if (action) { event.preventDefault(); pressed.current.add(action); }
        if (event.key.toLowerCase() === 'r') { event.preventDefault(); reset(); }
      }}
      onKeyUp={event => { const action = bindings[event.key] || bindings[event.key.toLowerCase()]; if (action) { event.preventDefault(); pressed.current.delete(action); } }}>
      <div className="cub3d-hud"><span>RAYCASTING <strong>60° FOV</strong></span><button type="button" onClick={reset} aria-label="Reset camera" title="Reset (R)"><RotateCcw size={14} /></button></div>
      <canvas ref={canvas} width={expanded ? 640 : 320} height={expanded ? 360 : 180} aria-label="First-person textured maze with a live minimap"
        onPointerDown={event => { container.current?.focus({ preventScroll: true }); drag.current = event.clientX; event.currentTarget.setPointerCapture(event.pointerId); }}
        onPointerMove={event => { if (drag.current !== null) { player.current.angle += (event.clientX - drag.current) * 0.008; drag.current = event.clientX; redraw.current = true; } }}
        onPointerUp={() => { drag.current = null; }} onPointerCancel={() => { drag.current = null; }} onLostPointerCapture={() => { drag.current = null; }}>
        Your browser needs Canvas support to display this demo.
      </canvas>
      <div className="cub3d-footer"><span>{assetError ? 'Texture unavailable · basic view active' : 'WASD move · ← → turn · drag to look'}</span>
        <div className="cub3d-controls">{controls.map(([Icon, action, label]) => <button key={action} type="button" aria-label={label}
          onPointerDown={event => { event.preventDefault(); container.current?.focus({ preventScroll: true }); pressed.current.add(action); event.currentTarget.setPointerCapture(event.pointerId); }}
          onPointerUp={() => pressed.current.delete(action)} onPointerCancel={() => pressed.current.delete(action)} onLostPointerCapture={() => pressed.current.delete(action)}
          onClick={event => { if (event.detail === 0) { player.current = moveCamera(player.current, action === 'forward' ? 1 : action === 'back' ? -1 : 0, 0, action === 'right' ? 1 : action === 'left' ? -1 : 0, 0.12); redraw.current = true; } }}><Icon size={16} /></button>)}</div>
      </div>
    </div>
  );
}
