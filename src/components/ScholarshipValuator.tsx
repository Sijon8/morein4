'use client';
import { useState } from 'react';
import { GraduationCap, BookOpen, Home, CheckCircle2, Award, Landmark } from 'lucide-react';

// Reusable Receipt Tooltip
const MathReceipt = ({ title, math, source }: any) => (
  <div className="absolute hidden group-hover:flex flex-col bottom-full mb-2 left-1/2 -translate-x-1/2 w-72 bg-slate-900/95 backdrop-blur-md border border-slate-600 p-4 rounded-xl shadow-2xl z-50 text-left">
    <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest block mb-1">{title}</span>
    <span className="text-xs text-slate-300 font-mono leading-relaxed block mb-2">{math}</span>
    <span className="text-[9px] text-slate-500 uppercase border-t border-slate-700 pt-1">Source: {source}</span>
  </div>
);

const SCHOOL_DATA: Record<string, { name: string; tuitionPerYr: number; bahPerMo: number }> = {
  state: { name: 'In-State Public University', tuitionPerYr: 11000, bahPerMo: 1800 },
  private: { name: 'Standard Private College', tuitionPerYr: 40000, bahPerMo: 2200 },
  elite: { name: 'Elite Ivy / Tier 1 Private', tuitionPerYr: 65000, bahPerMo: 3000 },
  trade: { name: 'Accelerated Trade/Tech School (2 Yr)', tuitionPerYr: 15000, bahPerMo: 1800 }
};

