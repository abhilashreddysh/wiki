// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightThemeNova from 'starlight-theme-nova';

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
            { label: 'Github', href: 'https://github.com/abhilashreddysh' },
          ],
        })
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
          label: "Homelab",
          items: [{ autogenerate: { directory: 'homelab' } }],
        },
        {
          label: "Notes",
          items: [
            { label: "Overview", link: "/notes/"},
            { 
              label: "Guides",
              collapsed: true,
              items: [{autogenerate: { directory: 'notes/guides'}}]
            },
            { 
              label: "How-To",
              collapsed: true,
              items: [{autogenerate: { directory: 'notes/how-to'}}]
            },
            { 
              label: "Cheatsheets",
              collapsed: true,
              items: [{autogenerate: { directory: 'notes/cheatsheets'}}]
            },
            { 
              label: "References",
              collapsed: true,
              items: [{autogenerate: { directory: 'notes/reference'}}]
            },
          ],
        },
        {
          label: "Projects",
          items: [{ autogenerate: { directory: 'projects' } }],
        },
      ],
      customCss: ["./src/styles/global.css"],
    }),
  ],
});
