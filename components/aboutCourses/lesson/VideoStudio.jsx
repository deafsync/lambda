"use client";

import React, { useState } from "react";
import ModalVideoComponent from "../../common/ModalVideo";
import Image from "next/image";

export default function Video() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="video--size">
        <video 
          controls
          style={{width: "100% !important"}}
        >
          <source src="/assets/img/general/video.mp4" type="video/mp4" />
          Votre navigateur ne prend pas en charge la lecture de vidéos.
        </video>
      </div>
    </>
  );
}
