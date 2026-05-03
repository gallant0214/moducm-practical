/**
 * Server-side rich-content sanitizer.
 *
 * 기존 모두컴 admin(TipTap)에서 이미 검증된 HTML이 들어온다는 신뢰 모델로,
 * 가장 위험한 패턴(<script>, on*=, javascript: URL)만 차단하는 정규식 기반
 * 화이트리스트 후처리를 사용. 의도적으로 isomorphic-dompurify(jsdom 의존)에
 * 대한 빌드/런타임 의존을 제거한 단순 구현.
 */
export function sanitizeRichContent(html: string): string {
  if (!html) return "";
  return html
    // <script ...>...</script>
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    // <style ...>...</style>
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
    // <iframe>, <object>, <embed>, <form>, <input>
    .replace(/<\/?(?:iframe|object|embed|form|input)\b[^>]*>/gi, "")
    // on*= attributes (인라인 이벤트 핸들러)
    .replace(/\son[a-z]+\s*=\s*"[^"]*"/gi, "")
    .replace(/\son[a-z]+\s*=\s*'[^']*'/gi, "")
    .replace(/\son[a-z]+\s*=\s*[^\s>]+/gi, "")
    // javascript: / data: URL in href/src
    .replace(/(href|src)\s*=\s*"\s*(?:javascript|data):[^"]*"/gi, '$1=""')
    .replace(/(href|src)\s*=\s*'\s*(?:javascript|data):[^']*'/gi, "$1=''");
}