export default function ScholarshipEngine() {
  const [schoolKey, setSchoolKey] = useState('state');
  const targetSchool = SCHOOL_DATA[schoolKey];

  // The Math (Receipts)
  const activeDutyTA = 4500 * 4; // $4,500/yr for 4 years
  const giTuition = targetSchool.tuitionPerYr * (schoolKey === 'trade' ? 2 : 4);
  const giBAH = targetSchool.bahPerMo * 9 * (schoolKey === 'trade' ? 2 : 4); // 9 months of school per year
  const giBooks = 1000 * (schoolKey === 'trade' ? 2 : 4);
  const totalValue = activeDutyTA + giTuition + giBAH + giBooks;

  return (
    <div className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800 space-y-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-slate-800 pb-6 gap-6">
        <div>
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter">The Debt-Free Degree</h2>
          <p className="text-sm text-slate-400 mt-2 max-w-2xl">
            Why pay for college when college can pay you? The Service Sprint is an 8-year roadmap to securing an elite education while keeping 100% of your future earnings.
          </p>
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] text-slate-500 font-bold uppercase mb-1">Select Post-Service Goal</span>
          <select 
            value={schoolKey} onChange={(e) => setSchoolKey(e.target.value)} 
            className="bg-slate-800 text-sm font-bold text-white border border-slate-600 p-3 rounded uppercase cursor-pointer hover:border-blue-500 outline-none transition-colors"
          >
            {Object.entries(SCHOOL_DATA).map(([k, v]) => (
              <option key={k} value={k}>{v.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* The 8-Year Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
        
        {/* Phase 1: Active Duty */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-700 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10"><Award size={100} /></div>
          <span className="bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block">Phase 1: Ages 18–22</span>
          <h3 className="text-2xl font-black text-white italic mb-2">The Active Duty Hack</h3>
          <p className="text-xs text-slate-400 mb-6 leading-relaxed">Knock out your general education or associate's degree while getting paid a full-time salary. Save your GI Bill for the expensive university later.</p>
          
          <div className="space-y-4 relative z-10">
            <div className="group relative flex items-center justify-between bg-slate-800/50 p-3 rounded-lg border border-slate-700 cursor-help hover:border-blue-500 transition-colors">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-blue-500" size={18} />
                <span className="text-sm font-bold text-slate-200">Tuition Assistance (TA)</span>
              </div>
              <span className="text-blue-400 font-mono font-bold">+${(activeDutyTA / 1000).toFixed(1)}k</span>
              <MathReceipt 
                title="Active Duty TA" 
                math="$4,500 max per year × 4 years. Used for online classes, community college, or base education centers." 
                source="DoD Tuition Assistance Program" 
              />
            </div>
            
            <div className="group relative flex items-center justify-between bg-slate-800/50 p-3 rounded-lg border border-slate-700 cursor-help hover:border-blue-500 transition-colors">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-blue-500" size={18} />
                <span className="text-sm font-bold text-slate-200">CLEP / DSST Exams</span>
              </div>
              <span className="text-slate-400 text-xs italic">100% Free</span>
              <MathReceipt 
                title="Testing Out" 
                math="Military members test out of college credits (like English 101 or History) for free. Civilians pay $90+ per test." 
                source="DANTES (Defense Activity for Non-Traditional Education Support)" 
              />
            </div>
          </div>
        </div>

        {/* Phase 2: Post-Service */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-700 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10"><Landmark size={100} /></div>
          <span className="bg-green-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block">Phase 2: Ages 22–26</span>
          <h3 className="text-2xl font-black text-white italic mb-2">The GI Bill Payload</h3>
          <p className="text-xs text-slate-400 mb-6 leading-relaxed">Attend {targetSchool.name} without paying a dime. The VA pays your tuition directly and deposits a housing stipend into your checking account every month.</p>
          
          <div className="space-y-4 relative z-10">
            <div className="group relative flex items-center justify-between bg-slate-800/50 p-3 rounded-lg border border-slate-700 cursor-help hover:border-green-500 transition-colors">
              <div className="flex items-center gap-3">
                <GraduationCap className="text-green-500" size={18} />
                <span className="text-sm font-bold text-slate-200">Full Tuition Paid</span>
              </div>
              <span className="text-green-400 font-mono font-bold">+${(giTuition / 1000).toFixed(1)}k</span>
              <MathReceipt 
                title="Post-9/11 Tuition" 
                math={`${schoolKey === 'trade' ? '2' : '4'} Years × $${targetSchool.tuitionPerYr.toLocaleString()}/yr. (Note: Elite privates often use the 'Yellow Ribbon Program' to cover costs above the VA national maximum).`} 
                source="VA Post-9/11 GI Bill (Chapter 33)" 
              />
            </div>

            <div className="group relative flex items-center justify-between bg-slate-800/50 p-3 rounded-lg border border-slate-700 cursor-help hover:border-green-500 transition-colors">
              <div className="flex items-center gap-3">
                <Home className="text-green-500" size={18} />
                <span className="text-sm font-bold text-slate-200">Monthly Housing (BAH)</span>
              </div>
              <span className="text-green-400 font-mono font-bold">+${(giBAH / 1000).toFixed(1)}k</span>
              <MathReceipt 
                title="Housing Stipend (MHA)" 
                math={`$${targetSchool.bahPerMo}/mo × 9 school months × ${schoolKey === 'trade' ? '2' : '4'} years. Paid directly to you at the E-5 with dependents rate for the school's ZIP code.`} 
                source="VA Monthly Housing Allowance" 
              />
            </div>

            <div className="group relative flex items-center justify-between bg-slate-800/50 p-3 rounded-lg border border-slate-700 cursor-help hover:border-green-500 transition-colors">
              <div className="flex items-center gap-3">
                <BookOpen className="text-green-500" size={18} />
                <span className="text-sm font-bold text-slate-200">Book Stipend</span>
              </div>
              <span className="text-green-400 font-mono font-bold">+${(giBooks / 1000).toFixed(1)}k</span>
              <MathReceipt 
                title="Books & Supplies" 
                math={`$1,000 deposited annually into your account for ${schoolKey === 'trade' ? '2' : '4'} years.`} 
                source="VA Post-9/11 GI Bill" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* The Total Asset Value */}
      <div className="bg-slate-900 border border-slate-700 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between shadow-2xl">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Total Educational Asset Value</span>
          <h4 className="text-4xl md:text-5xl font-black text-white italic">
            ${(totalValue / 1000).toFixed(1)}k
          </h4>
        </div>
        <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl text-center md:text-right max-w-sm">
          <span className="text-[10px] font-black text-red-400 uppercase tracking-widest block mb-1">The Alternative</span>
          <p className="text-xs text-slate-300 leading-snug">The average civilian takes out student loans at 6-8% interest. You are capturing this entire value completely debt-free.</p>
        </div>
      </div>
    </div>
  );
}