import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type {
  CVDocument,
  EducationSection,
  ExperienceSection,
  HeaderSection,
  SkillsSection,
} from "@/types/cv";
import { resolveDesignTokens } from "./constants";

/**
 * Minimalist PDF Template
 * Mirrors MinimalistRenderer.tsx:
 *  - Serif typography (Times-Roman)
 *  - Left-aligned header, contact stacked vertically
 *  - 2-column: [1fr, 2.5fr] sidebar/main with right border on sidebar
 *  - Subtle section titles with wide letter-spacing
 *  - Role highlighted in primaryColor, paragraphs instead of bullet lists
 */
export const MinimalistPDFTemplate = ({ doc }: { doc: CVDocument }) => {
  const tokens = resolveDesignTokens(doc.settings.design);
  const { columnMapping, layoutStructure } = doc.settings;

  // Minimalist always uses serif regardless of user fontFamily setting
  const fontFamily = "Times-Roman";

  const styles = StyleSheet.create({
    page: {
      padding: tokens.spacing.pageMargin,
      fontFamily,
    },

    // ── Header ──
    headerWrap: {
      paddingBottom: tokens.spacing.headerPadding + 4,
      marginBottom: tokens.spacing.sectionGap,
      borderBottomWidth: 0.5,
      borderBottomColor: "#cccccc",
    },
    name: {
      fontSize: tokens.fontSize.headerName - 4, // slightly smaller, lighter feel
      color: tokens.primaryColor,
      letterSpacing: -0.5,
    },
    jobTitle: {
      fontSize: tokens.fontSize.headerRole - 2,
      fontStyle: "italic",
      color: tokens.colors.muted,
      marginTop: 2,
    },
    contactStack: {
      marginTop: 8,
      gap: 3,
    },
    contactItem: {
      fontSize: tokens.fontSize.small,
      color: tokens.colors.muted,
    },

    // ── Section titles ──
    sectionTitle: {
      fontSize: tokens.fontSize.small,
      fontWeight: "bold",
      textTransform: "uppercase",
      letterSpacing: 3,
      color: tokens.colors.subtleText,
      borderBottomWidth: 0.5,
      borderBottomColor: "#e0e0e0",
      paddingBottom: 3,
      marginBottom: tokens.spacing.itemGap,
      marginTop: tokens.spacing.sectionGap,
    },

    // ── Experience ──
    expItem: {
      marginBottom: tokens.spacing.itemGap + 4,
    },
    expRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "baseline",
      marginBottom: 2,
    },
    expRole: {
      fontSize: tokens.fontSize.normal + 1,
      fontWeight: "bold",
      color: tokens.primaryColor,
    },
    expDate: {
      fontSize: tokens.fontSize.small,
      color: tokens.colors.muted,
    },
    expCompany: {
      fontSize: tokens.fontSize.subheading,
      fontWeight: "bold",
      opacity: 0.8,
      marginBottom: 4,
    },
    expBullet: {
      fontSize: tokens.fontSize.normal,
      lineHeight: 1.6,
      color: tokens.colors.muted,
      marginBottom: 3,
      textAlign: "justify",
    },

    // ── Education ──
    eduItem: {
      marginBottom: tokens.spacing.itemGap,
    },
    eduInstitution: {
      fontSize: tokens.fontSize.subheading,
      fontWeight: "bold",
    },
    eduDegree: {
      fontSize: tokens.fontSize.normal,
      fontStyle: "italic",
      color: tokens.colors.muted,
    },
    eduDate: {
      fontSize: tokens.fontSize.small - 1,
      opacity: 0.6,
    },

    // ── Skills ──
    skillItem: {
      fontSize: tokens.fontSize.normal,
      color: tokens.colors.muted,
      marginBottom: 3,
    },

    // ── Layout ──
    twoCol: {
      flexDirection: "row",
      gap: 30,
    },
    sidebar: {
      width: "28%",
      borderRightWidth: 0.5,
      borderRightColor: "#e0e0e0",
      paddingRight: 20,
    },
    main: {
      flex: 1,
    },
    singleCol: {
      maxWidth: "85%",
    },
  });

  const renderSection = (id: string) => {
    const section = doc.sections[id];
    if (!section || !section.isVisible) return null;

    switch (section.type) {
      case "header": {
        const c = (section as HeaderSection).content;
        return (
          <View key={id} style={styles.headerWrap}>
            <Text style={styles.name}>{c.fullName || "Your Name"}</Text>
            <Text style={styles.jobTitle}>{c.jobTitle || "Target Role"}</Text>
            <View style={styles.contactStack}>
              {c.email ? (
                <Text style={styles.contactItem}>{c.email}</Text>
              ) : null}
              {c.phone ? (
                <Text style={styles.contactItem}>{c.phone}</Text>
              ) : null}
              {c.location ? (
                <Text style={styles.contactItem}>{c.location}</Text>
              ) : null}
            </View>
          </View>
        );
      }

      case "experience": {
        const items = (section as ExperienceSection).content;
        return (
          <View key={id}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {items.map((exp) => (
              <View key={exp.id} style={styles.expItem}>
                <View style={styles.expRow}>
                  <Text style={styles.expRole}>{exp.role}</Text>
                  <Text style={styles.expDate}>
                    {exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate}
                  </Text>
                </View>
                <Text style={styles.expCompany}>{exp.company}</Text>
                {exp.description.map((bullet, i) => (
                  <Text key={`${exp.id}-b-${i}`} style={styles.expBullet}>
                    {bullet.trim()}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        );
      }

      case "education": {
        const items = (section as EducationSection).content;
        return (
          <View key={id}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {items.map((edu) => (
              <View key={edu.id} style={styles.eduItem}>
                <Text style={styles.eduInstitution}>{edu.institution}</Text>
                <Text style={styles.eduDegree}>{edu.degree}</Text>
                <Text style={styles.eduDate}>
                  {edu.startDate} – {edu.endDate}
                </Text>
              </View>
            ))}
          </View>
        );
      }

      case "skills": {
        const items = (section as SkillsSection).content;
        return (
          <View key={id}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {items.map((skill, i) => (
              <Text key={`sk-${i}`} style={styles.skillItem}>
                {skill}
              </Text>
            ))}
          </View>
        );
      }

      default:
        return null;
    }
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {layoutStructure === "1-column" ? (
          <View style={styles.singleCol}>
            {columnMapping.mainColumn.map(renderSection)}
          </View>
        ) : (
          <View style={styles.twoCol}>
            <View style={styles.sidebar}>
              {columnMapping.leftColumn.map(renderSection)}
            </View>
            <View style={styles.main}>
              {columnMapping.rightColumn.map(renderSection)}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};
