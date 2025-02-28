"use client";

import FooterNine from "../../layout/footers/FooterNine";
import Media from "./Media";
import Curriculum from "./Curriculum";
import React, { useState, useEffect } from "react";
import Image from "next/image";

import {toast} from "react-hot-toast"
import { useRouter } from "next/navigation";
import { mediaUpload } from "@/data/dashboard";
import { create_formation, get_categories } from "@/services/core.service";

const category = [
  { id: 1, titre: "Software & IT"},
  { id: 2, titre: "Design"},
  { id: 3, titre: "Finance"},
  { id: 4, titre: "Business"}
]

export default function Listing() {
  const [activeTab, setActiveTab] = useState(1);
  const router = useRouter()

  const [previewImage, setPreviewImage] = useState(mediaUpload[0].imgSrc);
  const [category, setCategory] = useState([])

  const [state, setState] = useState({
    titre: "",
    description: "",
    langue: "",
    level: "",
    categorie: 0,
    prerequis: "",
    will_learn: "",
    image: "",
    langue_dub: "",
    montant:'',
    langue_subtitles: ""
  })

  useEffect(() => {
    get_categories()
      .then(res => {
        let data = []
        for(let i = 0; i < res.length; i++) {
          data.push({
            id: res[i].id,
            title: res[i].titre,
          })
        }
        setCategory(data)
      }).catch(err => {
        console.log(err)
        toast.error("Geting categories make error")
      })
  }, [])

  const handleChange = (event) => {
    const {name, value} = event.target
    setState({...state, [name]: value})
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {

      setState({...state, ["image"]: file})

      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(state)

    let data = {...state}

    if(data.categorie == 0) {
      data["categorie"] = category[0].id
      console.log("ID ", category[0].id)
    }

    create_formation(data)
      .then(res => {
        if(res) {
          toast.success('Course successfuly created')
          router.push("/dashboard/course")
        } else {
          toast.error("An error occured")
        }
      }).catch(err => {
        console.log(err)    
      })
  };

  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row pb-10 mb-0">
          <div className="col-auto">
            <h1 className="text-30 lh-12 fw-700">Create New Course</h1>
            <div className="mt-10">
              Start creating your course here.
            </div>
          </div>
        </div>

        <section className="layout-pt-lg layout-pb-md">
        <div className="">
          <div className="tabs -side js-tabs">
          <div className="row y-gap-60">
          <div className="col-12">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="d-flex items-center py-20 px-30 border-bottom-light">
                <h2 className="text-17 lh-1 fw-500">Basic Information</h2>
              </div>

              <div className="py-30 px-30">
                <form
                  className="contact-form row y-gap-30"
                  action="#"
                >
                  <div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      Course Title*
                    </label>

                    <input
                      required
                      name="titre"
                      value={state.titre}
                      type="text"
                      onChange={handleChange}
                      placeholder="Learn Figma - UI/UX Design Essential Training"
                    />
                  </div>

                  <div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      Course Description*
                    </label>

                    <textarea
                      required
                      name="description"
                      value={state.description}
                      placeholder="Description"
                      rows="7"
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <div className="col-md-6">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      What will students learn in your course?*
                    </label>

                    <textarea
                      required
                      name="will_learn"
                      value={state.will_learn}
                      placeholder="Description"
                      rows="7"
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <div className="col-md-6">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      Requirements*
                    </label>

                    <textarea
                      required
                      name="prerequis"
                      value={state.prerequis}
                      placeholder="Requirements"
                      rows="7"
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <div className="col-md-6">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      Course Level*
                    </label>

                    <select 
                      name="level"
                      value={state.level}
                      onChange={handleChange}
                    >
                      <option value="">Select your level</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Expert">Expert</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      Audio Language*
                    </label>

                    <select 
                      name="langue"
                      value={state.langue}
                      onChange={handleChange}
                    >
                      <option value="">Select your language</option>
                      <option value="en">English</option>
                      <option value="fr">Français</option>
                      <option value="fon">Fongbé</option>
                      <option value="yor">Yoruba</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      Dubbing Language*
                    </label>

                    <select 
                      name="langue_dub"
                      value={state.langue_dub}
                      onChange={handleChange}
                    >
                      <option value="">Select your language</option>
                      <option value="en">English</option>
                      <option value="fr">Français</option>
                      <option value="fon">Fongbé</option>
                      <option value="yor">Yoruba</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      Subtitle Language*
                    </label>

                    <select 
                      name="langue_subtitles"
                      value={state.langue_subtitles}
                      onChange={handleChange}
                    >
                      <option value="">Select your language</option>
                      <option value="en">English</option>
                      <option value="fr">Français</option>
                      {/* <option value="fon">Fongbé</option> */}
                      <option value="yor">Yoruba</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      Amount
                    </label>

                    <input
                      required
                      name="montant"
                      type="number"
                      value={state.montant}
                      placeholder="10"
                      onChange={handleChange}
                    />
                  </div>

                  {/* <div className="col-md-6">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      Close Caption*
                    </label>

                    <input required type="text" placeholder="Select" />
                  </div> */}

                  <div className="col-md-6">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      Course Category*
                    </label>

                    <select 
                      name="categorie"
                      value={state.categorie}
                      onChange={handleChange}
                    >
                      {category.map((elm, index) => <option key={`option-course-create-${index}`} value={elm.id}>{elm.title}</option>)}
                    </select>
                  </div>

                  <div
                    className="relative shrink-0"
                    style={
                      previewImage
                        ? {}
                        : { backgroundColor: "#f2f3f4", width: 250, height: 200 }
                    }
                  >
                    {previewImage && (
                      <Image
                        width={735}
                        height={612}
                        className="w-1/1"
                        style={{
                          width: "250px",
                          height: "200px",
                          objectFit: "contain",
                          borderRadius: 10
                        }}
                        src={previewImage}
                        alt="image"
                      />
                    )}

                    <div className="absolute-full-center d-flex justify-end py-20 px-20">
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          document.getElementById("imageUpload1").value = "";
                          setPreviewImage("");
                        }}
                        className="d-flex justify-center items-center bg-white size-40 rounded-8 shadow-1"
                      >
                        <i className="icon-bin text-16"></i>
                      </span>
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-upload col-12">
                      <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                        Course thumbnail*
                      </label>
                      <div className="form-upload__wrap">
                        <input
                          type="text"
                          disabled
                          placeholder={"Cover-1.png"}
                        />
                        <button className="button -dark-3 text-white">
                          <label
                            style={{ cursor: "pointer" }}
                            htmlFor="imageUpload1"
                          >
                            Upload Files
                          </label>
                          <input
                            required
                            id="imageUpload1"
                            type="file"
                            accept="image/*"
                            name="image"
                            onChange={handleImageChange}
                            style={{ display: "none" }}
                          />
                        </button>
                      </div>
                    </div>

                    <p className="mt-10">
                      Upload your course image here. It must meet our course image
                      quality standards to be accepted. Important guidelines:
                      750x440 pixels; .jpg, .jpeg,. gif, or .png. no text on the
                      image.
                    </p>
                  </div>


                </form>

                <div className="row y-gap-20 justify-between pt-15">
                  <div className="col-auto">
                    
                  </div>

                  <div className="col-auto">
                    <button onClick={handleSubmit} className="button -md -purple-1 text-white">
                      Create
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          
        </div>
          </div>
        </div>
      </section>
      </div>

      <FooterNine />
    </div>
  );
}
