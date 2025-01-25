import React, { useRef, useEffect } from "react";
import  explore1Img  from "../assets/images/explore1.jpg";
import  explore2Img  from "../assets/images/explore2.jpg";
import  exploreVideo  from "../assets/videos/explore.mp4";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Ensure ScrollTrigger animations and GSAP animations are set up correctly
    ScrollTrigger.create({
      trigger: "#exploreVideo",
      start: "-10% bottom",
      toggleActions: "play pause reverse restart",
      onEnter: () => {
        videoRef.current?.play();
      },
    });

    // Animating section title
    gsap.fromTo(
      "#features_title",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
    );

    // Animating grow effects
    gsap.utils.toArray(".g_grow").forEach((item) => {
      gsap.fromTo(
        item,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "top 50%",
            scrub: 2,
          },
        }
      );
    });

    // Animating text elements
    gsap.utils.toArray(".g_text").forEach((item) => {
      gsap.fromTo(
        item,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            end: "top 60%",
            scrub: 2,
          },
        }
      );
    });
  }, []);

  return (
    <section className="h-full common-padding bg-zinc relative overflow-hidden">
      <div className="screen-max-width">
        {/* Section title */}
        <div className="mb-12 w-full">
          <h1 id="features_title" className="section-heading">
            Discover Our Expertise
          </h1>
        </div>

        <div className="flex flex-col justify-center items-center overflow-hidden">
          <div className="mt-32 mb-24 pl-24">
            <h2 className="text-5xl lg:text-7xl font-semibold">Unipitch.</h2>
            <h2 className="text-5xl lg:text-7xl font-semibold">
              Crafting Digital Excellence.
            </h2>
          </div>

          {/* Video Section */}
          <div className="flex-center flex-col sm:px-10">
            <div className="relative h-[50vh] w-full flex items-center">
              <video
                playsInline
                id="exploreVideo"
                className="w-full h-full object-cover object-center"
                preload="none"
                muted
                ref={videoRef}
              >
                <source src={exploreVideo} type="video/mp4" />
              </video>
            </div>

            {/* Features Content */}
            <div className="flex flex-col w-full relative mt-10">
              <div className="feature-video-container flex justify-between gap-6">
                {/* Feature 1 */}
                <div className="overflow-hidden flex-1 h-[50vh]">
                  <img
                    src={explore1Img}
                    alt="Innovation"
                    className="feature-video g_grow"
                  />
                </div>
                {/* Feature 2 */}
                <div className="overflow-hidden flex-1 h-[50vh]">
                  <img
                    src={explore2Img}
                    alt="Technology"
                    className="feature-video g_grow"
                  />
                </div>
              </div>

              <div className="feature-text-container flex flex-col gap-8 mt-8">
                {/* Feature Text 1 */}
                <div className="flex-1 flex-center">
                  <p className="feature-text g_text">
                    At Unipitch, we redefine digital transformation with{" "}
                    <span className="text-white">
                      cutting-edge technology and innovative solutions
                    </span>
                    .
                  </p>
                </div>
                {/* Feature Text 2 */}
                <div className="flex-1 flex-center">
                  <p className="feature-text g_text">
                    Our expertise ensures your business achieves{" "}
                    <span className="text-white">exceptional results</span>,
                    unlocking new growth opportunities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
