import { defineType } from "sanity";
import SimpleCtaSection from "./components/SimpleCtaSection";
import SplitContentImageGrid from "./components/SplitContentImageGrid";
import SimpleHeadingFullImage from "./components/SimpleHeadingFullImage";
import FeatureAccordionSection from "./components/FeatureAccordionSection";
import CtaSectionWithShapedImage from "./components/CtaSectionWithShapedImage";
import ServicesOverview from "./components/ServicesOverview";
import MetricsSection from "./components/MetricsSection";

export default defineType({
  name: 'components',
  type: 'array',
  title: 'Components',
  of: [
    SimpleCtaSection,
    SplitContentImageGrid,
    SimpleHeadingFullImage,
    FeatureAccordionSection,
    CtaSectionWithShapedImage,
    ServicesOverview,
    MetricsSection,
  ],
  options: {
    insertMenu: {
      filter: true,
      showIcons: true,
      views: [
        { name: 'grid', previewImageUrl: (schemaTypeName) => `/static/${schemaTypeName}.webp` },
        { name: 'list' },
      ]
    }
  }
});
