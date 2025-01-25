import React, { useRef, useEffect } from 'react';
import  chipImg  from '../assets/images/chip.jpeg';
import  frameImg  from '../assets/images/frame.png';
import  frameVideo  from '../assets/videos/frame.mp4';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const HowItWorks = () => {
  const videoRef = useRef();

  useEffect(() => {
    // GSAP animation for #chip
    gsap.from('#chip', {
      scrollTrigger: {
        trigger: '#chip',
        start: '20% bottom',
      },
      opacity: 0,
      scale: 2,
      duration: 2,
      ease: 'power2.inOut',
    });

    // GSAP animation for elements with the g_fadeIn class
    gsap.from('.g_fadeIn', {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power2.inOut',
      stagger: 0.3,
      scrollTrigger: {
        trigger: '.g_fadeIn',
        start: 'top bottom',
      },
    });
  }, []);

  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <div id="chip" className="flex-center w-full my-20">
          <img src={chipImg} alt="chip" width={180} height={180} />
        </div>

        <div className="flex flex-col items-center">
          <h2 className="hiw-title">
            Unipitch Solutions.
            <br /> Innovating IT services for your business.
          </h2>

          <p className="hiw-subtitle">
            Empowering growth through customized IT solutions and unmatched expertise.
          </p>
        </div>

        <div className="mt-10 md:mt-20 mb-14">
          <div className="relative h-full flex-center">
            <div className="overflow-hidden">
              <img
                src={frameImg}
                alt="frame"
                className="bg-transparent relative z-10"
              />
            </div>
            <div className="hiw-video">
              <video
                className="pointer-events-none"
                playsInline
                preload="none"
                muted
                autoPlay
                ref={videoRef}
              >
                <source src={frameVideo} type="video/mp4" />
              </video>
            </div>
          </div>
          <p className="text-gray font-semibold text-center mt-3">Advanced IT Solutions</p>
        </div>

        <div className="hiw-text-container">
          <div className="flex flex-1 justify-center flex-col">
            <p className="hiw-text g_fadeIn">
              Unipitch delivers an{' '}
              <span className="text-white">
                exceptional range of IT services
              </span>
              , from cutting-edge website creation to seamless video editing.
            </p>

            <p className="hiw-text g_fadeIn">
              Our solutions{' '}
              <span className="text-white">
                drive your business forward
              </span>
              , ensuring high-quality, efficient, and reliable results.
            </p>
          </div>

          <div className="flex-1 flex justify-center flex-col g_fadeIn">
            <p className="hiw-text">Expertise in</p>
            <p className="hiw-bigtext">Comprehensive IT Services</p>
            <p className="hiw-text">tailored to your needs</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
