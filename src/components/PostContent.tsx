import React from "react";
import {
  FONT_SIZE,
  FONT_WEIGHT,
  LINE_HEIGHT,
  VERTICAL_MARGIN,
} from "../../public/styles/font";
import { COLOR } from "../../public/styles/colors";

type Props = {
  children: React.ReactNode;
};
export default function PostContent({ children }: Props) {
  return (
    <React.Fragment>
      <div className="content">{children}</div>

      <style jsx global>{`
        .content {
          font-family: "Jost", sans-serif;
          color: ${COLOR.DEFAULT_TEXT};
          font-weight: 400;
        }

        .content p {
          font-size: ${FONT_SIZE.BODY4}px;
          line-height: ${LINE_HEIGHT.BODY}px;
          margin-bottom: ${VERTICAL_MARGIN.DEFAULT}px;
          font-weight: ${FONT_WEIGHT.REGULAR};
        }

        .content a {
          color: blue;
          text-decoration: underline;
        }

        .content h1 {
          font-size: ${FONT_SIZE.TITLE2}px;
          font-weight: ${FONT_WEIGHT.BOLD};
          margin-bottom: ${VERTICAL_MARGIN.HALF}px;
          line-height: ${LINE_HEIGHT.TITLE}px;
          color: ${COLOR.DEFAULT_TITLE};
        }

        .content h2 {
          font-size: ${FONT_SIZE.TITLE1}px;
          font-weight: ${FONT_WEIGHT.BOLD};
          margin-bottom: ${VERTICAL_MARGIN.HALF}px;
          line-height: ${LINE_HEIGHT.TITLE}px;
          color: ${COLOR.DEFAULT_TITLE};
        }

        .content h3 {
          font-size: ${FONT_SIZE.SMALL_TITLE1}px;
          font-weight: ${FONT_WEIGHT.SEMIBOLD};
          margin-bottom: ${VERTICAL_MARGIN.HALF}px;
          line-height: ${LINE_HEIGHT.TITLE}px;
          color: ${COLOR.DEFAULT_TITLE};
        }

        .content h4 {
          font-size: ${FONT_SIZE.SMALL_TITLE2}px;
          font-weight: ${FONT_WEIGHT.SEMIBOLD};
          margin-bottom: ${VERTICAL_MARGIN.HALF}px;
          line-height: ${LINE_HEIGHT.TITLE}px;
          color: ${COLOR.DEFAULT_TITLE};
        }

        .content h5 {
          font-size: ${FONT_SIZE.SMALL_TITLE3}px;
          font-weight: ${FONT_WEIGHT.MEDIUM};
          margin-bottom: ${VERTICAL_MARGIN.HALF}px;
          line-height: ${LINE_HEIGHT.TITLE}px;
          color: ${COLOR.DEFAULT_TITLE};
        }

        .content pre {
          display: block;
          background-color: rgba(27, 31, 35, 0.05);
          line-height: 1.25rem;
          padding: 1rem;
          overflow: auto;
          margin-bottom: ${VERTICAL_MARGIN.DEFAULT}px;
        }

        .content pre code {
          background-color: transparent;
          font-size: 100%;
          padding: 0;
        }

        .content code {
          font-family: "Ubuntu Mono", monospace;
          font-size: 85%;
          padding: 0.2em 0.4em;
          margin: 0;
          color: #d96565;
          background-color: rgba(27, 31, 35, 0.05);
          border-radius: 3px;
        }

        .content blockquote {
          margin-bottom: ${VERTICAL_MARGIN.DEFAULT}px;
        }

        .content blockquote::before {
          position: absolute;
          content: "“";
          font-size: 6em;
          font-family: roboto, serif;
          line-height: 1.5rem;
          margin-top: 0.1em;
          margin-left: -0.2em;
          z-index: -1;
          color: ${COLOR.VERY_SUBTLE_LABEL};
        }

        .content table {
          max-width: 100%;
          border-spacing: 0;
          margin-bottom: ${VERTICAL_MARGIN.DEFAULT}px;
        }

        .content table thead {
          background: #f7f7f7;
        }

        .content table th {
          font-weight: ${FONT_WEIGHT.MEDIUM};
        }

        .content table th,
        .content table td {
          padding: 0.5em 1em;
          border: 1px double #eee;
        }

        .content ol,
        .content ul {
          padding: 0 0 0 1.5rem;
          margin-bottom: ${VERTICAL_MARGIN.DEFAULT}px;
        }

        .content ol li,
        .content ul li {
          line-height: ${LINE_HEIGHT.BODY}px;
        }

        .content li ol,
        .content li ul {
          margin: 0;
        }

        .content abbr[title] {
          text-decoration: underline double;
        }

        .content kbd {
          font-family: "Ubuntu Mono", monospace;
        }

        .content img {
          width: 100%;
        }
      `}</style>
    </React.Fragment>
  );
}
