"use client";

import { dubs as courses } from "@/data/curriculum";
import React, { useEffect, useState } from "react";

import {toast} from "react-hot-toast"

import { useRouter } from "next/navigation";
import { get_one_formations } from "@/services/core.service";

export default function CurriculumDub({language, id}) {
  const [currentOpenItem, setCurrentOpenItem] = useState();
  const router = useRouter()
  const [cv, setCv] = useState()

  useEffect(() => {
    get_one_formations(id)
      .then(res => {
        if(res) {
          console.log("res ", res)
          setCv(res.cours)
        } else {
          toast.error("An error occured")
        }
      }).catch(err => {
        console.log(err)
        toast.error("Somthing happen")
      })

  }, [])

  const handleFinish = (event) => {
    event.preventDefault()

    router.push('/dashboard/course')
  }

  // const handleDub = (id, ) => {
  //   // TODO: inititate dubbing

  //   toast.success(`Dubbing start ${id} in ${language}`)
  // }
 
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
                      <div className="">
                        <div 
                          className="course-input text-16 lh-14 fw-500 text-dark-1" 
                        >{cv[index].titre}</div>
                      </div>
                    </div>

                    {/* ellipsis */}

                    {cv[index] && <div className="d-flex x-gap-20 items-center">
                            <span style={{color: "green"}}>finished</span>
                            <b style={{borderRadius: 50, width: "40px", height: "40px", background: "#7254ED", color: "white", padding: "auto", display: "flex", alignItems: "center", justifyContent: "center", marginLeft: "20px"}}><a href={`/dashboard/studio/${cv[index].id}`} className="icon icon-arrow-top-right text-13"></a></b>
                        </div> 
                    }

                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      

      <div className="row y-gap-20 justify-between pt-30">
        <div className="col-auto sm:w-1/1">
          
        </div>

        <div className="col-auto sm:w-1/1">
          <button 
            className="button -md -purple-1 text-white sm:w-1/1"
            onClick={handleFinish}
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  );
}


// : <div className="d-flex x-gap-10 items-center">
//         <span style={{color: "blue"}}>in progress</span>
//     </div>) : <div className="d-flex x-gap-20 items-center">
//         <span>not dubed</span>
//         {language != "choose" && <b style={{borderRadius: 50, width: "40px", height: "40px", background: "#7254ED", color: "white", padding: "auto", display: "flex", alignItems: "center", justifyContent: "center", marginLeft: "20px"}}>
//             <div 
//                 className="icon icon-play text-13"
//                 onClick={() => handleDub(cv[index].id)}
//             ></div>
//         </b>}
//     </div>