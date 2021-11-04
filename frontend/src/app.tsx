import React from 'react'
import "./app.scss";
import { Home } from "./pages/home/home";
import { Header } from "./shared/header/header";

interface Props {
  
}

export const App = (props: Props) => {
  return (
    <>
      <Header />
      <div className="container pt-3">
          <Home />
      </div> 
    </>
  )
}
