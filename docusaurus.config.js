const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Abhilash",
  tagline: "My Personal Documentation and Project Showcase Site",
  favicon: "img/favicon.ico",
  url: "https://abhilashreddysh.github.io/", // Set the production url of your site here
  baseUrl: "/wiki", // For GitHub pages deployment, it is often '/<projectName>/'

  // GitHub pages deployment config.
  organizationName: "abhilashreddysh", // Usually your GitHub org/user name.
  projectName: "wiki", // Usually your repo name.
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  // lauguage support
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  // Plugins
  plugins: [require.resolve("@cmfcmf/docusaurus-search-local")],
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // sidebarCollapsed: false, // to expand all categories by default
          // routeBasePath: "/",
          editUrl: "https://github.com/abhilashreddysh/wiki/blob/main", // Remove this to remove the "edit this page" links.
          showLastUpdateAuthor: true,
          showLastUpdateTime: false,
        },
        blog: {
          showReadingTime: true,
          blogTitle: "Projects",
          blogDescription: "Collection of my projects that I have worked on.",
          blogSidebarTitle: "All Projects",
          blogSidebarCount: "ALL",
          postsPerPage: 5,
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/abhilashreddysh/wiki/blob/main",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata: [{ name: "keywords", content: "abhi,wiki,docs,projects" }],
      // Replace with your project's social card
      image: "img/logo.png",
      announcementBar: {
        id: "announcement-bar",
        content: "Documenting this as I learn stuff :)",
        backgroundColor: "inherit",
        textColor: "inherit",
        isCloseable: true,
      },
      colorMode: {
        defaultMode: "dark",
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      docs: {
        sidebar: {
          hideable: true, // enables option to hide sidebar
          autoCollapseCategories: true,
        },
      },
      navbar: {
        title: "Abhilash",
        logo: {
          alt: "Abhi Logo",
          src: "img/logo.png",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "docSidebar",
            position: "right",
            label: "Documentation",
          },

          { to: "/blog", label: "Projects", position: "right" },
          {
            type: "search",
            position: "left",
          },
          { to: "/to-do", label: "To-Do", position: "right" },
          {
            href: "https://github.com/abhilashreddysh",
            label: "GitHub",
            position: "right",
            className: "header-github-link",
          },
        ],
        hideOnScroll: true,
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Quick Links",
            items: [
              {
                label: "To-Do",
                to: "/to-do",
              },
              {
                label: "Docs",
                to: "/docs",
              },
              {
                label: "Projects",
                to: "/blog",
              },
            ],
          },
          {
            title: "Tags",
            items: [
              {
                label: "Project Tags",
                href: "/blog/tags",
              },
              {
                label: "Docs Tags",
                href: "/docs/tags",
              },
            ],
          },
          {
            title: "Social",
            items: [
              {
                label: "Twitter",
                href: "https://twitter.com/shabhilashreddy",
              },
              {
                label: "Github",
                href: "https://github.com/abhilashreddysh",
              },
              {
                label: "LinkedIn",
                href: "https://www.linkedin.com/in/sh-abhilash ",
              },
            ],
          },

          {
            title: "More",
            items: [
              {
                label: "GitHub Repository",
                href: "https://github.com/abhilashreddysh/wiki",
              },
            ],
          },
        ],
        // logo: {
        //   alt: "Abhi Logo",
        //   src: "img/logo.png",
        //   width: 50,
        //   height: 50,
        // },
        copyright: `Copyright © ${new Date().getFullYear()} Abhilash Reddy.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
