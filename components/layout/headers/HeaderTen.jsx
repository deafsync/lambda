"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { HeaderExplore } from "../component/header-explore";
import Link from "next/link";
import toast from "react-hot-toast";
import { get_user_formation } from "@/services/core.service";
export default function HeaderTen({id}) {

  const [name, setName] = useState("")
  const [backId, setBackId] = useState(0)

  useEffect(() => { 
    get_user_formation(id)
      .then(res => {
        setName(res.titre)
        setBackId(res.id)
      }).catch(err => {
          console.log(err)
          toast.error("something happen")
      })
  }, [])

  return (
    <header className="header -type-1 js-header">
      <div className="header__container py-10">
        <div className="row justify-between items-center">
          <div className="col-auto">
            <div className="header-left">
              <div className="header__logo">
                <Link data-barba href="/home">
                  <Image
                    width={140}
                    height={50}
                    src="/assets/img/general/logo-dark-f.svg"
                    alt="logo"
                  />
                </Link>
              </div>

              <HeaderExplore
                allClasses={
                  "header__explore text-green-1 ml-60 xl:ml-30 lg:d-none"
                }
              />
            </div>
          </div>

          <div className="col-auto lg:d-none">
            <div className="text-20 lh-1 text-white fw-500">
            {name}
            </div>
          </div>

          <div className="col-auto">
            <div className="header-right d-flex items-center">
              <div className="header-right__buttons">
                <a href={`/learning`} className="button -sm -rounded -white text-dark-1">
                  Back to Course
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
