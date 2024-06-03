'use client'

import React, { useEffect, useState } from "react";
import { topCatagoriesFour } from "../../../data/topCategories";
import Link from "next/link";
import { get_categories } from "@/services/core.service";
import toast from "react-hot-toast";

export default function CategoriesFour() {

  const [category, setCategory] = useState([])

  useEffect(() => {
    /*
    
    {
      id: 1,
      title: "Digital Marketing",
      iconClass: "icon icon-announcement text-35",
      courses: "553+ Courses",
    },
    
    */

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
        <div className="row justify-center text-center">
          <div className="col-auto">
            <div className="sectionTitle ">
              <h2 className="sectionTitle__title ">Top Categories</h2>

              <p className="sectionTitle__text ">
              Here is ours top categorie course
              </p>
            </div>
          </div>
        </div>

        <div className="row y-gap-30 pt-60 lg:pt-50">
          {category.length > 0 && category.map((elm, i) => (
            <Link
              href={`/courses/${elm.id > 8 ? 1 : elm.id}`}
              key={i}
              className="col-xl-3 col-lg-4 col-md-6 linkCustomTwo"
            >
              <div className="categoryCard -type-3">
                <div className="categoryCard__icon bg-light-3 mr-20" style={{fontSize: '34px'}}>
                  {/* <i className={elm.iconClass}></i> */}
                  {elm.icone}
                </div>
                <div className="categoryCard__content">
                  <h4 className="categoryCard__title text-17 fw-500">
                    {elm.title}
                  </h4>
                  <div className="categoryCard__text text-13 lh-1 mt-5">
                    {elm.courses}
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
