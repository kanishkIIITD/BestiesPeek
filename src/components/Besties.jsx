import React, { lazy, Suspense, useEffect, useRef } from "react";
import { Cards } from "./Cards";
import "../App.css";

const LazyImageAndDescription = lazy(() => import("./LazyImageAndDescription"));

const Besties = ({ tab, darkMode }) => {
  const besties = {
    leaders: ["4head", "ming", "nidas"],
    ogs: ["SimplessR6", "dripp"],
    members: [
      "fanfan",
      "travpiper",
      "caramel",
      "julian",
      "TheDoubles",
      "zuck",
      "jack",
      "razzy",
      "SlightlyPoetic",
      "kyle",
      "harmless",
      "mdrakoo",
      "manax321",
      "ChopoNZ",
      "RissahBear",
    ],
    pet: ["ThatGuyGP"],
    hangarounds: [
      "Stuply",
      "Kameu",
      "mistamoshi",
      "cortair_",
      "ipink_",
      "GoufBam",
    ],
  };

  const fadeInRef = useRef(null);
  const slideInRef = useRef(null);

  useEffect(() => {
    const fadeInElement = fadeInRef.current;
    const slideInElement = slideInRef.current;

    const observerOptions = {
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    }, observerOptions);

    if (fadeInElement) observer.observe(fadeInElement);
    if (slideInElement) observer.observe(slideInElement);

    return () => {
      if (fadeInElement) observer.unobserve(fadeInElement);
      if (slideInElement) observer.unobserve(slideInElement);
    };
  }, []);

  return (
    <div className="w-full">
      <div className="flex flex-col items-center w-full">
        <Suspense
          // ref={fadeInRef}
          fallback={<div className="spinner"></div>}
          // className="fade-in-on-scroll"
        >
          <LazyImageAndDescription
            tab={tab}
            darkMode={darkMode}
            fadeInRef={fadeInRef}
          />
        </Suspense>

        <div className={`border-2 border-pink-500 mb-4 w-full`}></div>

        <div
          // ref={fadeInRef}
          className={`relative w-full`}
        >
          <Cards streamers={besties} tab={tab} darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
};

export default Besties;
