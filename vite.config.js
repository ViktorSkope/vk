import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const root = fileURLToPath(new URL(".", import.meta.url));

const pages = {
  home: "index.html",
  work: "work/index.html",
  project: "work/sample-project/index.html",
  ingrid: "work/ingrid/index.html",
  about: "about/index.html",
  thinking: "thinking/index.html",
  article: "thinking/sample-article/index.html",
  contact: "contact/index.html",
  privacy: "privacy/index.html",
  terms: "terms/index.html",
  notFound: "404.html",
};

// Expands `<!-- @include name -->` from partials/ so every page shares one
// head, header, footer and CTA. {{title}} and {{description}} come from the page.
function partials() {
  return {
    name: "vk-partials",
    transformIndexHtml: {
      order: "pre",
      handler(html) {
        const title = html.match(/<title>(.*?)<\/title>/)?.[1] ?? "";
        const description = html.match(/<meta name="description" content="(.*?)"/)?.[1] ?? "";
        return html
          .replace(/<!-- @include (\w+) -->/g, (_, name) =>
            readFileSync(resolve(root, "partials", `${name}.html`), "utf8"),
          )
          .replaceAll("{{title}}", title)
          .replaceAll("{{description}}", description);
      },
    },
    handleHotUpdate({ file, server }) {
      if (file.includes("/partials/")) server.ws.send({ type: "full-reload" });
    },
  };
}

export default defineConfig({
  appType: "mpa",
  plugins: [partials()],
  build: {
    rollupOptions: {
      input: Object.fromEntries(Object.entries(pages).map(([name, path]) => [name, resolve(root, path)])),
    },
  },
});
