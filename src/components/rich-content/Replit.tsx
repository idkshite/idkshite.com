import { VERTICAL_MARGIN } from "../../../public/styles/font";

export function Replit({ url, filename }) {
  return (
    <iframe
      style={{ marginBottom: VERTICAL_MARGIN.DEFAULT }}
      frameBorder="0"
      width="100%"
      height="500px"
      src={`${url}?embed=true&tab=code${filename ? "#" + filename : ""}`}
    />
  );
}
