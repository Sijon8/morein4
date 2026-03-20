'use client';
import { useState } from 'react';
import { ChevronRight, Award, GraduationCap, DollarSign, CalendarCheck } from 'lucide-react';

const TIMELINES: Record<string, { month: number; rank: string; pay: number; event: string; type: string }[]> = {
  'Air Force / Space Force': [
    { month: 0, rank: 'E-1', pay: 2110, event: 'BMT & Tech School. Base pay + housing/food provided.', type: 'milestone' },
    { month: 6, rank: 'E-2', pay: 2365, event: 'Automatic promotion to Airman. Pay increase.', type: 'promotion' },
    { month: 16, rank: 'E-3', pay: 2640, event: 'Promotion to Airman First Class (A1C).', type: 'promotion' },
    { month: 24, rank: 'E-3', pay: 2800, event: '2-Year Time-in-Service pay bump.', type: 'pay' },
    { month: 36, rank: 'E-4', pay: 3050, event: '100% Post-9/11 GI Bill vested. Eligible for SrA.', type: 'benefit' },
    { month: 48, rank: 'E-4', pay: 3190, event: 'Contract Complete. You hold the 4-year foundation.', type: 'milestone' }
  ],
  'Army': [
    { month: 0, rank: 'E-1', pay: 2110, event: 'Basic Combat Training & AIT.', type: 'milestone' },
    { month: 6, rank: 'E-2', pay: 2365, event: 'Automatic promotion to Private (PV2).', type: 'promotion' },
    { month: 12, rank: 'E-3', pay: 2640, event: 'Promotion to Private First Class (PFC).', type: 'promotion' },
    { month: 24, rank: 'E-4', pay: 3050, event: 'Eligible for Specialist (SPC). 2-Year pay bump.', type: 'promotion' },
    { month: 36, rank: 'E-4', pay: 3050, event: '100% Post-9/11 GI Bill vested.', type: 'benefit' },
    { month: 48, rank: 'E-4', pay: 3190, event: 'Contract Complete. You hold the 4-year foundation.', type: 'milestone' }
  ],
  'Navy': [
    { month: 0, rank: 'E-1', pay: 2110, event: 'Boot Camp & A-School.', type: 'milestone' },
    { month: 9, rank: 'E-2', pay: 2365, event: 'Automatic promotion to Seaman Apprentice.', type: 'promotion' },
    { month: 18, rank: 'E-3', pay: 2640, event: 'Promotion to Seaman.', type: 'promotion' },
    { month: 30, rank: 'E-4', pay: 3050, event: 'Advancement to Petty Officer Third Class (Testing required).', type: 'promotion' },
    { month: 36, rank: 'E-4', pay: 3050, event: '100% Post-9/11 GI Bill vested.', type: 'benefit' },
    { month: 48, rank: 'E-4', pay: 3190, event: 'Contract Complete. You hold the 4-year foundation.', type: 'milestone' }
  ],
  'Marine Corps': [
    { month: 0, rank: 'E-1', pay: 2110, event: 'Recruit Training & SOI/MOS School.', type: 'milestone' },
    { month: 6, rank: 'E-2', pay: 2365, event: 'Promotion to Private First Class (PFC).', type: 'promotion' },
    { month: 14, rank: 'E-3', pay: 2640, event: 'Promotion to Lance Corporal (LCpl).', type: 'promotion' },
    { month: 24, rank: 'E-3', pay: 2800, event: '2-Year Time-in-Service pay bump.', type: 'pay' },
    { month: 36, rank: 'E-3', pay: 2800, event: '100% Post-9/11 GI Bill vested.', type: 'benefit' },
    { month: 48, rank: 'E-4', pay: 3190, event: 'Highly competitive promotion to Corporal. Contract Complete.', type: 'milestone' }
  ]
};

const getIcon = (type: string) => {
  switch(type) {
    case 'promotion': return <Award size={18} className="text-yellow-400" />;
    case 'benefit': return <GraduationCap size={18} className="text-green-400" />;
    case 'pay': return <DollarSign size={18} className="text-blue-400" />;
    default: return <CalendarCheck size={18} className="text-slate-400" />;
  }
};

export default function CareerTimelineTracker() {
  const [activeBranch, setActiveBranch] = useState('Air Force / Space Force');

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">The 4-Year Progression</h2>
        <p className="text-sm text-slate-400 mt-2">A standard timeline of pay increases, automatic promotions, and benefits vesting.</p>
      </div>

      {/* Branch Selector */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {Object.keys(TIMELINES).map((branch) => (
          <button
            key={branch}
            onClick={() => setActiveBranch(branch)}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
              activeBranch === branch 
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' 
              : 'bg-slate-900 border border-slate-700 text-slate-400 hover:border-blue-500'
            }`}
          >
            {branch}
          </button>
        ))}
      </div>

      {/* The Vertical Timeline */}
      <div className="relative border-l-2 border-slate-800 ml-4 md:ml-8 space-y-8 pb-8">
        {TIMELINES[activeBranch].map((node, i) => (
          <div key={i} className="relative pl-8 md:pl-12 group">
            
            {/* Timeline Dot */}
            <div className="absolute -left-[17px] top-1 bg-slate-900 border-2 border-slate-700 w-8 h-8 rounded-full flex items-center justify-center group-hover:border-blue-500 transition-colors z-10">
              {getIcon(node.type)}
            </div>

            {/* Content Box */}
            <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl shadow-lg hover:border-slate-600 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                <div className="flex items-center gap-3">
                  <span className="bg-slate-800 text-slate-300 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded">Month {node.month}</span>
                  <span className="text-white font-bold tracking-wider">{node.rank}</span>
                </div>
                <div className="text-blue-400 font-mono font-bold text-sm bg-blue-900/20 px-3 py-1 rounded border border-blue-900/50">
                  Est. Base: ${node.pay}/mo
                </div>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                {node.event}
              </p>
            </div>
            
          </div>
        ))}
      </div>
      <p className="text-center text-[10px] text-slate-500 uppercase tracking-widest mt-8">Note: Promotion timelines are estimated minimums and vary by individual performance, MOS, and administrative requirements.</p>
    </div>
  );
}