"use client";

import React, { useEffect, useState, useRef } from "react";
import ModalVideoComponent from "../../common/ModalVideo";
import Image from "next/image";

export default function Video({url, sub}) {

  // TODO: have id for index
  // TODO: Map and switch audio track

  const [isOpen, setIsOpen] = useState(false);

  let recognition = null

  const handleVideoEnd = () => {
    alert('La vidéo est terminée.');

    // TODO: send finished to API
  };

  const videoRef = useRef(null);

  useEffect(() => {
    // Mise à jour de la source de la vidéo lorsque l'URL change
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [url]);

  return (
    <>
      <div className="">
        <video 
          ref={videoRef}
          controls
          style={{width: '100%', height: "auto"}}
          onEnded={handleVideoEnd}
        >
          <source 
            src={url} 
            type="video/mp4" 
            style={{width: '100% !important'}}
          />
          
          {sub && sub.map((el_sub, id) => <track
              label={el_sub.lang}
              kind="subtitles"
              srcLang={el_sub.lang}
              src={`/api/proxy?url=${encodeURIComponent(el_sub.link)}`}
              default={id==0}
              key={id}
          />)}
        </video>
      </div>
      {/* <ModalVideoComponent
        videoId={"LlCwHnp3kL4"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      /> */}
    </>
  );
}
