'use client';
import { Shield, Globe, Lock, Target, TrendingUp, Users } from 'lucide-react';

export default function ServiceAndSkills() {
  return (
    <div className="space-y-16 max-w-7xl mx-auto py-12">
      
      {/* SKILLS: Dynamic Breadth */}
      <div className="space-y-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-4">Accelerated Growth</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            The military places a premium on competence and potential. Young adults are routinely entrusted with responsibilities, equipment, and leadership roles that often take a decade to earn in the traditional corporate sector.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl hover:border-blue-500 transition-all group">
            <Lock className="text-blue-600 mb-6 group-hover:scale-110 transition-transform" size={40} />
            <h3 className="text-lg font-bold text-white uppercase tracking-widest mb-3">Security Clearances</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Obtain Secret or Top Secret (TS/SCI) clearances during your service. These credentials are highly sought after by defense contractors and federal agencies, opening doors to advanced career opportunities the day you separate.
            </p>
          </div>
          
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl hover:border-blue-500 transition-all group">
            <Target className="text-blue-600 mb-6 group-hover:scale-110 transition-transform" size={40} />
            <h3 className="text-lg font-bold text-white uppercase tracking-widest mb-3">Early Leadership</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              While many of your peers are navigating entry-level roles, Non-Commissioned Officers are managing highly technical teams, making critical operational decisions, and leading under pressure.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl hover:border-blue-500 transition-all group">
            <TrendingUp className="text-blue-600 mb-6 group-hover:scale-110 transition-transform" size={40} />
            <h3 className="text-lg font-bold text-white uppercase tracking-widest mb-3">World-Class Training</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              From Cyber Intelligence and Aviation Mechanics to Medical Logistics, you receive hands-on technical training at no cost. This builds a robust resume that commands respect across civilian industries.
            </p>
          </div>
        </div>
      </div>

      <hr className="border-slate-800" />

      {/* SERVICE: The 1% */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter">The Ultimate Crucible</h2>
          <p className="text-base text-slate-400 leading-relaxed">
            Beyond the financial benefits and the technical skills, military service is fundamentally about forging character. It is an extraordinary environment that builds profound resilience, discipline, and a deep sense of shared purpose.
          </p>
          <ul className="space-y-4 pt-4">
            <li className="flex items-start gap-4">
              <div className="bg-slate-800 p-2 rounded text-blue-500"><Shield size={20} /></div>
              <div>
                <strong className="text-white block text-sm uppercase tracking-widest mb-1">A Broader Purpose</strong>
                <span className="text-xs text-slate-400">Contribute directly to the defense and security of the nation. It provides a grounding sense of humility, perspective, and dedication to something larger than oneself.</span>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="bg-slate-800 p-2 rounded text-blue-500"><Globe size={20} /></div>
              <div>
                <strong className="text-white block text-sm uppercase tracking-widest mb-1">Global Perspective</strong>
                <span className="text-xs text-slate-400">Through deployments and overseas stations, you will travel, experience diverse cultures, and operate in dynamic environments, expanding your worldview.</span>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="bg-slate-800 p-2 rounded text-blue-500"><Users size={20} /></div>
              <div>
                <strong className="text-white block text-sm uppercase tracking-widest mb-1">Enduring Brotherhood</strong>
                <span className="text-xs text-slate-400">The shared challenges and triumphs forge bonds that are profoundly unique. You leave the service not just with colleagues, but with a lifelong family.</span>
              </div>
            </li>
          </ul>
        </div>
        
        {/* Visual Callout Box */}
        <div className="bg-gradient-to-br from-blue-900/40 to-slate-900 border border-blue-500/30 p-10 rounded-3xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 text-blue-500/10"><Shield size={300} /></div>
          <div className="relative z-10">
            <h3 className="text-6xl font-black text-white italic tracking-tighter mb-4">{'< 1%'}</h3>
            <p className="text-xl font-bold text-blue-400 uppercase tracking-widest mb-6">The All-Volunteer Force</p>
            <p className="text-sm text-slate-300 leading-relaxed italic border-l-4 border-blue-500 pl-4">
              "To join the military is to step into an arena most will never experience. It is fertile ground. If you endure the discipline required, the character you forge will serve you for the rest of your life."
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}