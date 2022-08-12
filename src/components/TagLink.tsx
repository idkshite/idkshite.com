import Link from "next/link";
import { TagContent } from "../lib/tags";
import React from "react";

type Props = {
  tag: TagContent;
};
export default function Tag({ tag }: Props) {
  return (
    <>
      <Link href={"/posts/tags/[[...slug]]"} as={`/posts/tags/${tag.slug}`}>
        <a>{"#" + tag.name}</a>
      </Link>
      {tag.slug === "gamedev" ? (
        <ul className={"mt-small mt-2 text-blue-400 text-sm"}>
          <li>
            <a
              className="text-blue-400"
              href="https://idkshi-te.notion.site/CalendarTetris-Dev-Log-69f2a7830d974de2ab3d1886cac00cf9"
            >
              CalendarTetris Dev-Log
            </a>
          </li>
        </ul>
      ) : null}

      <style jsx>{`
        li {
          list-style: none;
        }
        li::before {
          content: "🪵 ";
        }
      `}</style>
    </>
  );
}
