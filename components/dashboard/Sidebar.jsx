"use client";

import { sidebarItems } from "@/data/dashBoardSidebar";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Sidebar() {
  const pathname = usePathname();
  return (
    <div className="sidebar -dashboard">
      {sidebarItems.map((elm, i) => (
        <div
          key={i}
          className={`sidebar__item   ${
            (pathname.includes(elm.href) && i !== 0) || (pathname == elm.href && i === 0) ? "-is-active" : ""
          } `}
        >
          <Link
            key={i}
            href={elm.href}
            className="d-flex items-center text-17 lh-1 fw-500 "
          >
            <i className={`${elm.iconClass} mr-15`}></i>
            {elm.text}
          </Link>
        </div>
      ))}
    </div>
  );
}
