import MoreInFourEngine from '@/components/MoreInFourEngine';
import ScholarshipEngine from '@/components/ScholarshipValuator';
import ServiceAndSkills from '@/components/ServiceAndSkills';
import CareerTimelineTracker from '@/components/CareerTimelineTracker';
export default function Home() {
  return (
    <main className="bg-[#0b0f19] min-h-screen text-slate-200 selection:bg-blue-500 selection:text-white">
      
      {/* Sleek, no-nonsense navigation */}
      <nav className="p-6 border-b border-slate-800/50 flex justify-between items-center bg-[#0b0f19]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-black text-white">4</div>
          <span className="font-black tracking-tighter italic text-xl text-white">MoreInFour</span>
        </div>
        <div className="flex gap-4 text-[10px] font-mono uppercase tracking-widest text-slate-500">
          <span className="hover:text-white cursor-pointer transition-colors">SERVICE</span>
          <span className="hidden md:inline">/</span>
          <span className="hover:text-white cursor-pointer transition-colors">SCHOLARSHIP</span>
          <span className="hidden md:inline">/</span>
          <span className="hover:text-white cursor-pointer transition-colors">SAVINGS</span>
          <span className="hidden md:inline">/</span>
          <span className="hover:text-white cursor-pointer transition-colors">SKILLS</span>
        </div>
      </nav>

      {/* Main Content Sections */}
      <div className="space-y-24 py-12 px-4 md:px-8">
        
        {/* The Primary Financial Engine */}
        <section id="wealth-engine">
          <MoreInFourEngine />
        </section>

        <hr className="border-slate-800 max-w-7xl mx-auto" />

        {/* The Education Component */}
        <section id="education">
          <ScholarshipEngine />
        </section>

        <hr className="border-slate-800 max-w-7xl mx-auto" />

        {/* The Qualitative / Skills Component */}
        <section id="skills-service">
          <ServiceAndSkills />
        </section>


        <hr className="border-slate-800 max-w-7xl mx-auto" />

        <section id="career-tracker">
          <CareerTimelineTracker />
        </section>



      </div>

      {/* Footer */}
      <footer className="p-12 border-t border-slate-800 text-center bg-slate-900">
        <p className="text-xs font-mono text-slate-500 uppercase tracking-widest italic max-w-2xl mx-auto">
          "The plans of the diligent lead surely to plenty." — Proverbs 21:5
        </p>
        <p className="text-[10px] text-slate-600 mt-4">Built by an enlisted veteran for the next generation.</p>
      </footer>
    </main>
  );
}