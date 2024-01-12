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
            <h1 className="text-30 lh-12 fw-700">Gérer le cours</h1>
            <div className="mt-10">
              Lorem ipsum dolor sit amet, consectetur.
            </div>
          </div>
        </div>

        <section className="layout-pt-lg layout-pb-md">
            <div className="">
            <div className="tabs -side js-tabs">
                <div className="row y-gap-40">
                <div className="col-lg-2">
                    <div className="tabs__controls y-gap-5 js-tabs-controls">
                    {menuItems.map((elm, i) => (
                        <div key={i} className="my-20">
                        <button
                            key={i}
                            onClick={() => setActiveTab(elm.id)}
                            className={`tabs__button text-18 fw-500  js-tabs-button ${
                            activeTab == elm.id ? "is-active" : ""
                            } `}
                            type="button"
                        >
                            {elm.text}
                        </button>
                        </div>
                    ))}
                    </div>
                </div>

                <div className="col-lg-10">
                    <div className="tabs__content js-tabs-content">
                    <div
                        className={`tabs__pane -tab-item-1 ${
                        activeTab == 1 ? "is-active" : ""
                        } `}
                    >
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
                                        Next
                                        </button>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        className={`tabs__pane -tab-item-2 ${
                        activeTab == 2 ? "is-active" : ""
                        } `}
                    >
                        <div className="col-12">
                            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
                                <div className="d-flex items-center py-20 px-30 border-bottom-light">
                                    <h2 className="text-17 lh-1 fw-500">Curriculum</h2>
                                </div>

                                <Curriculum />
                            </div>
                        </div>
                    </div>

                    <div
                        className={`tabs__pane -tab-item-3 ${
                        activeTab == 3 ? "is-active" : ""
                        } `}
                    >
                        <Media />
                    </div>

                    <div
                        className={`tabs__pane -tab-item-4 ${
                        activeTab == 4 ? "is-active" : ""
                        } `}
                    >
                        <div className="col-12">
                            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
                                <div className="d-flex items-center py-20 px-30 border-bottom-light">
                                    <h2 className="text-17 lh-1 fw-500">Curriculum</h2>
                                </div>

                                <div className="border-light rounded-8">
                                <div className="d-flex items-center py-25 px-30">
                                    <div className="text-dark-1 mr-15">Language</div>

                                    <div
                                    id="dd16button"
                                    onClick={() => {
                                        document
                                        .getElementById("dd16button")
                                        .classList.toggle("-is-dd-active");
                                        document
                                        .getElementById("dd16content")
                                        .classList.toggle("-is-el-visible");
                                    }}
                                    className="dropdown js-dropdown js-category-active"
                                    >
                                    <div
                                        className="dropdown__button d-flex items-center text-14 bg-white -dark-bg-dark-2 border-light rounded-8 px-20 py-10 "
                                        data-el-toggle=".js-category-toggle"
                                        data-el-toggle-active=".js-category-active"
                                    >
                                        <span className="js-dropdown-title">choisir</span>
                                        <i className="icon text-9 ml-40 icon-chevron-down"></i>
                                    </div>

                                    <div
                                        id="dd16content"
                                        className="toggle-element -dropdown -dark-bg-dark-2 -dark-border-white-10 js-click-dropdown js-category-toggle"
                                    >
                                        <div className="text-14 y-gap-15 js-dropdown-list">
                                        <div>
                                            <span className="d-block js-dropdown-link">
                                                Français
                                            </span>
                                        </div>
                                        <div>
                                            <span className="d-block js-dropdown-link">
                                                Yoruba
                                            </span>
                                        </div>
                                        <div>
                                            <span className="d-block js-dropdown-link">
                                                Espagnol
                                            </span>
                                        </div>
                                        <div>
                                            <span className="d-block js-dropdown-link">
                                                Allemand
                                            </span>
                                        </div>

                                        {/* <div>
                                            <a href="users/instructors" className="d-block js-dropdown-link">
                                            Enseignants
                                            </a>
                                        </div> */}

                                        </div>
                                    </div>
                                    </div>

                                    <div className="text-dark-1 ml-15">of the following:</div>
                                </div>

                                
                                </div>

                                <div className="text-16 py-20 px-30 fw-500">
                                Les apprenants, quel que soit leur niveau de maîtrise de la langue, apprécient grandement les sous-titres car ils les aident à suivre, comprendre et mémoriser le contenu. Il est également essentiel de proposer des sous-titres pour garantir l'accessibilité du contenu aux personnes sourdes ou malentendantes. 
                                </div>

                                <Curriculum />
                            </div>
                        </div>
                    </div>
                    <div
                        className={`tabs__pane -tab-item-4 ${
                        activeTab == 5 ? "is-active" : ""
                        } `}
                    >
                        <div className="col-12">
                            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
                                <div className="d-flex items-center py-20 px-30 border-bottom-light">
                                    <h2 className="text-17 lh-1 fw-500">Curriculum</h2>
                                </div>

                                <div className="border-light rounded-8">
                                <div className="d-flex items-center py-25 px-30">
                                    <div className="text-dark-1 mr-15">Langue de doublage</div>

                                    <div
                                    id="dd16button"
                                    onClick={() => {
                                        document
                                        .getElementById("dd16button")
                                        .classList.toggle("-is-dd-active");
                                        document
                                        .getElementById("dd106content")
                                        .classList.toggle("-is-el-visible");
                                    }}
                                    className="dropdown js-dropdown js-category-active"
                                    >
                                    <div
                                        className="dropdown__button d-flex items-center text-14 bg-white -dark-bg-dark-2 border-light rounded-8 px-20 py-10 "
                                        data-el-toggle=".js-category-toggle"
                                        data-el-toggle-active=".js-category-active"
                                    >
                                        <span className="js-dropdown-title">choisir</span>
                                        <i className="icon text-9 ml-40 icon-chevron-down"></i>
                                    </div>

                                    <div
                                        id="dd106content"
                                        className="toggle-element -dropdown -dark-bg-dark-2 -dark-border-white-10 js-click-dropdown js-category-toggle"
                                    >
                                        <div className="text-14 y-gap-15 js-dropdown-list">
                                        <div>
                                            <span className="d-block js-dropdown-link">
                                                Français
                                            </span>
                                        </div>
                                        <div>
                                            <span className="d-block js-dropdown-link">
                                                Yoruba
                                            </span>
                                        </div>
                                        <div>
                                            <span className="d-block js-dropdown-link">
                                                Espagnol
                                            </span>
                                        </div>
                                        <div>
                                            <span className="d-block js-dropdown-link">
                                                Allemand
                                            </span>
                                        </div>

                                        {/* <div>
                                            <a href="users/instructors" className="d-block js-dropdown-link">
                                            Enseignants
                                            </a>
                                        </div> */}

                                        </div>
                                    </div>
                                    </div>

                                    <div className="text-dark-1 ml-15">of the following:</div>
                                </div>

                                
                                </div>

                                <div className="text-16 py-20 px-30 fw-500">
                                    Pour vous aider à créer des contenus de cours accessibles, nous avons fourni aux formateurs des recommandations et des bonnes pratiques à prendre en compte lors de la création de nouveaux cours ou de la mise à jour de contenus existants. Examinez ces recommandations d'accessibilité et ces listes de contrôle pour indiquer si votre cours est conforme aux recommandations.
                                </div>

                                <Curriculum />
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
