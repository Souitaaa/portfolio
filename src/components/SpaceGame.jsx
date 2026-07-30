import React, { useEffect, useRef, useState } from 'react';

export default function SpaceGame() {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState('START'); // START, PLAYING, GAME_OVER
  const [score, setScore] = useState(0);
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  useEffect(() => {
    // Initial check
    setIsDarkTheme(document.documentElement.classList.contains('dark'));
    
    const handleThemeChange = () => {
      setIsDarkTheme(document.documentElement.classList.contains('dark'));
    };
    window.addEventListener('theme-change', handleThemeChange);
    return () => window.removeEventListener('theme-change', handleThemeChange);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Make canvas fill container
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = 400; // Fixed height for the game area
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // --- GAME ENGINE STATE ---
    let animationFrameId;
    let lastTime = 0;
    
    // Player
    const player = {
      x: canvas.width / 2,
      y: canvas.height - 40,
      width: 20,
      height: 20,
      speed: 300, // px per second
      color: '#a3e635' // accent-green-like
    };

    // Input state
    const keys = {
      ArrowLeft: false,
      ArrowRight: false,
      a: false,
      d: false
    };

    // Entities
    let bullets = [];
    let enemies = [];
    let stars = [];
    let currentScore = 0;

    // Timers
    let lastShootTime = 0;
    const shootInterval = 300; // ms
    let lastEnemySpawnTime = 0;
    const enemySpawnInterval = 1000; // ms

    // --- INITIALIZATION ---
    // Init stars
    for (let i = 0; i < 100; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 50 + 20,
        color: Math.random() > 0.5 ? '#ffffff' : '#a3a3a3'
      });
    }

    const resetGame = () => {
      player.x = canvas.width / 2;
      bullets = [];
      enemies = [];
      currentScore = 0;
      setScore(0);
      lastShootTime = 0;
      lastEnemySpawnTime = 0;
    };

    // --- EVENT LISTENERS ---
    const handleKeyDown = (e) => {
      if (keys.hasOwnProperty(e.key)) {
        keys[e.key] = true;
        // Prevent default scrolling when playing
        if (gameState === 'PLAYING' && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
          e.preventDefault();
        }
      }
    };

    const handleKeyUp = (e) => {
      if (keys.hasOwnProperty(e.key)) {
        keys[e.key] = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown, { passive: false });
    window.addEventListener('keyup', handleKeyUp);

    // Mouse/Touch controls (click to move)
    const handlePointerMove = (e) => {
      if (gameState !== 'PLAYING') return;
      const rect = canvas.getBoundingClientRect();
      let clientX;
      if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
      } else {
        clientX = e.clientX;
      }
      const x = clientX - rect.left;
      player.x = Math.max(player.width / 2, Math.min(canvas.width - player.width / 2, x));
    };

    canvas.addEventListener('mousemove', handlePointerMove);
    canvas.addEventListener('touchmove', handlePointerMove, { passive: true });

    // --- DRAWING UTILS ---
    const drawPlayer = (x, y) => {
      ctx.save();
      ctx.shadowBlur = 15;
      ctx.shadowColor = player.color;
      ctx.fillStyle = player.color;
      ctx.fillRect(x - 2, y - 10, 4, 10); // nose
      ctx.fillRect(x - 6, y, 12, 4);      // wings
      ctx.fillRect(x - 10, y + 4, 20, 6); // base
      ctx.restore();
    };

    const drawEnemy = (x, y) => {
      ctx.save();
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#ef4444';
      ctx.fillStyle = '#ef4444'; // red
      ctx.fillRect(x - 8, y - 6, 16, 6);  // top
      ctx.fillRect(x - 12, y, 24, 6);     // middle
      ctx.fillRect(x - 6, y + 6, 12, 4);  // bottom
      ctx.restore();
    };

    const drawPlusStar = (x, y, size, color) => {
      ctx.fillStyle = color;
      ctx.fillRect(x - size/2, y - size/6, size, size/3); // horizontal
      ctx.fillRect(x - size/6, y - size/2, size/3, size); // vertical
    };

    // --- GAME LOOP ---
    const update = (dt) => {
      if (gameState !== 'PLAYING') return;

      // Player Movement
      let dx = 0;
      if (keys.ArrowLeft || keys.a) dx -= 1;
      if (keys.ArrowRight || keys.d) dx += 1;
      
      player.x += dx * player.speed * dt;
      player.x = Math.max(player.width / 2, Math.min(canvas.width - player.width / 2, player.x));

      // Shooting
      if (lastTime - lastShootTime > shootInterval) {
        bullets.push({
          x: player.x,
          y: player.y - 15,
          width: 4,
          height: 10,
          speed: 400,
          color: '#a3e635'
        });
        lastShootTime = lastTime;
      }

      // Spawning Enemies
      if (lastTime - lastEnemySpawnTime > enemySpawnInterval) {
        enemies.push({
          x: Math.random() * (canvas.width - 40) + 20,
          y: -20,
          width: 24,
          height: 16,
          speed: Math.random() * 50 + 50
        });
        // Decrease spawn interval slightly over time for difficulty
        lastEnemySpawnTime = lastTime;
      }

      // Update Bullets
      for (let i = bullets.length - 1; i >= 0; i--) {
        bullets[i].y -= bullets[i].speed * dt;
        if (bullets[i].y < -20) {
          bullets.splice(i, 1);
        }
      }

      // Update Enemies
      for (let i = enemies.length - 1; i >= 0; i--) {
        enemies[i].y += enemies[i].speed * dt;
        if (enemies[i].y > canvas.height + 20) {
          enemies.splice(i, 1);
        }
      }

      // Update Stars
      for (let i = 0; i < stars.length; i++) {
        stars[i].y += stars[i].speed * dt;
        if (stars[i].y > canvas.height) {
          stars[i].y = 0;
          stars[i].x = Math.random() * canvas.width;
        }
      }

      // Collisions
      for (let i = enemies.length - 1; i >= 0; i--) {
        const e = enemies[i];
        let enemyDestroyed = false;

        // Check bullets hitting enemy
        for (let j = bullets.length - 1; j >= 0; j--) {
          const b = bullets[j];
          if (
            b.x < e.x + e.width/2 &&
            b.x + b.width > e.x - e.width/2 &&
            b.y < e.y + e.height/2 &&
            b.y + b.height > e.y - e.height/2
          ) {
            // Hit!
            bullets.splice(j, 1);
            enemyDestroyed = true;
            currentScore += 10;
            setScore(currentScore);
            break;
          }
        }

        // Check player hitting enemy (Game Over)
        if (!enemyDestroyed) {
          if (
            player.x - 10 < e.x + e.width/2 &&
            player.x + 10 > e.x - e.width/2 &&
            player.y - 10 < e.y + e.height/2 &&
            player.y + 10 > e.y - e.height/2
          ) {
            setGameState('GAME_OVER');
          }
        }

        if (enemyDestroyed) {
          enemies.splice(i, 1);
        }
      }
    };

    const draw = () => {
      // Clear canvas with background depending on theme
      ctx.fillStyle = isDarkTheme ? '#050505' : '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw dashed center line (aesthetic)
      ctx.strokeStyle = '#4f46e5'; // Indigo
      ctx.lineWidth = 2;
      ctx.setLineDash([10, 20]);
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(canvas.width / 2, canvas.height);
      ctx.stroke();
      ctx.setLineDash([]); // reset

      // Draw Stars
      for (const s of stars) {
        const starColor = isDarkTheme ? s.color : (s.color === '#ffffff' ? '#000000' : '#a3a3a3');
        drawPlusStar(s.x, s.y, s.size * 3, starColor);
      }

      // Draw Player
      drawPlayer(player.x, player.y);

      // Draw Bullets
      for (const b of bullets) {
        ctx.save();
        ctx.shadowBlur = 10;
        ctx.shadowColor = b.color;
        ctx.fillStyle = b.color;
        ctx.fillRect(b.x - b.width/2, b.y, b.width, b.height);
        ctx.restore();
      }

      // Draw Enemies
      for (const e of enemies) {
        drawEnemy(e.x, e.y);
      }
    };

    const loop = (timestamp) => {
      const dt = (timestamp - lastTime) / 1000;
      lastTime = timestamp;

      // Cap dt to prevent huge jumps if tab is inactive
      if (dt < 0.1) {
        update(dt);
      }
      draw();

      animationFrameId = requestAnimationFrame(loop);
    };

    // Start loop
    animationFrameId = requestAnimationFrame(loop);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      canvas.removeEventListener('mousemove', handlePointerMove);
      canvas.removeEventListener('touchmove', handlePointerMove);
    };
  }, [gameState, isDarkTheme]);

  const startGame = () => {
    setScore(0);
    setGameState('PLAYING');
  };

  return (
    <section className="w-full bg-neutral-50 dark:bg-black py-16 px-6 md:px-12 relative flex flex-col items-center select-none font-mono transition-colors duration-300">
      <div className="w-full max-w-5xl mb-6 flex justify-between items-end border-b border-neutral-200 dark:border-neutral-900 pb-4 transition-colors duration-300">
        <div>
          <span className="text-accent-blue font-bold text-xs uppercase tracking-[0.2em] block mb-1">
            MINI-GAME
          </span>
          <h2 className="text-2xl text-black dark:text-white font-clash font-black uppercase tracking-widest transition-colors duration-300">
            SPACE INVADERS
          </h2>
        </div>
        <div className="text-right">
          <p className="text-neutral-500 text-xs mb-1">SCORE</p>
          <p className="text-black dark:text-white font-black text-xl transition-colors duration-300">{score}</p>
        </div>
      </div>
      
      <div className={`w-full max-w-5xl rounded-3xl overflow-hidden border border-neutral-300 dark:border-neutral-800 shadow-[0_0_50px_rgba(0,0,0,0.1)] dark:shadow-[0_0_50px_rgba(0,0,0,0.5)] relative transition-colors duration-300 ${isDarkTheme ? 'bg-[#050505]' : 'bg-white'}`}>
        {/* Subtle scanline overlay for retro effect */}
        <div className={`absolute inset-0 bg-[length:100%_4px] pointer-events-none z-10 opacity-50 ${isDarkTheme ? 'bg-[linear-gradient(rgba(255,255,255,0),rgba(255,255,255,0.03)_50%,rgba(0,0,0,0.1)_51%,rgba(0,0,0,0)_100%)]' : 'bg-[linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.03)_50%,rgba(255,255,255,0.1)_51%,rgba(255,255,255,0)_100%)]'}`} />
        
        {/* Game Overlays via React for better UI and State syncing */}
        {gameState === 'START' && (
          <div className={`absolute inset-0 z-30 ${isDarkTheme ? 'bg-black/60' : 'bg-white/60'} backdrop-blur-sm flex flex-col items-center justify-center transition-colors duration-300`}>
            <button 
              onClick={startGame}
              className={`px-8 py-3 font-bold text-lg rounded-full transition-transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(255,255,255,0.3)] ${isDarkTheme ? 'bg-white text-black hover:bg-neutral-200' : 'bg-black text-white hover:bg-neutral-800'}`}
            >
              CLICK TO START
            </button>
          </div>
        )}

        {gameState === 'GAME_OVER' && (
          <div className={`absolute inset-0 z-30 ${isDarkTheme ? 'bg-black/80' : 'bg-white/80'} backdrop-blur-md flex flex-col items-center justify-center transition-colors duration-300`}>
            <h3 className="text-4xl text-accent-red font-black font-clash mb-2 tracking-widest drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]">GAME OVER</h3>
            <p className="text-neutral-600 dark:text-neutral-300 text-lg mb-8 transition-colors duration-300">FINAL SCORE: <span className="text-black dark:text-white font-bold">{score}</span></p>
            <button 
              onClick={startGame}
              className={`px-8 py-3 font-bold rounded-full transition-transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(255,255,255,0.3)] ${isDarkTheme ? 'bg-white text-black hover:bg-neutral-200' : 'bg-black text-white hover:bg-neutral-800'}`}
            >
              PLAY AGAIN
            </button>
          </div>
        )}

        <canvas 
          ref={canvasRef}
          className="w-full block touch-none cursor-crosshair"
          style={{ height: '400px' }}
        />
        
        <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
          <p className="text-black/40 dark:text-white/40 text-[10px] uppercase font-bold tracking-widest transition-colors duration-300">
            Arrow Keys / Touch to Move
          </p>
        </div>
      </div>
    </section>
  );
}
