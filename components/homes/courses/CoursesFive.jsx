"use client";

import React, { useEffect, useState } from "react";

import CourceCard from "../courseCards/CourseCardFive";
import { coursesData } from "@/data/courses";
import { courseStates } from "@/data/courses";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { get_categories, get_user_formations } from "@/services/core.service";
import { retrive_course_infos } from "@/utils/course";
import toast from "react-hot-toast";

export default function CoursesFive({ tabBtnStyle }) {
  const [showSlider, setShowSlider] = useState(false);
  const [pageItem, setPageItem] = useState([]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
  };

  useEffect(() => {

    get_user_formations()
      .then(response => {
        if(!response) {
          toast.error("An error occured")
        } else {
          get_categories()
          .then(categoryCourses => {
            let courses_data = []

            const idsToExclude = new Set(response.map(item => item.id));

            const formationsList = []

            for(const categoryCourse of categoryCourses) {
              if(categoryCourse.formations) {
                categoryCourse.formations = categoryCourse.formations.map(item => ({
                  ...item,
                  categoryTitle: categoryCourse.titre
                }))
                formationsList.push(...categoryCourse.formations)
              }
            }

            let res = formationsList.filter(formation => !idsToExclude.has(formation.id) )
    
            for(let i = 0; i < res.length; i++) {
              courses_data.push(...retrive_course_infos([res[i]], res[i].categoryTitle))
            }
        
            setPageItem(courses_data.length > 1 ? shuffleArray(courses_data) : courses_data)
          }).catch(err => {
            console.log(err)
            toast.error("Geting categories make error")
          })
        }
      })
      .catch(err => {
        toast.error("Something happen")
      })

  }, []);

  useEffect(() => {
    setShowSlider(true);
  }, []);
  return (
    pageItem.length > 0 && <section className="layout-pt-lg layout-pb-md">
      <div className="container">
        <div className="tabs -pills js-tabs">
          <div className="row y-gap-20 justify-between items-end">            <div className="col-auto">
              <div className="sectionTitle ">
                <h2 className="sectionTitle__title ">
                  Our recommended courses
                </h2>

                <p className="sectionTitle__text ">
                  {pageItem.length} unique online course list designs
                </p>
              </div>
            </div>

            {/* <div className="col-auto">
              <div className="tabs__controls d-flex justify-center x-gap-10 js-tabs-controls">
                {courseStates.map((elm, i) => (
                  <div key={i}>
                    <button
                      onClick={() => setCurrentCourseState(elm)}
                      className={`${
                        tabBtnStyle
                          ? tabBtnStyle
                          : "tabs__button px-20 py-8 rounded-200 js-tabs-button"
                      }  ${currentCourseState == elm ? "is-active" : ""} `}
                      data-tab-target=".-tab-item-1"
                      type="button"
                    >
                      {elm}
                    </button>
                  </div>
                ))}
              </div>
            </div> */}
          </div>

          <div className="tabs__content pt-60 lg:pt-50 js-tabs-content">
            <div className="tabs__pane -tab-item-1 is-active">
              <div
                className=" js-section-slider"
                data-gap="30"
                data-slider-cols="xl-4 lg-3 md-2 sm-2"
                data-aos="fade-left"
                data-aos-offset="80"
                data-aos-duration={800}
              >
                {showSlider && (
                  <Swiper
                    // {...setting}
                    modules={[Navigation, Pagination]}
                    className="overflow-hidden"
                    navigation={{
                      nextEl: ".course-five-right",
                      prevEl: ".course-five-left",
                    }}
                    // loop={true}
                    spaceBetween={30}
                    slidesPerView={1}
                    breakpoints={{
                      // when window width is >= 576px
                      450: {
                        slidesPerView: 2,
                      },
                      // when window width is >= 768px
                      768: {
                        slidesPerView: 3,
                      },
                      1200: {
                        // when window width is >= 992px
                        slidesPerView: 4,
                      },
                    }}
                  >
                    {pageItem.map((elm, i) => (
                      <SwiperSlide key={i}>
                        <CourceCard data={elm} index={i} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}

                <button className="course-five-left section-slider-nav -prev -dark-bg-dark-2 -white -absolute size-70 rounded-full shadow-5 js-prev">
                  <i className="icon icon-arrow-left text-24"></i>
                </button>

                <button className="course-five-right section-slider-nav -next -dark-bg-dark-2 -white -absolute size-70 rounded-full shadow-5 js-next">
                  <i className="icon icon-arrow-right text-24"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
