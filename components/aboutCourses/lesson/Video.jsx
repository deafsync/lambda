"use client";

import React, { useState } from "react";
import ModalVideoComponent from "../../common/ModalVideo";
import Image from "next/image";
export default function Video() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="">
        <video 
          controls
          style={{width: '100%', height: "auto"}}
        >
          <source src="/assets/img/general/video.mp4" type="video/mp4" style={{width: '100% !important'}}/>
          Votre navigateur ne prend pas en charge la lecture de vidéos.
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
