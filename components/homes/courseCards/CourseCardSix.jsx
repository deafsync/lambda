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
  return (
    <div className="col">
      <div className="coursesCard -type-4 d-flex sm:d-block items-center border-light rounded-8 px-10 py-10">
        <div className="coursesCard__image rounded-8">
          {/* <Image
            width={250}
            height={175}
            className="w-1/1 rounded-8"
            src={data.imageSrc}
            alt="image"
          />
           */}
           <div className="relative">
            <Image
              width={250}
              height={175}
              className="w-1/1"
              src={data.imageSrc}
              alt="image"
            />
            <div className="absolute-full-center d-flex justify-center items-center">
              <div
                onClick={() => {}}
                className="d-flex justify-center items-center size-60 rounded-full bg-white js-gallery cursor"
                data-gallery="gallery1"
              >
                <div className="icon-play text-18"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="coursesCard__content pl-20 sm:pl-10 pr-10">
          <div className="text-15 lh-13 sm:mt-20 mt-0 fw-900 text-light-1">
            Titre du cours
          </div>
          <div className="text-17 lh-13 fw-500 text-dark-1 mt-10">
            <Link className="linkCustom" href={`/course/${data.id}/lecture/1`}>
              {data.title}
            </Link>
          </div>
          <div className="progress sm:mt-10 mt-30">
            <div className="progress-bar" style={{width: "70%"}}></div>
          </div>
          <div className="text-14 lh-1 t-10 text-light-1 mt-10"><div className="d-inline fw-900">Cours n°2:</div> 57min restant</div>
        </div>
      </div>
    </div>
  );
}
