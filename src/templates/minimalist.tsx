import type { ResumeData } from "@/types/resume";

export const MinimalistTemplate: React.FC<{ data: ResumeData }> = ({
  data,
}) => {
  return (
    <div className="h-full text-black flex flex-col space-y-6 text-left font-serif">
      <div className="flex justify-between items-end border-b border-black pb-6">
        <div>
          <h1 className="text-5xl font-light tracking-tighter">
            {data.name || "Your Name"}
          </h1>
          <p className="text-lg text-gray-500 mt-1 uppercase tracking-widest">
            {data.role || "Target Role"}
          </p>
        </div>
        <div className="text-right text-[10px] space-y-1 text-gray-600">
          <p>{data.email}</p>
          <p>{data.phone}</p>
          <p>{data.location}</p>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_2.5fr] gap-12">
        <aside className="space-y-8">
          <section>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4">
              Core Focus
            </h3>
            <div className="flex flex-col gap-2">
              {data.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="text-[10px] text-gray-700 border-l border-black pl-3"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4">
              Academic
            </h3>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id} className="space-y-1">
                  <p className="text-[10px] font-bold">{edu.degree}</p>
                  <p className="text-[9px] text-gray-500">{edu.school}</p>
                  <p className="text-[9px] italic">{edu.year}</p>
                </div>
              ))}
            </div>
          </section>
        </aside>

        <main className="space-y-8">
          <section>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4">
              Trajectory
            </h3>
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id} className="space-y-2">
                  <div className="flex justify-between">
                    <h4 className="text-sm font-bold">{exp.title}</h4>
                    <span className="text-[10px] italic text-gray-500">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-[11px] font-medium text-gray-800">
                    {exp.company}
                  </p>
                  <ul className="text-[10px] space-y-1 text-gray-600 list-disc ml-4">
                    {exp.points.split("\n").map((point, i) => (
                      <li key={i}>
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
        </main>
      </div>
    </div>
  );
};
