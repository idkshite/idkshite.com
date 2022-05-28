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
        <Date className={"mb-small inline-block"} date={parseISO(post.date)} />
        <h2 className="text-xl font-semibold  text-default-title">{post.title}</h2>
      </a>
    </Link>
  );
}
