// 'use client';
// import { useState, useMemo } from 'react';
// import { Line, Doughnut } from 'react-chartjs-2';
// import { ChevronDown, ChevronUp, Info, Percent, Landmark, Plane, Shield, Anchor, Crosshair, Rocket, LifeBuoy, AlertCircle } from 'lucide-react';
// import { 
//   Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, 
//   Title, Tooltip as ChartTooltip, Legend, Filler, ArcElement 
// } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, ChartTooltip, Legend, Filler, ArcElement);

// // OFFICIAL DOD BRAND COLORS THEME ENGINE
// const BRANCH_THEMES: Record<string, any> = {
//   'Air Force': { 
//     icon: Plane, 
//     text: 'text-blue-400', 
//     headerText: 'bg-gradient-to-r from-slate-300 to-blue-400 text-transparent bg-clip-text', // Silver to Blue
//     hex: '#60A5FA', 
//     border: 'border-blue-400/50', 
//     hoverBorder: 'hover:border-blue-400', 
//     glow: 'shadow-blue-900/30', 
//     bgGrad: 'bg-gradient-to-br from-blue-900/30 to-[#0a0a0a]',
//     activeBtn: 'bg-blue-600 text-white border-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.4)]'
//   },
//   'Army': { 
//     icon: Shield, 
//     text: 'text-yellow-500', 
//     headerText: 'bg-gradient-to-r from-slate-400 to-yellow-500 text-transparent bg-clip-text', // Steel to Gold
//     hex: '#EAB308', 
//     border: 'border-yellow-500/50', 
//     hoverBorder: 'hover:border-yellow-500', 
//     glow: 'shadow-yellow-900/30', 
//     bgGrad: 'bg-gradient-to-br from-yellow-950/20 to-[#0a0a0a]',
//     activeBtn: 'bg-black text-yellow-500 border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.4)]'
//   },
//   'Navy': { 
//     icon: Anchor, 
//     text: 'text-amber-400', 
//     headerText: 'bg-gradient-to-r from-blue-500 to-amber-400 text-transparent bg-clip-text', // Blue to Gold
//     hex: '#FBBF24', 
//     border: 'border-blue-800/80', 
//     hoverBorder: 'hover:border-amber-400', 
//     glow: 'shadow-blue-900/50', 
//     bgGrad: 'bg-gradient-to-br from-blue-950/60 to-[#0a0a0a]',
//     activeBtn: 'bg-blue-950 text-amber-400 border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.3)]'
//   },
//   'Marines': { 
//     icon: Crosshair, 
//     text: 'text-red-600', 
//     headerText: 'bg-gradient-to-r from-yellow-500 to-red-600 text-transparent bg-clip-text', // Gold to Scarlet
//     hex: '#DC2626', 
//     border: 'border-red-600/50', 
//     hoverBorder: 'hover:border-red-600', 
//     glow: 'shadow-red-900/30', 
//     bgGrad: 'bg-gradient-to-br from-red-950/20 to-[#0a0a0a]',
//     activeBtn: 'bg-red-700 text-white border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.5)]'
//   },
//   'Space Force': { 
//     icon: Rocket, 
//     text: 'text-slate-300', 
//     headerText: 'bg-gradient-to-r from-slate-300 to-purple-400 text-transparent bg-clip-text', // Platinum to Space Purple
//     hex: '#CBD5E1', 
//     border: 'border-slate-400/50', 
//     hoverBorder: 'hover:border-slate-400', 
//     glow: 'shadow-slate-700/30', 
//     bgGrad: 'bg-gradient-to-br from-slate-800/40 to-[#000000]',
//     activeBtn: 'bg-black text-slate-300 border-slate-400 shadow-[0_0_15px_rgba(203,213,225,0.3)]'
//   },
//   'Coast Guard': { 
//     icon: LifeBuoy, 
//     text: 'text-sky-500', 
//     headerText: 'bg-gradient-to-r from-sky-400 to-red-500 text-transparent bg-clip-text', // CG Blue to Scarlet
//     hex: '#0EA5E9', 
//     border: 'border-sky-500/50', 
//     hoverBorder: 'hover:border-sky-500', 
//     glow: 'shadow-sky-900/30', 
//     bgGrad: 'bg-gradient-to-br from-sky-900/20 to-[#0a0a0a]',
//     activeBtn: 'bg-sky-700 text-white border-sky-400 shadow-[0_0_15px_rgba(14,165,233,0.4)]'
//   }
// };

// // PREMIUM UPGRADE: Mouse-Tracking Tooltip (Standard Cursor)
// const InfoRow = ({ label, value, tooltip, receipts, isDeduction = false, isTotal = false, isToggle = false, theme }: any) => {
//   const [isHovered, setIsHovered] = useState(false);
//   const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

//   const handleMouseMove = (e: React.MouseEvent) => {
//     const xOffset = e.clientX + 320 > window.innerWidth ? -320 : 20;
//     const yOffset = e.clientY + 150 > window.innerHeight ? -150 : 20;
//     setMousePos({ x: e.clientX + xOffset, y: e.clientY + yOffset });
//   };

//   return (
//     <div 
//       className={`relative flex justify-between border-b border-slate-800/50 pb-2 mb-2 items-center transition-colors duration-300 ${isHovered ? 'border-slate-600' : ''}`}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       onMouseMove={handleMouseMove}
//     >
//       <span className={`${isTotal ? `font-bold italic ${theme.text}` : 'text-slate-400'} text-xs border-b border-dashed border-slate-600 transition-colors duration-300 ${isHovered ? theme.text : ''}`}>
//         {label}
//       </span>
//       {isToggle ? value : (
//         <span className={`${isTotal ? `font-bold ${theme.text}` : isDeduction ? 'text-red-400' : 'text-white'} font-mono text-sm transition-colors duration-300`}>
//           {isDeduction ? '-' : ''}${typeof value === 'number' ? value.toLocaleString() : value}
//         </span>
//       )}

//       {isHovered && (
//         <div 
//           className="fixed left-0 top-0 z-[100] pointer-events-none w-80 bg-slate-900/95 backdrop-blur-xl border border-slate-600/50 p-5 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] transition-transform duration-75 ease-out text-left"
//           style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
//         >
//           <span className="text-xs text-slate-100 leading-relaxed mb-2 block">{tooltip}</span>
//           {receipts && (
//             <div className={`bg-slate-950/60 p-3 rounded-lg border border-slate-700/50 mt-3`}>
//               <span className={`text-[9px] font-black uppercase tracking-widest block mb-1 ${theme.text}`}>First Principles Math:</span>
//               <span className="text-[10px] text-slate-300 font-mono leading-relaxed block">{receipts}</span>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// const BAH_DATABASE: Record<string, { name: string; rate: number }> = {
//   '80011': { name: 'Buckley AFB, CO', rate: 2154 },
//   '92136': { name: 'San Diego, CA', rate: 2844 },
//   '78236': { name: 'Lackland AFB, TX', rate: 1530 },
//   '39534': { name: 'Keesler AFB, MS', rate: 1314 },
//   'default': { name: 'National Average', rate: 1800 }
// };

// const TSP_FUNDS = [
//   { fund: 'C Fund', desc: 'Large Cap (S&P 500)', return: '10.5%', er: '0.048%', risk: 'High' },
//   { fund: 'S Fund', desc: 'Small/Mid Cap', return: '9.5%', er: '0.059%', risk: 'High' },
//   { fund: 'I Fund', desc: 'International', return: '5.5%', er: '0.054%', risk: 'High' },
//   { fund: 'G Fund', desc: 'Govt Securities', return: '4.0%', er: '0.049%', risk: 'Low' },
//   { fund: 'F Fund', desc: 'Fixed Income (Bonds)', return: '5.0%', er: '0.059%', risk: 'Low' },
// ];

// export default function MoreInFourEngine() {
//   const [activeBranch, setActiveBranch] = useState('Air Force');
//   const [rank, setRank] = useState('E3'); 
//   const [tspContribution, setTspContribution] = useState(15);
//   const [expectedROI, setExpectedROI] = useState(10); 
//   const [maxIRAPostMil, setMaxIRAPostMil] = useState(true);
//   const [showNarrative, setShowNarrative] = useState(false);
//   const [receiveBAS, setReceiveBAS] = useState(true);
//   const [receiveBAH, setReceiveBAH] = useState(false);
//   const [zipCode, setZipCode] = useState('');

