"use client";

import React, { useState, useEffect } from "react";

export default function Tabs() {
  const [activeTab, setActiveTab] = useState(1);
  return (
    <div className="row justify-center">
      <div className="col-xl-8 col-lg-9 col-md-11">
        <div className="tabs -active-purple-2 js-tabs">
          <div className="tabs__controls d-flex js-tabs-controls">
            <button
              onClick={() => setActiveTab(1)}
              className={`tabs__button js-tabs-button ${
                activeTab == 1 ? "is-active" : ""
              } `}
              data-tab-target=".-tab-item-1"
              type="button"
            >
              Become an Instructor
            </button>
            <button
              onClick={() => setActiveTab(2)}
              className={`tabs__button js-tabs-button ml-30 ${
                activeTab == 2 ? "is-active" : ""
              } `}
              data-tab-target=".-tab-item-2"
              type="button"
            >
              Instructor rules
            </button>
            <button
              onClick={() => setActiveTab(3)}
              className={`tabs__button js-tabs-button ml-30 ${
                activeTab == 3 ? "is-active" : ""
              } `}
              data-tab-target=".-tab-item-3"
              type="button"
            >
              Start with courses
            </button>
            <button
              onClick={() => setActiveTab(4)}
              className={`tabs__button js-tabs-button ml-30 ${
                activeTab == 4 ? "is-active" : ""
              } `}
              data-tab-target=".-tab-item-4"
              type="button"
            >
              Dub your courses
            </button>
          </div>

          <div className="tabs__content pt-60 lg:pt-40 js-tabs-content">
            <div
              className={`tabs__pane -tab-item-1 ${
                activeTab == 1 ? "is-active" : ""
              } `}
            >
              <p className="text-light-1">
                Effective content presentation is crucial in capturing user attention
                and maintaining engagement. A well-structured layout ensures a seamless
                reading experience, allowing information to be processed more
                efficiently.
                <br />
                <br />
                Modern web design incorporates strategies that balance aesthetics and
                readability, ensuring that text remains visually appealing without
                overwhelming the user.
              </p>
            </div>
            <div
              className={`tabs__pane -tab-item-2 ${
                activeTab == 2 ? "is-active" : ""
              } `}
            >
              <p className="text-light-1">
                Clarity and organization in content help enhance user comprehension and
                retention. By structuring text with appropriate spacing and formatting,
                designers can create a more intuitive reading flow.
              </p>
            </div>
            <div
              className={`tabs__pane -tab-item-3 ${
                activeTab == 3 ? "is-active" : ""
              } `}
            >
              <p className="text-light-1">
                Many digital platforms prioritize user experience by implementing
                well-designed typography and layout strategies. A clear and structured
                approach ensures that information is easily accessible and digestible.
              </p>
            </div>
            <div
              className={`tabs__pane -tab-item-4 ${
                activeTab == 4 ? "is-active" : ""
              } `}
            >
              <p className="text-light-1">
                The effectiveness of a page's layout significantly influences user
                engagement. A thoughtful design approach ensures that content remains
                both visually appealing and functional.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
