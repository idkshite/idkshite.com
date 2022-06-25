import { Imgur } from "./Image";
import { FONT_STYLE, VERTICAL_MARGIN } from "../../../public/styles/font";

export function ImgWithText({
  className,
  url,
  alt,
  style,
  children,
}: {
  className?: string;
  url: string;
  alt: string;
  style: object;
  children: string;
}) {
  // @ts-ignore
  return (
    <>
      <div
        className={`rich-content flex flex-col mb-4 items-center ${className}`}
      >
        <Imgur
          className="mb-2"
          url={url}
          alt={alt}
          style={{ ...style }}
          isWrappedInRichContentClass={true}
        />
        <p className="!text-sm">{children}</p>
      </div>
    </>
  );
}
