import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { ResumeData } from "@/types/resume";

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

export const ModernPDFTemplate = ({ data }: { data: ResumeData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.role}>{data.role}</Text>
        <View style={styles.contact}>
          <Text>
            {data.email} • {data.phone} • {data.location}
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Summary</Text>
      <Text style={styles.text}>{data.summary}</Text>

      <Text style={styles.sectionTitle}>Experience</Text>
      {data.experience.map((exp) => (
        <View key={exp.id} style={styles.expItem}>
          <View style={styles.expHeader}>
            <Text style={styles.company}>{exp.company}</Text>
            <Text style={styles.period}>{exp.period}</Text>
          </View>
          <Text style={styles.title}>{exp.title}</Text>
          {exp.points.split("\n").map((point, i) => (
            <Text key={`${exp.id}-point-${i}`} style={styles.text}>
              • {point.replace("•", "").trim()}
            </Text>
          ))}
        </View>
      ))}

      <Text style={styles.sectionTitle}>Education</Text>
      {data.education.map((edu) => (
        <View key={edu.id} style={styles.text}>
          <Text style={{ fontWeight: "bold" }}>{edu.school}</Text>
          <Text>
            {edu.degree} ({edu.year})
          </Text>
        </View>
      ))}
    </Page>
  </Document>
);
