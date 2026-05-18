import type { ResumeData } from "@/types/resume";

export const ExecutiveTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  return (
    <div className="h-full text-black flex flex-col space-y-6 text-left font-sans p-2">
      <header className="border-b-4 border-slate-900 pb-4">
        <h1 className="text-4xl font-bold uppercase tracking-widest">{data.name}</h1>
        <div className="flex gap-4 text-xs mt-2 text-slate-600">
          <span>{data.email}</span> • <span>{data.phone}</span> • <span>{data.location}</span>
        </div>
      </header>

      <section>
        <h3 className="text-sm font-bold uppercase border-b border-slate-300 pb-1 mb-3">Professional Profile</h3>
        <p className="text-xs leading-relaxed">{data.summary}</p>
      </section>

      <section>
        <h3 className="text-sm font-bold uppercase border-b border-slate-300 pb-1 mb-3">Professional Experience</h3>
        {data.experience.map((exp) => (
          <div key={exp.id} className="mb-4">
            <div className="flex justify-between font-bold text-sm">
              <span>{exp.company}</span>
              <span>{exp.period}</span>
            </div>
            <div className="italic text-xs mb-1">{exp.title}</div>
            <ul className="text-xs list-disc ml-4 space-y-1">
              {exp.points.split('\n').map((p, i) => <li key={i}>{p}</li>)}
            </ul>
          </div>
        ))}
      </section>

      <section>
        <h3 className="text-sm font-bold uppercase border-b border-slate-300 pb-1 mb-3">Key Competencies</h3>
        <p className="text-xs">{data.skills.join(", ")}</p>
      </section>
    </div>
  );
};
