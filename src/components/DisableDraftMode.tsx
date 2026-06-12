import { useEffect, useState } from "react";

// "Disable Draft Mode" affordance — shown only when viewing draft content
// OUTSIDE Presentation (i.e. the page is the top-level window, not an iframe),
// so the author never mistakes a draft for the live site or gets stuck in it.
export function DisableDraftMode() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(window.top === window);
  }, []);

  if (!show) return null;

  return (
    <a
      href="/api/disable-draft"
      style={{
        position: "fixed",
        bottom: "1rem",
        right: "1rem",
        zIndex: 1000,
        background: "#15847d",
        color: "#fff",
        padding: "0.5rem 1rem",
        borderRadius: "9999px",
        fontSize: "0.85rem",
      }}
    >
      Disable Draft Mode
    </a>
  );
}
