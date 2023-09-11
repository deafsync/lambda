"use client";

import { sections } from "@/data/adminitrationFeatures";
import React, { useState, useEffect } from "react";
import FooterNine from "../layout/footers/FooterNine";
import Link from "next/link";
import PageLinksTwo from "../common/PageLinksTwo";
import CourseCard from "@/components/homes/courseCards/CourseCardH";
import { coursesData } from "@/data/courses";

export default function Administration() {
  const [activeTab, setActiveTab] = useState(1);
  const [pageItem, setPageItem] = useState([]);

  useEffect(() => {
      setPageItem(coursesData);
  }, []);

  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row pb-50 mb-10">
          <div className="col-auto">
            <h1 className="text-30 lh-12 fw-700">Cours</h1>
            <div className="mt-10">
              Ici, vous allez gérer vos cours
            </div>
          </div>
        </div>

        <div className="row y-gap-30">
          <div className="col-12">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
                <div className="py-40 md:py-20 sm-py-10 px-30 md:px-20 sm:px-10">
                  <div className="row y-gap-15 justify-between">
                    <div className="col-auto">
                    </div>

                    <div className="col-auto">
                        <button className="button -md -narrow -purple-1 text-white">
                        <i className="icon-calendar-2 mr-10"></i>
                        New course
                        </button>
                    </div>
                    <div className="py-40 md:py-20 sm-py-10 px-30">
                      {pageItem.slice(0, 3).map((elm, i) => (
                          <CourseCard data={elm} key={i} index={i} />
                      ))}
                      {/* Aucun cours pour le moment */}
                    </div>

                  </div>
                </div>
            </div>
        </div>
      </div>

      <FooterNine />
    </div>
    </div>
  );
}
