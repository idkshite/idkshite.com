import { format, formatISO } from "date-fns";

type Props = {
  date: Date;
  className?: string;
};
export default function Date({ date, className }: Props) {
  return (
    <time className={className} dateTime={formatISO(date)}>
      <span>Published in: {format(date, "yyyy")}</span>
      <style jsx>
        {`
          span {
            color: #9b9b9b;
          }
        `}
      </style>
    </time>
  );
}
