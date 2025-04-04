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
import TwoColumnTextWithTags from "./components/TwoColumnTextWithTags";
import IrregularImagesAndHeader from "./components/IrregularImagesAndHeader";
import HighlightedPerson from "./components/HighlightedPerson";
import PeopleShowcase from "./components/PeopleShowcase";
import ImagesMarquee from "./components/ImagesMarquee";
import TextBlockCtaAndImage from "./components/TextBlockCtaAndImage";
import ContactForm from "./components/ContactForm";
import FeaturedProjects from "./components/FeaturedProjects";

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
    TwoColumnTextWithTags,
    IrregularImagesAndHeader,
    HighlightedPerson,
    PeopleShowcase,
    ImagesMarquee,
    TextBlockCtaAndImage,
    ContactForm,
    FeaturedProjects,
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
