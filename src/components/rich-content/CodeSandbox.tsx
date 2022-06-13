export function CodeSandbox({ url }: { url: string }) {
  return (
    <iframe
      className={"rich-content"}
      src={url}
      style={{
        height: "500px",
        width: "100%",
        border: 0,
        borderRadius: "4px",
        overflow: "hidden",
      }}
      title="Encrypting Messages"
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
    />
  );
}
