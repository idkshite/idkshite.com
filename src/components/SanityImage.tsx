import Image from "next/image";
import { urlFor } from "../sanity/lib/image";

type SanityImageValue = {
  asset?: {
    url?: string;
    metadata?: {
      lqip?: string;
      dimensions?: { width: number; height: number };
    };
  };
  alt?: string;
  caption?: string;
};

// Native Sanity asset rendering: exact-size request via urlFor (CDN auto
// WebP/AVIF), LQIP blur placeholder, and intrinsic aspect ratio from metadata.
export function SanityImage({ value }: { value: SanityImageValue }) {
  if (!value?.asset) return null;

  const dimensions = value.asset.metadata?.dimensions;
  const width = Math.min(dimensions?.width ?? 800, 800);
  const height = dimensions
    ? Math.round((dimensions.height / dimensions.width) * width)
    : Math.round(width / 1.5);
  const lqip = value.asset.metadata?.lqip;

  return (
    <figure className="rich-content flex flex-col items-center">
      <Image
        className="rounded-md"
        src={urlFor(value).width(width).height(height).url()}
        alt={value.alt || ""}
        width={width}
        height={height}
        placeholder={lqip ? "blur" : "empty"}
        blurDataURL={lqip}
        style={{ height: "auto", maxWidth: "100%" }}
      />
      {value.caption && (
        <figcaption className="[&>p]:text-sm text-sm">{value.caption}</figcaption>
      )}
    </figure>
  );
}