//   const theme = BRANCH_THEMES[activeBranch];

//   const PAY_DATA: Record<string, { basic: number; tax: number; expenses: number }> = {
//     E1: { basic: 2110, tax: 320, expenses: 400 },
//     E2: { basic: 2365, tax: 360, expenses: 450 },
//     E3: { basic: 2640, tax: 410, expenses: 500 },
//     E4: { basic: 3050, tax: 480, expenses: 550 }
//   };

//   const current = PAY_DATA[rank];
//   const basRate = receiveBAS ? 460 : 0;
//   const activeLocation = BAH_DATABASE[zipCode] || BAH_DATABASE['default'];
//   const bahRate = receiveBAH ? activeLocation.rate : 0;

//   const monthlyGross = current.basic + basRate + bahRate;
//   const monthlyIRA = 583; 
//   const monthlyTSP = current.basic * (tspContribution / 100);
//   const totalInvested = monthlyTSP + monthlyIRA;
//   const netDisposable = monthlyGross - current.tax - current.expenses - totalInvested;

//   const chartData = useMemo(() => {
//     let milBalance = 0; let civBalance = 0;
//     let labels = []; let milPoints = []; let civPoints = [];
//     const annualMultiplier = 1 + (expectedROI / 100); 
    
//     for (let year = 0; year <= 42; year++) {
//       const age = 18 + year;
      
//       if (year < 4) {
//         const annualInvest = (totalInvested * 12);
//         milBalance = (milBalance + annualInvest) * annualMultiplier; 
//       } else {
//         milBalance = (milBalance + (maxIRAPostMil ? 7000 : 0)) * annualMultiplier;
//       }
      
//       if (age >= 28) civBalance = (civBalance + 7000) * annualMultiplier;

//       labels.push(`Age ${age}`);
//       milPoints.push(Math.round(milBalance));
//       civPoints.push(Math.round(civBalance));
//     }
//     return { labels, milPoints, civPoints };
//   }, [totalInvested, maxIRAPostMil, expectedROI]);

//   const m22 = chartData.milPoints[4];  
//   const m40 = chartData.milPoints[22]; 
//   const m60 = chartData.milPoints[42]; 

//   return (
//     <div className="space-y-12 max-w-7xl mx-auto pt-4 selection:bg-slate-700 selection:text-white font-sans">
      
//       {/* 0. BRANCH SELECTOR */}
//       <div className="flex flex-wrap justify-center gap-3 mb-8">
//         {Object.keys(BRANCH_THEMES).map((b) => {
//           const IconObj = BRANCH_THEMES[b].icon;
//           const isActive = activeBranch === b;
//           return (
//             <button
//               key={b}
//               onClick={() => setActiveBranch(b)}
//               className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
//                 isActive 
//                 ? theme.activeBtn 
//                 : 'bg-slate-900/50 border border-slate-800 text-slate-500 hover:border-slate-600 hover:text-slate-300'
//               }`}
//             >
//               <IconObj size={16} className={isActive ? '' : 'opacity-50'} />
//               {b}
//             </button>
//           );
//         })}
//       </div>

//       {/* 1. HEADER & NARRATIVE (THE MANIFESTO) */}
//       <div className="text-center space-y-6 max-w-4xl mx-auto pb-6 border-b border-slate-800">
//         <h1 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter leading-none transition-colors duration-500">
//           More in four years <br/><span className={theme.headerText}>than most in a lifetime.</span>
//         </h1>
        
//         <button onClick={() => setShowNarrative(!showNarrative)} className={`mx-auto flex items-center gap-2 bg-slate-900 border border-slate-700 ${theme.hoverBorder} text-slate-300 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300`}>
//           <Info size={16} className={theme.text.split(' ')[0]} />
//           {showNarrative ? 'Hide The Strategy' : 'Read The Manifesto'}
//           {showNarrative ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//         </button>

//         {showNarrative && (
//           <div className={`bg-slate-900/80 p-8 md:p-10 rounded-2xl border-l-4 ${theme.border} border-t border-r border-b border-slate-800 text-left space-y-6 shadow-xl text-slate-300 text-sm leading-relaxed mt-6 animate-in fade-in slide-in-from-top-4`}>
//             <p>
//               <strong className="text-white text-base">The Origin:</strong> I built this platform based on my own lived experience starting my career as an Airman Basic in the United States Air Force. Starting as an E-1 at 18 years old, I implemented an aggressive savings strategy to take advantage of the military's low-overhead environment. Looking back, my only regret is that I wasn't <em>even more</em> aggressive. MoreInFour isn't just theory—it is a lived proof of concept that I want to socialize so the next generation can capitalize on this massive window of opportunity.
//             </p>
//             <p>
//               <strong className="text-white text-base">The Four Pillars:</strong> Savings is just one piece of the puzzle. Leveraging a Department of War enlisted 4-year contract unlocks a plethora of lifelong value: <strong>Service</strong> (purpose and global perspective), <strong>Savings</strong> (hyper-aggressive front-loaded wealth), <strong>Scholarship</strong> (100% debt-free education via the GI Bill), and <strong>Skills</strong> (world-class technical and leadership training).
//             </p>
//             <p>
//               <strong className="text-white text-base">The Status Quo:</strong> The traditional civilian route comes with heavy, immediate overhead. Whether a young adult takes on student debt for college, or enters the blue-collar workforce where entry-level wages are immediately devoured by rent, groceries, and healthcare—their margins are slim. Furthermore, many young civilians lack access to a 401(k) or employer match. The result? The Federal Reserve reports the median American reaches age 55-64 with only $185,000 saved. They lose their most powerful compounding decade: their 20s.
//             </p>
//             <p>
//               <strong className="text-white text-base">The Ultimate Baseline (Zero Match Assumption):</strong> This calculator is intentionally conservative. <strong>It assumes you never receive another 401(k) match from a civilian employer for the rest of your life.</strong> It is designed to establish an impenetrable safety net. If you do the hard work upfront, secure your GI Bill, and plant this financial seed, you guarantee that even if you end up with nothing else, your long-term freedom is secured and your future family has a foundation.
//             </p>
//           </div>
//         )}
//       </div>

//       {/* 2. THE COMMAND CENTER (DASHBOARD) */}
//       <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
//         {/* LEFT COLUMN: Controls & Mechanics */}
//         <div className="xl:col-span-4 flex flex-col gap-6">
          
//           <div className={`${theme.bgGrad} p-6 rounded-3xl border border-slate-800 shadow-xl transition-all duration-500`}>
//             <h3 className={`text-[10px] font-black uppercase tracking-widest mb-4 ${theme.text} transition-colors duration-500`}>Command Parameters</h3>
            
//             <div className="space-y-6">
//               <div className="flex flex-col">
//                 <span className="text-[9px] text-slate-400 font-bold uppercase mb-1">Starting Rank</span>
//                 <select value={rank} onChange={(e) => setRank(e.target.value)} className="bg-slate-800 text-sm font-bold text-white border border-slate-600 p-2 rounded uppercase outline-none focus:border-slate-400 transition-colors">
//                   <option value="E1">E-1 (Standard)</option>
//                   <option value="E2">E-2 (JROTC)</option>
//                   <option value="E3">E-3 (Credits/Scout)</option>
//                   <option value="E4">E-4 (Degree)</option>
//                 </select>
//               </div>

//               <div className="flex flex-col pt-4 border-t border-slate-800/50">
//                 <div className="flex justify-between items-center mb-2">
//                   <span className={`text-[10px] font-bold uppercase ${theme.text} transition-colors duration-500`}>Aggressive TSP Rate</span>
//                   <span className="text-xs font-mono text-white">{tspContribution}%</span>
//                 </div>
//                 <input type="range" min="0" max="60" value={tspContribution} onChange={(e) => setTspContribution(Number(e.target.value))} className="w-full" style={{ accentColor: theme.hex }} />
//               </div>

