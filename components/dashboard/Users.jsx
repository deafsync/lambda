"use client";

import { grades, partcipents } from "@/data/dashboard";
import { letters, alphabetItems } from "@/data/dictionary";

import React, { useState, useEffect } from "react";
import FooterNine from "../layout/footers/FooterNine";
import Image from "next/image";
import PageLinksTwo from "../common/PageLinksTwo";

export default function Participants() {
  const [currentLetter, setCurrentLetter] = useState("A");
  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row pb-50 mb-10">
          <div className="col-auto">
            <h1 className="text-30 lh-12 fw-700">Etudiants</h1>

            <div className="mt-10">
              Lorem ipsum dolor sit amet, consectetur.
            </div>
          </div>
        </div>

        <div className="row y-gap-30">
          <div className="col-12">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="d-flex items-center py-30 px-30 border-bottom-light">
                <h2 className="text-17 lh-1 fw-500">Liste des étudiants</h2>
              </div>

              <div className="pb-30 px-30">
                <div className="border-light rounded-8">
                  
                </div>

                

                <div className="mt-10">
                  <div className="px-30 py-20 bg-light-7 -dark-bg-dark-2 rounded-8">
                    <div className="row x-gap-10">
                      <div className="col-lg-2">
                        <div className="text-purple-1">
                          Nom et prénom
                        </div>
                      </div>
                      <div className="col-lg-2">
                        <div className="text-purple-1">Dates</div>
                      </div>
                      <div className="col-lg-2">
                        <div className="text-purple-1">Roles</div>
                      </div>
                      <div className="col-lg-2">
                        <div className="text-purple-1">Cours actifs</div>
                      </div>
                      {/* {name === "instructors" && <div className="col-lg-2">
                        <div className="text-purple-1">Portefeuille</div>
                      </div>} */}
                      <div className="col-lg-2">
                        <div className="text-purple-1">
                          Dernieres connexion
                        </div>
                      </div>
                    </div>
                  </div>

                  {partcipents.map((elm, i) => (
                    <div key={i} className="px-30 border-bottom-light">
                      <div className="row x-gap-10 items-center py-15">
                        {/* <div className="col-lg-1">
                          <div className="d-flex items-center">
                            <Image
                              width={40}
                              height={40}
                              src={elm.imgSrc}
                              alt="image"
                              className="size-40 fit-cover"
                            />
                          </div>
                        </div> */}

                        <div className="col-lg-2">
                          <div className="ml-10">
                              <div className="text-dark-1 lh-12 fw-500">
                                {elm.name}
                              </div>
                            </div>
                        </div>
                        <div className="col-lg-2">
                          <div className="text-14 lh-12 mt-5">
                            {elm.date}
                          </div>
                        </div>
                        {/* {name === "instructors" && <div className="col-lg-2">$1000</div>} */}
                        <div className="col-lg-2">{elm.role}</div>
                        <div className="col-lg-2">10</div>
                        <div className="col-lg-2">{elm.duration}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterNine />
    </div>
  );
}
