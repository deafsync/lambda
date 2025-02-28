"use client";

import React, { useEffect, useState, useRef } from "react";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";

export default function Video({ url, sub }) {
  const playerRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);


  const sources = {
    type: "video",
    sources: [{ src: url, type: "video/mp4" }],
    tracks: sub
      ? sub.map((el_sub, id) => ({
          kind: "subtitles",
          src: `/api/proxy?url=${encodeURIComponent(el_sub.link)}`,
          srclang: el_sub.lang,
          label: el_sub.lang,
          default: id === 0,
        }))
      : [],
  };

  return (
    <div className="video-container">
      {isMounted && (
        <Plyr
          ref={playerRef}
          source={sources}
          options={{
            controls: ["play", "progress", "current-time", "mute", "volume", "settings"],
            settings: ["captions", "quality", "speed"],
          }}
        />
      )}
    </div>
  );
}