//               <div className="flex flex-col pt-4 border-t border-slate-800/50">
//                 <div className="flex justify-between items-center mb-2">
//                   <span className={`text-[10px] font-bold uppercase ${theme.text} transition-colors duration-500`}>Est. Market Return (ROI)</span>
//                   <span className="text-xs font-mono text-white">{expectedROI}%</span>
//                 </div>
//                 <input type="range" min="4" max="15" step="0.5" value={expectedROI} onChange={(e) => setExpectedROI(Number(e.target.value))} className="w-full" style={{ accentColor: theme.hex }} />
//                 <span className="text-[9px] text-slate-400 mt-2 text-center">Slide to 10% for historical C/S Fund mix.</span>
//               </div>

//               <div className="pt-4 border-t border-slate-800/50">
//                 <label className="flex items-center gap-3 group">
//                   <input type="checkbox" checked={maxIRAPostMil} onChange={(e) => setMaxIRAPostMil(e.target.checked)} className="w-4 h-4" style={{ accentColor: theme.hex }} />
//                   <div className="flex flex-col">
//                     <span className="text-xs text-slate-300 group-hover:text-white font-bold uppercase tracking-widest transition-colors">Post-Military IRA</span>
//                     <span className="text-[9px] text-slate-400">Keep investing $7k/yr after separating</span>
//                   </div>
//                 </label>
//               </div>
//             </div>
//           </div>

//           <div className={`${theme.bgGrad} p-6 rounded-3xl border border-slate-800 shadow-xl space-y-6 transition-all duration-500`}>
//             <div>
//               <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Monthly Cashflow</h4>
//               <InfoRow theme={theme} label="Basic Pay" value={current.basic} tooltip="Your base salary, guaranteed by Congress." receipts="This is the exact monthly base pay for your selected rank according to the official Defense Finance and Accounting Service (DFAS) tables. It is the ONLY portion of your income that the IRS can tax." />
//               <InfoRow theme={theme} label="BAS (Food)" isToggle={true} value={<input type="checkbox" checked={receiveBAS} onChange={(e) => setReceiveBAS(e.target.checked)} className="w-4 h-4" style={{ accentColor: theme.hex }}/>} tooltip="Basic Allowance for Subsistence. A non-taxable monthly stipend to offset food costs." receipts="Currently fixed at $460.25/month for all enlisted members. Because it is an 'allowance' and not 'pay', it is 100% legally tax-free." />
//               <InfoRow theme={theme} label="BAH (Housing)" isToggle={true} value={<input type="checkbox" checked={receiveBAH} onChange={(e) => setReceiveBAH(e.target.checked)} className="w-4 h-4" style={{ accentColor: theme.hex }}/>} tooltip="Basic Allowance for Housing. A non-taxable stipend to pay for rent if you live off-base." receipts="Calculated dynamically by the DoD based on your specific ZIP code and rank. Like BAS, it is 100% legally tax-free. If you live in the dorms/barracks, you do not receive this, but your housing is free." />
              
//               {receiveBAH && (
//                 <div className="mt-2 mb-3 p-2 bg-slate-900/50 rounded-lg border border-slate-700/50">
//                   <input type="text" maxLength={5} placeholder="ZIP (e.g. 80011)" value={zipCode} onChange={(e) => setZipCode(e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded p-1.5 text-xs text-white font-mono mb-1 outline-none transition-colors" />
//                   <div className={`flex justify-between text-[9px] font-bold uppercase tracking-wider ${theme.text}`}>
//                     <span>{activeLocation.name}</span>
//                     <span>${bahRate.toLocaleString()}/mo</span>
//                   </div>
//                 </div>
//               )}
//               <InfoRow theme={theme} label="Gross Income" value={monthlyGross} isTotal={true} tooltip="Your actual total compensation before taxes or bills." receipts="Basic Pay + BAS + BAH. Because a large portion of this is tax-free, your take-home pay is significantly higher than a civilian making the exact same 'Gross Income'." />
//             </div>

//             <div className="pt-4 border-t border-slate-800/50">
//               <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Aggressive Outflow</h4>
//               <InfoRow theme={theme} label="Taxes (Est)" value={current.tax} isDeduction={true} tooltip="Estimated Federal, State, and FICA taxes." receipts="We estimate a standard 12% Federal Tax + State Tax + 7.65% FICA (Social Security/Medicare). Crucially, this math is applied ONLY to your Basic Pay, keeping your tax burden incredibly low." />
//               <InfoRow theme={theme} label="Lean Expenses" value={current.expenses} isDeduction={true} tooltip="A disciplined, low-drag budget." receipts="This is an assumption of basic adult overhead (cell phone, car insurance, internet, minor subscriptions). Living lean is the core requirement to make this math work." />
//               <InfoRow theme={theme} label="TSP Contribution" value={monthlyTSP} isDeduction={true} tooltip="Your military 401(k) investment based on your slider above." receipts={`We take ${tspContribution}% of your $${current.basic.toLocaleString()} Basic Pay. This money is routed directly from your paycheck into the market before you ever see it, enforcing discipline.`} />
//               <InfoRow theme={theme} label="Roth IRA" value={monthlyIRA} isDeduction={true} tooltip="Maxing out a personal Roth IRA." receipts="The IRS allows a maximum contribution of $7,000 per year to an IRA. We divide that by 12 months = $583/month. Because it's a Roth, it grows 100% tax-free forever." />
//             </div>

//             <div className="pt-4 border-t border-slate-800/50 flex items-center justify-between gap-4">
//               <div className="w-20 h-20 relative flex-shrink-0">
//                 <Doughnut 
//                   data={{ 
//                     labels: ['Invested Front-Load', 'Taxes & Bills', 'Net In-Pocket'],
//                     datasets: [{ 
//                       data: [totalInvested, current.tax + current.expenses, Math.max(0, netDisposable)], 
//                       backgroundColor: [theme.hex, '#475569', '#10b981'], 
//                       borderWidth: 0, hoverOffset: 4 
//                     }] 
//                   }}
//                   options={{ maintainAspectRatio: false, cutout: '70%', plugins: { legend: { display: false }, tooltip: { enabled: true, backgroundColor: 'rgba(15, 23, 42, 0.95)', titleColor: '#94a3b8', bodyColor: '#ffffff', bodyFont: { family: 'monospace', weight: 'bold' }, borderColor: '#334155', borderWidth: 1, padding: 8, callbacks: { label: (ctx) => ` $${Number(ctx.raw).toLocaleString()}` } } } }}
//                 />
//               </div>
//               <div className="text-right">
//                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Net In-Pocket</span>
//                 <span className={`text-3xl font-black italic leading-none transition-colors ${netDisposable < 0 ? 'text-red-500' : 'text-green-400'}`}>
//                   ${netDisposable.toLocaleString(undefined, { maximumFractionDigits: 0 })}
//                 </span>
//                 <span className="text-[9px] text-slate-400 mt-1 block leading-tight">{netDisposable < 0 ? 'Deficit Warning' : 'Guilt-free spending cash.'}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT COLUMN: Graph & Milestones */}
//         <div className="xl:col-span-8 flex flex-col gap-6">
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className={`group relative bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-lg transition-all duration-300 ${theme.hoverBorder} ${theme.glow}`}>
//               <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest block mb-1">Age 22 (Contract End)</span>
//               <span className="text-3xl font-black text-white italic transition-all">${(m22 / 1000).toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}k</span>
//               <p className="text-[10px] text-slate-500 mt-1 border-b border-dashed border-slate-600 inline-block">The Upfront Safety Net</p>
//               <div className="absolute hidden group-hover:block top-full mt-2 left-0 w-64 bg-slate-900/95 backdrop-blur-md border border-slate-600 p-4 rounded-xl shadow-2xl z-50">
//                 <p className="text-xs text-slate-300 font-mono leading-relaxed">Math: Principal + (${totalInvested.toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo × 48 months) compounding annually at {expectedROI}% ROI.</p>
//               </div>
//             </div>

