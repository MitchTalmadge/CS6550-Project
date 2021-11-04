import React from 'react'
import "./header.scss";
import LogoSvg from "./logo.svg";

export const Header = () => {
  return (
    <div id="header">
      <div className="logo">
        <LogoSvg />
      </div>
      <div className="title">
        <h1>Search &amp; Recommendation System</h1>
      </div>
    </div>
  )
}
