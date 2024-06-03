"use client";

import { grades, partcipents } from "@/data/dashboard";
import { letters, alphabetItems } from "@/data/dictionary";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import FooterNine from "../layout/footers/FooterNine";
import Image from "next/image";
import PageLinksTwo from "../common/PageLinksTwo";

import {toast} from "react-hot-toast"
import { create_category, get_categories } from "@/services/core.service";

export default function Categories() {
  const [currentLetter, setCurrentLetter] = useState("A");
  const [load, setLoad] = useState(false)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    get_categories()
      .then(res => {
        if(res) {
          setCategories(res)
        }
      })
      .catch(err => {
        toast.error("Somethin happened")
      })
  }, [load])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(state.icone == "" || state.tag == "" || state.titre == "") 
        toast.error('Somthing is missed')
    else
        toast.success('Course successfuly created')
    console.log(state)

    create_category(state)
      .then(res => {
        if(res) {
          toast.success("Category successfully added")
          setLoad(!load)
        } else {
          toast.error("An error occured")
        }
      })
      .catch(err => {
        toast.error("Somethin happened")
      })
  };

  const [state, setState] = useState({
    titre: "",
    icone: "",
    tag: "",
  })

  const handleChange = (event) => {
    const {name, value} = event.target
    setState({...state, [name]: value})
  }

  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row pb-50 mb-10">
          <div className="col-auto">
            <h1 className="text-30 lh-12 fw-700">Categories</h1>

            <div className="mt-10">
              Manage categories
            </div>
          </div>
        </div>

        <div className="py-30 px-30">
            <form
                className="contact-form row y-gap-30"
                action="#"
            >
                <div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                        Category Title*
                    </label>

                    <input
                        required
                        name="titre"
                        value={state.titre}
                        type="text"
                        onChange={handleChange}
                        placeholder="Development"
                    />
                </div>
                <div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                        Icon
                    </label>

                    <input
                        required
                        name="icone"
                        value={state.icone}
                        type="text"
                        onChange={handleChange}
                        placeholder="💼"
                    />
                </div>
                <div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                        Tag
                    </label>

                    <input
                        required
                        name="tag"
                        value={state.tag}
                        type="text"
                        onChange={handleChange}
                        placeholder="#development"
                    />
                </div>
                <div className="row y-gap-20 justify-between pt-15">
                  <div className="col-auto">
                    
                  </div>

                  <div className="col-auto">
                    <button onClick={handleSubmit} className="button -md -purple-1 text-white">
                      Create
                    </button>
                  </div>
                </div>
            </form>
        </div>

        <div className="row y-gap-30">

          <div className="col-12">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="d-flex items-center py-30 px-30 border-bottom-light">
                <h2 className="text-17 lh-1 fw-500">Category list</h2>
              </div>

              
            </div>
          </div>

          <div className="pb-30 px-30">
                <div className="border-light rounded-8">
                  
                </div>
                

                <div className="mt-10">
                  <div className="px-30 py-20 bg-light-7 -dark-bg-dark-2 rounded-8">
                    <div className="row x-gap-10">
                      <div className="col-lg-2">
                        <div className="text-purple-1">
                          categorie name
                        </div>
                      </div>
                    </div>
                  </div>

                  {(categories && categories.length > 0) ? <div>{categories.map((elm, i) => (
                    <div key={`category-${i}`} className="px-30 border-bottom-light">
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
                        <div className="col">
                          <div className="text-15 lh-12 mt-5">
                            <span className="text-17 mt-5">{elm.icone}</span> {elm.titre} : {elm.tag}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}</div> : <div>No category found</div>}
                </div>
              </div>
        </div>
      </div>

      <FooterNine />
    </div>
  );
}
