import DOMPurify from "isomorphic-dompurify";

export function sanitizeRichContent(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      "p", "br", "h1", "h2", "h3", "h4", "h5", "h6",
      "strong", "b", "em", "i", "u", "s", "strike",
      "ul", "ol", "li",
      "blockquote", "code", "pre",
      "a", "img",
      "span", "div",
      "table", "thead", "tbody", "tr", "th", "td",
      "mark", "hr",
    ],
    ALLOWED_ATTR: [
      "href", "target", "rel",
      "src", "alt", "width", "height",
      "style", "class",
      "colspan", "rowspan",
      "data-color",
    ],
    ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto|tel):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
    ALLOW_DATA_ATTR: false,
    KEEP_CONTENT: true,
    ADD_ATTR: ["target"],
    FORBID_TAGS: ["script", "iframe", "object", "embed", "form", "input"],
    FORBID_ATTR: [
      "onerror", "onclick", "onload", "onmouseover", "onfocus", "onblur",
      "onsubmit", "onchange", "onkeydown", "onkeyup", "onkeypress",
      "onmouseenter", "onmouseleave", "ondblclick", "ondragstart",
    ],
  });
}
