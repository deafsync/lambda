"use client";

import FooterNine from "../../layout/footers/FooterNine";
import Media from "./Media";
import Curriculum from "./Curriculum";
import React, { useState, useEffect } from "react";

const menuItems = [
    { id: 1, href: "#start", text: "Commencer", isActive: true },
    { id: 2, href: "#structure", text: "Structure", isActive: false },
    { id: 3, href: "#medias", text: "Médias", isActive: false },
    { id: 4, href: "#subtitle", text: "Sous-titre", isActive: false },
    { id: 5, href: "#dubbing", text: "Doublage", isActive: false },
  ];

export default function Listing() {
  const [activeTab, setActiveTab] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row pb-10 mb-0">
          <div className="col-auto">
            <h1 className="text-30 lh-12 fw-700">Create New Course</h1>
            <div className="mt-10">
              Lorem ipsum dolor sit amet, consectetur.
            </div>
          </div>
        </div>

        <section className="layout-pt-lg layout-pb-md">
        <div className="">
          <div className="tabs -side js-tabs">
          <div className="row y-gap-60">
          <div className="col-12">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="d-flex items-center py-20 px-30 border-bottom-light">
                <h2 className="text-17 lh-1 fw-500">Basic Information</h2>
              </div>

              <div className="py-30 px-30">
                <form
                  onSubmit={handleSubmit}
                  className="contact-form row y-gap-30"
                  action="#"
                >
                  <div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      Course Title*
                    </label>

                    <input
                      required
                      type="text"
                      placeholder="Learn Figma - UI/UX Design Essential Training"
                    />
                  </div>

                  <div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      Short Description*
                    </label>

                    <textarea
                      required
                      placeholder="Description"
                      rows="7"
                    ></textarea>
                  </div>

                  <div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      Course Description*
                    </label>

                    <textarea
                      required
                      placeholder="Description"
                      rows="7"
                    ></textarea>
                  </div>

                  <div className="col-md-6">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      What will students learn in your course?*
                    </label>

                    <textarea
                      required
                      placeholder="Description"
                      rows="7"
                    ></textarea>
                  </div>

                  <div className="col-md-6">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      Requirements*
                    </label>

                    <textarea
                      required
                      placeholder="Description"
                      rows="7"
                    ></textarea>
                  </div>

                  <div className="col-md-6">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      Course Level*
                    </label>

                    <input required type="text" placeholder="Select" />
                  </div>

                  <div className="col-md-6">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      Audio Language*
                    </label>

                    <input required type="text" placeholder="Select" />
                  </div>

                  <div className="col-md-6">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      Close Caption*
                    </label>

                    <input required type="text" placeholder="Select" />
                  </div>

                  <div className="col-md-6">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      Course Category*
                    </label>

                    <input required type="text" placeholder="Select" />
                  </div>
                </form>

                <div className="row y-gap-20 justify-between pt-15">
                  <div className="col-auto">
                    
                  </div>

                  <div className="col-auto">
                    <button className="button -md -purple-1 text-white">
                      Create
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          
        </div>
          </div>
        </div>
      </section>
      </div>

      <FooterNine />
    </div>
  );
}
