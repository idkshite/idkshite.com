import Link from "next/link";
import { useRouter } from "next/router";
import Burger from "./Burger";
import { useState } from "react";
import { COLOR } from "../../public/styles/colors";
import {
  FONT_SIZE,
  FONT_STYLE,
  FONT_WEIGHT,
  VERTICAL_MARGIN,
} from "../../public/styles/font";

export default function Navigation() {
  const router = useRouter();
  const [active, setActive] = useState(false);
  return (
    <>
      <Burger active={active} onClick={() => setActive(!active)} />
      <div className={"container " + (active ? "active" : "")}>
        <ul>
          <li>
            <Link href="/">
              <a className={router.pathname === "/" ? "active" : null}>about</a>
            </Link>
          </li>
          <li>
            <Link href="/posts">
              <a
                className={
                  router.pathname.startsWith("/posts") ? "active" : null
                }
              >
                blog
              </a>
            </Link>
          </li>
        </ul>
        <style jsx>
          {`
            .container {
              width: 0;
            }
            ul {
              opacity: 0;
              width: 100%;
              height: 100vh;
              text-align: right;
              list-style: none;
              margin: 0;
              padding: 0;
              position: fixed;
              top: 0;
              background-color: #fff;
              display: flex;
              flex-direction: column;
              justify-content: center;
              z-index: 1;
              transform: translateY(100%);
              transition: opacity 200ms;
            }
            .active ul {
              opacity: 1;
              transform: translateY(0);
            }
            li {
              margin-bottom: ${VERTICAL_MARGIN.QUARTER}px;
              font-size: ${FONT_SIZE.TITLE2}px;
              font-weight: ${FONT_WEIGHT.REGULAR};
              color: ${COLOR.DEFAULT_TITLE};
              padding: 0 1.5rem 0 0;
            }
            li:last-child {
              margin-bottom: 0;
            }
            .active {
              color: ${COLOR.DEFAULT_TEXT};
              font-weight: ${FONT_WEIGHT.BOLD};
            }

            @media (min-width: 769px) {
              .container {
                width: 7rem;
                display: block;
              }
              ul {
                opacity: 1;
                width: 7rem;
                top: auto;
                display: block;
                transform: translateY(0);
              }
              li {
                padding: 0;
                font-size: ${FONT_SIZE.SMALL_TITLE2}px;
              }
            }
          `}
        </style>
      </div>
    </>
  );
}
