"use client";

import FooterNine from "../../layout/footers/FooterNine";
import Media from "./Media";
import Curriculum from "./Curriculum";
import React, { useState, useEffect } from "react";
import CurriculumDub from "./CurriculumDub";

import {toast} from "react-hot-toast" 
import { get_categories, get_one_formations } from "@/services/core.service";

const menuItems = [
    { id: 1, href: "#start", text: "Commencer", isActive: true },
    // { id: 3, href: "#medias", text: "Médias", isActive: false },
    { id: 2, href: "#structure", text: "Structure", isActive: false },
    { id: 4, href: "#subtitle", text: "Sous-titre", isActive: false },
    { id: 5, href: "#dubbing", text: "Doublage", isActive: false },
  ];

const formation = {
    titre: "Angular - The Complete Guide (2022 Edition)",
    description: "Introductory course on web hosting, domain registration, and how you can easily publish and edit your website online.",
    language: "english",
    level: "intermediate",
    category: 1,
    requirements: "Become a UX designer. You will be able to add UX designer to your CV. Become a UI designer. Build & test a full website design. Create your first UX brief & persona. How to use premade UI kits.",
    willLearn: "You will need a copy of Adobe XD 2019 or above. A free trial can be downloaded from Adobe. No previous design experience is needed. No previous Adobe XD skills are needed."

    // profondeur
}

const category = [
    { id: 1, titre: "Software & IT"},
    { id: 2, titre: "Design"},
    { id: 3, titre: "Finance"},
    { id: 4, titre: "Business"}
  ]  

