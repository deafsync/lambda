"use client";

import { courses } from "@/data/curriculum";
import { create_course } from "@/services/core.service";
import { extractYouTubeID } from "@/utils/link";
import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";

import {toast} from "react-hot-toast"

export default function Curriculum({id}) {
  const [currentOpenItem, setCurrentOpenItem] = useState();

  const [cv, setCv] = useState([])

  const [loading, setLoading] = useState(false)

  // useEffect(() => {
  //   setCv(courses)
  // }, [])

  const handleAdd = () => {
    let data = [...cv]
    data.push(
      {id: 0, titre: "Hello World Project from GitHub", duree: 0, video_url: "https://www.youtube.com/watch?v=fLeJJPxua3E"}
    )

    setCv(data)
  }

  const handleChange = (event, id) => {
    const {name, value} = event.target

    let data = [...cv]
    data[id][name] = value

    setCv(data)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    for(let i = 0; i < cv.length; i++) {
      if(cv[i].video_url == "" || cv[i].titre == "" || cv[i].duree == 0) {
        toast.error("Your missed an input")
        return 
      }
    }

    if(!extractYouTubeID(cv[0].video_url)) {
      toast.error("VideoUrl is missed")
      return
    }

    let data = cv[0]

    data.video_url = extractYouTubeID(data.video_url)
    data["formation"]  = id
    delete data['id']
    toast.success("course structure sent")

    setLoading(true)

    create_course(data)
      .then(res => {
        if(res) {
          toast.success('Course successfuly created')
        } else {
          toast.error("An error occured")
        }
        setLoading(false)
      }).catch(err => {
        console.log(err)
        toast.error("Somthing happen")
        setLoading(false)
      })

  }
 
  return (
    <div className="py-30 px-30">
        <div className={`row `}>
          <div className="col-12">
            <h4 className="text-16 lh-1 fw-500">Course list</h4>
          </div>

          <div className="col-12">
            <div className="accordion js-accordion -block-2 text-left">
              {cv && cv.map((itm, index) => (
                <div
                  key={index}
                  className={`accordion__item -dark-bg-dark-1 mt-10 ${
                    currentOpenItem == `${index}` ? "is-active" : ""
                  } `}
                >
                  <div
                    className="accordion__button py-10 px-30 bg-light-4"
                  >
                    <div className="d-flex items-center">
                      <div className="icon icon-drag mr-10"></div>
                      <div className="">
                        <input 
                          className="course-input text-16 lh-14 fw-500 text-dark-1" 
                          value={cv[index].titre}
                          type="text"
                          name="titre"
                          onChange={(event) => handleChange(event, index)}
                          required
                          placeholder="put the lessons name"
                        />
                      </div>
                    </div>

                    <div className="d-flex x-gap-10 items-center">
                      {/* <a href="#" className="icon icon-edit mr-5"></a> */}
                      {/* <a href="#" className="icon icon-bin"></a> */}

                      <div 
                        className="accordion__icon mr-0"
                        onClick={() =>
                          setCurrentOpenItem((pre) =>
                            pre == `${index}` ? "" : `${index}`,
                          )
                        }
                      >
                        <div className="d-flex items-center justify-center icon icon-chevron-down"></div>
                        <div className="d-flex items-center justify-center icon icon-chevron-up"></div>
                      </div> 
                    </div>
                  </div>

                  <div
                    className="accordion__content"
                    style={
                      currentOpenItem == `${index}`
                        ? { maxHeight: "250px" }
                        : {}
                    }
                  >
                    <div className="accordion__content__inner px-30">
                      <div className="col-12 mb-20 contact-form">
                        <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                          Duration
                        </label>

                        <input
                          required
                          value={cv[index].duree}
                          name="duree"
                          onChange={(event) => handleChange(event, index)}
                          type="text"
                          placeholder="Put duree here"
                        />
                      </div>
                      <div className="col-12 mb-20 contact-form">
                        <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                          Course link
                        </label>

                        <input
                          required
                          value={cv[index].video_url}
                          name="video_url"
                          onChange={(event) => handleChange(event, index)}
                          type="url"
                          placeholder="https://www.youtube.com/watch?v=nBpPe9UweWs"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      

      <div className="d-flex x-gap-10 y-gap-10 flex-wrap">
        <div>
          
        </div>
        <div className="mt-20">
          <button
            className="button -sm py-15 -purple-3 text-purple-1 fw-500"
            onClick={handleAdd}
          >
            Add Article +
          </button>
        </div>
      </div>

      <div className="row y-gap-20 justify-between pt-30">
        <div className="col-auto sm:w-1/1">
          
        </div>

        <div className="col-auto sm:w-1/1">
          {loading ? <CircularProgress color="inherit" /> : <button 
            className="button -md -purple-1 text-white sm:w-1/1"
            onClick={handleSubmit}
          >
            Save
          </button> }
        </div>
      </div>
    </div>
  );
}
