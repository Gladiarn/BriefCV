import type { ResumeData } from "@/types/resume";

export const ProfessionalTemplate: React.FC<{ data: ResumeData }> = ({
  data,
}) => {
  return (
    <div className="h-full text-slate-800 flex flex-col space-y-4 p-4 font-sans">
      <div className="text-center">
        <h1 className="text-3xl font-bold">{data.name}</h1>
        <p className="text-sm text-slate-500">{data.role}</p>
        <div className="text-xs text-slate-400 mt-1">
          {data.email} | {data.phone} | {data.location}
        </div>
      </div>

      <section>
        <h2 className="text-sm font-semibold text-blue-800 uppercase tracking-wider border-b pb-1 mb-2">
          Experience
        </h2>
        {data.experience.map((exp) => (
          <div key={exp.id} className="mb-3">
            <div className="font-semibold text-sm">
              {exp.title} at {exp.company}
            </div>
            <div className="text-xs text-slate-500 mb-1">{exp.period}</div>
            <ul className="text-xs space-y-0.5 ml-4">
              {exp.points.split("\n").map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-sm font-semibold text-blue-800 uppercase tracking-wider border-b pb-1 mb-2">
          Education
        </h2>
        {data.education.map((edu) => (
          <div key={edu.id} className="text-xs mb-1">
            <span className="font-semibold">{edu.school}</span> - {edu.degree} (
            {edu.year})
          </div>
        ))}
      </section>
    </div>
  );
};
