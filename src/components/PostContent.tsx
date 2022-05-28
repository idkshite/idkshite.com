import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function PostContent({ children }: Props) {
  return (
    <React.Fragment>
      <div className="content">{children}</div>
    </React.Fragment>
  );
}
