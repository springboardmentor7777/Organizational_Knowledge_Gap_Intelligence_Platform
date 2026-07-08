import React from 'react';

const Workflow = () => {
  const steps = [
    {
      number: "01",
      title: "Assess & Inventory",
      description: "Gather self-reported skills and 360-degree peer assessments to build a baseline profile."
    },
    {
      number: "02",
      title: "Analyze & Detect",
      description: "The AI engine detects discrepancies between current workforce skills and strategic role requirements."
    },
    {
      number: "03",
      title: "Upskill & Connect",
      description: "Automatically recommend curated external courses or connect employees with internal mentors."
    },
    {
      number: "04",
      title: "Track Progress",
      description: "Monitor learning velocity, certification renewals, and calculate the ROI of training initiatives."
    }
  ];

  return (
    <section className="relative z-10 w-full py-24 bg-slate-50/50 dark:bg-black/40 border-b border-slate-200 dark:border-white/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-4 transition-colors duration-300">
              A continuous intelligence loop
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg transition-colors duration-300">
              OKGIP is designed around a seamless workflow to perpetually identify weaknesses and build organizational strength.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connection line between steps (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-[60%] w-full h-[1px] bg-slate-200 dark:bg-white/10 group-hover:bg-cyan-500/50 dark:group-hover:bg-[#d9f95d]/30 transition-colors duration-500"></div>
              )}
              
              <div className="relative z-10 w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-white/10 flex items-center justify-center font-mono text-cyan-600 dark:text-[#d9f95d] font-bold mb-6 group-hover:border-cyan-500/50 dark:group-hover:border-[#d9f95d]/50 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] dark:group-hover:shadow-[0_0_15px_rgba(217,249,93,0.3)] transition-all duration-300">
                {step.number}
              </div>
              
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3 transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed transition-colors duration-300">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Workflow;


