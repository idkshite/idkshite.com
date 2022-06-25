export function Imgur({
  className,
  url,
  alt,
  style,
  isWrappedInRichContentClass = false,
}: {
  className?: string;
  url: string;
  alt: string;
  style?: object;
  isWrappedInRichContentClass?: boolean;
}) {
  return (
    <img
      className={`${
        isWrappedInRichContentClass ? "" : "rich-content"
      } ${className}`}
      src={`${url}.jpg`}
      alt={alt}
      style={{ ...{ borderRadius: "4px" }, ...style }}
    />
  );
}