//             <div className={`group relative bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-lg transition-all duration-300 ${theme.hoverBorder} ${theme.glow}`}>
//               <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest block mb-1">Age 40 (Mid-Life)</span>
//               <span className="text-3xl font-black text-white italic transition-all">${(m40 / 1000).toLocaleString(undefined, { maximumFractionDigits: 0 })}k</span>
//               <p className="text-[10px] text-slate-500 mt-1 border-b border-dashed border-slate-600 inline-block">Compound Growth</p>
//               <div className="absolute hidden group-hover:block top-full mt-2 left-0 md:-left-12 w-64 bg-slate-900/95 backdrop-blur-md border border-slate-600 p-4 rounded-xl shadow-2xl z-50">
//                 <p className="text-xs text-slate-300 font-mono leading-relaxed">Math: Your Age 22 balance left alone in the market to compound at {expectedROI}% for 18 years {maxIRAPostMil ? '+ continuing to add $7,000/yr.' : 'with ZERO additional contributions.'}</p>
//               </div>
//             </div>

//             <div className={`group relative bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-lg transition-all duration-300 ${theme.hoverBorder} ${theme.glow}`}>
//               <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest block mb-1">Age 60 (Retirement)</span>
//               <span className={`text-3xl font-black text-white italic transition-all drop-shadow-[0_0_8px_${theme.hex}80]`}>${(m60 / 1000000).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}M</span>
//               <p className="text-[10px] text-slate-500 mt-1 border-b border-dashed border-slate-600 inline-block">Long-Term Legacy</p>
//               <div className="absolute hidden group-hover:block top-full mt-2 right-0 w-64 bg-slate-900/95 backdrop-blur-md border border-slate-600 p-4 rounded-xl shadow-2xl z-50">
//                 <p className="text-xs text-slate-300 font-mono leading-relaxed">Math: Your Age 40 balance compounding at {expectedROI}% for another 20 years {maxIRAPostMil ? '+ $7k/yr IRA.' : 'with ZERO additional contributions.'} Time is the multiplier.</p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-slate-900/40 p-6 rounded-3xl border border-slate-800 shadow-2xl h-full min-h-[500px] flex flex-col relative">
            
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
//               <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">Wealth Trajectory</h3>
              
//               <div className="relative group z-50">
//                 <button className={`flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-400 hover:text-white transition-colors bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-700 hover:${theme.border}`}>
//                   <AlertCircle size={14} /> Traditional Route Assumptions
//                 </button>
//                 <div className="absolute hidden group-hover:block top-full mt-2 right-0 w-80 sm:w-96 bg-slate-900/95 backdrop-blur-md border border-slate-600 p-5 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] text-left">
//                   <h4 className={`text-[10px] font-black uppercase tracking-widest mb-2 ${theme.text.split(' ')[0]}`}>Why the massive gap?</h4>
//                   <p className="text-xs text-slate-300 leading-relaxed font-mono">
//                     The traditional civilian path comes with immediate, heavy overhead (rent, food, healthcare, or student debt). We assume the median individual struggles to invest in their early 20s, achieving a $0 net worth at Age 28. At that point, they begin aggressively saving $7,000/yr until retirement.
//                     <br/><br/>
//                     Because compound interest relies exponentially on TIME, starting 10 years later creates a mathematical deficit that is nearly impossible to overcome without massive, potentially unsustainable civilian contributions later in life.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="flex-grow w-full relative min-h-[400px]">
//               <Line 
//                 data={{
//                   labels: chartData.labels,
//                   datasets: [
//                     { label: 'The Upfront Strategy', data: chartData.milPoints, borderColor: theme.hex, tension: 0.4, pointRadius: 0, fill: true, backgroundColor: `${theme.hex}15`, borderWidth: 3 },
//                     { label: 'The Traditional Route', data: chartData.civPoints, borderColor: '#475569', borderDash: [5, 5], tension: 0.4, pointRadius: 0, borderWidth: 2 }
//                   ]
//                 }}
//                 options={{ 
//                   responsive: true, maintainAspectRatio: false, interaction: { mode: 'index', intersect: false },
//                   plugins: { 
//                     legend: { position: 'top', labels: { color: '#e2e8f0', font: { family: 'monospace', weight: 'bold' } } },
//                     tooltip: {
//                       callbacks: {
//                         label: (ctx) => ` $${Number(ctx.raw).toLocaleString()}`,
//                         afterBody: (context) => {
//                           if (context[0].datasetIndex === 1) {
//                             return "\nContext: The traditional civilian path comes with immediate overhead.\nWe assume this individual achieves a $0 net worth at Age 28,\nand then begins saving $7,000/yr until retirement.\n\n*This model assumes NO future employer matches for either path.";
//                           }
//                           return "";
//                         }
//                       }
//                     }
//                   },
//                   scales: { y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#64748b', font: { size: 14, weight: 'bold' }, callback: v => '$' + (Number(v)/1000000).toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1}) + 'M' } }, x: { grid: { display: false }, ticks: { color: '#64748b', maxTicksLimit: 12 } } } 
//                 }}
//               />
//             </div>
//           </div>

//         </div>
//       </div>

//       {/* 3. TAX BRACKETS & TSP COSTS */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8">
        
//         <div className={`bg-slate-900 border border-slate-800 p-8 rounded-3xl relative overflow-hidden group shadow-xl transition-all duration-300 ${theme.hoverBorder}`}>
//           <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity"><Percent size={120} /></div>
//           <h3 className="text-2xl font-black text-white italic tracking-tighter mb-4 relative z-10">The Tax Bracket Advantage</h3>
//           <p className="text-sm text-slate-400 leading-relaxed mb-6 relative z-10">
//             One of the greatest hidden benefits of military compensation is that allowances (Housing and Food) are 100% tax-free. Only your Basic Pay is taxed. This artificially lowers your taxable income, placing you in the lowest possible tax brackets.
//           </p>
//           <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 relative z-10 space-y-3">
//             <div className="flex justify-between text-sm">
//               <span className="text-slate-400">Estimated Annual Basic Pay:</span>
//               <span className="text-white font-mono font-bold">${current.basic.toLocaleString()}</span>
//             </div>
            
//             <InfoRow 
//               theme={theme}
//               label="IRS Standard Deduction (Single Filer)" 
//               value={16100} 
//               isDeduction={true} 
//               tooltip="Every taxpayer subtracts this base amount from their income before taxes are calculated. Because your military allowances are already tax-free, this drops your taxable income to rock-bottom levels."
//               receipts="2026 Estimated IRS Standard Deduction for single filers ($16,100). Subtracting this from your basic pay leaves your true 'taxable' income."
//             />
            
//             <div className="flex justify-between text-base pt-2">
//               <span className={`font-bold transition-colors ${theme.text.split(' ')[0]}`}>Taxable Income (Subject to IRS):</span>
//               <span className="text-white font-mono font-black">$15,580</span>
//             </div>
//             <p className="text-xs text-slate-400 italic pt-3 border-t border-slate-700/50 mt-2">
//               *You fall firmly into the lowest possible Federal Tax Bracket (10%). Investing in a <strong>Roth TSP or Roth IRA</strong> right now means locking in lifetime tax-free growth at the cheapest tax rate you will ever see.
//             </p>
//           </div>
//         </div>

//         <div className={`bg-slate-900 border border-slate-800 p-8 rounded-3xl relative overflow-hidden group shadow-xl transition-all duration-300 ${theme.hoverBorder}`}>
//           <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity"><Landmark size={120} /></div>
//           <h3 className="text-2xl font-black text-white italic tracking-tighter mb-4 relative z-10">The TSP Edge: Expense Ratios</h3>
//           <p className="text-sm text-slate-400 leading-relaxed mb-6 relative z-10">
//             The Thrift Savings Plan (TSP) offers some of the lowest administrative costs (Expense Ratios) in the world. While a civilian mutual fund might charge 0.50% to manage your money, the TSP historically charges roughly 0.05%. Over 40 years, keeping fees low saves you tens of thousands of dollars.
//           </p>
//           <div className="overflow-x-auto relative z-10 bg-slate-800/50 rounded-xl border border-slate-700 p-2">
//             <table className="w-full text-left text-xs">
//               <thead className="text-[10px] text-slate-500 uppercase tracking-widest border-b border-slate-800">
//                 <tr>
//                   <th className="pb-2 px-2">Fund</th>
//                   <th className="pb-2">Asset Type</th>
//                   <th className="pb-2 text-right">Avg Return</th>
//                   <th className="pb-2 text-right px-2">Cost (ER)</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-800/50 text-slate-300 font-mono">
//                 {TSP_FUNDS.map((f) => (
//                   <tr key={f.fund} className="hover:bg-slate-700/30 transition-colors">
//                     <td className="py-3 px-2 font-bold text-white">{f.fund}</td>
//                     <td className="py-3 font-sans text-slate-400">{f.desc}</td>
//                     <td className="py-3 text-right text-green-400">{f.return}</td>
//                     <td className={`py-3 text-right px-2 transition-colors ${theme.text.split(' ')[0]}`}>{f.er}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <p className="text-[9px] text-slate-500 mt-4 text-center uppercase tracking-widest relative z-10">Data is historical approximation. Past performance does not guarantee future results.</p>
//         </div>
//       </div>

