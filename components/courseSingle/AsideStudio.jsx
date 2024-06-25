


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

import { useRouter } from 'next/navigation';

import ModalVideoComponent from "../common/ModalVideo";
import Image from "next/image";

const menuItems = [
  { id: 1, href: "#original", text: "Original", isActive: true },
  { id: 2, href: "#cible", text: "Cible", isActive: false },
];

import {toast} from "react-hot-toast"
import { get_course } from '@/services/core.service';
import axios from 'axios';
import { convertWebVTTToJsArray } from '@/utils/vtt';

export default function AsideStudio({ id }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const [captions_arr, setCaptions] = useState([
    {kind: 'subtitles', src: 'farming.en.vtt', srcLang: 'en', default: true},
  ]);

  const [data, setData] = useState([])
  const [dataFr, setDataFr] = useState([])

  const [dub, setDub] = useState([])
  const [sub, setSub] = useState([])

  const [state, setState] = useState(null)

//   useEffect(() => {
//     setTextFr(JSON.parse(JSON.stringify(dataFr)))
//   }, [])

  useEffect(() => {
    get_course(id)
        .then( res => {
            if(res) {
                toast.success('Studio started')
                setDub(res.ressources.filter(el => el.type_ressource == "Dubbing"))

                let data = res.ressources.filter(el => el.type_ressource == "Subtitle")

                data.map(async el => {
                    const response = await axios.get(el.file_link);
                    const subtitleText = response.data;

                    // Extract subtitle content from response
                    el.sub = subtitleText

                    if(el.description == "original subtitles") {
                        setData(convertWebVTTToJsArray(subtitleText))
                    } else if(el.description == "dubbed subtitles") {
                        console.log("----->------->------>", convertWebVTTToJsArray(subtitleText))
                        setDataFr(convertWebVTTToJsArray(subtitleText))
                    }

                    return el
                })

                setSub(data)
                setState(res)

                console.log("SUB ===> ", res.ressources.filter(el => el.type_ressource == "Subtitle"))
            } else {
                toast.error("An error occured")
            }
        }).catch(err => {
            console.log(err)    
        })
  }, [])

  const router = useRouter()

    //   let mySubtitle_arr = captions_arr.map((v) => ({
    //     kind: v.kind,
    //     src: v.src,
    //     srcLang: v.file_lang_code,
    //   }));

  const handleChange = (event, index, original) => {
    let infos

    infos = [...textFr]
    infos[index][1] = event.target.value

    setTextFr(infos)

    /* TODO: FETCH DATA --> MODIFY VTT FILE IN BACKEND*/
  }

  const handleSave = (event) => {
    event.preventDefault()

    // Compare textFr to old sub data
    let result = []

    for(let i = 0; i < dataFr.length; i++) {
        if(dataFr[i][1] != textFr[i][1]) {
            result.push([...textFr[i], i])
        }
    }

    console.log(result)

    // TODO: SAVE UPDATE & check id updated
    if(result.length == 0) {
        toast.success("Nothing to save")
    } else {
        toast.success("SAVE !!")
        router.push('/dashboard/course/1')
    }
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
                    {state && state.titre}
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
                            <a href="/dashboard/course" className="button -sm -rounded -white--1 ml-10 text-dark-1">
                                Quitter
                            </a>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </header>
        <div className="content-wrapper  js-content-wrapper overflow-hidden" style={{marginTop: '84px'}}>
            <section className="">
              <div className="overflow-hidden">
                <div className="row justify-start flex-column flex-lg-row">
                    <>
                        <div className="col col-xxl-8 col-xl-7 col-lg-8 justify-center p-0">

                            <div className="video--size">
                                {dub.length && sub.length && <video 
                                    controls
                                    width='100%'
                                    height='100%'
                                >
                                    <source 
                                        src={dub && dub.length > 0 ? dub[0].file_link : "/assets/img/general/video.mp4" }
                                        type="video/mp4"
                                    />
                                    {/* {sub.length > 0 && sub.map((el, i) => (<track
                                            label={el.titre}
                                            kind="subtitles"
                                            srclang={el.titre}
                                            src=""
                                            // default={i == 0}
                                        >{el.sub}</track>))} */}
                                </video>}

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
                                                        {data.length > 0 && data.map((el, index) => (
                                                            <div className="stt__item" key={`text-${index}`}>
                                                                {el[0]}
                                                                <div>
                                                                    <textarea
                                                                        value={data[index][1]}
                                                                        className=' pt-10'
                                                                        type="text"
                                                                        disabled
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
                                                        {dataFr.length > 0 && dataFr.map((el, index) => (
                                                            <div className="stt__item" key={`textfr-${index}`}>
                                                                {el[0]}
                                                                <div>
                                                                    <textarea
                                                                        onChange={(event) => {
                                                                            event.preventDefault()
                                                                            handleChange(event, index, false)
                                                                        }}
                                                                        value={dataFr[index][1]}
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
