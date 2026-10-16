import React, { useRef, useState, useEffect } from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import { MAP, FLAMES, newGame, movePlayer } from './soLongGame';

const keys = { ArrowUp: [0, -1], w: [0, -1], ArrowDown: [0, 1], s: [0, 1], ArrowLeft: [-1, 0], a: [-1, 0], ArrowRight: [1, 0], d: [1, 0] };
const controls = [[ArrowUp, 'Up', 0, -1], [ArrowLeft, 'Left', -1, 0], [ArrowDown, 'Down', 0, 1], [ArrowRight, 'Right', 1, 0]];
const sprite = name => `${import.meta.env.BASE_URL}so-long/${name}.png`;

export default function SoLongPreview({ expanded = false }) {
  const [game, setGame] = useState(newGame);
  const container = useRef(null);
  const unlocked = game.collected.length === FLAMES.length;
  useEffect(() => {
    if (expanded) container.current?.focus({ preventScroll: true });
  }, [expanded]);
  const move = (dx, dy) => setGame(current => movePlayer(current, dx, dy));
  const restart = () => { setGame(newGame()); container.current?.focus({ preventScroll: true }); };
  return (
    <div ref={container} tabIndex={0} role="group" aria-label="so_long playable demo. Use arrow keys or WASD to move."
      onKeyDown={event => {
        if (event.ctrlKey || event.metaKey || event.altKey) return;
        const direction = keys[event.key] || keys[event.key.toLowerCase()];
        if (direction) { event.preventDefault(); move(...direction); }
        if (event.key.toLowerCase() === 'r') { event.preventDefault(); restart(); }
      }}
      className={`so-long-demo ${expanded ? 'so-long-expanded' : ''}`}>
      <div className="so-long-hud">
        <span>moves <strong>{String(game.moves).padStart(3, '0')}</strong></span>
        <span>flames <strong>{game.collected.length}/{FLAMES.length}</strong></span>
        <button type="button" onClick={restart} aria-label="Restart game" title="Restart (R)"><RotateCcw size={14} /></button>
      </div>
      <div className="so-long-board" aria-label={`Maze. Player at column ${game.x}, row ${game.y}.`}>
        {MAP.flatMap((row, y) => [...row].map((tile, x) => {
          const player = game.x === x && game.y === y;
          let texture = tile === '1' ? '7ayt' : tile === 'E' ? (unlocked ? 'exit_open' : 'exit') : tile === 'C' && !game.collected.includes(`${x},${y}`) ? 'flame' : 'lard';
          if (player) texture = unlocked ? (game.facing === 'raven_right' ? 'ultimate_raven_right' : 'ultimate_raven_left') : game.facing;
          return <img key={`${x},${y}`} src={sprite(texture)} alt="" draggable={false} width="60" height="60" />;
        }))}
        {game.won && <div className="so-long-victory"><strong>MAP CLEARED!</strong><span>{game.moves} moves · All flames collected</span><button type="button" onClick={restart}>Play again</button></div>}
      </div>
      <p className="so-long-status" role="status">{game.message}</p>
      <div className="so-long-footer">
        <span>Arrow keys / WASD<br />or tap to move</span>
        <div className="so-long-controls">
          {controls.map(([Icon, label, dx, dy]) => <button key={label} type="button" aria-label={`Move ${label.toLowerCase()}`} disabled={game.won}
            onClick={() => { move(dx, dy); container.current?.focus({ preventScroll: true }); }}><Icon size={16} /></button>)}
        </div>
      </div>
    </div>
  );
}
