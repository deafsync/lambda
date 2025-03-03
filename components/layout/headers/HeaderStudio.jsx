"use client";

import React from "react";
import Image from "next/image";
import { HeaderExplore } from "../component/header-explore";
import Link from "next/link";
export default function HeaderStudio() {
  return (
    <header className="header -type-1 js-header">
      <div className="header__container py-10">
        <div className="row justify-between items-center">
          <div className="col-auto">
            <div className="header-left d-flex items-center">
              <div className="header__logo">
                <Link data-barba href="/">
                  <Image
                    width={140}
                    height={50}
                    src="/assets/img/general/logo-dark-f.svg"
                    alt="logo"
                  />
                </Link>
              </div>
              <div className="header-search-field ml-30">
              </div>
            </div>
          </div>

          <div className="col-auto lg:d-none">
            <div className="text-20 lh-1 text-white fw-500">
              The Ultimate Drawing Course Beginner to Advanced
            </div>
          </div>

          <div className="col-auto">
            <div className="header-right d-flex items-center">
                <div className="header-right__buttons">
                    <a href="/course/1" className="button -sm -rounded -white text-dark-1">
                    Enrégistrer
                    </a>
                </div>
                <div className="header-right__buttons">
                    <a href="/course/1" className="button -sm -rounded -white--1 ml-10 text-dark-1">
                    Quitter
                    </a>
                </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
