"use client";

import React from "react";
import CourseCard from "../courseCards/CourseCard";
import { coursesData } from "../../../data/courses";
import { useState, useEffect } from "react";
import { get_categories } from "@/services/core.service";
import toast from "react-hot-toast";
import { retrive_course_infos } from "@/utils/course";

export default function Courses() {
  const [filtered, setFiltered] = useState();
  const [category, setCategory] = useState("All Categories");
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    get_categories()
      .then(res => {
        let data = ["All Categories"]
        let courses_data = []

        for(let i = 0; i < res.length; i++) {
          data.push(res[i].titre)

          if(res[i].formations.length > 0)
            courses_data.push(...retrive_course_infos(res[i].formations, res[i].titre))
        }

        setCategories(data)
        setCourses(courses_data)
      }).catch(err => {
        console.log(err)
        toast.error("Geting categories make error")
      })
  }, [])

  useEffect(() => {

    /*
      {
        "id": 1,
        "imageSrc": "/assets/img/coursesCards/6.jpg",
        "authorImageSrc": "/assets/img/general/avatar-1.png",
        "title": "Learn Figma - UI/UX Design Essential Training",
        "rating": 4.3,
        "ratingCount": 1991,
        "lessonCount": 6,
        "duration": 1320,
        "level": "Beginner",
        "originalPrice": 199,
        "discountedPrice": 79,
        "paid": false,
        "category": "Design",
        "state": "Popular",
        "languange": "French",
        "authorName": "Jane Cooper",
        "viewStatus": "Good",
        "difficulty": "Easy",
        "desc": "Introductory course on web hosting, domain registration, and how you can easily publish and edit your website online."
      },
    */

    if (category == "All Categories") {
      setFiltered();
    } else {
      const filteredData = courses.filter(
        (elm) => elm.category == category,
      );
      setFiltered(filteredData);
    }
  }, [category]);

  return (
    <section className="layout-pt-lg layout-pb-lg">
      <div className="row justify-center text-center">
        <div className="col-auto">
          <div className="sectionTitle ">
            <h2 className="sectionTitle__title sm:text-24">
              Our Most Popular Courses
            </h2>

            <p className="sectionTitle__text ">
              10 + unique online course list designs
            </p>
          </div>
        </div>
      </div>
      <div className="tabs__controls flex-wrap  pt-50 d-flex justify-center x-gap-10 js-tabs-controls">
        {categories.length > 0 && categories.map((elm, i) => (
          <div onClick={() => setCategory(elm)} key={`category-for-course-${i}`}>
            <button
              className={`tabs__button px-15 py-8 rounded-8 js-tabs-button ${
                category == elm ? "tabActive" : ""
              } `}
              data-tab-target=".-tab-item-2"
              type="button"
            >
              {elm}
            </button>
          </div>
        ))}
      </div>

      <div
        className="pt-60 m-auto row y-gap-30 container pl-0 pr-0"
        data-aos="fade-right"
        data-aos-offset="80"
        data-aos-duration={800}
      >
        {filtered
          ? filtered.map((elm, index) => (
              <CourseCard
                key={index}
                data={elm}
                index={index}
                data-aos="fade-right"
                data-aos-duration={(index + 1) * 300}
              />
            ))
          : courses
              .slice(0, 8)
              .map((elm, index) => <CourseCard key={index} data={elm} />)}
      </div>
    </section>
  );
}
