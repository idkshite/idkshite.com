import { PostContent } from "../lib/posts";
import Date from "./Date";
import Link from "next/link";
import { parseISO } from "date-fns";

type Props = {
  post: PostContent;
};
export default function PostItem({ post }: Props) {
  return (
    <Link href={"/posts/" + post.slug}>
      <a>
        <Date className={"mb-12"} date={parseISO(post.date)} />
        <h2 className="text-xl font-semibold border-2 border-amber-500 text-default-title">{post.title}</h2>
      </a>
    </Link>
  );
}
