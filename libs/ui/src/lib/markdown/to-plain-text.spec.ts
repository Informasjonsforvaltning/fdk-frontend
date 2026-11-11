import { markdownToPlainText } from "./to-plain-text";

const sampleDescription = `Dette er et testdatasett som er opprettet via registreringsløsningen og der alle feltene i skjemaet er fylt ut.

---

**Formål:** Test den nye detaljesiden for datasett i portalen.

**Ekstra tekst:**

**Dataens nye drakt**

I et rike av nuller og enere,\\
der data.norge skinner i scener.\\
Med åpne kilder og innsikt brett,\\
ligger der skjulte skatter – et datasett.`;

describe("markdownToPlainText", () => {
  it("drops markdown formatting and keeps the words", () => {
    expect(markdownToPlainText(sampleDescription)).toBe(
      "Dette er et testdatasett som er opprettet via registreringsløsningen og der alle feltene i skjemaet er fylt ut. Formål: Test den nye detaljesiden for datasett i portalen. Ekstra tekst: Dataens nye drakt I et rike av nuller og enere, der data.norge skinner i scener. Med åpne kilder og innsikt brett, ligger der skjulte skatter – et datasett.",
    );
  });

  it("keeps link text, inline code, and image alt text", () => {
    expect(
      markdownToPlainText("Se [portalen](https://data.norge.no) og bruk `id`. ![logo](https://example.com/logo.png)"),
    ).toBe("Se portalen og bruk id. logo");
  });

  it("joins list items and headings into one line", () => {
    expect(markdownToPlainText("# Tittel\n\n- alpha\n- beta")).toBe("Tittel alpha beta");
  });

  it("leaves out tables, code blocks, and raw HTML", () => {
    const markdown = `Før

| a | b |
| - | - |
| 1 | 2 |

\`\`\`
const hidden = true;
\`\`\`

<div>skjult</div>

Etter`;

    expect(markdownToPlainText(markdown)).toBe("Før Etter");
  });

  it("returns an empty string when nothing readable remains", () => {
    expect(markdownToPlainText("| a |\n| - |\n| 1 |")).toBe("");
    expect(markdownToPlainText("---")).toBe("");
  });

  it("leaves plain text unchanged", () => {
    expect(markdownToPlainText("Bare en setning.")).toBe("Bare en setning.");
  });
});
