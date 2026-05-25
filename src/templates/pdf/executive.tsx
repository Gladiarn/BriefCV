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
 * Executive PDF Template
 * Mirrors ExecutiveRenderer.tsx:
 *  - Bold sans typography (Helvetica)
 *  - Thick primary-colored border under name
 *  - Left-bordered section titles (border-l-4 in primaryColor)
 *  - Experience items have bottom-bordered headers with role in uppercase bold
 *  - Custom square/diamond-like bullets
 *  - Sidebar column with a light background fill, padding, border, and rounded corners
 */
export const ExecutivePDFTemplate = ({ doc }: { doc: CVDocument }) => {
  const tokens = resolveDesignTokens(doc.settings.design);
  const { columnMapping, layoutStructure } = doc.settings;

  const styles = StyleSheet.create({
    page: {
      padding: tokens.spacing.pageMargin,
      fontFamily: tokens.fontFamily,
    },

    // ── Header ──
    headerWrap: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
      paddingBottom: tokens.spacing.headerPadding + 6,
      marginBottom: tokens.spacing.sectionGap + 5,
      borderBottomWidth: 4,
      borderBottomColor: tokens.primaryColor,
    },
    headerLeft: {
      flex: 1.5,
    },
    headerRight: {
      flex: 1,
      alignItems: "flex-end",
      fontSize: tokens.fontSize.small,
      fontWeight: "bold",
      color: tokens.colors.muted,
      textTransform: "uppercase",
      letterSpacing: 1.5,
    },
    name: {
      fontSize: tokens.fontSize.headerName - 2,
      fontWeight: "bold",
      textTransform: "uppercase",
      letterSpacing: -1.5,
      color: tokens.primaryColor,
    },
    jobTitle: {
      fontSize: tokens.fontSize.headerRole,
      fontWeight: "bold",
      marginTop: 2,
      opacity: 0.7,
      color: tokens.colors.text,
    },
    contactItem: {
      marginBottom: 3,
      fontSize: tokens.fontSize.small,
    },

    // ── Section Layout & Headers ──
    sectionWrap: {
      marginBottom: tokens.spacing.sectionGap + 4,
    },
    sectionTitleWrap: {
      borderLeftWidth: 3,
      borderLeftColor: tokens.primaryColor,
      paddingLeft: 8,
      marginBottom: tokens.spacing.itemGap + 2,
    },
    sectionTitle: {
      fontSize: tokens.fontSize.sectionTitle - 1,
      fontWeight: "bold",
      textTransform: "uppercase",
      letterSpacing: 1.2,
      color: tokens.colors.text,
    },

    // ── Experience ──
    expItem: {
      marginBottom: tokens.spacing.itemGap + 4,
    },
    expHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "baseline",
      borderBottomWidth: 0.5,
      borderBottomColor: tokens.colors.border,
      paddingBottom: 2,
      marginBottom: 3,
    },
    expCompany: {
      fontSize: tokens.fontSize.subheading,
      fontWeight: "bold",
      textTransform: "uppercase",
      letterSpacing: -0.2,
    },
    expDate: {
      fontSize: tokens.fontSize.small,
      fontWeight: "bold",
      opacity: 0.6,
    },
    expRole: {
      fontSize: tokens.fontSize.normal,
      fontWeight: "bold",
      textTransform: "uppercase",
      letterSpacing: 0.5,
      marginBottom: 5,
      color: tokens.colors.muted,
    },
    bulletRow: {
      flexDirection: "row",
      marginBottom: 3,
      paddingLeft: 6,
    },
    bulletSquare: {
      width: 4,
      height: 4,
      backgroundColor: tokens.primaryColor,
      marginRight: 8,
      marginTop: 5,
    },
    bulletText: {
      fontSize: tokens.fontSize.normal - 0.5,
      lineHeight: 1.4,
      flex: 1,
    },

    // ── Education ──
    eduGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 12,
    },
    eduItem: {
      width: "48%",
      marginBottom: 6,
    },
    eduInstitution: {
      fontSize: tokens.fontSize.normal,
      fontWeight: "bold",
      textTransform: "uppercase",
    },
    eduDegree: {
      fontSize: tokens.fontSize.small,
      color: tokens.colors.muted,
      marginTop: 1,
    },
    eduDate: {
      fontSize: tokens.fontSize.small - 1,
      fontWeight: "bold",
      opacity: 0.5,
      textTransform: "uppercase",
      marginTop: 1,
    },

    // ── Skills ──
    skillsWrap: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 6,
    },
    skillTag: {
      fontSize: tokens.fontSize.small - 0.5,
      fontWeight: "bold",
      textTransform: "uppercase",
      letterSpacing: 1.2,
      backgroundColor: "#eeeef0",
      color: "#333333",
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 2,
    },

    // ── Grid Layouts ──
    twoCol: {
      flexDirection: "row",
      gap: 20,
    },
    sidebar: {
      width: "35%",
      backgroundColor: "#f7f7f9",
      borderWidth: 0.5,
      borderColor: "#e4e4e7",
      borderRadius: 8,
      padding: 12,
    },
    main: {
      flex: 1,
    },
  });

  const renderSection = (id: string) => {
    const section = doc.sections[id];
    if (!section || !section.isVisible) return null;

    switch (section.type) {
      case "experience":
        return (
          <View key={id} style={styles.sectionWrap}>
            <View style={styles.sectionTitleWrap}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>
            {((section as ExperienceSection).content || []).map((exp) => (
              <View key={exp.id} style={styles.expItem}>
                <View style={styles.expHeader}>
                  <Text style={styles.expCompany}>{exp.company}</Text>
                  <Text style={styles.expDate}>
                    {exp.startDate} — {exp.endDate}
                  </Text>
                </View>
                <Text style={styles.expRole}>{exp.role}</Text>
                {exp.description.map((point, i) => (
                  <View key={`${exp.id}-p-${i}`} style={styles.bulletRow}>
                    <View style={styles.bulletSquare} />
                    <Text style={styles.bulletText}>{point.trim()}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        );

      case "education":
        return (
          <View key={id} style={styles.sectionWrap}>
            <View style={styles.sectionTitleWrap}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>
            <View style={styles.eduGrid}>
              {((section as EducationSection).content || []).map((edu) => (
                <View key={edu.id} style={styles.eduItem}>
                  <Text style={styles.eduInstitution}>{edu.institution}</Text>
                  <Text style={styles.eduDegree}>{edu.degree}</Text>
                  <Text style={styles.eduDate}>
                    {edu.startDate} - {edu.endDate}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        );

      case "skills":
        return (
          <View key={id} style={styles.sectionWrap}>
            <View style={styles.sectionTitleWrap}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>
            <View style={styles.skillsWrap}>
              {((section as SkillsSection).content || []).map((skill, i) => (
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
          <View style={styles.headerWrap}>
            <View style={styles.headerLeft}>
              <Text style={styles.name}>
                {header.content.fullName || "Your Name"}
              </Text>
              <Text style={styles.jobTitle}>
                {header.content.jobTitle || "Target Role"}
              </Text>
            </View>
            <View style={styles.headerRight}>
              {header.content.email ? (
                <Text style={styles.contactItem}>{header.content.email}</Text>
              ) : null}
              {header.content.phone ? (
                <Text style={styles.contactItem}>{header.content.phone}</Text>
              ) : null}
              {header.content.location ? (
                <Text style={styles.contactItem}>
                  {header.content.location}
                </Text>
              ) : null}
            </View>
          </View>
        )}

        {layoutStructure === "1-column" ? (
          <View>{columnMapping.mainColumn.map(renderSection)}</View>
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
