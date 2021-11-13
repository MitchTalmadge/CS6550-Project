import React, { useEffect } from 'react'
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import "./app.scss";
import { store } from "./redux/store";
import { Episode } from "./routes/episode/episode";
import { Home } from "./routes/home/home";
import { Search } from "./routes/search/search";
import { Season } from "./routes/season/season";
import { Header } from "./shared/header/header";

interface Props {

}

export const App = (props: Props) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <div className="container pt-3">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/search/:query" element={<Search />} />
            <Route path="/season/:season/episode/:episode" element={<Episode />} />
            <Route path="/season/:season" element={<Season />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  )
}

const NoMatch = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/home");
  }, [])
  return null;
}