"use client";
import dynamic from "next/dynamic";
const ParticleComponent = dynamic(() => import("../Particals"), {
  ssr: false,
});

import React, { useState } from "react";
import Image from "next/image";
import ModalVideo from "@/components/common/ModalVideo";
import Link from "next/link";
export default function HeroSeven() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <section className="masthead -type-6">
        <div className="masthead__bg" style={{ zIndex: "-1" }}>
          <Image
            width={470}
            style={{ pointerEvents: "none" }}
            height={540}
            src="/assets/img/home-7/hero/1.svg"
            alt="blob"
          />
          <Image
            width={580}
            style={{ pointerEvents: "none" }}
            height={920}
            src="/assets/img/home-7/hero/2.svg"
            alt="blob"
          />
          <Image
            width={1200}
            height={1200}
            style={{ pointerEvents: "none", width: "100%" }}
            src="/assets/img/home-7/hero/bg.png"
            alt="background"
          />

          <div
            className="absolute-full-center"
            style={{ maxHeight: "100vh", overflow: "hidden" }}
          >
            <ParticleComponent />
          </div>
        </div>

        <div className="container">
          <div className="row y-gap-50 items-center">
            <div className="col-lg-5" data-aos="fade-up" data-aos-delay="500">
              <div className="masthead__content">
                <div className="text-17 lh-15 text-purple-1 fw-500 mb-10">
                  Continue your learning
                </div>
                <h1 className="masthead__title">
                  Build your skills
                  <br /> <span className="text-purple-1">online</span>
                </h1>
                <p className="mt-5">
                In today's rapidly evolving digital landscape, data stands as the cornerstone of innovation and decision-making across industries. From guiding strategic business decisions to fueling breakthroughs in healthcare and technology, the ability to harness, analyze, and interpret data is paramount
                  <br className="lg:d-none" />
                </p>
                {/* <div className="row items-center x-gap-20 y-gap-20 pt-20">
                  <div className="col-auto">
                    <Link
                      href="/signup"
                      className="button -md -gradient-1 -rounded text-white"
                    >
                      Join For Free
                    </Link>
                  </div>
                  <div className="col-auto">
                    <Link
                      href="/courses-list-1"
                      className="button -md -outline-light-5 -rounded text-dark-1"
                    >
                      Find Courses
                    </Link>
                  </div>
                </div> */}
              </div>
            </div>

            <div className="col-lg-6 align-self-end" data-aos="fade-up" data-aos-delay="750">
              <div className="masthead__image relative">
                <Image
                  width={455}
                  height={455}
                  src="/assets/img/home-6/learn/1.png"
                  alt="image"
                  style={{borderRadius: '15px', width: '600px', marginLeft: "50px"}}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <ModalVideo
        videoId={"LlCwHnp3kL4"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      /> */}
    </>
  );
}
