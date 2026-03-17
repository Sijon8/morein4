'use client';
import { useState, useMemo } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import { 
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, 
  Title, Tooltip as ChartTooltip, Legend, Filler, ArcElement 
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, ChartTooltip, Legend, Filler, ArcElement);

// Transparent InfoRow with Explicit Math Receipts
const InfoRow = ({ label, value, tooltip, receipts, isDeduction = false, isTotal = false, isToggle = false }: any) => (
  <div className="group relative flex justify-between border-b border-slate-800/50 pb-2 mb-2 cursor-help items-center">
    <span className={`${isTotal ? 'font-bold text-blue-400 italic' : 'text-slate-400'} text-sm border-b border-dashed border-slate-600`}>
      {label}
    </span>
    {isToggle ? value : (
      <span className={`${isTotal ? 'font-bold text-blue-400' : isDeduction ? 'text-red-400' : 'text-white'} font-mono`}>
        {isDeduction ? '-' : ''}${typeof value === 'number' ? value.toFixed(0) : value}
      </span>
    )}
    <div className="absolute hidden group-hover:flex flex-col bottom-full mb-2 right-0 md:left-0 w-72 bg-slate-900/90 backdrop-blur-md border border-slate-600 p-4 rounded-xl shadow-2xl z-50">
      <span className="text-xs text-slate-200 leading-relaxed mb-2">{tooltip}</span>
      {receipts && (
        <div className="bg-slate-950/50 p-2 rounded border border-slate-800">
          <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest block mb-1">The Math:</span>
          <span className="text-[10px] text-slate-400 font-mono leading-tight block">{receipts}</span>
        </div>
      )}
    </div>
  </div>
);

const BAH_DATABASE: Record<string, { name: string; rate: number }> = {
  '80011': { name: 'Buckley AFB, CO', rate: 2154 },
  '92136': { name: 'San Diego, CA', rate: 2844 },
  '78236': { name: 'Lackland AFB, TX', rate: 1530 },
  '39534': { name: 'Keesler AFB, MS', rate: 1314 },
  'default': { name: 'National Average', rate: 1800 }
};

