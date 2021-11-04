import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import "./app.scss";
import { Home } from "./routes/home/home";
import { Season } from "./routes/season/season";
import { Header } from "./shared/header/header";

interface Props {
  
}

export const App = (props: Props) => {
  return (
    <BrowserRouter>
      <Header />
      <div className="container pt-3">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/season/:season" element={<Season />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </div> 
    </BrowserRouter>
  )
}

const NoMatch = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/home");
  }, [])
  return null;
}