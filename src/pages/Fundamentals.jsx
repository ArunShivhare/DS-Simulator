import React from 'react';

const Fundamentals = () => {
  // Config array for high-density, actionable roadmap cards
  const coreModules = [
    {
      id: "01",
      title: "Time & Space Complexity",
      desc: "Master Big O notation, analyze runtime loops, and optimize memory footprints systematically.",
      count: "12 Lessons",
      badge: "Core",
      color: "from-blue-500/20 to-cyan-500/10",
      border: "group-hover:border-cyan-500/40",
      icon: (
        <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: "02",
      title: "Memory Mechanics & Arrays",
      desc: "Understand contiguous memory, pointer manipulation, and static vs dynamic allocations.",
      count: "18 Lessons",
      badge: "Essential",
      color: "from-purple-500/20 to-pink-500/10",
      border: "group-hover:border-purple-500/40",
      icon: (
        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 002-2h2a2 2 0 002 2" />
        </svg>
      )
    },
    {
      id: "03",
      title: "Recursion Mechanics",
      desc: "Deconstruct the call stack, design base cases, and map complex execution recursion trees.",
      count: "15 Lessons",
      badge: "Intermediate",
      color: "from-emerald-500/20 to-teal-500/10",
      border: "group-hover:border-emerald-500/40",
      icon: (
        <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.213 6H16" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#05070f] text-slate-100 font-sans relative overflow-hidden selection:bg-purple-500/30 selection:text-purple-200">
      
      {/* Visual Ambient Background Accents */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Main Structural Wrapper */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 relative z-10">
        
        {/* Header Block Container */}
        <div className="max-w-3xl mb-20 border-l-2 border-purple-500/30 pl-6 sm:pl-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold tracking-wider uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            Core Curriculum
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6">
            Build <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">Fundamentals</span>
          </h1>
          <p className="text-slate-400 text-base sm:text-lg lg:text-xl font-normal leading-relaxed">
            Construct a bulletproof foundation in Data Structures & Algorithms. 
            Bridge the gap between raw theory and real-world visualization through structured, 
            interactive engineering labs.
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {[
            { label: "Interactive Visuals", icon: "👁️" },
            { label: "Deep-Dive Theory", icon: "📚" },
            { label: "Gamified Quizzes", icon: "⚡" },
            { label: "Hands-on Coding", icon: "💻" }
          ].map((feat, i) => (
            <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-[#0b0f19]/60 border border-[#161f33] backdrop-blur-md">
              <span className="text-xl">{feat.icon}</span>
              <span className="text-sm font-medium text-slate-300">{feat.label}</span>
            </div>
          ))}
        </div>

        {/* Dynamic Roadmaps Segment */}
        <div className="space-y-6">
          <div className="flex items-baseline justify-between border-b border-[#161f33] pb-4">
            <h2 className="text-lg font-bold tracking-wider uppercase text-slate-400">Learning Paths</h2>
            <span className="text-xs text-slate-500 font-mono">3 Core Modules Available</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {coreModules.map((module) => (
              <div 
                key={module.id} 
                className="group relative flex flex-col justify-between p-6 rounded-2xl bg-[#0b0f19]/40 hover:bg-[#0b0f19]/80 border border-[#161f33] transition-all duration-300 backdrop-blur-sm cursor-pointer hover:shadow-2xl hover:shadow-purple-500/5 hover:-translate-y-1"
              >
                {/* Visual Gradient Border Accent */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${module.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10`} />
                
                <div>
                  {/* Card Header Topline */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-2.5 rounded-xl bg-[#121829] border border-[#222f4d] group-hover:border-slate-700 transition-colors">
                      {module.icon}
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-600 group-hover:text-slate-400 transition-colors">
                      #{module.id}
                    </span>
                  </div>

                  {/* Title & Description Body */}
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors mb-2.5">
                    {module.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed font-normal mb-8">
                    {module.desc}
                  </p>
                </div>

                {/* Card Action Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-[#161f33]/60">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 font-medium">{module.count}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-700" />
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/50 font-medium">
                      {module.badge}
                    </span>
                  </div>
                  
                  {/* Interactive Dynamic Call to Action Trigger Arrow */}
                  <span className="text-slate-500 group-hover:text-white transform group-hover:translate-x-1 transition-all duration-200">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Fundamentals;