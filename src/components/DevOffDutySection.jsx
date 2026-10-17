import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Gamepad2, Trophy, BrainCircuit, Users, Sparkles } from 'lucide-react';

export default function DevOffDutySection() {
  const [isDevMode, setIsDevMode] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const currentlyPlaying = [
    { title: 'Age of Empires III', tag: 'RTS Strategy', detail: 'Build orders & villager allocation' },
    { title: 'SSX Tricky', tag: 'Retro Emulation', detail: 'PCSX2 60fps' },
    { title: 'Downhill Domination', tag: 'Retro Emulation', detail: 'PCSX2 60fps' }
  ];

  const tacticsStats = { title: 'Football Analytics', subtitle: 'Champions League & World Cup predictions', stat: '85% Accuracy' };

  const tabletopGames = { title: 'Board Games', items: ['Catan: High-level settlement positioning', 'Spyfall: Interrogation tactics'] };

  const hallOfFame = [
    { name: 'Accomplice 1', role: 'Dev Jail Breakout' },
    { name: 'Accomplice 2', role: 'Heist Planner' },
    { name: 'Accomplice 3', role: 'Getaway Driver' }
  ];

  return (
    <>
      {/* Secret Floating Toggle at Top Right */}
      <motion.div 
        className="fixed top-6 right-6 z-[100] flex flex-col items-end"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <motion.div 
          layout
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="relative flex items-center p-1 bg-neutral-900/40 border border-neutral-800/50 backdrop-blur-xl rounded-full shadow-2xl cursor-pointer overflow-hidden group hover:bg-neutral-900/80 hover:border-neutral-700 transition-colors"
        >
          <AnimatePresence mode="wait">
            {!isHovered && isDevMode ? (
              <motion.button
                type="button" aria-label="Open mode switcher" onClick={() => setIsHovered(true)}
                key="collapsed"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="w-10 h-10 flex items-center justify-center text-neutral-500"
              >
                <Sparkles size={16} />
              </motion.button>
            ) : (
              <motion.div
                key="expanded"
                initial={{ opacity: 0, width: 40 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 40 }}
                className="flex items-center"
              >
                <button
                  onClick={() => setIsDevMode(true)}
                  className={`relative flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-colors z-10 whitespace-nowrap ${
                    isDevMode ? 'text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Code2 size={16} />
                  Dev Mode
                </button>
                
                <button
                  onClick={() => setIsDevMode(false)}
                  className={`relative flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-colors z-10 whitespace-nowrap ${
                    !isDevMode ? 'text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Gamepad2 size={16} />
                  Off-Duty
                </button>

                {/* Sliding Pill Highlight */}
                <div className="absolute inset-0 p-1 pointer-events-none flex" style={{ justifyContent: isDevMode ? 'flex-start' : 'flex-end' }}>
                  <motion.div
                    layoutId="activeToggleTop"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    className="w-[115px] h-full bg-neutral-700/50 rounded-full border border-neutral-600/50"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Fullscreen Off-Duty Overlay */}
      <AnimatePresence>
        {!isDevMode && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[90] bg-black/60 overflow-y-auto pt-28 pb-12 px-4"
          >
            <motion.div
              initial={{ opacity: 0, y: -40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-6xl mx-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Card 1: Player 1 (Retro & Strategy Gaming) */}
                <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400 }} className="md:col-span-2 p-6 rounded-3xl bg-neutral-900/80 border border-neutral-800 flex flex-col gap-4 overflow-hidden relative group shadow-2xl">
                  <div className="absolute top-0 right-0 p-6 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-500">
                    <Gamepad2 size={120} />
                  </div>
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2 relative z-10">
                    Player 1 <span className="text-emerald-400 text-sm font-normal px-2 py-0.5 bg-emerald-400/10 rounded-full">Online</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10">
                    {currentlyPlaying.map((game, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-neutral-800/80 border border-neutral-700 hover:bg-neutral-700 transition-colors">
                        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1 block">{game.tag}</span>
                        <h4 className="text-lg font-medium text-neutral-200 mb-1">{game.title}</h4>
                        <p className="text-sm text-neutral-500">{game.detail}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Card 2: Tactics & Stats */}
                <motion.div whileHover={{ scale: 1.02, rotate: 1 }} transition={{ type: "spring", stiffness: 400 }} className="md:col-span-1 p-6 rounded-3xl bg-gradient-to-br from-neutral-900/80 to-black border border-neutral-800 flex flex-col relative overflow-hidden group shadow-2xl">
                  <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:rotate-12 transition-transform duration-500">
                    <Trophy size={100} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 relative z-10">Tactics & Stats</h3>
                  <div className="mt-auto relative z-10">
                    <h4 className="text-lg font-semibold text-neutral-200 mb-1">{tacticsStats.title}</h4>
                    <p className="text-sm text-neutral-400 mb-4">{tacticsStats.subtitle}</p>
                    <div className="inline-flex items-center justify-center p-4 rounded-full bg-neutral-800 border border-neutral-700">
                      <span className="text-2xl font-bold text-emerald-400">{tacticsStats.stat}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Card 3: Tabletop & Mind Games */}
                <motion.div whileHover={{ scale: 1.02, rotate: -1 }} transition={{ type: "spring", stiffness: 400 }} className="md:col-span-1 p-6 rounded-3xl bg-neutral-900/80 border border-neutral-800 flex flex-col group relative overflow-hidden shadow-2xl">
                  <div className="absolute bottom-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                    <BrainCircuit size={80} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 relative z-10">Tabletop & Mind Games</h3>
                  <ul className="space-y-3 relative z-10">
                    {tabletopGames.items.map((item, i) => {
                      const [game, tactic] = item.split(': ');
                      return (
                        <li key={i} className="flex flex-col p-3 rounded-xl bg-neutral-800/50 border border-neutral-700/50 hover:bg-neutral-800 transition-colors">
                          <span className="text-md font-semibold text-neutral-200">{game}</span>
                          <span className="text-sm text-neutral-400">{tactic}</span>
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>

                {/* Card 4: The Hall of Fame */}
                <motion.div whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 400 }} className="md:col-span-2 p-6 rounded-3xl bg-neutral-900/80 border border-neutral-800 flex flex-col overflow-hidden relative group shadow-2xl">
                  <div className="absolute top-1/2 right-4 -translate-y-1/2 opacity-5 group-hover:scale-110 transition-transform duration-700">
                    <Users size={150} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 relative z-10">The Hall of Fame</h3>
                  <p className="text-sm text-neutral-400 mb-6 relative z-10">Dev Jail Accomplices & Easter Eggs</p>
                  <div className="flex gap-4 relative z-10 overflow-x-auto pb-2 snap-x no-scrollbar">
                    {hallOfFame.map((person, i) => (
                      <motion.div whileHover={{ y: -5 }} key={i} className="min-w-[140px] p-4 rounded-2xl bg-neutral-800/80 border border-neutral-700 flex flex-col items-center gap-3 snap-center cursor-pointer">
                        <div className="w-16 h-16 rounded-full bg-neutral-700 flex items-center justify-center border-2 border-neutral-600">
                          <Users size={24} className="text-neutral-400" />
                        </div>
                        <div className="text-center">
                          <h4 className="text-sm font-medium text-neutral-200">{person.name}</h4>
                          <span className="text-xs text-neutral-500">{person.role}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
