"use client";

import ModalVideoComponent from "@/components/common/ModalVideo";
import { lessonItems } from "@/data/aboutcourses";

import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import CourseDetailsFive from '@/components/courseSingle/CourseDetailsFive'
import Video from '@/components/aboutCourses/lesson/Video'
import { get_user } from "@/services/user.service";
import { get_user_formation } from "@/services/core.service";
import toast from "react-hot-toast";
import { BASE_URL } from "@/utils/url";

const lang_dic = {
  "en": "English",
  "fr": "Français",
  "yor": "Yoruba",
  "fon": "Fon",
}

export default function LessonItems({ rightPosition, id, course_id }) {
  const [openAccordion, setOpenAccordion] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  const [url, setUrl] = useState()
  const [videoId, setVideoId] = useState(0)
  const [dub, setDub] = useState(true)

  const [sub, setSub] = useState([])

  const [state, setState] = useState(null)
  const router = useRouter()

  const [language, setLanguage] = useState("Choose")

  useEffect(() => {
    get_user_formation(course_id)
      .then(res => {
        setState(res)

        setLanguage(lang_dic[res.langue])

        setSub(res.cours[videoId].ressources.filter(el => el.type_ressource == "Subtitle").map(el => ({
          link: el.file_link,
          lang: el.titre
        })))

        setUrl(`${BASE_URL}/${res.cours[videoId].video}`)
      }).catch(err => {
          console.log(err)
          toast.error("something happen")
      })
  }, [])

  const handleSwitch = (index) => {
    router.push(`${index+1}`)
  }

  const handleSwitchLanguage = (check) => {
    if(check) {
      setUrl(`${BASE_URL}/${state.cours[videoId].video}`)
      setDub(false)
    } else {
      let video = state.cours[videoId].ressources.filter(el => el.description == "dubbed video")
      setUrl(video[0].file_link)
      setDub(true)
    }
  }

  const handleSwitchCourse = (id) => {
    setVideoId(id)
    if(dub) {
      let video = state.cours[videoId].ressources.filter(el => el.description == "dubbed video")
      setUrl(video[0].file_link)
    } else {
      setUrl(`${BASE_URL}/${state.cours[videoId].video}`)
    }
  }

  return (
    <>
      <aside
        className={`lesson-sidebar--1 col-lg-3 col-md-4 ${
          rightPosition ? "-type-2 lg:order-2 " : "bg-light-3"
        } `}
      >
        <div className="px-10 sm:pt-20 sm:px-10">
          {/* <form onSubmit={handleSubmit} className="lesson-sidebar-search">
            <input type="text" required placeholder="Search" />
            <button className="" type="submit">
              <i className="icon-search text-20"></i>
            </button>
          </form> */}

        <div className="d-flex items-center mb-10 px-30">
            
            <b>
              <div 
                className="text-dark-1 mb-1 mr-15 text-17"
              ><span className="text-30"></span> <u>Course language :</u></div>
            </b>

            <div
                id="dd16button"
                onClick={() => {
                    window.document
                    .getElementById("dd16button")
                    .classList.toggle("-is-dd-active");
                    window.document
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
                    onClick={() => {
                      setLanguage("English")
                      handleSwitchLanguage(true)
                    }}
                >
                    <span className="d-block js-dropdown-link">
                        English
                    </span>
                </div>
                <div
                    onClick={() => {
                      setLanguage("Français")
                      handleSwitchLanguage(false)
                    }}
                >
                    <span className="d-block js-dropdown-link">
                        Français
                    </span>
                </div>

                </div>
            </div>
            </div>
        </div>

          <div className="accordion -block-2 text-left js-accordion">
            {state && state.cours.map((item, index) => (
              <div
                className={`accordion__item`}
                key={index}
                onClick={() => handleSwitchCourse(index)}
              >
                <div
                  className={`accordion__button py-20 px-30 bg-light-4`}
                  onClick={() => {
                    setOpenAccordion((pre) => !pre)
                  }}
                >
                  <div className="d-flex items-center">
                    <div className="accordion__icon">
                      <div className="icon" data-feather="chevron-up">
                        <FontAwesomeIcon icon={faChevronDown} />
                      </div>
                      <div className="icon" data-feather="chevron-up">
                        <FontAwesomeIcon icon={faChevronUp} />
                      </div>
                    </div>
                    <span className="text-17 fw-500 text-dark-1">
                      {item.titre}
                    </span>
                  </div>
                </div>

                {/* <div
                  className="accordion__content px-10 py-10"
                  style={openAccordion ? { maxHeight: "700px" } : {}}
                >
                  <div className="accordion__content__inner ">
                    <div className="y-gap-30">
                      {item.lessons.map((lesson, index) => (
                        <div 
                          className={`px-20 py-20 mt-20 mb-20 ${
                            id == lesson.id ? "lessons-active" : ""
                          }`} 
                          key={index}
                          onClick={() => handleSwitch(index)}
                        >
                          <div className="d-flex">
                            <div className="d-flex justify-center items-center size-30 rounded-full bg-purple-3 mr-10">
                              <div className="icon-play text-9"></div>
                            </div>
                            <div className="">
                              <div>{lesson.title}</div>
                              <div className="d-flex x-gap-20 items-center pt-5">
                                <span
                                  onClick={() => setIsOpen(true)}
                                  className="text-14 lh-1 text-purple-1 underline cursor"
                                >
                                  Preview
                                </span>
                                <div
                                  className="text-14 lh-1 text-purple-1"
                                >
                                  {lesson.duration}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div> */}
              </div>
            ))}
          </div>
        </div>
      </aside>
      <section  className="layout-pt-lg layout-pb-lg md:pt-40">
          <div  className="">
              <div  className="row justify-end">
                  <div  className="col-lg-9 col-md-8">
                      {url && <Video url={url} sub={sub} />}
                      {/*
                        TODO: Put video depend on the id
                      */}
                      <CourseDetailsFive id={course_id} />
                  </div>
              </div>
          </div>
      </section>
    </>
  );
}
