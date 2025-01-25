import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import  rightImg  from "../assets/images/right.svg";
import  watchImg  from "../assets/images/watch.svg";

import VideoCarousel from "./VideoCarousel";

gsap.registerPlugin(ScrollTrigger);

const Highlights = () => {
  useEffect(() => {
    // Animating title and links with GSAP
    gsap.fromTo(
      "#title",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#title",
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      ".link",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.25,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#highlights",
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section
      id="highlights"
      className="w-screen overflow-hidden h-full common-padding bg-zinc"
    >
      <div className="screen-max-width">
        {/* Section Header */}
        <div className="mb-12 w-full md:flex items-end justify-between">
          <h1 id="title" className="section-heading">
            Get the highlights.
          </h1>

          {/* Links */}
          <div className="flex flex-wrap items-end gap-5">
            <p className="link flex items-center">
              Watch
              <img src={watchImg} alt="Watch" className="ml-2 w-5 h-5" />
            </p>
            <p className="link flex items-center">
              Projects
              <img src={rightImg} alt="Right arrow" className="ml-2 w-5 h-5" />
            </p>
          </div>
        </div>

        {/* Video Carousel Component */}
        <VideoCarousel />
      </div>
    </section>
  );
};

export default Highlights;