export default function Listing({id}) {
  const [activeTab, setActiveTab] = useState(1);
  

  const [language, setLanguage] = useState("choose")
  const [dubLanguage, setDubLanguage] = useState("choose")
  const [category, setCategory] = useState([])

  const [state, setState] = useState({
    titre: "",
    description: "",
    langue: "",
    level: "",
    categorie: 1,
    prerequis: "",
    will_learn: "",
    langue_dub: "",
    langue_subtitles: "",
    montant: 0
  })

  useEffect(() => {
    get_categories()
      .then(res => {
        let data = []
        for(let i = 0; i < res.length; i++) {
          data.push({
            id: res[i].id,
            title: res[i].titre,
          })
        }
        setCategory(data)
      }).catch(err => {
        console.log(err)
        toast.error("Geting categories make error")
      })
  }, [])

  useEffect(() => {
    get_one_formations(id.id)
        .then(res => {

            console.log("****************", res)

            setState(res)
        }).catch(err => {
            console.log(err)
            toast.error("something happen")
        })
  }, [])

    // TODO: Retrive course data

  const handleChange = (event) => {
    const {name, value} = event.target
    setState({...state, [name]: value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    toast.success("Course information updated")
    console.log(state)
  };

  const handleAddLanguage = (e) => {
    e.preventDefault();

    if(language == "choose") {
        toast.error("Choose a language else don't save!")
    } else {
        toast.success("Subtitle added")
    }

    console.log(language)
  }


  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row pb-10 mb-0">
          <div className="col-auto">
            <h1 className="text-30 lh-12 fw-700">Manage your course</h1>
            <div className="mt-10">
              Here you will manage your course structure, media, subtitles, dubs, ...
            </div>
          </div>
        </div>

        <section className="layout-pt-lg layout-pb-md">
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
                                                Course Title
                                            </label>
                                            <input
                                                required
                                                name="titre"
                                                value={state.titre}
                                                type="text"
                                                onChange={handleChange}
                                                placeholder="Learn Figma - UI/UX Design Essential Training"
                                            />
                                        </div>

                                        <div className="col-12">
                                            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                                                Course Description
                                            </label>

                                            <textarea
                                                required
                                                name="description"
                                                value={state.description}
                                                placeholder="Description"
                                                rows="7"
                                                onChange={handleChange}
                                            ></textarea>
                                        </div>

                                        <div className="col-md-6">
                                            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                                                What will students learn in your course?*
                                            </label>

                                            <textarea
                                                required
                                                name="will_learn"
                                                value={state.will_learn}
                                                placeholder="Description"
                                                rows="7"
                                                onChange={handleChange}
                                            ></textarea>
                                        </div>

                                        <div className="col-md-6">
                                            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                                                Requirements
                                            </label>

                                            <textarea
                                            required
                                            name="prerequis"
                                            value={state.prerequis}
                                            placeholder="Requirements"
                                            rows="7"
                                            onChange={handleChange}
                                            ></textarea>
                                        </div>

                                        <div className="col-md-6">
                                            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                                            Course Level*
                                            </label>

                                            <select 
                                                name="level"
                                                value={state.level}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select your level</option>
                                                <option value="Beginner">Beginner</option>
                                                <option value="Intermediate">Intermediate</option>
                                                <option value="Expert">Expert</option>
                                            </select>
                                        </div>

                                        <div className="col-md-6">
                                            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                                            Audio Language*
                                            </label>

                                            <select 
                                                name="langue"
                                                value={state.langue}
                                                onChange={handleChange}
                                            >
                                            <option value="">Select your language</option>
                                            <option value="en">English</option>
                                            <option value="fr">Français</option>
                                            <option value="fon">Fongbé</option>
                                            <option value="yor">Yoruba</option>
                                            </select>
                                        </div>

                                        <div className="col-md-6">
                                            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                                            Dubbing Language*
                                            </label>

                                            <select 
                                                name="langue_dub"
                                                value={state.langue_dub}
                                                onChange={handleChange}
                                            >
                                            <option value="">Select your language</option>
                                            <option value="en">English</option>
                                            <option value="fr">Français</option>
                                            <option value="fon">Fongbé</option>
                                            <option value="yor">Yoruba</option>
                                            </select>
                                        </div>

                                        <div className="col-md-6">
                                            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                                            Subtitle Language*
                                            </label>

                                            <select 
                                            name="langue_subtitles"
                                            value={state.langue_subtitles}
                                            onChange={handleChange}
                                            >
                                            <option value="">Select your language</option>
                                            <option value="en">English</option>
                                            <option value="fr">Français</option>
                                            <option value="fon">Fongbé</option>
                                            <option value="yor">Yoruba</option>
                                            </select>
                                        </div>

                                        <div className="col-md-6">
                                            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                                            Amount
                                            </label>

                                            <input
                                            required
                                            name="montant"
                                            type="number"
                                            value={state.montant}
                                            placeholder="10"
                                            onChange={handleChange}
                                            />
                                        </div>

                                        {/* <div className="col-md-6">
                                            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                                            Close Caption*
                                            </label>

                                            <input required type="text" placeholder="Select" />
                                        </div> */}

                                        <div className="col-md-6">
                                            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                                            Course Category*
                                            </label>

                                            <select 
                                            name="categorie"
                                            value={state.categorie}
                                            onChange={handleChange}
                                            >
                                            {category.map((elm, index) => <option key={`option-course-create-${index}`} value={elm.id}>{elm.title}</option>)}
                                            </select>
                                        </div>
                                    </form>

                                    <div className="row y-gap-20 justify-between pt-15">
                                    <div className="col-auto">
                                        
                                    </div>

                                    <div className="col-auto">
                                        <button 
                                            className="button -md -purple-1 text-white"
                                            onClick={(e) => {
                                                handleSubmit(e)
                                            }}
                                        >
                                            Save
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

                                <Curriculum id={id.id}/>
                            </div>
                        </div>
                    </div>

                    {/* <div
                        className={`tabs__pane -tab-item-3 ${
                        activeTab == 3 ? "is-active" : ""
                        } `}
                    >
                        <Media />
                    </div> */}

                    <div
                        className={`tabs__pane -tab-item-4 ${
                        activeTab == 4 ? "is-active" : ""
                        } `}
                    >
                        <div className="col-12">
                            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
                                <div className="d-flex items-center py-20 px-30 border-bottom-light">
                                    <h2 className="text-17 lh-1 fw-500">Subtitles</h2>
                                </div>

                                <div className="border-light rounded-8">
                                <div className="d-flex items-center py-25 px-30">
                                    <div className="text-dark-1 mr-5">Subtitle language</div>

                                    {/* <div
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
                                        <span className="js-dropdown-title">{language}</span>
                                        <i className="icon text-9 ml-40 icon-chevron-down"></i>
                                    </div>

                                    <div
                                        id="dd16content"
                                        className="toggle-element -dropdown -dark-bg-dark-2 -dark-border-white-10 js-click-dropdown js-category-toggle"
                                    >
                                        <div className="text-14 y-gap-15 js-dropdown-list">
                                        <div
                                            onClick={() => setLanguage("Français")}
                                        >
                                            <span className="d-block js-dropdown-link">
                                                Français
                                            </span>
                                        </div>
                                        <div
                                            onClick={() => setLanguage("Fongbé")}
                                        >
                                            <span className="d-block js-dropdown-link">
                                                Fongbé
                                            </span>
                                        </div>

                                        <div>
                                            <a href="users/instructors" className="d-block js-dropdown-link">
                                            Enseignants
                                            </a>
                                        </div>

                                        </div>
                                    </div>
                                    </div> */}

                                    <div className="text-dark-1 ml-15"><b>{state && state.langue}</b> - to - <b>{state && state.langue_subtitles}</b></div>
                                </div>

                                
                                </div>

                                <div className="text-16 py-20 px-30 fw-500">
                                    Learners, whatever their level of language proficiency, greatly appreciate subtitles as they help them to follow, understand and remember the content.Subtitles are also essential to ensure that content is accessible to the deaf and hard-of-hearing. 
                                </div>

                                {/* <Curriculum
                                    setActiveTab={setActiveTab}
                                /> */}

                                <div className="row px-30 py-20  y-gap-20 justify-between pt-30">
                                    <div className="col-auto sm:w-1/1">
                                    
                                    </div>

                                    <div className="col-auto sm:w-1/1">
                                        <button 
                                            className="button -md -purple-1 text-white sm:w-1/1"
                                            onClick={handleAddLanguage}
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
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
                                    <h2 className="text-17 lh-1 fw-500">Dubbing</h2>
                                </div>

                                <div className="border-light rounded-8">
                                    <div className="d-flex items-center py-25 px-30">
                                    <div className="text-dark-1 mr-5">Dubbing language</div>

                                    {/* <div
                                        id="dd17button"
                                        onClick={() => {
                                            document
                                            .getElementById("dd17button")
                                            .classList.toggle("-is-dd-active");
                                            document
                                            .getElementById("dd17content")
                                            .classList.toggle("-is-el-visible");
                                        }}
                                        className="dropdown js-dropdown js-category-active"
                                    >
                                    <div
                                        className="dropdown__button d-flex items-center text-14 bg-white -dark-bg-dark-2 border-light rounded-8 px-20 py-10 "
                                        data-el-toggle=".js-category-toggle"
                                        data-el-toggle-active=".js-category-active"
                                    >
                                        <span className="js-dropdown-title">{dubLanguage}</span>
                                        <i className="icon text-9 ml-40 icon-chevron-down"></i>
                                    </div>

                                    <div
                                        id="dd17content"
                                        className="toggle-element -dropdown -dark-bg-dark-2 -dark-border-white-10 js-click-dropdown js-category-toggle"
                                    >
                                        <div className="text-14 y-gap-15 js-dropdown-list">
                                        <div
                                            onClick={() => setDubLanguage("Français")}
                                        >
                                            <span className="d-block js-dropdown-link">
                                                Français
                                            </span>
                                        </div>

                                        <div>
                                            <a href="users/instructors" className="d-block js-dropdown-link">
                                            Enseignants
                                            </a>
                                        </div>

                                        </div>
                                    </div>
                                    </div> */}

                                    <div className="text-dark-1 ml-15"><b>{state && state.langue}</b> - to - <b>{state && state.langue_dub}</b></div>
                                </div>

                                
                                </div>

                                <div className="text-16 py-20 px-30 fw-500">
                                To help you create accessible course content, we have provided trainers with recommendations and best practices to consider when creating new courses or updating existing content. Review these accessibility recommendations and checklists to see if your course complies with the recommendations.
                                </div>

                                <CurriculumDub
                                    language={dubLanguage}
                                    id={id.id}
                                />
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
