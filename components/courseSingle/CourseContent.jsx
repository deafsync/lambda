"use client";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React, { useState } from "react";
import ModalVideoComponent from "../common/ModalVideo";

export default function CourseContent({lessonItems}) {
  const [activeItemId, setActiveItemId] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [videoId, setVideoId] = useState("LlCwHnp3kL4");

  // TODO: Get data from parent

  const handleOpen = (open, videoId) => {
    setIsOpen(open)
    setVideoId(videoId)
  }

  return (
    <>
      <div id="course-content" className="pt-60 lg:pt-40">
        <h2 className="text-20 fw-500">Course Content</h2>

        <div className="d-flex justify-between items-center mt-30">
          <div className="">{lessonItems[0].lessons.length} lectures</div>
          {/* <a href="#" className="underline text-purple-1">
            Expand All Sections
          </a> */}
        </div>

        <div className="mt-10">
          <div className="accordion -block-2 text-left js-accordion">
            {lessonItems.map((elm, i) => (
              <div
                key={i}
                className={`accordion__item ${
                  activeItemId == elm.id ? "is-active" : ""
                } `}
              >
                <div
                  onClick={() =>
                    setActiveItemId((pre) => (pre == elm.id ? 0 : elm.id))
                  }
                  className="accordion__button py-20 px-30 bg-light-4"
                >
                  <div className="d-flex items-center">
                    <div className="accordion__icon">
                      <div className="icon">
                        <FontAwesomeIcon icon={faChevronDown} />
                      </div>
                      <div className="icon">
                        <FontAwesomeIcon icon={faChevronUp} />
                      </div>
                    </div>
                    <span className="text-17 fw-500 text-dark-1">
                      Course Content
                    </span>
                  </div>

                  <div>
                    {elm.lessons.length} lectures • {elm.duration} min
                  </div>
                </div>

                <div
                  className="accordion__content"
                  style={activeItemId == elm.id ? { maxHeight: "700px" } : {}}
                >
                  <div className="accordion__content__inner px-30 py-30">
                    <div className="y-gap-20">
                      {elm.lessons.map((itm, index) => (
                        <div key={index} className="d-flex justify-between">
                          <div className="d-flex items-center">
                            <div className="d-flex justify-center items-center size-30 rounded-full bg-purple-3 mr-10">
                              <div className="icon-play text-9"></div>
                            </div>
                            <div>{itm.title}</div>
                          </div>

                          <div className="d-flex x-gap-20 items-center">
                            {!index && <span
                              onClick={() => handleOpen(true, "LlCwHnp3kL4")}
                              className="text-14 lh-1 text-purple-1 underline cursor "
                            >
                              Preview
                            </span>}
                            <div
                              className="text-14 lh-1 text-purple-1"
                            >
                              {itm.duration}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ModalVideoComponent
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        videoId={videoId} 
      />
    </>
  );
}
