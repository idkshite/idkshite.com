export function Replit({ url, filename }) {
  return (
    <iframe
      frameBorder="0"
      width="100%"
      height="500px"
      src={`${url}?embed=true&tab=code${filename ? "#" + filename : ""}`}
    />
  );
}
