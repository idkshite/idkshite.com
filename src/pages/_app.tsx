import "normalize.css";
import { AppProps } from "next/app";

// NOTE: Do not move the styles dir to the src.
// They are used by the Netlify CMS preview feature.
import "../../public/styles/global.css";
import "/public/styles/prism-themes/syntax.css";
import "/public/styles/fonts/dank-mono/dmvendor.css";
import { FONT_STYLE } from "../../public/styles/font";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,400;0,500;0,600;0,700;0,900;1,400&display=swap");

        html,
        body {
          font-family: "Jost", sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;

          background-color: #fff;
          color: #222;
          font-weight: 400;
          height: 100%;
        }

        #__next {
          height: 100%;
        }

        a {
          color: #9b9b9b;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        a:active,
        a:hover {
          color: #000;
        }

        .youtube-container {
          position: relative;
          width: 100%;
          height: 0;
          padding-bottom: 56.25%;
          overflow: hidden;
          margin-bottom: 50px;
        }

        .youtube-container iframe {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }

        // DESIGN SYSTEM

        .title2 {
          ${FONT_STYLE.TITLE2}
        }
        .title1 {
          ${FONT_STYLE.TITLE1}
        }
        .small-title1 {
          ${FONT_STYLE.SMALL_TITLE1}
        }
        .small-title2 {
          ${FONT_STYLE.SMALL_TITLE2}
        }
        .small-title3 {
          ${FONT_STYLE.SMALL_TITLE3}
        }
        p {
          ${FONT_STYLE.BODY4}
        }
        .fancy {
          color: #15847d;
        }
        
      `}
      </style>
    </>
  );
}
