import { PortableText, PortableTextComponents } from "@portabletext/react";
import YouTube from "./rich-content/YouTubeWrapper";
import { CodeSandbox } from "./rich-content/CodeSandbox";
import { Replit } from "./rich-content/Replit";
import { Video } from "./rich-content/Video";
import { MathDisclaimer } from "./MathDisclaimer";
import { SanityImage } from "./SanityImage";

// Maps Portable Text to the SAME React components MDX uses, so both sources
// render identically inside the shared `.content` styles. Standard text blocks,
// lists and marks fall through to @portabletext/react defaults (plain <p>, <h2>,
// <ul>, <strong>…), which the existing post-content.css already styles.
const components: PortableTextComponents = {
  types: {
    image: ({ value }) => <SanityImage value={value} />,
    youtube: ({ value }) => (
      <YouTube
        videoId={value.videoId}
        opts={
          value.start || value.end
            ? { playerVars: { start: value.start, end: value.end } }
            : undefined
        }
      />
    ),
    video: ({ value }) => <Video src={value.src} />,
    codeSandbox: ({ value }) => <CodeSandbox url={value.url} />,
    replit: ({ value }) => <Replit url={value.url} filename={value.filename} />,
    mathDisclaimer: () => <MathDisclaimer />,
    customEmbed: ({ value }) => (
      <iframe
        className="rich-content"
        src={value.url}
        title={value.title || "Embedded content"}
        style={{
          height: `${value.height || 500}px`,
          width: "100%",
          border: 0,
          borderRadius: "4px",
        }}
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      />
    ),
    // Pre-highlighted at build time (see lib/highlight). Reuses syntax.css.
    code: ({ value }) => {
      const lang = value.language || "none";
      return (
        <pre className={`language-${lang} rich-content`}>
          <code
            className={`language-${lang}`}
            dangerouslySetInnerHTML={{
              __html: value.highlighted ?? value.code ?? "",
            }}
          />
        </pre>
      );
    },
  },
  marks: {
    link: ({ children, value }) => {
      const href: string = value?.href || "";
      const isInternal = href.startsWith("/") || href.startsWith("#");
      return (
        <a
          href={href}
          target={isInternal ? undefined : "_blank"}
          rel={isInternal ? undefined : "noopener noreferrer"}
        >
          {children}
        </a>
      );
    },
  },
};

export function PortableBody({ value }: { value: any[] }) {
  return <PortableText value={value} components={components} />;
}
