import React from 'react'
import { Link } from "react-router-dom";
import "./header.scss";
import LogoSvg from "./logo.svg";

export const Header = () => {
  return (
    <div id="header">
      <div className="logo">
        <Link to="/"><LogoSvg /></Link>
      </div>
      <div className="title">
        <Link to="/"><h1>Search &amp; Recommendation System</h1></Link>
      </div>
    </div>
  )
}
