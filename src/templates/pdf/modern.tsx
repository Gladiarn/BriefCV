import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type {
  CVDocument,
  EducationSection,
  ExperienceSection,
  HeaderSection,
  SkillsSection,
} from "@/types/cv";

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: "Helvetica" },
  header: {
    borderBottomWidth: 2,
    borderBottomColor: "#000",
    paddingBottom: 15,
    marginBottom: 20,
  },
  name: {
    fontSize: 32,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
  },
  role: { fontSize: 16, textAlign: "center", marginTop: 5 },
  contact: {
    flexDirection: "row",
    justifyContent: "center",
    fontSize: 10,
    marginTop: 5,
    color: "#666",
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 4,
    marginBottom: 10,
    marginTop: 15,
  },
  text: { fontSize: 10, lineHeight: 1.5, marginBottom: 5 },
  expItem: { marginBottom: 10 },
  expHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  company: { fontSize: 11, fontWeight: "bold" },
  period: { fontSize: 9, fontWeight: "bold" },
  title: { fontSize: 10, fontStyle: "italic", marginBottom: 4 },
});

export const ModernPDFTemplate = ({ doc }: { doc: CVDocument }) => {
  const sections = Object.values(doc.sections).filter((s) => s.isVisible);

  const header = sections.find((s) => s.type === "header") as
    | HeaderSection
    | undefined;
  const experience = sections.find((s) => s.type === "experience") as
    | ExperienceSection
    | undefined;
  const education = sections.find((s) => s.type === "education") as
    | EducationSection
    | undefined;
  const skills = sections.find((s) => s.type === "skills") as
    | SkillsSection
    | undefined;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {header && (
          <View style={styles.header}>
            <Text style={styles.name}>{header.content.fullName}</Text>
            <Text style={styles.role}>{header.content.jobTitle}</Text>
            <View style={styles.contact}>
              <Text>
                {header.content.email} • {header.content.phone} •{" "}
                {header.content.location}
              </Text>
            </View>
          </View>
        )}

        {experience && (
          <>
            <Text style={styles.sectionTitle}>{experience.title}</Text>
            {experience.content.map((exp) => (
              <View key={exp.id} style={styles.expItem}>
                <View style={styles.expHeader}>
                  <Text style={styles.company}>{exp.company}</Text>
                  <Text style={styles.period}>
                    {exp.startDate} - {exp.isCurrent ? "Present" : exp.endDate}
                  </Text>
                </View>
                <Text style={styles.title}>{exp.role}</Text>
                {exp.description.map((point, i) => (
                  <Text key={`${exp.id}-point-${i}`} style={styles.text}>
                    • {point.trim()}
                  </Text>
                ))}
              </View>
            ))}
          </>
        )}

        {education && (
          <>
            <Text style={styles.sectionTitle}>{education.title}</Text>
            {education.content.map((edu) => (
              <View key={edu.id} style={styles.text}>
                <Text style={{ fontWeight: "bold" }}>{edu.institution}</Text>
                <Text>
                  {edu.degree} ({edu.startDate} - {edu.endDate})
                </Text>
              </View>
            ))}
          </>
        )}

        {skills && (
          <>
            <Text style={styles.sectionTitle}>{skills.title}</Text>
            <Text style={styles.text}>{skills.content.join(" • ")}</Text>
          </>
        )}
      </Page>
    </Document>
  );
};
