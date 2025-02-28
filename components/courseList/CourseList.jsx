


"use client";

import {
  categories,
  coursesData,
  duration,
  instractorNames,
  languages,
  levels,
  prices,
  rating,
  sortingOptions,
} from "@/data/courses";
import React, { useState, useEffect } from "react";
import Star from "../common/Star";

import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

import { useContextElement } from "@/context/Context";
import PaginationTwo from "../common/PaginationTwo";
import toast from "react-hot-toast";
import { get_categories } from "@/services/core.service";
import { retrive_course_infos } from "@/utils/course";

export default function CourseList({idCategory}) {

  const [categories, setCategories] = useState([]);
  const [coursesData, setCoursesData] = useState([]);

  useEffect(() => {
    get_categories()
      .then(res => {
        let data = []
        let courses_data = []

        for(let i = 0; i < res.length; i++) {
          data.push({
            id: `categories-list-${i}`,
            title: res[i].titre
          })

          if(res[i].formations.length > 0)
            courses_data.push(...retrive_course_infos(res[i].formations, res[i].titre))
        }

        console.log("----------------->", data)

        setCategories(data)
        setCoursesData(courses_data)
      }).catch(err => {
        console.log(err)
        toast.error("Geting categories make error")
      })
  }, [])


  const [categoryOpen, setCategoryOpen] = useState(true);
  const [ratingOpen, setRatingOpen] = useState(true);
  const [instractorOpen, setInstractorOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const [levelOpen, setLevelOpen] = useState(true);
  const [openLanguage, setOpenLanguage] = useState(true);
  const [durationOpen, setDurationOpen] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  const { isAddedToCartCourses, addCourseToCart } = useContextElement();

  const [filterCategories, setFilterCategories] = useState([]);
  const [filterRatingRange, setFilterRatingRange] = useState([]);
  const [filterInstractors, setFilterInstractors] = useState([]);
  const [filterPrice, setFilterPrice] = useState("All");
  const [filterLevels, setFilterLevels] = useState([]);
  const [filterlanguange, setFilterlanguange] = useState([]);
  const [filterDuration, setFilterDuration] = useState([]);
  const [filterDublanguange, setFilterDublanguange] = useState([]);

  const [currentSortingOption, setCurrentSortingOption] = useState("Default");

  const [filteredData, setFilteredData] = useState([]);

  const [sortedFilteredData, setSortedFilteredData] = useState([]);

  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const refItems = coursesData.filter((elm) => {
      if (filterPrice == "All") {
        return true;
      } else if (filterPrice == "Free") {
        return !elm.paid;
      } else if (filterPrice == "Paid") {
        return elm.paid;
      }
    });

    let filteredArrays = [];

    if (filterInstractors.length > 0) {
      const filtered = refItems.filter((elm) =>
        filterInstractors.includes(elm.authorName),
      );
      filteredArrays = [...filteredArrays, filtered];
    }
    if (filterCategories.length > 0) {
      const filtered = refItems.filter((elm) =>
        filterCategories.includes(elm.category),
      );
      filteredArrays = [...filteredArrays, filtered];
    }
    if (filterLevels.length > 0) {
      const filtered = refItems.filter((elm) =>
        filterLevels.includes(elm.level),
      );
      filteredArrays = [...filteredArrays, filtered];
    }
    if (filterlanguange.length > 0) {
      const filtered = refItems.filter((elm) =>
        filterlanguange.includes(elm.language),
      );
      filteredArrays = [...filteredArrays, filtered];
    }
    if (filterDublanguange.length > 0) {
      const filtered = refItems.filter((elm) =>
        filterDublanguange.includes(elm.dub_language),
      );
      filteredArrays = [...filteredArrays, filtered];
    }
    if (filterRatingRange.length > 0) {
      const filtered = refItems.filter(
        (elm) =>
          elm.rating >= filterRatingRange[0] &&
          elm.rating <= filterRatingRange[1],
      );
      filteredArrays = [...filteredArrays, filtered];
    }
    if (filterDuration.length > 0) {
      const filtered = refItems.filter(
        (elm) =>
          elm.duration >= filterDuration[0] &&
          elm.duration <= filterDuration[1],
      );
      filteredArrays = [...filteredArrays, filtered];
    }

    const commonItems = refItems.filter((item) =>
      filteredArrays.every((array) => array.includes(item)),
    );
    setFilteredData(commonItems);
    setPageNumber(1);
  }, [
    filterCategories,
    filterRatingRange,
    filterInstractors,
    filterPrice,
    filterLevels,
    filterlanguange,
    filterDuration,
    filterDublanguange,
    coursesData
  ]);

  useEffect(() => {
    if (currentSortingOption == "Default") {
      setSortedFilteredData(filteredData);
    } else if (currentSortingOption == "Rating (asc)") {
      setSortedFilteredData(
        [...filteredData].sort((a, b) => a.rating - b.rating),
      );
    } else if (currentSortingOption == "Rating (dsc)") {
      setSortedFilteredData(
        [...filteredData].sort((a, b) => b.rating - a.rating),
      );
    } else if (currentSortingOption == "Price (asc)") {
      setSortedFilteredData(
        [...filteredData].sort((a, b) => a.discountedPrice - b.discountedPrice),
      );
    } else if (currentSortingOption == "Price (dsc)") {
      setSortedFilteredData(
        [...filteredData].sort((a, b) => b.discountedPrice - a.discountedPrice),
      );
    } else if (currentSortingOption == "Duration (asc)") {
      setSortedFilteredData(
        [...filteredData].sort((a, b) => a.duration - b.duration),
      );
    } else if (currentSortingOption == "Duration (dsc)") {
      setSortedFilteredData(
        [...filteredData].sort((a, b) => b.duration - a.duration),
      );
    }
  }, [currentSortingOption, filteredData]);

  useEffect(() => {
    if(idCategory && idCategory !== 0) {
        handleFilterCategories(categories[idCategory.split("-")[1]]?.title)
    }
  }, [idCategory, categories])

  const handleFilterCategories = (item) => {
    if (filterCategories.includes(item)) {
      const filtered = filterCategories.filter((elm) => elm != item);
      setFilterCategories([...filtered]);
    } else {
      setFilterCategories((pre) => [...pre, item]);
    }
  };
  const handleFilterRatingRange = (item) => {
    setFilterRatingRange(item);
  };
  const handleFilterInstractors = (item) => {
    if (filterInstractors.includes(item)) {
      const filtered = filterInstractors.filter((elm) => elm != item);
      setFilterInstractors([...filtered]);
    } else {
      setFilterInstractors((pre) => [...pre, item]);
    }
  };
  const handleFilterPrice = (item) => {
    setFilterPrice(item);
  };
  const handleFilterLevels = (item) => {
    if (filterLevels.includes(item)) {
      const filtered = filterLevels.filter((elm) => elm != item);
      setFilterLevels([...filtered]);
    } else {
      setFilterLevels((pre) => [...pre, item]);
    }
  };
  const handleFilterlanguange = (item) => {
    if (filterlanguange.includes(item)) {
      const filtered = filterlanguange.filter((elm) => elm != item);
      setFilterlanguange([...filtered]);
    } else {
      setFilterlanguange((pre) => [...pre, item]);
    }
  };
  const handleFilterDublanguange = (item) => {
    if (filterDublanguange.includes(item)) {
      const filtered = filterDublanguange.filter((elm) => elm != item);
      setFilterDublanguange([...filtered]);
    } else {
      setFilterDublanguange((pre) => [...pre, item]);
    }
  }; 
  const handleFilterDuration = (item) => {
    setFilterDuration(item);
  };

  console.log("FILTERED DATA", coursesData)

  return (
    <>
      <section className="page-header -type-1">
        <div className="container">
          <div className="page-header__content">
            <div className="row">
              <div className="col-auto">
                <div>
                  <h1 className="page-header__title">Course list</h1>
                </div>

                <div>
                  <p className="page-header__text">
                    Here is the course list that you can filter by category or price or ...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row y-gap-50">
            <div className="col-xl-3 col-lg-4 lg:d-none">
              <div className="pr-30 lg:pr-0">
                <div className="sidebar -courses">
                  {idCategory === 0 && <div className="sidebar__item">
                    <div className="accordion js-accordion">
                      <div
                        className={`accordion__item js-accordion-item-active ${
                          categoryOpen ? "is-active" : ""
                        } `}
                      >
                        <div
                          className="accordion__button items-center"
                          onClick={() => setCategoryOpen((pre) => !pre)}
                        >
                          <h5 className="sidebar__title">Category</h5>

                          <div className="accordion__icon">
                            <div className="icon icon-chevron-down"></div>
                            <div className="icon icon-chevron-up"></div>
                          </div>
                        </div>

                        <div
                          className="accordion__content"
                          style={categoryOpen ? { maxHeight: "350px" } : {}}
                        >
                          <div className="accordion__content__inner">
                            <div className="sidebar-checkbox">
                              <div
                                onClick={() => setFilterCategories([])}
                                className="sidebar-checkbox__item"
                              >
                                <div className="form-checkbox">
                                  <input
                                    type="checkbox"
                                    checked={
                                      filterCategories.length ? false : true
                                    }
                                  />
                                  <div className="form-checkbox__mark">
                                    <div className="form-checkbox__icon icon-check"></div>
                                  </div>
                                </div>

                                <div className="sidebar-checkbox__title">
                                  All
                                </div>
                                <div className="sidebar-checkbox__count"></div>
                              </div>
                              {categories.map((elm, i) => (
                                <div
                                  key={i}
                                  onClick={() =>
                                    handleFilterCategories(elm.title)
                                  }
                                  className="sidebar-checkbox__item cursor"
                                >
                                  <div className="form-checkbox">
                                    <input
                                      type="checkbox"
                                      checked={
                                        filterCategories.includes(elm.title)
                                          ? true
                                          : false
                                      }
                                    />
                                    <div className="form-checkbox__mark">
                                      <div className="form-checkbox__icon icon-check"></div>
                                    </div>
                                  </div>

                                  <div className="sidebar-checkbox__title">
                                    {elm.title}
                                  </div>
                                  <div className="sidebar-checkbox__count">
                                    (
                                    {
                                      coursesData.filter(
                                        (itm) => itm.category == elm.title,
                                      ).length
                                    }
                                    )
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div className="sidebar__more mt-15">
                              <a
                                href="#"
                                className="text-14 fw-500 underline text-purple-1"
                              >
                                Show more
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>}

                  <div className="sidebar__item">
                    <div className="accordion js-accordion">
                      <div
                        className={`accordion__item js-accordion-item-active ${
                          ratingOpen ? "is-active" : ""
                        } `}
                      >
                        <div
                          className="accordion__button items-center"
                          onClick={() => setRatingOpen((pre) => !pre)}
                        >
                          <h5 className="sidebar__title">Ratings</h5>

                          <div className="accordion__icon">
                            <div className="icon icon-chevron-down"></div>
                            <div className="icon icon-chevron-up"></div>
                          </div>
                        </div>

                        <div
                          className="accordion__content"
                          style={ratingOpen ? { maxHeight: "350px" } : {}}
                        >
                          <div className="accordion__content__inner">
                            <div className="sidebar-checkbox">
                              <div
                                onClick={() => setFilterRatingRange([])}
                                className="sidebar-checkbox__item"
                              >
                                <div className="form-radio mr-10">
                                  <div className="radio">
                                    <input
                                      type="radio"
                                      checked={
                                        filterRatingRange.length < 1
                                          ? "checked"
                                          : ""
                                      }
                                    />
                                    <div className="radio__mark">
                                      <div className="radio__icon"></div>
                                    </div>
                                  </div>
                                </div>
                                <div className="sidebar-checkbox__title d-flex items-center">
                                  <div className="d-flex x-gap-5 pr-10">
                                    <Star star={5} textSize={"text-11"} />
                                  </div>
                                  All
                                </div>
                                <div className="sidebar-checkbox__count"></div>
                              </div>
                              {rating.map((elm, i) => (
                                <div
                                  key={i}
                                  onClick={() =>
                                    handleFilterRatingRange(elm.range)
                                  }
                                  className="sidebar-checkbox__item cursor"
                                >
                                  <div className="form-radio mr-10">
                                    <div className="radio">
                                      <input
                                        type="radio"
                                        checked={
                                          filterRatingRange.join(" ").trim() ==
                                          elm.range.join(" ").trim()
                                            ? "checked"
                                            : ""
                                        }
                                      />
                                      <div className="radio__mark">
                                        <div className="radio__icon"></div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="sidebar-checkbox__title d-flex items-center">
                                    <div className="d-flex x-gap-5 pr-10">
                                      <Star star={5} textSize={"text-11"} />
                                    </div>
                                    {elm.text}
                                  </div>
                                  <div className="sidebar-checkbox__count">
                                    (
                                    {
                                      coursesData.filter(
                                        (itm) =>
                                          itm.rating >= elm.range[0] &&
                                          itm.rating <= elm.range[1],
                                      ).length
                                    }
                                    )
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <div className="sidebar__item">
                    <div className="accordion js-accordion">
                      <div
                        className={`accordion__item js-accordion-item-active ${
                          instractorOpen ? "is-active" : ""
                        } `}
                      >
                        <div
                          className="accordion__button items-center"
                          onClick={() => setInstractorOpen((pre) => !pre)}
                        >
                          <h5 className="sidebar__title">Instructors</h5>

                          <div className="accordion__icon">
                            <div className="icon icon-chevron-down"></div>
                            <div className="icon icon-chevron-up"></div>
                          </div>
                        </div>

                        <div
                          className="accordion__content"
                          style={instractorOpen ? { maxHeight: "350px" } : {}}
                        >
                          <div className="accordion__content__inner">
                            <div className="sidebar-checkbox">
                              <div
                                className="sidebar-checkbox__item"
                                onClick={() => setFilterInstractors([])}
                              >
                                <div className="form-checkbox">
                                  <input
                                    type="checkbox"
                                    checked={
                                      filterInstractors.length ? false : true
                                    }
                                  />
                                  <div className="form-checkbox__mark">
                                    <div className="form-checkbox__icon icon-check"></div>
                                  </div>
                                </div>

                                <div className="sidebar-checkbox__title">
                                  All
                                </div>
                                <div className="sidebar-checkbox__count"></div>
                              </div>
                              {instractorNames.map((elm, i) => (
                                <div
                                  key={i}
                                  className="sidebar-checkbox__item cursor"
                                  onClick={() =>
                                    handleFilterInstractors(elm.title)
                                  }
                                >
                                  <div className="form-checkbox">
                                    <input
                                      type="checkbox"
                                      checked={
                                        filterInstractors.includes(elm.title)
                                          ? true
                                          : false
                                      }
                                    />
                                    <div className="form-checkbox__mark">
                                      <div className="form-checkbox__icon icon-check"></div>
                                    </div>
                                  </div>

                                  <div className="sidebar-checkbox__title">
                                    {elm.title}
                                  </div>
                                  <div className="sidebar-checkbox__count">
                                    (
                                    {
                                      coursesData.filter(
                                        (itm) => itm.authorName == elm.title,
                                      ).length
                                    }
                                    )
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="sidebar__more mt-15">
                              <a
                                href="#"
                                className="text-14 fw-500 underline text-purple-1"
                              >
                                Show more
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}

                  <div className="sidebar__item">
                    <div className="accordion js-accordion">
                      <div
                        className={`accordion__item js-accordion-item-active ${
                          priceOpen ? "is-active" : ""
                        } `}
                      >
                        <div
                          className="accordion__button items-center"
                          onClick={() => setPriceOpen((pre) => !pre)}
                        >
                          <h5 className="sidebar__title">Price</h5>

                          <div className="accordion__icon">
                            <div className="icon icon-chevron-down"></div>
                            <div className="icon icon-chevron-up"></div>
                          </div>
                        </div>

                        <div
                          className="accordion__content"
                          style={priceOpen ? { maxHeight: "350px" } : {}}
                        >
                          <div className="accordion__content__inner">
                            <div className="sidebar-checkbox">
                              {prices.map((elm, i) => (
                                <div
                                  key={i}
                                  className="sidebar-checkbox__item cursor"
                                  onClick={() => handleFilterPrice(elm.title)}
                                >
                                  <div className="form-radio mr-10">
                                    <div className="radio">
                                      <input
                                        type="radio"
                                        checked={
                                          filterPrice == elm.title
                                            ? "checked"
                                            : ""
                                        }
                                      />
                                      <div className="radio__mark">
                                        <div className="radio__icon"></div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="sidebar-checkbox__title">
                                    {elm.title}
                                  </div>
                                  <div className="sidebar-checkbox__count">
                                    (
                                    {elm.title == "Free" &&
                                      coursesData.filter((itm) => !itm.paid)
                                        .length}
                                    {elm.title == "Paid" &&
                                      coursesData.filter((itm) => itm.paid)
                                        .length}
                                    {elm.title == "All" && coursesData.length})
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="sidebar__item">
                    <div className="accordion js-accordion">
                      <div
                        className={`accordion__item js-accordion-item-active ${
                          levelOpen ? "is-active" : ""
                        }  `}
                      >
                        <div
                          className="accordion__button items-center"
                          onClick={() => setLevelOpen((pre) => !pre)}
                        >
                          <h5 className="sidebar__title">Level</h5>

                          <div className="accordion__icon">
                            <div className="icon icon-chevron-down"></div>
                            <div className="icon icon-chevron-up"></div>
                          </div>
                        </div>

                        <div
                          className="accordion__content"
                          style={levelOpen ? { maxHeight: "350px" } : {}}
                        >
                          <div className="accordion__content__inner">
                            <div className="sidebar-checkbox">
                              <div
                                className="sidebar-checkbox__item cursor"
                                onClick={() => setFilterLevels([])}
                              >
                                <div className="form-checkbox">
                                  <input
                                    type="checkbox"
                                    checked={
                                      filterLevels.length < 1 ? true : false
                                    }
                                  />
                                  <div className="form-checkbox__mark">
                                    <div className="form-checkbox__icon icon-check"></div>
                                  </div>
                                </div>

                                <div className="sidebar-checkbox__title">
                                  All
                                </div>
                                <div className="sidebar-checkbox__count"></div>
                              </div>
                              {levels.map((elm, i) => (
                                <div
                                  key={i}
                                  className="sidebar-checkbox__item cursor"
                                  onClick={() => handleFilterLevels(elm.title)}
                                >
                                  <div className="form-checkbox">
                                    <input
                                      type="checkbox"
                                      checked={
                                        filterLevels.includes(elm.title)
                                          ? true
                                          : false
                                      }
                                    />
                                    <div className="form-checkbox__mark">
                                      <div className="form-checkbox__icon icon-check"></div>
                                    </div>
                                  </div>

                                  <div className="sidebar-checkbox__title">
                                    {elm.title}
                                  </div>
                                  <div className="sidebar-checkbox__count">
                                    (
                                    {
                                      coursesData.filter((itm) => itm.level == elm.title)
                                        .length
                                    }
                                    )
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="sidebar__item">
                    <div className="accordion js-accordion">
                      <div
                        className={`accordion__item js-accordion-item-active ${
                          openLanguage ? "is-active" : ""
                        } `}
                      >
                        <div
                          className="accordion__button items-center"
                          onClick={() => setOpenLanguage((pre) => !pre)}
                        >
                          <h5 className="sidebar__title">Language</h5>

                          <div className="accordion__icon">
                            <div className="icon icon-chevron-down"></div>
                            <div className="icon icon-chevron-up"></div>
                          </div>
                        </div>

                        <div
                          className="accordion__content"
                          style={openLanguage ? { maxHeight: "350px" } : {}}
                        >
                          <div className="accordion__content__inner">
                            <div className="sidebar-checkbox">
                              <div
                                className="sidebar-checkbox__item cursor"
                                onClick={() => setFilterlanguange([])}
                              >
                                <div className="form-checkbox">
                                  <input
                                    type="checkbox"
                                    checked={
                                      filterlanguange.length ? false : true
                                    }
                                  />
                                  <div className="form-checkbox__mark">
                                    <div className="form-checkbox__icon icon-check"></div>
                                  </div>
                                </div>
                                <div className="sidebar-checkbox__title">
                                  All
                                </div>
                                <div className="sidebar-checkbox__count"></div>
                              </div>
                              {languages.map((elm, i) => (
                                <div
                                  key={i}
                                  className="sidebar-checkbox__item cursor"
                                  onClick={() =>
                                    handleFilterlanguange(elm.infos)
                                  }
                                >
                                  <div className="form-checkbox">
                                    <input
                                      type="checkbox"
                                      checked={
                                        filterlanguange.includes(elm.infos)
                                          ? true
                                          : false
                                      }
                                    />
                                    <div className="form-checkbox__mark">
                                      <div className="form-checkbox__icon icon-check"></div>
                                    </div>
                                  </div>
                                  <div className="sidebar-checkbox__title">
                                    {elm.title}
                                  </div>
                                  <div className="sidebar-checkbox__count">
                                    (
                                      {
                                        coursesData.filter(
                                          (itm) => itm.language == elm.infos
                                        ).length
                                      }
                                    )
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="sidebar__more mt-15">
                              <div
                                href="#"
                                className="text-14 fw-500 underline text-purple-1"
                              >
                                Show more
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="sidebar__item">
                    <div className="accordion js-accordion">
                      <div
                        className={`accordion__item js-accordion-item-active ${
                          openLanguage ? "is-active" : ""
                        } `}
                      >
                        <div
                          className="accordion__button items-center"
                          onClick={() => setOpenLanguage((pre) => !pre)}
                        >
                          <h5 className="sidebar__title">Dubbing language</h5>

                          <div className="accordion__icon">
                            <div className="icon icon-chevron-down"></div>
                            <div className="icon icon-chevron-up"></div>
                          </div>
                        </div>

                        <div
                          className="accordion__content"
                          style={openLanguage ? { maxHeight: "350px" } : {}}
                        >
                          <div className="accordion__content__inner">
                            <div className="sidebar-checkbox">
                              <div
                                className="sidebar-checkbox__item cursor"
                                onClick={() => setFilterDublanguange([])}
                              >
                                <div className="form-checkbox">
                                  <input
                                    type="checkbox"
                                    checked={
                                      filterDublanguange.length ? false : true
                                    }
                                  />
                                  <div className="form-checkbox__mark">
                                    <div className="form-checkbox__icon icon-check"></div>
                                  </div>
                                </div>
                                <div className="sidebar-checkbox__title">
                                  All
                                </div>
                                <div className="sidebar-checkbox__count"></div>
                              </div>
                              {languages.map((elm, i) => (
                                <div
                                  key={i}
                                  className="sidebar-checkbox__item cursor"
                                  onClick={() =>
                                    handleFilterDublanguange(elm.infos)
                                  }
                                >
                                  <div className="form-checkbox">
                                    <input
                                      type="checkbox"
                                      checked={
                                        filterDublanguange.includes(elm.infos)
                                          ? true
                                          : false
                                      }
                                    />
                                    <div className="form-checkbox__mark">
                                      <div className="form-checkbox__icon icon-check"></div>
                                    </div>
                                  </div>
                                  <div className="sidebar-checkbox__title">
                                    {elm.title}
                                  </div>
                                  <div className="sidebar-checkbox__count">
                                    (
                                    {
                                      coursesData.filter(
                                        (itm) => itm.dub_language == elm.infos
                                      ).length
                                    }
                                    )
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="sidebar__more mt-15">
                              <div
                                href="#"
                                className="text-14 fw-500 underline text-purple-1"
                              >
                                Show more
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <div className="sidebar__item">
                    <div className="accordion js-accordion">
                      <div
                        className={`accordion__item js-accordion-item-active ${
                          durationOpen ? "is-active" : ""
                        } `}
                      >
                        <div
                          className="accordion__button items-center"
                          onClick={() => setDurationOpen((pre) => !pre)}
                        >
                          <h5 className="sidebar__title">Duration</h5>

                          <div className="accordion__icon">
                            <div className="icon icon-chevron-down"></div>
                            <div className="icon icon-chevron-up"></div>
                          </div>
                        </div>

                        <div
                          className="accordion__content"
                          style={durationOpen ? { maxHeight: "350px" } : {}}
                        >
                          <div className="accordion__content__inner">
                            <div className="sidebar-checkbox">
                              <div
                                className="sidebar-checkbox__item"
                                onClick={() => setFilterDuration([])}
                              >
                                <div className="form-checkbox">
                                  <input
                                    type="checkbox"
                                    checked={
                                      filterDuration.length ? false : true
                                    }
                                  />
                                  <div className="form-checkbox__mark">
                                    <div className="form-checkbox__icon icon-check"></div>
                                  </div>
                                </div>
                                <div className="sidebar-checkbox__title">
                                  All
                                </div>
                                <div className="sidebar-checkbox__count"></div>
                              </div>
                              {duration.map((elm, i) => (
                                <div
                                  key={i}
                                  className="sidebar-checkbox__item cursor"
                                  onClick={() =>
                                    handleFilterDuration(elm.range)
                                  }
                                >
                                  <div className="form-checkbox">
                                    <input
                                      type="checkbox"
                                      checked={
                                        filterDuration.toString() ==
                                        elm.range.toString()
                                          ? true
                                          : false
                                      }
                                    />
                                    <div className="form-checkbox__mark">
                                      <div className="form-checkbox__icon icon-check"></div>
                                    </div>
                                  </div>
                                  <div className="sidebar-checkbox__title">
                                    {elm.title}
                                  </div>
                                  <div className="sidebar-checkbox__count">
                                    (
                                    {
                                      coursesData.filter(
                                        (itm) =>
                                          itm.duration >= elm.range[0] &&
                                          itm.duration <= elm.range[1],
                                      ).length
                                    }
                                    )
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>

            <div className="col-xl-9 col-lg-8">
              <div className="accordion js-accordion">
                <div
                  className={`accordion__item ${
                    filterOpen ? "is-active" : ""
                  } `}
                >
                  <div className="row y-gap-20 items-center justify-between pb-30">
                    <div className="col-auto">
                      <div className="text-14 lh-12">
                        Showing{" "}
                        <span className="text-dark-1 fw-500">
                          {filteredData.length}
                        </span>{" "}
                        total results
                      </div>
                    </div>

                    <div className="col-auto">
                      <div className="row x-gap-20 y-gap-20">
                        <div className="col-auto">
                          <div className="d-flex items-center">
                            <div className="text-14 lh-12 fw-500 text-dark-1 mr-20">
                              Sort by:
                            </div>

                            <div
                              id="dd41button"
                              className="dropdown js-dropdown js-category-active"
                            >
                              <div
                                onClick={() => {
                                  document
                                    .getElementById("dd41button")
                                    .classList.toggle("-is-dd-active");
                                  document
                                    .getElementById("dd41content")
                                    .classList.toggle("-is-el-visible");
                                }}
                                className="dropdown__button d-flex items-center text-14 rounded-8 px-20 py-10 text-14 lh-12"
                                data-el-toggle=".js-category-toggle"
                                data-el-toggle-active=".js-category-active"
                              >
                                <span className="js-dropdown-title">
                                  {currentSortingOption}
                                </span>
                                <i className="icon text-9 ml-40 icon-chevron-down"></i>
                              </div>

                              <div
                                id="dd41content"
                                className="toggle-element -dropdown -dark-bg-dark-2 -dark-border-white-10 js-click-dropdown js-category-toggle"
                              >
                                <div className="text-14 y-gap-15 js-dropdown-list">
                                  {sortingOptions.map((elm, i) => (
                                    <div
                                      key={i}
                                      onClick={() => {
                                        setCurrentSortingOption((pre) =>
                                          pre == elm ? "Default" : elm,
                                        );
                                        document
                                          .getElementById("dd41button")
                                          .classList.toggle("-is-dd-active");
                                        document
                                          .getElementById("dd41content")
                                          .classList.toggle("-is-el-visible");
                                      }}
                                    >
                                      <span
                                        className={`d-block js-dropdown-link cursor ${
                                          currentSortingOption == elm
                                            ? "activeMenu"
                                            : ""
                                        } `}
                                      >
                                        {elm}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-auto d-none lg:d-block">
                          <div className="accordion__button w-unset">
                            <button
                              className="button h-50 px-30 -light-7 text-purple-1"
                              onClick={() => setFilterOpen((pre) => !pre)}
                            >
                              <i className="icon-filter mr-10"></i>
                              Filter
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="accordion__content d-none lg:d-block"
                    style={filterOpen ? { maxHeight: "1800px" } : {}}
                  >
                    <div className="sidebar -courses px-30 py-30 rounded-8 bg-light-3 mb-50">
                      <div className="row x-gap-60 y-gap-40">
                        {idCategory === 0 && <div className="col-xl-3 col-lg-4 col-sm-6">
                           <div className="sidebar__item">
                            <h5 className="sidebar__title">Category</h5>
                            <div className="sidebar-checkbox">
                              <div
                                className="sidebar-checkbox__item"
                                onClick={() => setFilterCategories([])}
                              >
                                <div className="form-checkbox">
                                  <input
                                    type="checkbox"
                                    checked={
                                      filterCategories.length ? false : true
                                    }
                                  />
                                  <div className="form-checkbox__mark">
                                    <div className="form-checkbox__icon icon-check"></div>
                                  </div>
                                </div>

                                <div className="sidebar-checkbox__title">
                                  All
                                </div>
                                <div className="sidebar-checkbox__count"></div>
                              </div>
                              {categories.map((item, index) => (
                                <div
                                  className="sidebar-checkbox__item cursor"
                                  key={index}
                                  onClick={() =>
                                    handleFilterCategories(item.title)
                                  }
                                >
                                  <div className="form-checkbox">
                                    <input
                                      type="checkbox"
                                      checked={
                                        filterCategories.includes(item.title)
                                          ? true
                                          : false
                                      }
                                    />
                                    <div className="form-checkbox__mark">
                                      <div className="form-checkbox__icon icon-check"></div>
                                    </div>
                                  </div>

                                  <div className="sidebar-checkbox__title">
                                    {item.title}
                                  </div>
                                  <div className="sidebar-checkbox__count">
                                    (
                                    {
                                      coursesData.filter(
                                        (itm) => itm.category == item.title,
                                      ).length
                                    }
                                    )
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="sidebar__more mt-15">
                              <a
                                href="#"
                                className="text-14 fw-500 underline text-purple-1"
                              >
                                Show more
                              </a>
                            </div>
                          </div>
                        </div>}

                        <div className="col-xl-3 col-lg-4 col-sm-6">
                          <div className="sidebar__item">
                            <h5 className="sidebar__title">Ratings</h5>
                            <div className="sidebar-checkbox">
                              <div
                                className="sidebar-checkbox__item"
                                onClick={() => setFilterRatingRange([])}
                              >
                                <div className="form-radio mr-10">
                                  <div className="radio">
                                    <input
                                      type="radio"
                                      checked={
                                        filterRatingRange.length < 1
                                          ? "checked"
                                          : ""
                                      }
                                    />
                                    <div className="radio__mark">
                                      <div className="radio__icon"></div>
                                    </div>
                                  </div>
                                </div>
                                <div className="sidebar-checkbox__title d-flex items-center">
                                  <div className="d-flex x-gap-5 pr-10"></div>
                                  All
                                </div>
                                <div className="sidebar-checkbox__count"></div>
                              </div>
                              {rating.map((item, index) => (
                                <div
                                  className="sidebar-checkbox__item cursor"
                                  key={index}
                                  onClick={() =>
                                    handleFilterRatingRange(item.range)
                                  }
                                >
                                  <div className="form-radio mr-10">
                                    <div className="radio">
                                      <input
                                        type="radio"
                                        checked={
                                          filterRatingRange.join(" ").trim() ==
                                          item.range.join(" ").trim()
                                            ? "checked"
                                            : ""
                                        }
                                      />
                                      <div className="radio__mark">
                                        <div className="radio__icon"></div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="sidebar-checkbox__title d-flex items-center">
                                    <div className="d-flex x-gap-5 pr-10">
                                      <Star
                                        star={item.star}
                                        textSize={"text-11"}
                                      />
                                    </div>
                                    {item.text}
                                  </div>
                                  <div className="sidebar-checkbox__count">
                                    (
                                    {
                                      coursesData.filter(
                                        (itm) =>
                                          itm.rating >= item.range[0] &&
                                          itm.rating <= item.range[1],
                                      ).length
                                    }
                                    )
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* <div className="col-xl-3 col-lg-4 col-sm-6">
                          <div className="sidebar__item">
                            <h5 className="sidebar__title">Instructors</h5>
                            <div className="sidebar-checkbox">
                              <div
                                className="sidebar-checkbox__item"
                                onClick={() => setFilterInstractors([])}
                              >
                                <div className="form-checkbox">
                                  <input
                                    type="checkbox"
                                    checked={
                                      filterInstractors.length ? false : true
                                    }
                                  />
                                  <div className="form-checkbox__mark">
                                    <div className="form-checkbox__icon icon-check"></div>
                                  </div>
                                </div>

                                <div className="sidebar-checkbox__title">
                                  All
                                </div>
                                <div className="sidebar-checkbox__count"></div>
                              </div>
                              {instractorNames.map((item, index) => (
                                <div
                                  className="sidebar-checkbox__item cursor"
                                  key={index}
                                  onClick={() =>
                                    handleFilterInstractors(item.title)
                                  }
                                >
                                  <div className="form-checkbox">
                                    <input
                                      type="checkbox"
                                      checked={
                                        filterInstractors.includes(item.title)
                                          ? true
                                          : false
                                      }
                                    />
                                    <div className="form-checkbox__mark">
                                      <div className="form-checkbox__icon icon-check"></div>
                                    </div>
                                  </div>

                                  <div className="sidebar-checkbox__title">
                                    {item.title}
                                  </div>
                                  <div className="sidebar-checkbox__count">
                                    (
                                    {
                                      coursesData.filter(
                                        (itm) => itm.authorName == item.title,
                                      ).length
                                    }
                                    )
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="sidebar__more mt-15">
                              <a
                                href="#"
                                className="text-14 fw-500 underline text-purple-1"
                              >
                                Show more
                              </a>
                            </div>
                          </div>
                        </div> */}

                        <div className="col-xl-3 col-lg-4 col-sm-6">
                          <div className="sidebar__item">
                            <h5 className="sidebar__title">Price</h5>
                            <div className="sidebar-checkbox">
                              {prices.map((item, index) => (
                                <div
                                  className="sidebar-checkbox__item cursor"
                                  key={index}
                                  onClick={() => handleFilterPrice(item.title)}
                                >
                                  <div className="form-radio mr-10">
                                    <div className="radio">
                                      <input
                                        type="radio"
                                        checked={
                                          filterPrice == item.title
                                            ? "checked"
                                            : ""
                                        }
                                      />
                                      <div className="radio__mark">
                                        <div className="radio__icon"></div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="sidebar-checkbox__title">
                                    {item.title}
                                  </div>
                                  <div className="sidebar-checkbox__count">
                                    (
                                    {item.title == "Free" &&
                                      coursesData.filter((itm) => !itm.paid)
                                        .length}
                                    {item.title == "Paid" &&
                                      coursesData.filter((itm) => itm.paid)
                                        .length}
                                    {item.title == "All" && coursesData.length})
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="col-xl-3 col-lg-4 col-sm-6">
                          <div className="sidebar__item">
                            <h5 className="sidebar__title">Level</h5>
                            <div className="sidebar-checkbox">
                              <div
                                className="sidebar-checkbox__item cursor"
                                onClick={() => setFilterLevels([])}
                              >
                                <div className="form-checkbox">
                                  <input
                                    type="checkbox"
                                    checked={
                                      filterLevels.length < 1 ? true : false
                                    }
                                  />
                                  <div className="form-checkbox__mark">
                                    <div className="form-checkbox__icon icon-check"></div>
                                  </div>
                                </div>

                                <div className="sidebar-checkbox__title">
                                  All
                                </div>
                                <div className="sidebar-checkbox__count"></div>
                              </div>
                              {levels.map((item, index) => (
                                <div
                                  className="sidebar-checkbox__item cursor"
                                  key={index}
                                  onClick={() => handleFilterLevels(item.title)}
                                >
                                  <div className="form-checkbox">
                                    <input
                                      type="checkbox"
                                      checked={
                                        filterLevels.includes(item.title)
                                          ? true
                                          : false
                                      }
                                    />
                                    <div className="form-checkbox__mark">
                                      <div className="form-checkbox__icon icon-check"></div>
                                    </div>
                                  </div>

                                  <div className="sidebar-checkbox__title">
                                    {item.title}
                                  </div>
                                  <div className="sidebar-checkbox__count">
                                    (
                                      {
                                        coursesData.filter(
                                          (itm) => itm.level === item.title,
                                        ).length
                                      }
                                    )
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="col-xl-3 col-lg-4 col-sm-6">
                          <div className="sidebar__item">
                            <h5 className="sidebar__title">Langage</h5>
                            <div className="sidebar-checkbox">
                              <div
                                className="sidebar-checkbox__item cursor"
                                onClick={() => setFilterlanguange([])}
                              >
                                <div className="form-checkbox">
                                  <input
                                    type="checkbox"
                                    checked={
                                      filterlanguange.length < 1 ? true : false
                                    }
                                  />
                                  <div className="form-checkbox__mark">
                                    <div className="form-checkbox__icon icon-check"></div>
                                  </div>
                                </div>

                                <div className="sidebar-checkbox__title">
                                  All
                                </div>
                                <div className="sidebar-checkbox__count"></div>
                              </div>
                              {languages.map((item, index) => (
                                <div
                                  className="sidebar-checkbox__item cursor"
                                  key={`langauge-${index}`}
                                  onClick={() => handleFilterlanguange(item.infos)}
                                >
                                  <div className="form-checkbox">
                                    <input
                                      type="checkbox"
                                      checked={
                                        filterlanguange.includes(item.infos)
                                          ? true
                                          : false
                                      }
                                    />
                                    <div className="form-checkbox__mark">
                                      <div className="form-checkbox__icon icon-check"></div>
                                    </div>
                                  </div>

                                  <div className="sidebar-checkbox__title">
                                    {item.title}
                                  </div>
                                  <div className="sidebar-checkbox__count">
                                    (
                                    {
                                      coursesData.filter(
                                        (itm) => itm.language == item.infos,
                                      ).length
                                    }
                                    )
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="col-xl-3 col-lg-4 col-sm-6">
                          <div className="sidebar__item">
                            <h5 className="sidebar__title">Dubbing language</h5>
                            <div className="sidebar-checkbox">
                              <div
                                className="sidebar-checkbox__item cursor"
                                onClick={() => setFilterDublanguange([])}
                              >
                                <div className="form-checkbox">
                                  <input
                                    type="checkbox"
                                    checked={
                                      filterDublanguange.length < 1 ? true : false
                                    }
                                  />
                                  <div className="form-checkbox__mark">
                                    <div className="form-checkbox__icon icon-check"></div>
                                  </div>
                                </div>

                                <div className="sidebar-checkbox__title">
                                  All
                                </div>
                                <div className="sidebar-checkbox__count"></div>
                              </div>
                              {languages.map((item, index) => (
                                <div
                                  className="sidebar-checkbox__item cursor"
                                  key={`dub-langauge-${index}`}
                                  onClick={() => handleFilterDublanguange(item.infos)}
                                >
                                  <div className="form-checkbox">
                                    <input
                                      type="checkbox"
                                      checked={
                                        filterDublanguange.includes(item.infos)
                                          ? true
                                          : false
                                      }
                                    />
                                    <div className="form-checkbox__mark">
                                      <div className="form-checkbox__icon icon-check"></div>
                                    </div>
                                  </div>

                                  <div className="sidebar-checkbox__title">
                                    {item.title}
                                  </div>
                                  <div className="sidebar-checkbox__count">
                                    (
                                    {
                                      coursesData.filter(
                                        (itm) => itm.dub_language == item.infos,
                                      ).length
                                    }
                                    )
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>


                        {/* <div className="col-xl-3 col-lg-4 col-sm-6">
                          <div className="sidebar__item">
                            <h5 className="sidebar__title">Sous-titre</h5>
                            <div className="sidebar-checkbox">
                              <div
                                className="sidebar-checkbox__item"
                                onClick={() => setFilterDublanguange([])}
                              >
                                <div className="form-checkbox">
                                  <input
                                    type="checkbox"
                                    checked={
                                      filterlanguange.length ? false : true
                                    }
                                  />
                                  <div className="form-checkbox__mark">
                                    <div className="form-checkbox__icon icon-check"></div>
                                  </div>
                                </div>

                                <div className="sidebar-checkbox__title">
                                  All
                                </div>
                                <div className="sidebar-checkbox__count"></div>
                              </div>
                              {languages.map((item, index) => (
                                <div
                                  className="sidebar-checkbox__item cursor"
                                  key={index}
                                  onClick={() =>
                                    handleFilterDublanguange(item.title)
                                  }
                                >
                                  <div className="form-checkbox">
                                    <input
                                      type="checkbox"
                                      checked={
                                        filterlanguange.includes(item.title)
                                          ? true
                                          : false
                                      }
                                    />
                                    <div className="form-checkbox__mark">
                                      <div className="form-checkbox__icon icon-check"></div>
                                    </div>
                                  </div>

                                  <div className="sidebar-checkbox__title">
                                    {item.title}
                                  </div>
                                  <div className="sidebar-checkbox__count">
                                    (
                                    {
                                      coursesData.filter(
                                        (itm) => itm.languange == item.title,
                                      ).length
                                    }
                                    )
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="sidebar__more mt-15">
                              <a
                                href="#"
                                className="text-14 fw-500 underline text-purple-1"
                              >
                                Show more
                              </a>
                            </div>
                          </div>
                        </div> */}

                        {/* <div className="col-xl-3 col-lg-4 col-sm-6">
                          <div className="sidebar__item">
                            <h5 className="sidebar__title">Duration</h5>
                            <div className="sidebar-checkbox">
                              <div
                                className="sidebar-checkbox__item cursor"
                                onClick={() => setFilterDuration([])}
                              >
                                <div className="form-checkbox">
                                  <input
                                    type="checkbox"
                                    checked={
                                      filterDuration.length ? false : true
                                    }
                                  />
                                  <div className="form-checkbox__mark">
                                    <div className="form-checkbox__icon icon-check"></div>
                                  </div>
                                </div>
                                <div className="sidebar-checkbox__title">
                                  All
                                </div>
                                <div className="sidebar-checkbox__count"></div>
                              </div>
                              {duration.map((item, index) => (
                                <div
                                  className="sidebar-checkbox__item cursor"
                                  key={index}
                                  onClick={() =>
                                    handleFilterDuration(item.range)
                                  }
                                >
                                  <div className="form-checkbox">
                                    <input
                                      type="checkbox"
                                      checked={
                                        filterDuration.toString() ==
                                        item.range.toString()
                                          ? true
                                          : false
                                      }
                                    />
                                    <div className="form-checkbox__mark">
                                      <div className="form-checkbox__icon icon-check"></div>
                                    </div>
                                  </div>
                                  <div className="sidebar-checkbox__title">
                                    {item.title}
                                  </div>
                                  <div className="sidebar-checkbox__count">
                                    (
                                    {
                                      coursesData.filter(
                                        (itm) =>
                                          itm.duration >= item.range[0] &&
                                          itm.duration <= item.range[1],
                                      ).length
                                    }
                                    )
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>


                <div className="row y-gap-60">
                    {sortedFilteredData
                    .slice((pageNumber - 1) * 7, pageNumber * 7)
                    .map((elm, i) => (
                        <div key={i} className="col-12 border-bottom-light">
                        <div className="coursesCard -type-1 row y-gap-20 flex-row items-center">
                            <div className="col-xl-3 col-lg-4">
                            <div className="coursesCard__image rounded-8 relative">
                              <Image
                                width={510}
                                height={360}
                                className="w-1/1 rounded-8"
                                style={{ height: "150px", width: "100%", objectFit: "cover" }}
                                src={elm.imageSrc ? elm.imageSrc : "assets/img/auth/img_2.png"}
                                alt="image"
                              />
                              <div className="coursesCard__image_overlay rounded-8"></div>
                            </div>
                            </div>

                            <div className="col">
                            <div className="d-flex items-center">
                                <div className="text-14 lh-1 text-yellow-1 mr-10">
                                  {elm.rating}
                                </div>
                                <div className="d-flex x-gap-5 items-center">
                                  <Star star={elm.rating} />
                                </div>
                                <div className="text-13 lh-1 ml-10">
                                ({7})
                                </div>
                            </div>

                            <div className="col-xl-7 text-17 lh-15 fw-500 text-dark-1 mt-10">
                                <Link
                                className="linkCustom"
                                href={`/course/${elm.id}`}
                                >
                                {elm.title}
                                </Link>
                            </div>
                            <div className="mt-8">{elm.desc}</div>

                            <div className="row x-gap-10 y-gap-10 items-center pt-10">
                                <div className="col-auto">
                                <div className="d-flex items-center">
                                    <Image
                                    width={30}
                                    height={30}
                                    src={elm.authorImageSrc ? elm.authorImageSrc : "/assets/img/auth/img_2.png"}
                                    alt="image"
                                    />
                                    <div className="ml-10">
                                      {/* {elm.authorName} */}
                                      Yao Ferdinand
                                    </div>
                                </div>
                                </div>

                                <div className="col-auto">
                                <div className="d-flex items-center">
                                    <Image
                                    width={16}
                                    height={17}
                                    className="mr-8"
                                    src="/assets/img/coursesCards/icons/1.svg"
                                    alt="icon"
                                    />
                                    <div className="text-14 lh-1">
                                    {elm.lessonCount} lesson
                                    </div>
                                </div>
                                </div>

                                <div className="col-auto">
                                {/* <div className="d-flex items-center">
                                    <Image
                                    width={16}
                                    height={17}
                                    className="mr-8"
                                    src="/assets/img/coursesCards/icons/2.svg"
                                    alt="icon"
                                    />
                                    <div className="text-14 lh-1">{`${Math.floor(
                                    elm.duration / 60,
                                    )}h ${Math.floor(elm.duration % 60)}m`}</div>
                                </div> */}
                                </div>

                                <div className="col-auto">
                                <div className="d-flex items-center">
                                    <Image
                                    width={16}
                                    height={17}
                                    className="mr-8"
                                    src="/assets/img/coursesCards/icons/3.svg"
                                    alt="icon"
                                    />
                                    <div className="text-14 lh-1">{elm.level}</div>
                                </div>
                                </div>
                            </div>
                            </div>

                            <div className="col-auto md:d-none">
                            <div className="line -vertical -h-120 bg-light-5 ml-60 lg:ml-20 md:ml-0"></div>
                            </div>

                            <div className="col-md-auto">
                            <div className="text-right md:text-left">
                                {elm.paid ? (
                                <>
                                    <div className="text-15 lh-1 fw-500 line-through">
                                    ${elm.originalPrice}
                                    </div>
                                    <div className="text-24 lh-1 fw-500 text-dark-1 mt-10">
                                    ${elm.discountedPrice}
                                    </div>
                                </>
                                ) : (
                                <>
                                    <div></div>
                                    <div className="text-24 lh-1 fw-500 text-dark-1 mt-10">
                                    Free
                                    </div>
                                </>
                                )}
                            </div>
                            <div className="row x-gap-20 y-gap-20 items-center pt-25">
                                <div className="col-auto">
                                  <button
                                      className="button h-50 px-30 -purple-3 text-purple-1"
                                      onClick={() => addCourseToCart(elm.id)}
                                  >
                                      {isAddedToCartCourses(elm.id)
                                      ? "Already Added"
                                      : "Add To Cart"}
                                  </button>
                                </div>
                                {/* <div className="col-auto">
                                  <button className="button size-50 rounded-full -purple-3 text-light-1">
                                      <div
                                      className="size-20  "
                                      style={{
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                      }}
                                      >
                                      <FontAwesomeIcon
                                          style={{ fontSize: "20px" }}
                                          icon={faHeart}
                                      />
                                      </div>
                                  </button>
                                </div> */}
                            </div>
                            </div>
                        </div>
                        </div>
                    ))}
                </div>

              <div className="row justify-center pt-90 lg:pt-50">
                <div className="col-auto">
                  <PaginationTwo
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                    data={sortedFilteredData}
                    pageCapacity={12}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}