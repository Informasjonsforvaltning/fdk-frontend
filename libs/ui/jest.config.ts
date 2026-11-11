import type { Config } from "jest";

const config: Config = {
  displayName: "ui",
  preset: "./jest.preset.js",
  coverageDirectory: "../../coverage/libs/ui",
  moduleNameMapper: {
    "^invokers-polyfill$": "<rootDir>/src/test/invokers-polyfill.ts",
    "^invokers-polyfill/fn$": "<rootDir>/src/test/invokers-polyfill.ts",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/../../__mocks__/fileMock.js",
    "\\.module.css$": "identity-obj-proxy",
  },
  // remark and unified are ESM-only. Jest runs tests as CommonJS, so these packages have to be transformed.
  transformIgnorePatterns: [
    "/node_modules/(?!unified/|vfile/|vfile-message/|remark-|mdast-|micromark|unist-|devlop/|bail/|trough/|is-plain-obj/|decode-named-character-reference/|character-entities|ccount/|markdown-table/|longest-streak/|escape-string-regexp/|zwitch/|trim-lines/|html-url-attributes/|property-information/|space-separated-tokens/|comma-separated-tokens/|hast-util-|web-namespaces/|extend/)",
  ],
  setupFilesAfterEnv: ["./jest.setup.tsx"],
};

export default config;
