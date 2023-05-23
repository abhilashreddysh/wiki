// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "ASH Wiki",
  tagline: "My Wiki in my Words",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://abhilashreddysh.github.io/",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/wiki",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "abhilashreddysh", // Usually your GitHub org/user name.
  projectName: "wiki", // Usually your repo name.

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          routeBasePath: "/",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/abhilashreddysh/wiki/blob/main",
        },
        blog: false,
        // {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl:
        //     "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        // },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],
  // themes: ["@docusaurus/theme-search-algolia"],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      algolia: {
        // The application ID provided by Algolia
        appId: "IMCVZQZ3KP",
        // Public API key: it is safe to commit it
        apiKey: "39827f53b8967cec7d41a5a29bdbcca5",
        indexName: "abhilashreddysh",
        // Optional: see doc section below
        contextualSearch: true,
        // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        // externalUrlRegex: 'external\\.com|domain\\.com',
        // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
        replaceSearchResultPathname: {
          from: "/docs/", // or as RegExp: /\/docs\//
          to: "/",
        },
        // Optional: Algolia search parameters
        // searchParameters: {},
        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: "search",
      },
      metadata: [{ name: "keywords", content: "abhi,wiki,docs,wiki" }],
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
      navbar: {
        title: "ASH Wiki",
        logo: {
          alt: "Abhi Logo",
          src: "img/logo.png",
        },
        items: [
          // {
          //   type: "docSidebar",
          //   sidebarId: "tutorialSidebar",
          //   position: "left",
          //   label: "Tutorial",
          // },
          // { to: "/blog", label: "Blog", position: "left" },
          { to: "/to-do", label: "To-Do", position: "left" },
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
            title: "Pages",
            items: [
              {
                label: "To-Do Projects",
                to: "/to-do",
              },
            ],
          },
          {
            title: "Social",
            items: [
              // {
              //   label: "Stack Overflow",
              //   href: "https://stackoverflow.com/questions/tagged/docusaurus",
              // },
              // {
              //   label: "Discord",
              //   href: "https://discordapp.com/invite/docusaurus",
              // },
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
              // {
              //   label: "Blog",
              //   to: "/blog",
              // },
              {
                label: "GitHub Repository",
                href: "https://github.com/abhilashreddysh/wiki",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Abhilash Reddy.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