//     </div>
//   );
// }
'use client';
import { useState, useMemo } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import { ChevronDown, ChevronUp, Info, Percent, Landmark, Plane, Shield, Anchor, Crosshair, Rocket, LifeBuoy, AlertCircle } from 'lucide-react';
import { 
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, 
  Title, Tooltip as ChartTooltip, Legend, Filler, ArcElement 
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, ChartTooltip, Legend, Filler, ArcElement);

// OFFICIAL DOD BRAND COLORS THEME ENGINE
const BRANCH_THEMES: Record<string, any> = {
  'Air Force': { 
    icon: Plane, 
    text: 'text-blue-400', 
    headerText: 'bg-gradient-to-r from-slate-300 to-blue-400 text-transparent bg-clip-text', 
    hex: '#60A5FA', 
    border: 'border-blue-400/50', 
    hoverBorder: 'hover:border-blue-400', 
    glow: 'shadow-blue-900/30', 
    bgGrad: 'bg-gradient-to-br from-blue-900/30 to-[#0a0a0a]',
    activeBtn: 'bg-blue-600 text-white border-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.4)]'
  },
  'Army': { 
    icon: Shield, 
    text: 'text-yellow-500', 
    headerText: 'bg-gradient-to-r from-slate-400 to-yellow-500 text-transparent bg-clip-text', 
    hex: '#EAB308', 
    border: 'border-yellow-500/50', 
    hoverBorder: 'hover:border-yellow-500', 
    glow: 'shadow-yellow-900/30', 
    bgGrad: 'bg-gradient-to-br from-yellow-950/20 to-[#0a0a0a]',
    activeBtn: 'bg-black text-yellow-500 border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.4)]'
  },
  'Navy': { 
    icon: Anchor, 
    text: 'text-amber-400', 
    headerText: 'bg-gradient-to-r from-blue-500 to-amber-400 text-transparent bg-clip-text', 
    hex: '#FBBF24', 
    border: 'border-blue-800/80', 
    hoverBorder: 'hover:border-amber-400', 
    glow: 'shadow-blue-900/50', 
    bgGrad: 'bg-gradient-to-br from-blue-950/60 to-[#0a0a0a]',
    activeBtn: 'bg-blue-950 text-amber-400 border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.3)]'
  },
  'Marines': { 
    icon: Crosshair, 
    text: 'text-red-600', 
    headerText: 'bg-gradient-to-r from-yellow-500 to-red-600 text-transparent bg-clip-text', 
    hex: '#DC2626', 
    border: 'border-red-600/50', 
    hoverBorder: 'hover:border-red-600', 
    glow: 'shadow-red-900/30', 
    bgGrad: 'bg-gradient-to-br from-red-950/20 to-[#0a0a0a]',
    activeBtn: 'bg-red-700 text-white border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.5)]'
  },
  'Space Force': { 
    icon: Rocket, 
    text: 'text-slate-300', 
    headerText: 'bg-gradient-to-r from-slate-300 to-purple-400 text-transparent bg-clip-text', 
    hex: '#CBD5E1', 
    border: 'border-slate-400/50', 
    hoverBorder: 'hover:border-slate-400', 
    glow: 'shadow-slate-700/30', 
    bgGrad: 'bg-gradient-to-br from-slate-800/40 to-[#000000]',
    activeBtn: 'bg-black text-slate-300 border-slate-400 shadow-[0_0_15px_rgba(203,213,225,0.3)]'
  },
  'Coast Guard': { 
    icon: LifeBuoy, 
    text: 'text-sky-500', 
    headerText: 'bg-gradient-to-r from-sky-400 to-red-500 text-transparent bg-clip-text', 
    hex: '#0EA5E9', 
    border: 'border-sky-500/50', 
    hoverBorder: 'hover:border-sky-500', 
    glow: 'shadow-sky-900/30', 
    bgGrad: 'bg-gradient-to-br from-sky-900/20 to-[#0a0a0a]',
    activeBtn: 'bg-sky-700 text-white border-sky-400 shadow-[0_0_15px_rgba(14,165,233,0.4)]'
  }
};

