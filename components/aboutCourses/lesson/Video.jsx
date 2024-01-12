"use client";

import React, { useEffect, useState } from "react";
import ModalVideoComponent from "../../common/ModalVideo";
import Image from "next/image";
export default function Video() {

  // TODO: have id for index
  // TODO: Map and switch audio track

  const [isOpen, setIsOpen] = useState(false);

  let recognition = null

  return (
    <>
      <div className="">
        <video 
          controls
          style={{width: '100%', height: "auto"}}
        >
          <source src="/assets/img/general/video.mp4" type="video/mp4" style={{width: '100% !important'}}/>
        </video>
      </div>
      <ModalVideoComponent
        videoId={"LlCwHnp3kL4"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
}
