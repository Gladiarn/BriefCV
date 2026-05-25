import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type {
  CVDocument,
  EducationSection,
  ExperienceSection,
  HeaderSection,
  SkillsSection,
} from "@/types/cv";
import { resolveDesignTokens } from "./constants";

export const ModernPDFTemplate = ({ doc }: { doc: CVDocument }) => {
  const tokens = resolveDesignTokens(doc.settings.design);
  const { columnMapping, layoutStructure } = doc.settings;

  const styles = StyleSheet.create({
    page: {
      padding: tokens.spacing.pageMargin,
      fontFamily: tokens.fontFamily,
    },
    header: {
      borderBottomWidth: 2,
      borderBottomColor: tokens.primaryColor,
      paddingBottom: tokens.spacing.headerPadding,
      marginBottom: tokens.spacing.sectionGap,
      alignItems: "center",
    },
    name: {
      fontSize: tokens.fontSize.headerName,
      fontWeight: "bold",
      textTransform: "uppercase",
      letterSpacing: -1,
      textAlign: "center",
      color: tokens.primaryColor,
    },
    role: {
      fontSize: tokens.fontSize.headerRole,
      textAlign: "center",
      marginTop: 5,
      fontWeight: "bold",
      color: tokens.colors.muted,
    },
    contact: {
      flexDirection: "row",
      justifyContent: "center",
      fontSize: tokens.fontSize.small,
      marginTop: 5,
      color: tokens.colors.muted,
      letterSpacing: 1,
      textTransform: "uppercase",
    },
    sectionTitle: {
      fontSize: tokens.fontSize.sectionTitle,
      fontWeight: "bold",
      textTransform: "uppercase",
      letterSpacing: 2,
      borderBottomWidth: 1,
      borderBottomColor: tokens.colors.lightBorder,
      paddingBottom: 4,
      marginBottom: tokens.spacing.itemGap,
      marginTop: tokens.spacing.sectionGap,
      color: tokens.primaryColor,
    },
    text: {
      fontSize: tokens.fontSize.normal,
      lineHeight: 1.5,
      marginBottom: 3,
    },
    expItem: { marginBottom: tokens.spacing.itemGap },
    expHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 2,
    },
    company: {
      fontSize: tokens.fontSize.subheading,
      fontWeight: "bold",
      textTransform: "uppercase",
      letterSpacing: -0.3,
    },
    period: {
      fontSize: tokens.fontSize.small,
      fontWeight: "bold",
      opacity: 0.6,
    },
    expRole: {
      fontSize: tokens.fontSize.normal,
      fontStyle: "italic",
      marginBottom: 4,
      opacity: 0.8,
    },
    bulletRow: {
      flexDirection: "row",
      marginBottom: 3,
      paddingLeft: 4,
    },
    bulletDot: {
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: tokens.primaryColor,
      marginRight: 8,
      marginTop: 4,
    },
    bulletText: {
      fontSize: tokens.fontSize.normal,
      lineHeight: 1.5,
      flex: 1,
    },
    eduItem: {
      marginBottom: 6,
    },
    eduInstitution: {
      fontSize: tokens.fontSize.subheading,
      fontWeight: "bold",
      textTransform: "uppercase",
      letterSpacing: -0.3,
    },
    eduDegree: {
      fontSize: tokens.fontSize.normal,
      color: tokens.colors.muted,
    },
    eduDate: {
      fontSize: tokens.fontSize.small,
      fontWeight: "bold",
      opacity: 0.6,
    },
    skillTag: {
      fontSize: tokens.fontSize.small,
      fontWeight: "bold",
      textTransform: "uppercase",
      letterSpacing: 1.5,
      backgroundColor: "#f4f4f5",
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 3,
    },
    skillsWrap: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 6,
    },
    twoColRow: { flexDirection: "row", gap: tokens.spacing.itemGap },
    col: { flex: 1 },
  });

  const renderSection = (id: string) => {
    const section = doc.sections[id];
    if (!section || !section.isVisible) return null;

    switch (section.type) {
      case "experience":
        return (
          <View key={id} style={{ marginBottom: tokens.spacing.sectionGap }}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {(section as ExperienceSection).content.map((exp) => (
              <View key={exp.id} style={styles.expItem}>
                <View style={styles.expHeader}>
                  <Text style={styles.company}>{exp.company}</Text>
                  <Text style={styles.period}>
                    {exp.startDate} - {exp.isCurrent ? "Present" : exp.endDate}
                  </Text>
                </View>
                <Text style={styles.expRole}>{exp.role}</Text>
                {exp.description.map((point, i) => (
                  <View key={`${exp.id}-p-${i}`} style={styles.bulletRow}>
                    <View style={styles.bulletDot} />
                    <Text style={styles.bulletText}>{point.trim()}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        );

      case "education":
        return (
          <View key={id} style={{ marginBottom: tokens.spacing.sectionGap }}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {(section as EducationSection).content.map((edu) => (
              <View key={edu.id} style={styles.eduItem}>
                <View style={styles.expHeader}>
                  <Text style={styles.eduInstitution}>{edu.institution}</Text>
                  <Text style={styles.eduDate}>
                    {edu.startDate} - {edu.endDate}
                  </Text>
                </View>
                <Text style={styles.eduDegree}>{edu.degree}</Text>
              </View>
            ))}
          </View>
        );

      case "skills":
        return (
          <View key={id} style={{ marginBottom: tokens.spacing.sectionGap }}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.skillsWrap}>
              {(section as SkillsSection).content.map((skill, i) => (
                <Text key={`skill-${i}`} style={styles.skillTag}>
                  {skill}
                </Text>
              ))}
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  const header = Object.values(doc.sections).find((s) => s.type === "header") as
    | HeaderSection
    | undefined;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {header && header.isVisible && (
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

        {layoutStructure === "1-column" ? (
          <View>{columnMapping.mainColumn.map(renderSection)}</View>
        ) : (
          <View style={{ flexDirection: "row", gap: 15 }}>
            <View style={{ flex: 1 }}>
              {columnMapping.leftColumn.map(renderSection)}
            </View>
            {layoutStructure === "3-column" && (
              <View style={{ flex: 1 }}>
                {columnMapping.middleColumn.map(renderSection)}
              </View>
            )}
            <View style={{ flex: 2.5 }}>
              {columnMapping.rightColumn.map(renderSection)}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};
