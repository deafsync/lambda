


"use client";

import ReactPlayer from 'react-player'

import Instractor from "./Instractor";
import Reviews from "./ReviewSecond";
import Overview from "./Overview";
import CourseContent from "./CourseContent";
import Star from "../common/Star";
import { coursesData } from "@/data/courses";
import React, { useState, useEffect } from "react";
import PinContentTwo from "./PinContentTwo";
import Preloader from '@/components/common/Preloader'
import Link from 'next/link';
import { data } from "@/data/stt";

import ModalVideoComponent from "../common/ModalVideo";
import Image from "next/image";
const menuItems = [
  { id: 1, href: "#original", text: "Original", isActive: true },
  { id: 2, href: "#cible", text: "Cible", isActive: false },
];

export default function AsideStudio({ id }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const [text, setText] = useState(data);
  const [captions_arr, setCaptions] = useState([
    {kind: 'subtitles', src: 'farming.en.vtt', srcLang: 'en', default: true},
  ]);

  let mySubtitle_arr = captions_arr.map((v) => ({
    kind: v.kind,
    src: v.src,
    srcLang: v.file_lang_code,
  }));

  const handleChange = (index) => {
    /* FETCH DATA --> MODIFY VTT FILE IN BACKEND*/
  }

  const handleSave = (event) => {
    event.preventDefault()
    // SAVE UPDATE
    alert("SAVE")
  }

  return (
    <div  className="main-content  " >
        <Preloader/>
        <header className="header -type-1 js-header">
            <div className="header__container py-10">
                <div className="row justify-between items-center">
                <div className="col-auto">
                    <div className="header-left d-flex items-center">
                    <div className="header__logo">
                        <Link data-barba href="/">
                        <Image
                            width={140}
                            height={50}
                            src="/assets/img/general/logo-dark-f.svg"
                            alt="logo"
                        />
                        </Link>
                    </div>
                    <div className="header-search-field ml-30">
                    </div>
                    </div>
                </div>

                <div className="col-auto lg:d-none">
                    <div className="text-20 lh-1 text-white fw-500">
                    The Ultimate Drawing Course Beginner to Advanced
                    </div>
                </div>

                <div className="col-auto">
                    <div className="header-right d-flex items-center">
                        <div className="header-right__buttons">
                            <span onClick={handleSave} className="button -sm -rounded -white text-dark-1">
                                Enrégistrer
                            </span>
                        </div>
                        <div className="header-right__buttons">
                            <a href="/course/1" className="button -sm -rounded -white--1 ml-10 text-dark-1">
                                Quitter
                            </a>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </header>
        <div  className="content-wrapper  js-content-wrapper overflow-hidden" style={{marginTop: '84px'}}>
            <section  className="">
              <div  className="overflow-hidden">
                <div  className="row justify-start flex-column flex-lg-row">
                    <>
                        <div  className="col col-xxl-8 col-xl-7 col-lg-8 justify-center p-0">

                            <div className="video--size">
                                <video 
                                    controls
                                    width='100%'
                                    height='100%'
                                >
                                    <source src="/assets/img/general/video.mp4" type="video/mp4" />
                                    <track
                                        label="English"
                                        kind="subtitles"
                                        srclang="en"
                                        src="/subs/farming.vtt"
                                        default 
                                    />
                                    <track
                                        label="English"
                                        kind="subtitles"
                                        srclang="en"
                                        src="/subs/farming.vtt"
                                    />
                                </video>

                            </div>
                        </div>
                        <div className='col col-xxl-4 col-xl-5 col-lg-4 p-0'>
                                <div className="js-pin-container relative">
                                    <section className="pt-10">
                                        <div className="aside--stt">
                                        <div className="row">
                                            <div className="col-lg-12">
                                            <div className="pt-25 pb-30 px-30 bg-white shadow-2 rounded-8 border-light">
                                                <div className="tabs -active-purple-2 js-tabs pt-0">
                                                <div className="tabs__controls d-flex js-tabs-controls">
                                                    {menuItems.map((elm, i) => (
                                                        <button
                                                            key={i}
                                                            onClick={() => setActiveTab(elm.id)}
                                                            className={`tabs__button text-18 pb-10 js-tabs-button js-update-pin-scene ${
                                                            i != 0 ? "ml-30" : ""
                                                            } ${activeTab == elm.id ? "is-active" : ""} `}
                                                            type="button"
                                                        >
                                                            {elm.text}
                                                        </button>
                                                    ))}
                                                </div>

                                                <div className="tabs__content   js-tabs-content">
                                                    <div
                                                    className={`tabs__pane -tab-item-1 ${
                                                        activeTab == 1 ? "is-active" : ""
                                                    } `}
                                                    >
                                                        {text.map((el, index) => (
                                                        <div className="stt__item">
                                                            {el[0]}
                                                            <div>
                                                                <textarea
                                                                    onClick={(event) => {
                                                                        event.preventDefault()
                                                                        handleChange(index)
                                                                    }}
                                                                    value={el[1]}
                                                                    className='text__focus pt-10'
                                                                    type="text"
                                                                >
                                                                </textarea>
                                                            </div>
                                                        </div>))}
                                                    </div>

                                                    <div
                                                    className={`tabs__pane -tab-item-2 ${
                                                        activeTab == 2 ? "is-active" : ""
                                                    } `}
                                                    >
                                                        {text.map((el, index) => (
                                                        <div className="stt__item">
                                                            {el[0]}
                                                            <div>
                                                                <textarea
                                                                    onClick={(event) => {
                                                                        event.preventDefault()
                                                                        handleChange(index)
                                                                    }}
                                                                    value={el[1]}
                                                                    className='text__focus pt-10'
                                                                    type="text"
                                                                >
                                                                </textarea>
                                                            </div>
                                                        </div>))}
                                                    </div>
                                                </div>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    </section>
                                </div>
                        </div>
                    </>
                </div>
              </div>
            </section>
          </div>
    </div>
  );
}
