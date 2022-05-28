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
      <div className={className}>
        <Imgur
          url={url}
          alt={alt}
          style={{ ...{ marginRight: VERTICAL_MARGIN.HALF }, ...style }}
        />
        <p>{children}</p>
      </div>
      <style jsx>
        {`
          div {
            display: flex;
            flex-direction: row;
            margin-bottom: ${VERTICAL_MARGIN.DEFAULT}px;

            align-items: center;
          }
          p {
            ${FONT_STYLE.BODY4}
          }
        `}
      </style>
    </>
  );
}
