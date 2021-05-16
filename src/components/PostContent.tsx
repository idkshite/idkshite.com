import React from "react";
import {
  FONT_SIZE,
  LINE_HEIGHT,
  VERTICAL_MARGIN,
} from "../../public/styles/font";

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
          color: #222;
          font-weight: 200;
        }

        .content time {
          color: #9b9b9b;
        }

        .content p {
          font-size: ${FONT_SIZE.BODY4}px;
          line-height: ${LINE_HEIGHT.BODY}px;
          margin-bottom: ${VERTICAL_MARGIN.DEFAULT};
        }

        .content a {
          color: blue;
          text-decoration: underline;
        }

        .content h1 {
          font-size: ${FONT_SIZE.TITLE2}px;
          margin-bottom: ${VERTICAL_MARGIN.DEFAULT}px;
          line-height: ${LINE_HEIGHT.TITLE}px;
        }

        .content h2 {
          font-size: ${FONT_SIZE.TITLE1}px;
          margin: 2.5rem 0 0 0;
          line-height: ${LINE_HEIGHT.TITLE}px;
        }

        .content h3 {
          font-size: ${FONT_SIZE.SMALL_TITLE1}px;
          margin: 2.5rem 0 0 0;
          line-height: ${LINE_HEIGHT.TITLE}px;
        }

        .content h4 {
          font-size: ${FONT_SIZE.SMALL_TITLE2}px;
          margin: 2.5rem 0 0 0;
          line-height: ${LINE_HEIGHT.TITLE}px;
        }

        .content h5 {
          font-size: ${FONT_SIZE.SMALL_TITLE3}px;
          margin: 2.5rem 0 0 0;
          line-height: ${LINE_HEIGHT.TITLE}px;
        }

        .content h2::before {
          position: absolute;
          margin-left: -1em;
          font-weight: 300;
          font-size: 1.5rem;
          color: #9b9b9b;
          display: none;
          content: "#";
        }

        .content pre {
          display: block;
          background-color: rgba(27, 31, 35, 0.05);
          line-height: 1.25rem;
          padding: 1rem;
          overflow: auto;
          margin: 1.75rem 0 0 0;
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
          margin: 0 1rem;
        }

        .content blockquote::before {
          position: absolute;
          content: "\\201C";
          font-size: 6em;
          font-family: roboto, serif;
          line-height: 1.5rem;
          margin-top: 0.1em;
          margin-left: -0.2em;
          z-index: -1;
          color: #ededed;
        }

        .content table {
          max-width: 100%;
          border-spacing: 0;
          margin-top: 1.5rem;
        }

        .content table thead {
          background: #f7f7f7;
        }

        .content table th {
          font-weight: 500;
        }

        .content table th,
        .content table td {
          padding: 0.5em 1em;
          border: 1px double #eee;
        }

        .content ol,
        .content ul {
          padding: 0 0 0 1.5rem;
          margin: 1.5rem 0 0 0;
        }

        .content ol li,
        .content ul li {
          line-height: 1.5rem;
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

        @media (min-width: 769px) {
          .content h2,
          .content h3,
          .content h4,
          .content h5 {
            position: relative;
          }

          .content h2::before {
            display: block;
          }
        }
      `}</style>
    </React.Fragment>
  );
}