const InfoRow = ({ label, value, tooltip, receipts, isDeduction = false, isTotal = false, isToggle = false, theme }: any) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const xOffset = e.clientX + 320 > window.innerWidth ? -320 : 20;
    const yOffset = e.clientY + 150 > window.innerHeight ? -150 : 20;
    setMousePos({ x: e.clientX + xOffset, y: e.clientY + yOffset });
  };

  return (
    <div 
      className={`relative flex justify-between border-b border-slate-800/50 pb-2 mb-2 items-center transition-colors duration-300 ${isHovered ? 'border-slate-600' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <span className={`${isTotal ? `font-bold italic ${theme.text}` : 'text-slate-400'} text-xs border-b border-dashed border-slate-600 transition-colors duration-300 ${isHovered ? theme.text : ''}`}>
        {label}
      </span>
      {isToggle ? value : (
        <span className={`${isTotal ? `font-bold ${theme.text}` : isDeduction ? 'text-red-400' : 'text-white'} font-mono text-sm transition-colors duration-300`}>
          {isDeduction ? '-' : ''}${typeof value === 'number' ? value.toLocaleString() : value}
        </span>
      )}

      {isHovered && (
        <div 
          className="fixed left-0 top-0 z-[100] pointer-events-none w-80 bg-slate-900/95 backdrop-blur-xl border border-slate-600/50 p-5 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] transition-transform duration-75 ease-out text-left"
          style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
        >
          <span className="text-xs text-slate-100 leading-relaxed mb-2 block">{tooltip}</span>
          {receipts && (
            <div className={`bg-slate-950/60 p-3 rounded-lg border border-slate-700/50 mt-3`}>
              <span className={`text-[9px] font-black uppercase tracking-widest block mb-1 ${theme.text}`}>First Principles Math:</span>
              <span className="text-[10px] text-slate-300 font-mono leading-relaxed block">{receipts}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const BAH_DATABASE: Record<string, { name: string; rate: number }> = {
  '80011': { name: 'Buckley AFB, CO', rate: 2154 },
  '92136': { name: 'San Diego, CA', rate: 2844 },
  '78236': { name: 'Lackland AFB, TX', rate: 1530 },
  '39534': { name: 'Keesler AFB, MS', rate: 1314 },
  'default': { name: 'National Average', rate: 1800 }
};

const TSP_FUNDS = [
  { fund: 'C Fund', desc: 'Large Cap (S&P 500)', return: '10.5%', er: '0.048%', risk: 'High' },
  { fund: 'S Fund', desc: 'Small/Mid Cap', return: '9.5%', er: '0.059%', risk: 'High' },
  { fund: 'I Fund', desc: 'International', return: '5.5%', er: '0.054%', risk: 'High' },
  { fund: 'G Fund', desc: 'Govt Securities', return: '4.0%', er: '0.049%', risk: 'Low' },
  { fund: 'F Fund', desc: 'Fixed Income (Bonds)', return: '5.0%', er: '0.059%', risk: 'Low' },
];

export default function MoreInFourEngine() {
  const [activeBranch, setActiveBranch] = useState('Air Force');
  const [rank, setRank] = useState('E3'); 
  const [tspContribution, setTspContribution] = useState(15);
  const [expectedROI, setExpectedROI] = useState(10.0); 
  const [maxIRAPostMil, setMaxIRAPostMil] = useState(true);
  const [showNarrative, setShowNarrative] = useState(false);
  const [receiveBAS, setReceiveBAS] = useState(true);
  const [receiveBAH, setReceiveBAH] = useState(false);
  const [zipCode, setZipCode] = useState('');

  const theme = BRANCH_THEMES[activeBranch];

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
  const monthlyIRA = 583; 
  const monthlyTSP = current.basic * (tspContribution / 100);
  const totalInvested = monthlyTSP + monthlyIRA;
  const netDisposable = monthlyGross - current.tax - current.expenses - totalInvested;

  const chartData = useMemo(() => {
    let milBalance = 0; let civBalance = 0; let missedBalance = 0;
    let labels = []; let milPoints = []; let civPoints = []; let missedPoints = [];
    const annualMultiplier = 1 + (expectedROI / 100); 
    
    for (let year = 0; year <= 42; year++) {
      const age = 18 + year;
      
      // Strategy 1: The Upfront (MoreInFour) Route
      if (year < 4) {
        milBalance = (milBalance + (totalInvested * 12)) * annualMultiplier; 
      } else {
        milBalance = (milBalance + (maxIRAPostMil ? 7000 : 0)) * annualMultiplier;
      }
      
      // Strategy 2: The Missed Window (Civilian structural barriers, starts at 22)
      if (age >= 22) {
        missedBalance = (missedBalance + (maxIRAPostMil ? 7000 : 0)) * annualMultiplier;
      } else {
        missedBalance *= annualMultiplier; 
      }

      // Strategy 3: Median Route (Struggles with overhead in 20s, starts at 28)
      if (age >= 28) {
        civBalance = (civBalance + 7000) * annualMultiplier;
      }

      labels.push(`Age ${age}`);
      milPoints.push(Math.round(milBalance));
      missedPoints.push(Math.round(missedBalance));
      civPoints.push(Math.round(civBalance));
    }
    return { labels, milPoints, missedPoints, civPoints };
  }, [totalInvested, maxIRAPostMil, expectedROI]);

  const m22 = chartData.milPoints[4];  
  const m40 = chartData.milPoints[22]; 
  const m60 = chartData.milPoints[42]; 
  const missed60 = chartData.missedPoints[42];
  const opportunityCost = m60 - missed60;

  return (
    <div className="space-y-12 max-w-7xl mx-auto pt-4 selection:bg-slate-700 selection:text-white font-sans">
      
      {/* 0. BRANCH SELECTOR */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {Object.keys(BRANCH_THEMES).map((b) => {
          const IconObj = BRANCH_THEMES[b].icon;
          const isActive = activeBranch === b;
          return (
            <button
              key={b}
              onClick={() => setActiveBranch(b)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                isActive 
                ? theme.activeBtn 
                : 'bg-slate-900/50 border border-slate-800 text-slate-500 hover:border-slate-600 hover:text-slate-300'
              }`}
            >
              <IconObj size={16} className={isActive ? '' : 'opacity-50'} />
              {b}
            </button>
          );
        })}
      </div>

      {/* 1. HEADER & NARRATIVE (THE MANIFESTO) */}
      <div className="text-center space-y-6 max-w-5xl mx-auto pb-6 border-b border-slate-800">
        <h1 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter leading-none transition-colors duration-500">
          More in four years <br/><span className={theme.headerText}>than most in a lifetime.</span>
        </h1>
        
        <button onClick={() => setShowNarrative(!showNarrative)} className={`mx-auto flex items-center gap-2 bg-slate-900 border border-slate-700 ${theme.hoverBorder} text-slate-300 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300`}>
          <Info size={16} className={theme.text.split(' ')[0]} />
          {showNarrative ? 'Hide The Manifesto' : 'Read The Manifesto'}
          {showNarrative ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {showNarrative && (
          <div className={`bg-slate-900/80 p-8 md:p-10 rounded-2xl border-l-4 ${theme.border} border-t border-r border-b border-slate-800 text-left space-y-6 shadow-xl text-slate-300 text-sm leading-relaxed mt-6 animate-in fade-in slide-in-from-top-4`}>
            <p>
              <strong className="text-white text-base">The Origin:</strong> I built this platform based on my own lived experience. Starting as an E-1 at 18 years old, I implemented an aggressive savings strategy to take advantage of the military's incredibly low-overhead environment. Looking back, my only regret is that I wasn't <em>even more</em> aggressive. MoreInFour isn't just theory—it is a proof of concept that I want to socialize so the next generation can capitalize on this massive window of opportunity.
            </p>
            <p>
              <strong className="text-white text-base">The Status Quo:</strong> The traditional civilian route comes with heavy, immediate overhead. Whether a young adult takes on student debt for college, or enters the blue-collar workforce where entry-level wages are devoured by rent, groceries, and healthcare—their margins are slim. Most lack the financial flexibility to invest heavily, and many do not have access to an employer 401(k). The result? The Federal Reserve reports the median American reaches age 55-64 with only $185,000 saved. They structurally lose their most powerful compounding decade: their 20s.
            </p>
            <p>
              <strong className="text-white text-base">The Order of Operations (IRA First):</strong> You will notice the math heavily prioritizes maxing out a Roth IRA ($7,000/yr or $583/mo) <em>before</em> dialing up the TSP slider. Why? Because a Roth IRA is an infinitely more flexible vessel. You can withdraw your <em>contributions</em> (the principal) from a Roth IRA at any time, penalty-free. It acts as the ultimate hybrid between an emergency safety net and a long-term wealth builder. Once the IRA is maxed, the rest of your aggressive savings should pour into the Roth TSP.
            </p>
            <p>
              <strong className="text-white text-base">The 18-22 Window (Opportunity Cost):</strong> The human brain struggles to comprehend non-linear growth. Look at the <span className="text-orange-400 font-bold">Orange Line</span> on the graph below. Ages 18 to 22 are mathematically the most powerful years of your life, but society structurally prevents most young adults from using them. If you miss this crucial 4-year window because you lack access to a 401(k) or the disposable income to max an IRA, you put in the exact same effort from age 22 onwards, but end up losing <strong>${(opportunityCost / 1000000).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MILLION</strong> by retirement. A 4-year delay costs you exponentially. 
            </p>
          </div>
        )}
      </div>

      {/* 2. THE COMMAND CENTER (DASHBOARD) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Controls & Mechanics */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          
          <div className={`${theme.bgGrad} p-6 rounded-3xl border border-slate-800 shadow-xl transition-all duration-500`}>
            <h3 className={`text-[10px] font-black uppercase tracking-widest mb-4 ${theme.text} transition-colors duration-500`}>Command Parameters</h3>
            
            <div className="space-y-6">
              <div className="flex flex-col">
                <span className="text-[9px] text-slate-400 font-bold uppercase mb-1">Starting Rank</span>
                <select value={rank} onChange={(e) => setRank(e.target.value)} className="bg-slate-800 text-sm font-bold text-white border border-slate-600 p-2 rounded uppercase outline-none focus:border-slate-400 transition-colors">
                  <option value="E1">E-1 (Standard)</option>
                  <option value="E2">E-2 (JROTC)</option>
                  <option value="E3">E-3 (Credits/Scout)</option>
                  <option value="E4">E-4 (Degree)</option>
                </select>
              </div>

              <div className="flex flex-col pt-4 border-t border-slate-800/50">
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-[10px] font-bold uppercase ${theme.text} transition-colors duration-500`}>Aggressive TSP Rate</span>
                  <span className="text-xs font-mono text-white">{tspContribution}%</span>
                </div>
                <input type="range" min="0" max="60" value={tspContribution} onChange={(e) => setTspContribution(Number(e.target.value))} className="w-full" style={{ accentColor: theme.hex }} />
                <span className="text-[9px] text-slate-400 mt-2 text-center">Applied after maxing Roth IRA ($583/mo).</span>
              </div>

              <div className="flex flex-col pt-4 border-t border-slate-800/50">
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-[10px] font-bold uppercase ${theme.text} transition-colors duration-500`}>Est. Market Return (ROI)</span>
                  <span className="text-xs font-mono text-white">{expectedROI.toFixed(1)}%</span>
                </div>
                <input type="range" min="4" max="15" step="0.5" value={expectedROI} onChange={(e) => setExpectedROI(Number(e.target.value))} className="w-full" style={{ accentColor: theme.hex }} />
                <span className="text-[9px] text-slate-400 mt-2 text-center">Slide to 10% for historical C/S Fund mix.</span>
              </div>

              <div className="pt-4 border-t border-slate-800/50">
                <label className="flex items-center gap-3 group cursor-pointer">
                  <input type="checkbox" checked={maxIRAPostMil} onChange={(e) => setMaxIRAPostMil(e.target.checked)} className="w-4 h-4 cursor-pointer" style={{ accentColor: theme.hex }} />
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-300 group-hover:text-white font-bold uppercase tracking-widest transition-colors">Post-Military IRA</span>
                    <span className="text-[9px] text-slate-400">Keep investing $7k/yr after separating</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className={`${theme.bgGrad} p-6 rounded-3xl border border-slate-800 shadow-xl space-y-6 transition-all duration-500`}>
            <div>
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Monthly Cashflow</h4>
              <InfoRow theme={theme} label="Basic Pay" value={current.basic} tooltip="Your base salary, guaranteed by Congress." receipts="This is the exact monthly base pay for your selected rank according to the official Defense Finance and Accounting Service (DFAS) tables. It is the ONLY portion of your income that the IRS can tax." />
              <InfoRow theme={theme} label="BAS (Food)" isToggle={true} value={<input type="checkbox" checked={receiveBAS} onChange={(e) => setReceiveBAS(e.target.checked)} className="w-4 h-4 cursor-pointer" style={{ accentColor: theme.hex }}/>} tooltip="Basic Allowance for Subsistence. A non-taxable monthly stipend to offset food costs." receipts="Currently fixed at $460.25/month for all enlisted members. Because it is an 'allowance' and not 'pay', it is 100% legally tax-free." />
              <InfoRow theme={theme} label="BAH (Housing)" isToggle={true} value={<input type="checkbox" checked={receiveBAH} onChange={(e) => setReceiveBAH(e.target.checked)} className="w-4 h-4 cursor-pointer" style={{ accentColor: theme.hex }}/>} tooltip="Basic Allowance for Housing. A non-taxable stipend to pay for rent if you live off-base." receipts="Calculated dynamically by the DoD based on your specific ZIP code and rank. Like BAS, it is 100% legally tax-free. If you live in the dorms/barracks, you do not receive this, but your housing is provided for free." />
              
              {receiveBAH && (
                <div className="mt-2 mb-3 p-2 bg-slate-900/50 rounded-lg border border-slate-700/50">
                  <input type="text" maxLength={5} placeholder="ZIP (e.g. 80011)" value={zipCode} onChange={(e) => setZipCode(e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded p-1.5 text-xs text-white font-mono mb-1 outline-none transition-colors" />
                  <div className={`flex justify-between text-[9px] font-bold uppercase tracking-wider ${theme.text.split(' ')[0]}`}>
                    <span>{activeLocation.name}</span>
                    <span>${bahRate.toLocaleString()}/mo</span>
                  </div>
                </div>
              )}
              <InfoRow theme={theme} label="Gross Income" value={monthlyGross} isTotal={true} tooltip="Your actual total compensation before taxes or bills." receipts="Basic Pay + BAS + BAH. Because a large portion of this is tax-free, your take-home pay is significantly higher than a civilian making the exact same 'Gross Income'." />
            </div>

            <div className="pt-4 border-t border-slate-800/50">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Aggressive Outflow</h4>
              <InfoRow theme={theme} label="Taxes (Est)" value={current.tax} isDeduction={true} tooltip="Estimated Federal, State, and FICA taxes." receipts="We estimate a standard 12% Federal Tax + State Tax + 7.65% FICA (Social Security/Medicare). Crucially, this math is applied ONLY to your Basic Pay, keeping your tax burden incredibly low." />
              <InfoRow theme={theme} label="Lean Expenses" value={current.expenses} isDeduction={true} tooltip="A disciplined, low-drag budget." receipts="This is an assumption of basic adult overhead (cell phone, car insurance, internet, minor subscriptions). Living lean is the core requirement to make this math work." />
              <InfoRow theme={theme} label="Roth IRA (Priority 1)" value={monthlyIRA} isDeduction={true} tooltip="Maxing out a highly-flexible personal Roth IRA first." receipts="The IRS allows a maximum contribution of $7,000 per year to an IRA. We divide that by 12 months = $583/month. We prioritize this because you can withdraw IRA contributions penalty-free at any time for emergencies." />
              <InfoRow theme={theme} label="TSP (Priority 2)" value={monthlyTSP} isDeduction={true} tooltip="Your military 401(k) investment based on your slider above." receipts={`We take ${tspContribution}% of your $${current.basic.toLocaleString()} Basic Pay. This money is routed directly from your paycheck into the market before you ever see it, enforcing discipline.`} />
            </div>

            <div className="pt-4 border-t border-slate-800/50 flex items-center justify-between gap-4">
              <div className="w-20 h-20 relative flex-shrink-0">
                <Doughnut 
                  data={{ 
                    labels: ['Invested Front-Load', 'Taxes & Bills', 'Net In-Pocket'],
                    datasets: [{ 
                      data: [totalInvested, current.tax + current.expenses, Math.max(0, netDisposable)], 
                      backgroundColor: [theme.hex, '#475569', '#10b981'], 
                      borderWidth: 0, hoverOffset: 4 
                    }] 
                  }}
                  options={{ maintainAspectRatio: false, cutout: '70%', plugins: { legend: { display: false }, tooltip: { enabled: true, backgroundColor: 'rgba(15, 23, 42, 0.95)', titleColor: '#94a3b8', bodyColor: '#ffffff', bodyFont: { family: 'monospace', weight: 'bold' }, borderColor: '#334155', borderWidth: 1, padding: 8, callbacks: { label: (ctx) => ` $${Number(ctx.raw).toLocaleString()}` } } } }}
                />
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Net In-Pocket</span>
                <span className={`text-3xl font-black italic leading-none transition-colors ${netDisposable < 0 ? 'text-red-500' : 'text-green-400'}`}>
                  ${netDisposable.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
                <span className="text-[9px] text-slate-400 mt-1 block leading-tight">{netDisposable < 0 ? 'Deficit Warning' : 'Guilt-free spending cash.'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Graph & Milestones */}
        <div className="xl:col-span-8 flex flex-col gap-6">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`group relative bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-lg transition-all duration-300 ${theme.hoverBorder} ${theme.glow}`}>
              <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest block mb-1">Age 22 (Contract End)</span>
              <span className="text-3xl font-black text-white italic transition-all">${(m22 / 1000).toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}k</span>
              <p className="text-[10px] text-slate-500 mt-1 border-b border-dashed border-slate-600 inline-block">The Upfront Safety Net</p>
              <div className="absolute hidden group-hover:block top-full mt-2 left-0 w-64 bg-slate-900/95 backdrop-blur-md border border-slate-600 p-4 rounded-xl shadow-2xl z-50">
                <p className="text-xs text-slate-300 font-mono leading-relaxed">Math: Principal + (${totalInvested.toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo × 48 months) compounding annually at {expectedROI}% ROI.</p>
              </div>
            </div>

            <div className={`group relative bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-lg transition-all duration-300 ${theme.hoverBorder} ${theme.glow}`}>
              <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest block mb-1">Age 40 (Mid-Life)</span>
              <span className="text-3xl font-black text-white italic transition-all">${(m40 / 1000).toLocaleString(undefined, { maximumFractionDigits: 0 })}k</span>
              <p className="text-[10px] text-slate-500 mt-1 border-b border-dashed border-slate-600 inline-block">Compound Growth</p>
              <div className="absolute hidden group-hover:block top-full mt-2 left-0 md:-left-12 w-64 bg-slate-900/95 backdrop-blur-md border border-slate-600 p-4 rounded-xl shadow-2xl z-50">
                <p className="text-xs text-slate-300 font-mono leading-relaxed">Math: Your Age 22 balance left alone in the market to compound at {expectedROI}% for 18 years {maxIRAPostMil ? '+ continuing to add $7,000/yr.' : 'with ZERO additional contributions.'}</p>
              </div>
            </div>

            <div className={`group relative bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-lg transition-all duration-300 ${theme.hoverBorder} ${theme.glow}`}>
              <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest block mb-1">Age 60 (Retirement)</span>
              <span className={`text-3xl font-black text-white italic transition-all drop-shadow-[0_0_8px_${theme.hex}80]`}>${(m60 / 1000000).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}M</span>
              <p className="text-[10px] text-slate-500 mt-1 border-b border-dashed border-slate-600 inline-block">Long-Term Legacy</p>
              <div className="absolute hidden group-hover:block top-full mt-2 right-0 w-64 bg-slate-900/95 backdrop-blur-md border border-slate-600 p-4 rounded-xl shadow-2xl z-50">
                <p className="text-xs text-slate-300 font-mono leading-relaxed">Math: Your Age 40 balance compounding at {expectedROI}% for another 20 years {maxIRAPostMil ? '+ $7k/yr IRA.' : 'with ZERO additional contributions.'} Time is the multiplier.</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/40 p-6 rounded-3xl border border-slate-800 shadow-2xl h-full min-h-[500px] flex flex-col relative">
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">Wealth Trajectory</h3>
              
              <div className="relative group z-50">
                <button className={`flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-400 hover:text-white transition-colors bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-700 hover:${theme.border}`}>
                  <AlertCircle size={14} /> The 18-22 Window
                </button>
                <div className="absolute hidden group-hover:block top-full mt-2 right-0 w-80 sm:w-96 bg-slate-900/95 backdrop-blur-md border border-slate-600 p-5 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] text-left">
                  <h4 className="text-[10px] font-black text-orange-400 uppercase tracking-widest mb-2">The Missed Window</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-mono mb-4">
                    Ages 18 to 22 are mathematically the most powerful years of your life for compound interest. However, most young adults do not have access to a 401(k), nor the disposable income to max out an IRA due to the high overhead of civilian life. The <span className="text-orange-400 font-bold">Orange Line</span> shows the reality of missing this window. By starting at 22 instead of 18, you lose out on <strong>${(opportunityCost / 1000000).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MILLION</strong> at retirement, despite putting in the exact same effort later.
                  </p>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">The Median Route</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-mono">
                    The <span className="text-slate-400 font-bold">Grey Line</span> represents the median American who spends their 20s paying off student loans or battling high living costs, hitting a $0 net worth at 28 before finally starting to invest.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-grow w-full relative min-h-[400px]">
              <Line 
                data={{
                  labels: chartData.labels,
                  datasets: [
                    { label: 'The Upfront Strategy (Starts at 18)', data: chartData.milPoints, borderColor: theme.hex, tension: 0.4, pointRadius: 0, fill: true, backgroundColor: `${theme.hex}15`, borderWidth: 3 },
                    { label: 'The Missed Window (Starts at 22)', data: chartData.missedPoints, borderColor: '#f59e0b', borderDash: [6, 6], tension: 0.4, pointRadius: 0, borderWidth: 2 },
                    { label: 'The Median Route (Starts at 28)', data: chartData.civPoints, borderColor: '#475569', borderDash: [2, 4], tension: 0.4, pointRadius: 0, borderWidth: 2 }
                  ]
                }}
                options={{ 
                  responsive: true, maintainAspectRatio: false, interaction: { mode: 'index', intersect: false },
                  plugins: { 
                    legend: { position: 'top', labels: { color: '#e2e8f0', font: { family: 'monospace', weight: 'bold' } } },
                    tooltip: {
                      callbacks: {
                        label: (ctx) => ` $${Number(ctx.raw).toLocaleString()}`,
                        afterBody: (context) => {
                          if (context[0].datasetIndex === 1) {
                            return "\nContext: Most 18-to-22-year-olds lack access to a 401(k) or the disposable income to invest.\nThis shows the profound mathematical cost of missing those 4 years.";
                          }
                          if (context[0].datasetIndex === 2) {
                            return "\nContext: The median American spends their 20s paying off debt or managing civilian overhead.\nWe assume they reach $0 net worth at 28, then begin saving.";
                          }
                          return "";
                        }
                      }
                    }
                  },
                  scales: { y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#64748b', font: { size: 14, weight: 'bold' }, callback: v => '$' + (Number(v)/1000000).toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1}) + 'M' } }, x: { grid: { display: false }, ticks: { color: '#64748b', maxTicksLimit: 12 } } } 
                }}
              />
            </div>
          </div>

        </div>
      </div>

      {/* 3. TAX BRACKETS & TSP COSTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8">
        
        <div className={`bg-slate-900 border border-slate-800 p-8 rounded-3xl relative overflow-hidden group shadow-xl transition-all duration-300 ${theme.hoverBorder}`}>
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity"><Percent size={120} /></div>
          <h3 className="text-2xl font-black text-white italic tracking-tighter mb-4 relative z-10">The Tax Bracket Advantage</h3>
          <p className="text-sm text-slate-400 leading-relaxed mb-6 relative z-10">
            One of the greatest hidden benefits of military compensation is that allowances (Housing and Food) are 100% tax-free. Only your Basic Pay is taxed. This artificially lowers your taxable income, placing you in the lowest possible tax brackets.
          </p>
          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 relative z-10 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Estimated Annual Basic Pay:</span>
              <span className="text-white font-mono font-bold">${current.basic.toLocaleString()}</span>
            </div>
            
            <InfoRow 
              theme={theme}
              label="IRS Standard Deduction (Single Filer)" 
              value={16100} 
              isDeduction={true} 
              tooltip="Every taxpayer subtracts this base amount from their income before taxes are calculated. Because your military allowances are already tax-free, this drops your taxable income to rock-bottom levels."
              receipts="2026 Estimated IRS Standard Deduction for single filers ($16,100). Subtracting this from your basic pay leaves your true 'taxable' income."
            />
            
            <div className="flex justify-between text-base pt-2">
              <span className={`font-bold transition-colors ${theme.text.split(' ')[0]}`}>Taxable Income (Subject to IRS):</span>
              <span className="text-white font-mono font-black">${Math.max(0, current.basic - 16100).toLocaleString()}</span>
            </div>
            <p className="text-xs text-slate-400 italic pt-3 border-t border-slate-700/50 mt-2">
              *You fall firmly into the lowest possible Federal Tax Bracket (10%). Investing in a <strong>Roth TSP or Roth IRA</strong> right now means locking in lifetime tax-free growth at the cheapest tax rate you will ever see.
            </p>
          </div>
        </div>

        <div className={`bg-slate-900 border border-slate-800 p-8 rounded-3xl relative overflow-hidden group shadow-xl transition-all duration-300 ${theme.hoverBorder}`}>
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity"><Landmark size={120} /></div>
          <h3 className="text-2xl font-black text-white italic tracking-tighter mb-4 relative z-10">The TSP Edge: Expense Ratios</h3>
          <p className="text-sm text-slate-400 leading-relaxed mb-6 relative z-10">
            The Thrift Savings Plan (TSP) offers some of the lowest administrative costs (Expense Ratios) in the world. While a civilian mutual fund might charge 0.50% to manage your money, the TSP historically charges roughly 0.05%. Over 40 years, keeping fees low saves you tens of thousands of dollars.
          </p>
          <div className="overflow-x-auto relative z-10 bg-slate-800/50 rounded-xl border border-slate-700 p-2">
            <table className="w-full text-left text-xs">
              <thead className="text-[10px] text-slate-500 uppercase tracking-widest border-b border-slate-800">
                <tr>
                  <th className="pb-2 px-2">Fund</th>
                  <th className="pb-2">Asset Type</th>
                  <th className="pb-2 text-right">Avg Return</th>
                  <th className="pb-2 text-right px-2">Cost (ER)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 text-slate-300 font-mono">
                {TSP_FUNDS.map((f) => (
                  <tr key={f.fund} className="hover:bg-slate-700/30 transition-colors">
                    <td className="py-3 px-2 font-bold text-white">{f.fund}</td>
                    <td className="py-3 font-sans text-slate-400">{f.desc}</td>
                    <td className="py-3 text-right text-green-400">{f.return}</td>
                    <td className={`py-3 text-right px-2 transition-colors ${theme.text.split(' ')[0]}`}>{f.er}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[9px] text-slate-500 mt-4 text-center uppercase tracking-widest relative z-10">Data is historical approximation. Past performance does not guarantee future results.</p>
        </div>
      </div>

    </div>
  );
}