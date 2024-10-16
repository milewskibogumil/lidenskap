import { defineType } from "sanity";
import SimpleCtaSection from "./components/SimpleCtaSection";
import SplitContentImageGrid from "./components/SplitContentImageGrid";
import SimpleHeadingFullImage from "./components/SimpleHeadingFullImage";
import FeatureAccordionSection from "./components/FeatureAccordionSection";
import CtaSectionWithShapedImage from "./components/CtaSectionWithShapedImage";
import ServicesOverview from "./components/ServicesOverview";
import MetricsSection from "./components/MetricsSection";
import Faq from "./components/Faq";
import IconGridWithCtaSection from "./components/IconGridWithCtaSection";
import BorderedFullImage from "./components/BorderedFullImage";

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
    Faq,
    IconGridWithCtaSection,
    BorderedFullImage,
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
