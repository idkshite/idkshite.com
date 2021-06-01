export function CodeSandbox({ embedURL }: { embedURL: string }) {
  return (
    <iframe
      src={embedURL}
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
