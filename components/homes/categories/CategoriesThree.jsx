"use client"

import React, { useEffect, useState } from "react";
import { topCatagoriesThree } from "../../../data/topCategories";
import Image from "next/image";
import Link from "next/link";
import { get_categories } from "@/services/core.service";
import toast from "react-hot-toast";

export default function CategoriesTwo() {

  const [category, setCategory] = useState([])

  useEffect(() => {
    get_categories()
      .then(res => {
        let data = []
        for(let i = 0; i < res.length; i++) {
          data.push({
            id: `category-${i}`,
            title: res[i].titre,
            icone: res[i].icone,
            courses: `${res[i].formations.length}+ Courses`,
          })
        }
        setCategory(data)
      }).catch(err => {
        console.log(err)
        toast.error("Geting categories make error")
      })
  }, [])

  return (
    <section className="layout-pt-lg layout-pb-lg">
      <div className="container">
        <div className="row y-gap-20 justify-between items-end">
          <div className="col-lg-6">
            <div className="sectionTitle ">
              <h2 className="sectionTitle__title ">Top Categories</h2>

              <p className="sectionTitle__text ">
              Here is ours top categorie course
              </p>
            </div>
          </div>

          <div className="col-auto">
            <a href="#" className="button -icon -purple-3 text-purple-1">
              All Categories
              <i className="icon-arrow-top-right text-13 ml-10"></i>
            </a>
          </div>
        </div>

        <div className="row y-gap-50 pt-60 lg:pt-50">
          {category.map((elm, i) => (
            <Link
              href={`/courses/${elm.id > 8 ? 1 : elm.id}`}
              key={i}
              className="col-xl-3 col-lg-4 col-sm-6 linkCustomTwo"
            >
              <div className="categoryCard -type-3">
                <div className="categoryCard__image mr-20">
                  <div className="categoryCard__icon bg-light-3 mr-20" style={{fontSize: '34px'}}>
                    {elm.icone}
                  </div>
                </div>

                <div className="categoryCard__content">
                  <h4 className="categoryCard__title text-17 fw-500">
                    {elm.title}
                  </h4>
                  <div className="categoryCard__text text-13 lh-1 mt-5">
                    {elm.text}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
