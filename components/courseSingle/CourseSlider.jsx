"use client";
import { coursesData } from "@/data/courses";
import React, { useEffect, useState } from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Star from "../common/Star";
import Image from "next/image";
import Link from "next/link";
import { get_admin_formations, get_categories } from "@/services/core.service";
import toast from "react-hot-toast";
import { retrive_course_infos } from "@/utils/course";

export default function CourseSlider() {
  const [showSlider, setShowSlider] = useState(false);

  const [pageItem, setPageItem] = useState([]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
  };

  useEffect(() => {

    get_admin_formations()
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

  console.log(pageItem)

  return (
    pageItem.length > 0 && <section className="layout-pt-md layout-pb-lg">
      <div className="container">
        <div className="row">
          <div className="col-auto">
            <div className="sectionTitle ">
              <h2 className="sectionTitle__title ">You May Like</h2>

              <p className="sectionTitle__text ">
              {pageItem.length} unique online course that you may like
              </p>
            </div>
          </div>
        </div>

        <div className="relative pt-60 lg:pt-50">
          <div className="overflow-hidden js-section-slider">
            {(
              <Swiper
                // {...setting}
                modules={[Navigation, Pagination]}
                navigation={{
                  nextEl: ".js-courses-next-one",
                  prevEl: ".js-courses-prev-one",
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
                {pageItem.slice(0, 8).map((elm, i) => (
                  <SwiperSlide key={i}>
                    <div className="swiper-slide">
                      <div className="coursesCard -type-1 ">
                        <div className="relative">
                          <div className="coursesCard__image overflow-hidden rounded-8">
                            <Image
                              width={510}
                              height={360}
                              className="w-1/1"
                              src={elm.imageSrc}
                              alt="image"
                            />
                            <div className="coursesCard__image_overlay rounded-8"></div>
                          </div>
                          <div className="d-flex justify-between py-10 px-10 absolute-full-center z-3"></div>
                        </div>

                        <div className="h-100 pt-15">
                          <div className="d-flex items-center">
                            <div className="text-14 lh-1 text-yellow-1 mr-10">
                              {elm.rating}
                            </div>
                            <div className="d-flex x-gap-5 items-center">
                              <Star star={elm.rating} />
                            </div>
                            {/* <div className="text-13 lh-1 ml-10">
                              ({elm.ratingCount})
                            </div> */}
                          </div>

                          <div className="text-17 lh-15 fw-500 text-dark-1 mt-10">
                            <Link
                              className="linkCustom"
                              href={`/course/${elm.id}`}
                            >
                              {elm.title}
                            </Link>
                          </div>

                          <div className="d-flex x-gap-10 items-center pt-10">
                            <div className="d-flex items-center">
                              <div className="mr-8">
                                <Image
                                  width={16}
                                  height={17}
                                  src="/assets/img/coursesCards/icons/1.svg"
                                  alt="icon"
                                />
                              </div>
                              <div className="text-14 lh-1">
                                {elm.lessonCount} lesson
                              </div>
                            </div>

                            <div className="d-flex items-center">
                              <div className="mr-8">
                                <Image
                                  width={16}
                                  height={17}
                                  src="/assets/img/coursesCards/icons/2.svg"
                                  alt="icon"
                                />
                              </div>
                              <div className="text-14 lh-1">{`${Math.floor(
                                elm.duration / 60,
                              )}h ${Math.floor(elm.duration % 60)}m`}</div>
                            </div>

                            <div className="d-flex items-center">
                              <div className="mr-8">
                                <Image
                                  width={16}
                                  height={17}
                                  src="/assets/img/coursesCards/icons/3.svg"
                                  alt="icon"
                                />
                              </div>
                              <div className="text-14 lh-1">{elm.level}</div>
                            </div>
                          </div>

                          <div className="coursesCard-footer">
                            <div className="coursesCard-footer__author">
                              <Image
                                width={30}
                                height={30}
                                src={elm.authorImageSrc ? elm.authorImageSrc : "/assets/img/auth/img_2.png"}
                                alt="image"
                              />
                              <div> Yao Ferdinand </div> {/* {elm.authorName} */}
                            </div>

                            <div className="coursesCard-footer__price">
                              {elm.paid ? (
                                <>
                                  <div>${elm.originalPrice}</div>
                                  <div>${elm.discountedPrice}</div>
                                </>
                              ) : (
                                <>
                                  <div></div>
                                  <div>Free</div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>

          { showSlider && <>
              <button className="section-slider-nav -prev -dark-bg-dark-2 -white -absolute size-70 rounded-full shadow-5 js-courses-prev-one">
              <i className="icon icon-arrow-left text-24"></i>
              </button>

              <button className="section-slider-nav -next -dark-bg-dark-2 -white -absolute size-70 rounded-full shadow-5 js-courses-next-one">
                <i className="icon icon-arrow-right text-24"></i>
              </button>
            </>
          }
        </div>
      </div>
    </section>
  );
}
