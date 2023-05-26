import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

const FeatureList = [
  {
    title: "Support me",
    description: (
      <>
        Give me a star on{" "}
        <a target="_blank" href="https://github.com/abhilashreddysh/wiki">
          GitHub
        </a>
      </>
    ),
  },
  {
    title: "About Me",
    // Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: <>Currently working at Oracle Cerner</>,
  },
  {
    title: "Contact Me",
    description: (
      <>
        <a href="mailto:shabhilash10@gmail.com">Email</a>
      </>
    ),
  },
];

function Feature({ title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center"></div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
