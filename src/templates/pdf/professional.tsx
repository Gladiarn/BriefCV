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
 * Professional PDF Template
 * Mirrors ProfessionalRenderer.tsx:
 *  - Classic, highly-readable layout (Helvetica)
 *  - Left-aligned header with vertical gap, contact items listed in horizontal flex wrap
 *  - Subtle section titles with grey border-bottom
 *  - Experience items with role highlighted in primaryColor
 *  - Standard rounded disc-like bullet points
 *  - Swapped sidebar columns: main (rightColumn) is on the left, sidebar (leftColumn) is on the right
 */
export const ProfessionalPDFTemplate = ({ doc }: { doc: CVDocument }) => {
  const tokens = resolveDesignTokens(doc.settings.design);
  const { columnMapping, layoutStructure } = doc.settings;

  const styles = StyleSheet.create({
    page: {
      padding: tokens.spacing.pageMargin,
      fontFamily: tokens.fontFamily,
    },

    // ── Header ──
    headerWrap: {
      paddingBottom: tokens.spacing.headerPadding + 6,
      marginBottom: tokens.spacing.sectionGap + 2,
      borderBottomWidth: 1.5,
      borderBottomColor: "#e5e7eb",
    },
    name: {
      fontSize: tokens.fontSize.headerName - 4,
      fontWeight: "bold",
      color: "#111827",
      letterSpacing: -0.5,
    },
    jobTitle: {
      fontSize: tokens.fontSize.headerRole - 1,
      fontWeight: "medium",
      color: tokens.primaryColor,
      marginTop: 2,
    },
    contactRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: 8,
      gap: 12,
    },
    contactItem: {
      fontSize: tokens.fontSize.small,
      color: "#6b7280",
    },

    // ── Section Title ──
    sectionWrap: {
      marginBottom: tokens.spacing.sectionGap + 2,
    },
    sectionTitle: {
      fontSize: tokens.fontSize.normal + 1,
      fontWeight: "bold",
      textTransform: "uppercase",
      letterSpacing: 1.2,
      color: "#111827",
      borderBottomWidth: 1.5,
      borderBottomColor: "#f3f4f6",
      paddingBottom: 3,
      marginBottom: tokens.spacing.itemGap,
    },

    // ── Experience ──
    expItem: {
      marginBottom: tokens.spacing.itemGap + 2,
    },
    expHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "baseline",
      marginBottom: 2,
    },
    expCompany: {
      fontSize: tokens.fontSize.normal,
      fontWeight: "bold",
      color: "#111827",
    },
    expDate: {
      fontSize: tokens.fontSize.small - 0.5,
      color: "#6b7280",
      fontWeight: "medium",
    },
    expRole: {
      fontSize: tokens.fontSize.small + 0.5,
      fontWeight: "bold",
      textTransform: "uppercase",
      letterSpacing: 0.5,
      color: tokens.primaryColor,
      marginBottom: 4,
    },
    bulletRow: {
      flexDirection: "row",
      marginBottom: 3,
      paddingLeft: 8,
    },
    bulletDot: {
      width: 3.5,
      height: 3.5,
      borderRadius: 1.75,
      backgroundColor: "#4b5563",
      marginRight: 8,
      marginTop: 5,
    },
    bulletText: {
      fontSize: tokens.fontSize.normal - 0.5,
      lineHeight: 1.4,
      color: "#374151",
      flex: 1,
    },

    // ── Education ──
    eduItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: tokens.spacing.itemGap - 2,
    },
    eduLeft: {
      flex: 1.5,
    },
    eduInstitution: {
      fontSize: tokens.fontSize.normal - 0.5,
      fontWeight: "bold",
      color: "#111827",
    },
    eduDegree: {
      fontSize: tokens.fontSize.normal - 1,
      color: "#4b5563",
      marginTop: 1,
    },
    eduRight: {
      flex: 1,
      alignItems: "flex-end",
    },
    eduDate: {
      fontSize: tokens.fontSize.small - 0.5,
      color: "#6b7280",
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
      backgroundColor: "#f9fafb",
      color: "#374151",
      borderWidth: 0.5,
      borderColor: "#e5e7eb",
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 4,
    },

    // ── Swapped Grid Layout ──
    twoCol: {
      flexDirection: "row",
      gap: 24,
    },
    mainLeft: {
      width: "65%",
    },
    sidebarRight: {
      width: "31%",
    },
  });

  const renderSection = (id: string) => {
    const section = doc.sections[id];
    if (!section || !section.isVisible) return null;

    switch (section.type) {
      case "experience":
        return (
          <View key={id} style={styles.sectionWrap}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {((section as ExperienceSection).content || []).map((exp) => (
              <View key={exp.id} style={styles.expItem}>
                <View style={styles.expHeader}>
                  <Text style={styles.expCompany}>{exp.company}</Text>
                  <Text style={styles.expDate}>
                    {exp.startDate} - {exp.endDate}
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
          <View key={id} style={styles.sectionWrap}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {((section as EducationSection).content || []).map((edu) => (
              <View key={edu.id} style={styles.eduItem}>
                <View style={styles.eduLeft}>
                  <Text style={styles.eduInstitution}>{edu.institution}</Text>
                  <Text style={styles.eduDegree}>{edu.degree}</Text>
                </View>
                <View style={styles.eduRight}>
                  <Text style={styles.eduDate}>
                    {edu.startDate} - {edu.endDate}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        );

      case "skills":
        return (
          <View key={id} style={styles.sectionWrap}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
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
            <Text style={styles.name}>
              {header.content.fullName || "Your Name"}
            </Text>
            <Text style={styles.jobTitle}>
              {header.content.jobTitle || "Target Role"}
            </Text>
            <View style={styles.contactRow}>
              {header.content.email ? (
                <Text style={styles.contactItem}>{header.content.email}</Text>
              ) : null}
              {header.content.phone ? (
                <Text style={styles.contactItem}>• {header.content.phone}</Text>
              ) : null}
              {header.content.location ? (
                <Text style={styles.contactItem}>
                  • {header.content.location}
                </Text>
              ) : null}
            </View>
          </View>
        )}

        {layoutStructure === "1-column" ? (
          <View>{columnMapping.mainColumn.map(renderSection)}</View>
        ) : (
          <View style={styles.twoCol}>
            {/* Note: In ProfessionalRenderer.tsx, in 2-column mode, 
                the rightColumn is on the left side, and the leftColumn is on the right side. */}
            <View style={styles.mainLeft}>
              {columnMapping.rightColumn.map(renderSection)}
            </View>
            <View style={styles.sidebarRight}>
              {columnMapping.leftColumn.map(renderSection)}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};
