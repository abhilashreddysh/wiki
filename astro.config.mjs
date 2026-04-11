// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Abhi's Wiki",
      logo: {
        src: "./src/assets/book.svg",
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/abhilashreddysh/wiki",
        },
      ],
      sidebar: [
        {
          label: "Homelab Project",
          autogenerate: { directory: "homelab" },
        },
        {
          label: "Projects",
          autogenerate: { directory: "projects" },
        },
        {
          label: "Guides",
          autogenerate: { directory: "guides" },
        },
        {
          label: "Setup",
          autogenerate: { directory: "setup" },
        },
        {
          label: "References",
          autogenerate: { directory: "reference" },
        },
      ],
      customCss: ["./src/styles/global.css"],
    }),
  ],
});
