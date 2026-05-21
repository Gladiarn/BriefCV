import type { ResumeData } from "@/types/resume";

export const ModernTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  return (
    <div className="h-full text-black flex flex-col space-y-8 text-left font-sans">
      <div className="border-b-2 border-black pb-4 text-center">
        {data.image && (
          <div className="flex justify-center mb-4">
            <img
              src={data.image}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-black p-1 shadow-lg shadow-black/10"
            />
          </div>
        )}
        <h1 className="text-4xl font-black uppercase tracking-tight">
          {data.name || "Your Name"}
        </h1>
        <p className="text-xl font-bold text-gray-700">
          {data.role || "Target Role"}
        </p>
        <div className="flex justify-center gap-4 text-[10px] font-bold text-gray-500 mt-2 uppercase tracking-widest">
          <span>{data.email}</span>
          {data.phone && <span>• {data.phone}</span>}
          {data.location && <span>• {data.location}</span>}
        </div>
      </div>

      {data.summary && (
        <section className="space-y-2">
          <h3 className="text-sm font-black uppercase tracking-widest border-b border-gray-200 pb-1">
            Summary
          </h3>
          <p className="text-[11px] text-gray-700 leading-relaxed text-justify">
            {data.summary}
          </p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section className="space-y-4">
          <h3 className="text-sm font-black uppercase tracking-widest border-b border-gray-200 pb-1">
            Experience
          </h3>
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <h4 className="font-bold text-sm uppercase tracking-tight">
                    {exp.company}
                  </h4>
                  <span className="text-[10px] font-black">{exp.period}</span>
                </div>
                <p className="text-xs font-bold text-gray-600 mb-2 italic">
                  {exp.title}
                </p>
                <ul className="text-[10px] space-y-1.5 list-none text-gray-700">
                  {exp.points.split("\n").map((point, i) => (
                    <li key={i} className="relative pl-4">
                      <span className="absolute left-0 top-1.5 w-1.5 h-1.5 bg-black rounded-full" />
                      {point.startsWith("•")
                        ? point.substring(1).trim()
                        : point.trim()}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-2 gap-8 pt-4">
        <section className="space-y-4">
          <h3 className="text-sm font-black uppercase tracking-widest border-b border-gray-200 pb-1">
            Education
          </h3>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <h4 className="font-bold text-[11px] uppercase tracking-tight">
                  {edu.school}
                </h4>
                <p className="text-[10px] font-medium text-gray-600">
                  {edu.degree}
                </p>
                <span className="text-[10px] font-black">{edu.year}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-sm font-black uppercase tracking-widest border-b border-gray-200 pb-1">
            Skills
          </h3>
          <div className="flex flex-wrap gap-x-3 gap-y-2">
            {data.skills.map((skill, idx) => (
              <span
                key={idx}
                className="text-[10px] font-bold uppercase tracking-widest bg-gray-100 px-2 py-0.5 rounded"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
