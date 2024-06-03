"use client";

import { grades, partcipents } from "@/data/dashboard";
import { letters, alphabetItems } from "@/data/dictionary";

import React, { useState, useEffect } from "react";
import FooterNine from "../layout/footers/FooterNine";
import Image from "next/image";
import PageLinksTwo from "../common/PageLinksTwo";

export default function Participants() {
  const [currentLetter, setCurrentLetter] = useState("A");
  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row pb-50 mb-10">
          <div className="col-auto">
            <h1 className="text-30 lh-12 fw-700">Transactions</h1>

            <div className="mt-10">
              Browse the transaction list
            </div>
          </div>
        </div>

        <div className="row y-gap-30" style={{height: "400px"}}>
          <div className="col-12">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="d-flex items-center py-30 px-30 border-bottom-light">
                <h2 className="text-17 lh-1 fw-500">Transaction list</h2>
              </div>
              <h2 className="text-30 lh-1 py-30 px-30 ml-10 fw-700">No transaction</h2>
            </div>
          </div>
        </div>
      </div>

      <FooterNine />
    </div>
  );
}
