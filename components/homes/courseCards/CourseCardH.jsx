"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
export default function CourseCardSix({ data, index }) {
  const [rating, setRating] = useState([]);
  useEffect(() => {
    for (let i = Math.round(data.rating); i >= 1; i--) {
      setRating((pre) => [...pre, "star"]);
    }
  }, []);

  console.log("course ", data)

  return (
    <div className="col-12 course--hover">
      <div className="coursesCard -type-4 d-flex sm:d-block items-center border-light rounded-8 px-10 py-10">
        <div className="coursesCard__image rounded-8">
           <div className="relative">
            <img
              src={data.imageSrc}
              alt="image"
              style={{ objectFit: "cover", width: "330px", height: "175px" }}
            />
          </div>
        </div>

        <div className="coursesCard__content pl-20 sm:pl-10 w-[100%] pr-10">
          <div className="col-auto">
            {/* <div className="text-15 lh-13 sm:mt-20 mt-0 fw-900 text-light-1">
                Course
            </div> */}
            <div className="text-17 lh-13 fw-500 text-dark-1 mt-10">
                <div className="linkCustom">
                  {data.title}
                </div>
            </div>
          </div>
          <div className="" style={{width: "250px"}}>
            <div className="progress sm:mt-10 mt-30">
                <div className="progress-bar" style={{width: "100%"}}></div>
            </div>
            <div className="text-14 lh-1 t-10 text-light-1 mt-10"><div className="d-inline fw-900"></div>100%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
