import Prism from "prismjs";
// Node-only loader; called from getStaticProps so grammars stay off the client bundle.
import loadLanguages from "prismjs/components/index";

// @sanity/code-input language ids -> prism grammar ids.
const aliases: { [key: string]: string } = {
  js: "javascript",
  ts: "typescript",
  sh: "bash",
  shell: "bash",
  "c#": "csharp",
  cs: "csharp",
  yml: "yaml",
  golang: "go",
  text: "none",
  plaintext: "none",
};

function escapeHtml(code: string): string {
  return code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Produces the same prism token markup remark-prism emits for MDX, so the shared
// syntax.css theme styles both sources identically.
export function highlightCode(code: string, language?: string): string {
  const lang = aliases[(language || "").toLowerCase()] ?? (language || "none").toLowerCase();
  if (lang === "none") {
    return escapeHtml(code);
  }
  try {
    loadLanguages([lang]);
  } catch {
    // Unknown grammar — fall back to plain escaped text below.
  }
  const grammar = Prism.languages[lang];
  return grammar ? Prism.highlight(code, grammar, lang) : escapeHtml(code);
}

// Walk a Portable Text body and pre-highlight every code block at build time.
export function highlightBodyCode(body: any[]): any[] {
  if (!Array.isArray(body)) return body;
  return body.map((block) =>
    block && block._type === "code" && typeof block.code === "string"
      ? { ...block, highlighted: highlightCode(block.code, block.language) }
      : block
  );
}
