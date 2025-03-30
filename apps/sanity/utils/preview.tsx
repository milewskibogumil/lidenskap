import { Iframe, type IframeProps } from "sanity-plugin-iframe-pane";

const PREVIEW_DEPLOYMENT_DOMAIN: string = import.meta.env.SANITY_STUDIO_PREVIEW_DOMAIN;

export const Preview = ({ document }: { document: IframeProps['document'] }) => {
  const slug = (document.displayed.slug as { current?: string })?.current;
  if (!slug) return <div style={{ padding: '1rem' }}>🛑 Preview not available: The slug is missing</div>;
  return <Iframe
    document={document}
    options={{
      url: `${PREVIEW_DEPLOYMENT_DOMAIN}${slug}`,
      reload: { button: true }
    }} />
}
