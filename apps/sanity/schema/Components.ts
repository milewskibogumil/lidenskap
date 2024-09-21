import { defineType } from "sanity";
import SimpleCtaSection from "./components/SimpleCtaSection";
import SplitContentImageGrid from "./components/SplitContentImageGrid";
import SimpleHeadingFullImage from "./components/SimpleHeadingFullImage";

export default defineType({
  name: 'components',
  type: 'array',
  title: 'Components',
  of: [
    SimpleCtaSection,
    SplitContentImageGrid,
    SimpleHeadingFullImage
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
