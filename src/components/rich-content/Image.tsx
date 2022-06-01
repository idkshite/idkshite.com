export function Imgur({
  className,
  url,
  alt,
  style,
}: {
  className?: string;
  url: string;
  alt: string;
  style?: object;
}) {
  return (
    <img
      className={`${className}`}
      src={`${url}.jpg`}
      alt={alt}
      style={{ ...{ borderRadius: "4px" }, ...style }}
    />
  );
}
