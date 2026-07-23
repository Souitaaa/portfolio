import React, { useState } from 'react';
import { MapPin, MessageSquare, Bookmark, Briefcase, User, GraduationCap } from 'lucide-react';

export default function Sidebar() {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState('portfolio'); // portfolio / profile

  return (
    <aside className="w-full lg:w-[320px] flex-shrink-0 bg-white text-black border-b lg:border-b-0 lg:border-r border-neutral-200 lg:h-screen lg:sticky lg:top-0 overflow-y-auto no-scrollbar flex flex-col items-center p-8 select-none">
      {/* Profile Image Container */}
      <div className="relative flex flex-col items-center mt-4">
        <div className="w-[110px] h-[110px] rounded-full overflow-hidden border border-neutral-200 bg-neutral-100 flex items-center justify-center">
          {/* Initials Avatar with solid premium design */}
          <div className="w-full h-full flex items-center justify-center text-4xl font-clash bg-gradient-to-tr from-neutral-900 to-neutral-700 text-white font-bold">
            SC
          </div>
        </div>
        {/* Blue Open to Work Badge Directly Underneath */}
        <div className="mt-3 flex items-center gap-1.5 bg-blue-50 border border-blue-200 rounded-full px-3 py-1 text-[9px] uppercase font-black tracking-widest text-blue-600 shadow-sm whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
          Open to Work
        </div>
      </div>

      {/* Name and Handle */}
      <h1 className="text-2xl font-black font-clash mt-6 tracking-wide text-neutral-900 text-center">Souita Charaf</h1>
      <div className="flex items-center gap-2 text-xs text-neutral-500 mt-1 font-mono justify-center">
        <span>@sharaf</span>
        <span className="text-neutral-300">•</span>
        <div className="flex items-center gap-1">
          <MapPin size={12} className="text-accent-red" />
          <span>Morocco</span>
        </div>
      </div>

      {/* Professional Title */}
      <p className="text-xs font-bold tracking-widest text-neutral-500 mt-3 text-center uppercase font-mono bg-neutral-100 border border-neutral-200 rounded-full px-4 py-1">
        Software Engineer
      </p>

      {/* Education & Experience Details */}
      <div className="w-full border-t border-neutral-100 pt-6 mt-6 flex flex-col gap-4">
        <div className="flex items-start gap-3 text-neutral-600">
          <div className="p-2 bg-neutral-50 rounded-xl border border-neutral-100 text-blue-500">
            <GraduationCap size={16} />
          </div>
          <div className="text-xs">
            <p className="font-bold text-neutral-800">1337 • 42 Network</p>
            <p className="text-[10px] text-neutral-400 font-mono mt-0.5">CS & Software Engineering</p>
          </div>
        </div>

        <div className="flex items-start gap-3 text-neutral-600">
          <div className="p-2 bg-neutral-50 rounded-xl border border-neutral-100 text-purple-500">
            <Briefcase size={16} />
          </div>
          <div className="text-xs">
            <p className="font-bold text-neutral-800">UM6P University</p>
            <p className="text-[10px] text-neutral-400 font-mono mt-0.5">Applied Tech & Science</p>
          </div>
        </div>
      </div>

      {/* Message and Bookmark CTA Buttons */}
      <div className="w-full flex gap-3 mt-8">
        <a 
          href="mailto:souita.charaf@gmail.com" 
          className="flex-1 flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-sm rounded-full py-3 px-5 transition-all duration-300 shadow-sm border border-transparent"
        >
          <MessageSquare size={16} />
          <span>Message</span>
        </a>
        <button 
          onClick={() => setIsBookmarked(!isBookmarked)}
          className={`w-12 h-12 flex items-center justify-center rounded-full border transition-all duration-300 ${
            isBookmarked 
              ? 'bg-accent-red/10 border-accent-red text-accent-red scale-105 shadow-sm' 
              : 'bg-transparent border-neutral-200 text-neutral-400 hover:bg-neutral-50 hover:text-neutral-950'
          }`}
        >
          <Bookmark size={18} fill={isBookmarked ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Vertical List Spacing for Tabs */}
      <div className="w-full flex flex-col gap-2 mt-8 border-t border-neutral-100 pt-6">
        <button
          onClick={() => setActiveTab('portfolio')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-left ${
            activeTab === 'portfolio'
              ? 'bg-neutral-900 text-white font-bold shadow-sm'
              : 'text-neutral-500 hover:text-neutral-800 hover:bg-neutral-50'
          }`}
        >
          <Briefcase size={16} />
          <span className="text-xs tracking-wider uppercase font-clash">Portfolio Works</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-left ${
            activeTab === 'profile'
              ? 'bg-neutral-900 text-white font-bold shadow-sm'
              : 'text-neutral-500 hover:text-neutral-800 hover:bg-neutral-50'
          }`}
        >
          <User size={16} />
          <span className="text-xs tracking-wider uppercase font-clash">Profile Bio</span>
        </button>
      </div>
    </aside>
  );
}
