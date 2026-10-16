// Compact browser map; original brick/stone textures live in public/cub3d.
export const WORLD = [
  '111111111111',
  '100000100001',
  '101100101101',
  '100000000001',
  '101011110101',
  '101000000101',
  '100010100001',
  '100000101101',
  '100000000001',
  '111111111111',
];
export const FOV = Math.PI / 3;
export const spawnPlayer = () => ({ x: 2.5, y: 7.5, angle: -Math.PI / 2 });
export const isWall = (x, y) => WORLD[Math.floor(y)]?.[Math.floor(x)] !== '0';

export function moveCamera(player, forward, strafe, turn, dt) {
  const angle = player.angle + turn * dt * 2;
  const length = Math.max(1, Math.hypot(forward, strafe));
  const step = dt * 2.4 / length;
  const dx = (Math.cos(angle) * forward - Math.sin(angle) * strafe) * step;
  const dy = (Math.sin(angle) * forward + Math.cos(angle) * strafe) * step;
  const clear = (x, y) => [-0.18, 0.18].every(ox => [-0.18, 0.18].every(oy => !isWall(x + ox, y + oy)));
  const x = clear(player.x + dx, player.y) ? player.x + dx : player.x;
  const y = clear(x, player.y + dy) ? player.y + dy : player.y;
  return { x, y, angle: Math.atan2(Math.sin(angle), Math.cos(angle)) };
}

// DDA walks cell boundaries; camera-plane rays avoid fisheye distortion.
export function castRay(player, cameraX) {
  const plane = Math.tan(FOV / 2);
  const dx = Math.cos(player.angle) - Math.sin(player.angle) * plane * cameraX;
  const dy = Math.sin(player.angle) + Math.cos(player.angle) * plane * cameraX;
  let x = Math.floor(player.x), y = Math.floor(player.y);
  const deltaX = dx === 0 ? Infinity : Math.abs(1 / dx);
  const deltaY = dy === 0 ? Infinity : Math.abs(1 / dy);
  const stepX = dx < 0 ? -1 : 1, stepY = dy < 0 ? -1 : 1;
  let sideX = (dx < 0 ? player.x - x : x + 1 - player.x) * deltaX;
  let sideY = (dy < 0 ? player.y - y : y + 1 - player.y) * deltaY;
  let side = 0;
  for (let i = 0; i < 128; i++) {
    if (sideX < sideY) { sideX += deltaX; x += stepX; side = 0; }
    else { sideY += deltaY; y += stepY; side = 1; }
    if (WORLD[y]?.[x] !== '0') break;
  }
  const distance = Math.max(0.001, side === 0 ? sideX - deltaX : sideY - deltaY);
  let u = side === 0 ? player.y + distance * dy : player.x + distance * dx;
  u -= Math.floor(u);
  if ((side === 0 && dx > 0) || (side === 1 && dy < 0)) u = 1 - u;
  return { distance, u: Math.min(0.999999, u), texture: side === 0 ? (dx < 0 ? 'stone8' : 'stone21') : 'brick', side };
}
