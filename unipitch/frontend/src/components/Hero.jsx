import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import  heroVideo  from '../assets/videos/hero.mp4';
import  smallHeroVideo  from '../assets/videos/smallHero.mp4';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [videoSrc, setVideoSrc] = useState(
    window.innerWidth < 760 ? smallHeroVideo : heroVideo
  );

  useEffect(() => {
    const handleVideoSrcSet = () => {
      if (window.innerWidth < 760) {
        setVideoSrc(smallHeroVideo);
      } else {
        setVideoSrc(heroVideo);
      }
    };

    window.addEventListener('resize', handleVideoSrcSet);

    return () => {
      window.removeEventListener('resize', handleVideoSrcSet);
    };
  }, []);

  useEffect(() => {
    // GSAP Animations
    gsap.fromTo(
      '#hero',
      { opacity: 0 },
      {
        opacity: 1,
        delay: 0.5,
        duration: 1,
        ease: 'power2.out',
      }
    );

    gsap.fromTo(
      '#cta',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        delay: 1,
        duration: 1,
        ease: 'power2.out',
      }
    );
  }, []);

  return (
    <section className="w-full nav-height bg-black relative">
      {/* Hero Section */}
      <div className="h-5/6 w-full flex-center flex-col">
        <p id="hero" className="hero-title text-white text-5xl font-bold">
          Unipitch Solutions
        </p>
        <div className="md:w-10/12 w-9/12 mt-6">
          <video
            className="pointer-events-none w-full rounded-lg"
            autoPlay
            muted
            playsInline
            loop
            key={videoSrc} // Ensure video reloads on source change
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>

      {/* Call to Action */}
      <div
        id="cta"
        className="flex flex-col items-center mt-6 opacity-0 translate-y-20"
      >
        <a
          href="#highlights"
          className="btn bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition duration-300"
        >
          Discover More
        </a>
        <p className="text-white font-light text-lg mt-4">
          Tailored IT solutions for your needs!
        </p>
      </div>
    </section>
  );
};

export default Hero;