export default function MoreInFourEngine() {
  const [rank, setRank] = useState('E3'); 
  const [tspContribution, setTspContribution] = useState(15);
  const [maxIRAPostMil, setMaxIRAPostMil] = useState(true);
  const [receiveBAS, setReceiveBAS] = useState(true);
  const [receiveBAH, setReceiveBAH] = useState(false);
  const [zipCode, setZipCode] = useState('');

  const PAY_DATA: Record<string, { basic: number; tax: number; expenses: number }> = {
    E1: { basic: 2110, tax: 320, expenses: 400 },
    E2: { basic: 2365, tax: 360, expenses: 450 },
    E3: { basic: 2640, tax: 410, expenses: 500 },
    E4: { basic: 3050, tax: 480, expenses: 550 }
  };

  const current = PAY_DATA[rank];
  const basRate = receiveBAS ? 460 : 0;
  const activeLocation = BAH_DATABASE[zipCode] || BAH_DATABASE['default'];
  const bahRate = receiveBAH ? activeLocation.rate : 0;

  const monthlyGross = current.basic + basRate + bahRate;
  const monthlyIRA = 583; // $7,000/yr max
  const monthlyTSP = current.basic * (tspContribution / 100);
  const totalInvested = monthlyTSP + monthlyIRA;
  const netDisposable = monthlyGross - current.tax - current.expenses - totalInvested;

  const chartData = useMemo(() => {
    let milBalance = 0; let civBalance = 0;
    let labels = []; let milPoints = []; let civPoints = [];
    
    for (let year = 0; year <= 42; year++) {
      const age = 18 + year;
      
      if (year < 4) {
        const annualInvest = (totalInvested * 12);
        milBalance = (milBalance + annualInvest) * 1.08; 
      } else {
        milBalance = (milBalance + (maxIRAPostMil ? 7000 : 0)) * 1.08;
      }
      
      if (age >= 28) civBalance = (civBalance + 7000) * 1.08;

      labels.push(`Age ${age}`);
      milPoints.push(Math.round(milBalance));
      civPoints.push(Math.round(civBalance));
    }
    return { labels, milPoints, civPoints };
  }, [totalInvested, maxIRAPostMil]);

  const m22 = chartData.milPoints[4];  
  const m40 = chartData.milPoints[22]; 
  const m60 = chartData.milPoints[42]; 

  return (
    <div className="space-y-10 max-w-7xl mx-auto pt-8">
      
      {/* HEADER & CONTEXT */}
      <div className="text-center md:text-left space-y-6 max-w-5xl mx-auto pb-8 border-b border-slate-800">
        <h1 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter leading-none">
          More in four years <br className="hidden md:block"/><span className="text-blue-500">than most in a lifetime.</span>
        </h1>
        
        <div className="bg-slate-900/50 border-l-4 border-blue-500 p-6 rounded-r-2xl text-slate-300 text-sm md:text-base leading-relaxed space-y-4 shadow-xl">
          <p>
            This strategy is built on a raw reality from my own enlisted experience: the military provides an unprecedented, low-drag environment. For your first four years, your largest overhead expenses—housing, food, and medical—are completely covered by the force. 
          </p>
          <p>
            While most 18-to-22-year-olds are inflating their lifestyles with student debt or struggling to make rent, you have a unique window to live lean. By executing a super-aggressive investing strategy upfront when life is least complicated, you lock in decades of compound growth.
          </p>
          <p>
            This isn't theory. This is doing the hard work early, keeping your lifestyle lean, and planting a massive financial seed that secures lifelong freedom before your civilian peers even begin. 
          </p>
        </div>
      </div>

      {/* THE PROJECTION & MILESTONES */}
      <div className="bg-slate-900/40 p-6 md:p-8 rounded-3xl border border-slate-800 shadow-2xl relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="group relative bg-slate-900 border border-slate-700 hover:border-blue-500 transition-colors p-6 rounded-2xl shadow-lg cursor-help">
            <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest block mb-2">Age 22 (End of Contract)</span>
            <span className="text-4xl font-black text-white italic">${(m22 / 1000).toFixed(1)}k</span>
            <p className="text-xs text-slate-500 mt-2 border-b border-dashed border-slate-600 inline-block">The Upfront Foundation</p>
            <div className="absolute hidden group-hover:block top-full mt-2 left-0 w-72 bg-slate-900/95 backdrop-blur-md border border-slate-600 p-4 rounded-xl shadow-2xl z-50">
              <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest block mb-1">The Math:</span>
              <p className="text-xs text-slate-300 font-mono leading-relaxed">
                4 Years of aggressively investing ${totalInvested.toFixed(0)}/mo (${(totalInvested * 12).toFixed(0)}/yr) while your basic needs are covered, compounding annually at an 8% market return.
              </p>
            </div>
          </div>

          <div className="group relative bg-slate-900 border border-slate-700 hover:border-blue-500 transition-colors p-6 rounded-2xl shadow-lg cursor-help">
            <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest block mb-2">Age 40 (Mid-Life)</span>
            <span className="text-4xl font-black text-white italic">${(m40 / 1000).toFixed(0)}k</span>
            <p className="text-xs text-slate-500 mt-2 border-b border-dashed border-slate-600 inline-block">Compound Growth</p>
            <div className="absolute hidden group-hover:block top-full mt-2 left-0 md:-left-12 w-72 bg-slate-900/95 backdrop-blur-md border border-slate-600 p-4 rounded-xl shadow-2xl z-50">
              <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest block mb-1">The Math:</span>
              <p className="text-xs text-slate-300 font-mono leading-relaxed">
                Your Age 22 balance (${m22.toLocaleString()}) sitting in the market, compounding at 8% for 18 years {maxIRAPostMil ? 'PLUS continuing to add $7,000/yr to a Roth IRA.' : 'with ZERO additional contributions.'}
              </p>
            </div>
          </div>

          <div className="group relative bg-slate-900 border border-slate-700 hover:border-blue-500 transition-colors p-6 rounded-2xl shadow-lg cursor-help">
            <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest block mb-2">Age 60 (Retirement)</span>
            <span className="text-4xl font-black text-white italic glow-blue">${(m60 / 1000000).toFixed(2)}M</span>
            <p className="text-xs text-slate-500 mt-2 border-b border-dashed border-slate-600 inline-block">Long-Term Freedom</p>
            <div className="absolute hidden group-hover:block top-full mt-2 right-0 w-72 bg-slate-900/95 backdrop-blur-md border border-slate-600 p-4 rounded-xl shadow-2xl z-50">
              <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest block mb-1">The Math:</span>
              <p className="text-xs text-slate-300 font-mono leading-relaxed">
                Your Age 40 balance compounding at 8% for another 20 years {maxIRAPostMil ? 'PLUS ongoing $7k/yr IRA contributions.' : 'with ZERO additional contributions.'} The hard work upfront does the heavy lifting.
              </p>
            </div>
          </div>
        </div>

        {/* CONTROLS (Top of Graph for Easy Access) */}
        <div className="flex flex-wrap justify-center lg:justify-between items-center gap-6 bg-slate-800/80 p-4 rounded-xl border border-slate-700 mb-6">
          <div className="flex flex-col">
            <span className="text-[9px] text-slate-400 font-bold uppercase mb-1">Starting Rank</span>
            <select value={rank} onChange={(e) => setRank(e.target.value)} className="bg-slate-900 text-sm font-bold text-white border border-slate-600 p-2 rounded uppercase cursor-pointer outline-none focus:border-blue-500">
              <option value="E1">E-1 (Standard)</option>
              <option value="E2">E-2 (JROTC)</option>
              <option value="E3">E-3 (Eagle Scout/Credits)</option>
              <option value="E4">E-4 (Degree)</option>
            </select>
          </div>
          
          <div className="flex flex-col justify-center flex-grow max-w-md px-4 lg:border-l lg:border-r border-slate-700">
            <span className="text-[10px] text-blue-400 font-bold uppercase mb-2 text-center">Aggressive TSP Rate: {tspContribution}%</span>
            <input type="range" min="0" max="60" value={tspContribution} onChange={(e) => setTspContribution(Number(e.target.value))} className="w-full accent-blue-500 cursor-pointer" />
          </div>

          <label className="flex items-center gap-3 cursor-pointer bg-slate-900 px-4 py-2 rounded border border-slate-600 hover:border-blue-500 transition-colors">
            <input type="checkbox" checked={maxIRAPostMil} onChange={(e) => setMaxIRAPostMil(e.target.checked)} className="accent-blue-500 w-5 h-5" />
            <div className="flex flex-col">
              <span className="text-xs text-white font-bold uppercase tracking-widest">Post-Military IRA</span>
              <span className="text-[9px] text-slate-400">Keep investing $7k/yr after separating</span>
            </div>
          </label>
        </div>

        {/* HERO GRAPH */}
        <div className="h-[450px] w-full">
          <Line 
            data={{
              labels: chartData.labels,
              datasets: [
                { label: '4-Year Aggressive Enlisted Strategy', data: chartData.milPoints, borderColor: '#3b82f6', tension: 0.4, pointRadius: 0, fill: true, backgroundColor: 'rgba(59, 130, 246, 0.1)', borderWidth: 3 },
                { label: 'Standard Civilian Path (Starts at Age 28)', data: chartData.civPoints, borderColor: '#475569', borderDash: [5, 5], tension: 0.4, pointRadius: 0, borderWidth: 2 }
              ]
            }}
            options={{ 
              responsive: true, maintainAspectRatio: false, interaction: { mode: 'index', intersect: false },
              plugins: { legend: { position: 'top', labels: { color: '#e2e8f0', font: { family: 'monospace', weight: 'bold' } } } },
              scales: { y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#64748b', font: { size: 14, weight: 'bold' }, callback: v => '$' + (Number(v)/1000000).toFixed(1) + 'M' } }, x: { grid: { display: false }, ticks: { color: '#64748b', maxTicksLimit: 12 } } } 
            }}
          />
        </div>
      </div>

      {/* SECTION: UNDER THE HOOD (MECHANICS) */}
      <div className="pt-8 relative z-0">
        <h3 className="text-2xl font-black text-white uppercase italic mb-6 pl-2">The Monthly Mechanics</h3>
        <p className="text-sm text-slate-400 mb-8 pl-2 max-w-3xl">This is the mathematical breakdown of how an 18-to-22-year-old service member can maintain a high savings rate while still having cash left over for life. Hover over any dashed item to see the receipts.</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          
          {/* INCOME CARD */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">1. Monthly Income</h4>
            <InfoRow 
              label="Basic Pay" value={current.basic} 
              tooltip="Your taxable base salary. This is guaranteed and increases automatically with time in service." 
              receipts="Referenced directly from the official Defense Finance and Accounting Service (DFAS) Enlisted Pay Tables."
            />
            <InfoRow 
              label="BAS (Food Stipend)" isToggle={true} 
              value={<input type="checkbox" checked={receiveBAS} onChange={(e) => setReceiveBAS(e.target.checked)} className="accent-blue-500 w-4 h-4" />}
              tooltip="Basic Allowance for Subsistence. Toggle this off if you are an E-1/E-2 eating exclusively at the DFAC."
              receipts="Standard Enlisted BAS Rate is currently $460.25/month. Tax-free."
            />
            <InfoRow 
              label="BAH (Housing)" isToggle={true} 
              value={<input type="checkbox" checked={receiveBAH} onChange={(e) => setReceiveBAH(e.target.checked)} className="accent-blue-500 w-4 h-4" />}
              tooltip="Basic Allowance for Housing. Toggle ON if you are approved to live off-base. Enter a ZIP code below."
              receipts="Tax-free allowance calculated by the DoD based on ZIP code and Pay Grade to cover local rental costs."
            />

            {receiveBAH && (
              <div className="mt-2 mb-4 p-3 bg-slate-800/50 rounded-xl border border-slate-700">
                <input 
                  type="text" maxLength={5} placeholder="Enter ZIP (e.g. 80011)" 
                  value={zipCode} onChange={(e) => setZipCode(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-xs text-white font-mono mb-2 outline-none focus:border-blue-500"
                />
                <div className="flex justify-between text-[10px] text-blue-400 font-bold uppercase tracking-wider">
                  <span>{activeLocation.name}</span>
                  <span>${bahRate}/mo</span>
                </div>
              </div>
            )}

            <div className="pt-2 mt-2 border-t border-slate-800">
              <InfoRow label="Gross Total" value={monthlyGross} isTotal={true} tooltip="Your total actual compensation, including tax-free allowances." />
            </div>
          </div>

          {/* OUTFLOW CARD */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">2. The Aggressive Outflow</h4>
            <InfoRow 
              label="Taxes (Est)" value={current.tax} isDeduction={true} 
              tooltip="Because military housing and food allowances are 100% tax-free, your actual tax burden is artificially low compared to civilian peers." 
              receipts={`Estimated 12% Federal + State + 7.65% FICA applied ONLY to the $${current.basic} Basic Pay.`}
            />
            <InfoRow 
              label="Life Expenses" value={current.expenses} isDeduction={true} 
              tooltip="A lean, low-drag budget." 
              receipts="Conservative estimate for cell phone, car insurance, internet, and minor subscriptions while living in the dorms."
            />
            <InfoRow 
              label="TSP Contribution" value={monthlyTSP} isDeduction={true} 
              tooltip="Your military 401(k) investment." 
              receipts={`${tspContribution}% of $${current.basic} Basic Pay = $${monthlyTSP.toFixed(0)}/mo directly to the market.`}
            />
            <InfoRow 
              label="Roth IRA" value={monthlyIRA} isDeduction={true} 
              tooltip="Maxing out a personal, tax-advantaged Roth IRA." 
              receipts="$7,000 maximum annual contribution divided by 12 months = $583/mo."
            />
          </div>

          {/* THE REALITY CHECK / PI CHART CARD */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-between shadow-xl">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 w-full text-left">3. The Reality Check</h4>
            <div className="w-32 h-32 relative mb-4">
              <Doughnut 
                data={{ 
                  labels: ['Invested Front-Load', 'Taxes & Lean Bills', 'In-Pocket / Fun Money'],
                  datasets: [{ data: [totalInvested, current.tax + current.expenses, Math.max(0, netDisposable)], backgroundColor: ['#3b82f6', '#475569', '#10b981'], borderWidth: 0 }] 
                }}
                options={{ maintainAspectRatio: false, cutout: '70%', plugins: { legend: { display: false }, tooltip: { enabled: false } } }}
              />
            </div>
            <div className="text-center w-full bg-slate-800/50 p-4 rounded-xl border border-slate-700">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Net Cash In-Pocket</span>
              <h4 className={`text-4xl font-black italic mt-1 ${netDisposable < 0 ? 'text-red-500' : 'text-white'}`}>
                ${netDisposable.toFixed(0)}
              </h4>
              <p className="text-[10px] text-slate-400 mt-2 leading-tight">
                {netDisposable < 0 ? 'Warning: You are investing more than you make. Lower the TSP slider.' : 'Guilt-free cash left over every month after hitting aggressive investment goals.'}
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}