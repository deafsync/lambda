"use client";

import React from "react";
import { HeaderExplore } from "../component/header-explore";
import CartToggle from "../component/CartToggle";
import Menu from "../component/Menu";
import MobileMenu from "../component/MobileMenu";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

import { sidebarItems } from "../../../data/homeSidebarItems";
import { notifications } from "@/data/notifications";

export default function Header() {

  const [isOnNotification, setIsOnNotification] = useState(false);
  const [isOnProfile, setIsOnProfile] = useState(false);


  // sign up (new) : button h-50 px-25 bg-nav--purple-4 -rounded ml-20
  // login (new): button h-50 px-25 bg-nav--purple-3 -rounded text-purple-1 ml-20
  // sign up (old) : button px-30 h-50 -purple-1 text-white ml-10
  // login (old) : button px-30 h-50 -outline-dark-1 text-dark-1


  const [activeMobileMenu, setActiveMobileMenu] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <header className="header -type-3 js-header">
      <div className="header__container py-10">
        <div className="row justify-between items-center">
          <div className="col-auto">
            <div className="header-left d-flex items-center">
              <div className="header__logo ">
                <Link href="/">
                  <Image
                    width={140}
                    height={50}
                    src="/assets/img/general/logo-lambda.svg"
                    alt="logo"
                  />
                </Link>
              </div>
              <HeaderExplore
                allClasses={"header__explore text-purple-1 ml-30 xl:d-none"}
              />

              <div className="header-search-field ml-30">
                <form onSubmit={handleSubmit}>
                  <div className="header-search-field__group">
                    <input
                      required
                      type="text"
                      placeholder="What do you want to learn?"
                    />
                    <button type="submit">
                      <i className="icon icon-search"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="col-auto">
            <div className="header-right d-flex items-center">
              <div className="header-right__icons d-flex items-center"> {/*text-white*/}
                {/* <Menu allClasses={"menu__nav text-dark-1 -is-active"} /> */}
                <MobileMenu
                  setActiveMobileMenu={setActiveMobileMenu}
                  activeMobileMenu={activeMobileMenu}
                />

                <div className="d-none xl:d-block ml-20">
                  <button
                    onClick={() => setActiveMobileMenu(true)}
                    className="text-dark-1 items-center"
                    data-el-toggle=".js-mobile-menu-toggle"
                  >
                    <i className="text-11 icon icon-mobile-menu"></i>
                  </button>
                </div>
              </div>

              <div className="header-right__buttons d-flex items-center ml-30 xl:ml-20 md:d-none">
                <Link
                  href="/instructor-become"
                  className="text-nav-1 -before-border py-3 pl-30 xl:pl-20 mr-10"
                >
                  Enseigner
                </Link>
                <Link 
                  href="/learning"
                  className="text-nav-1 -before-border py-3 pl-30 xl:pl-20 mr-10"
                >
                  Mon apprentissage
                </Link>
                <CartToggle
                  parentClassess={"relative ml-30 mr-25 xl:ml-20 xl:mr-15"}
                  allClasses={"d-flex items-center text-dark-1"}
                />
                <div
                  className="relative d-flex items-center ml-10"
                  onClick={() => setIsOnProfile((pre) => !pre)}
                >
                  <span data-el-toggle=".js-profile-toggle">
                    <Image
                      width={50}
                      height={50}
                      className="size-50"
                      src="/assets/img/misc/user-profile.png"
                      alt="image"
                    />
                  </span>

                  <div
                    className={`toggle-element js-profile-toggle ${
                      isOnProfile ? "-is-el-visible" : ""
                    } -`}
                  >
                    <div className="toggle-bottom -profile bg-white shadow-4 border-light rounded-8 mt-10">
                      <div className="px-10 py-30">
                        <div className="sidebar -dashboard">
                            <div
                              className={`sidebar__item`}
                            >
                              <a
                                href={'/settings'}
                                className="d-flex items-center text-17 lh-1 fw-500 "
                              >
                                <i className='icon-setting mr-10'></i>
                                Settings
                              </a>
                            </div>
                            <div
                              className={`sidebar__item`}
                            >
                              <span
                                onClick={() => {
                                  alert("logout")
                                }}
                                className="d-flex items-center text-17 lh-1 fw-500 "
                              >
                                <i className='icon-power mr-10'></i>
                                Logout
                              </span>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <Link
                  href="/login"
                  className="button px-30 h-50 -outline-dark-1 text-dark-1 ml-20"
                >
                  Log in        
                </Link>
                <Link
                  href="/signup"
                  className="button px-30 h-50 -purple-1 text-white ml-10"
                >
                  Sign up
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
