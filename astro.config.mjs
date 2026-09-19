// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightThemeNova from "starlight-theme-nova";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Abhi's Wiki",

      logo: {
        src: "./src/assets/book.svg",
      },

      plugins: [
        starlightThemeNova({
          nav: [
            {
              label: "GitHub",
              href: "https://github.com/abhilashreddysh",
            },
          ],
        }),
      ],

      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/abhilashreddysh/wiki",
        },
      ],

      sidebar: [
        {
          label: "Self-Hosted",
          items: [
            {
              autogenerate: {
                directory: "self-hosted",
              },
            },
          ],
        },

        {
          label: "Notes",
          items: [
            {
              label: "Overview",
              link: "/notes/",
            },
            {
              label: "Guides",
              collapsed: true,
              items: [
                {
                  autogenerate: {
                    directory: "notes/guides",
                  },
                },
              ],
            },
            {
              label: "How-To",
              collapsed: true,
              items: [
                {
                  autogenerate: {
                    directory: "notes/how-to",
                  },
                },
              ],
            },
            {
              label: "Cheatsheets",
              collapsed: true,
              items: [
                {
                  autogenerate: {
                    directory: "notes/cheatsheets",
                  },
                },
              ],
            },
            {
              label: "Reference",
              collapsed: true,
              items: [
                {
                  autogenerate: {
                    directory: "notes/reference",
                  },
                },
              ],
            },
          ],
        },

        {
          label: "Projects",
          items: [
            {
              autogenerate: {
                directory: "projects",
              },
            },
          ],
        },
      ],

      customCss: ["./src/styles/global.css"],
    }),
  ],
});
