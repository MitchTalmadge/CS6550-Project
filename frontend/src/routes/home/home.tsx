import { FavoriteIcon } from "@/shared/favorite-icon/favorite-icon";
import { SeasonCover } from "@/shared/season-cover/season-cover";
import React, { useCallback, useRef } from "react"
import { Button, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import "./home.scss";

export const Home = () => {
  return (
    <div className="home">
      <Search />
      <Browse />
      <Recommend />
    </div>
  )
}

const Search = () => {
  const navigate = useNavigate();

  const onSubmit: React.FormEventHandler = useCallback((event) => {
    navigate("/search/" + encodeURIComponent(event.target[0].value));
    event.preventDefault();
  }, [navigate])

  return (
    <div className="search">
      <h2 className="display-6">Search for an episode:</h2>
      <Form onSubmit={onSubmit}>
        <Form.Control name="query"></Form.Control>
        <Button type="submit">Search!</Button>
      </Form>
    </div>
  )
}

const Browse = () => {
  const navigate = useNavigate();
  const seasonsRef = useRef<HTMLDivElement>();

  const onSeasonsScrollWheel = useCallback((event: React.WheelEvent) => {
    seasonsRef.current.scrollLeft += event.deltaY;
  }, []);

  return (
    <div className="browse">
      <h2 className="display-6 mt-3">Browse for an episode:</h2>
      <div className="seasons" ref={seasonsRef} onWheel={onSeasonsScrollWheel}>
        {Array(19).fill(0).map((_, i) => (
          <div className="season" onClick={() => navigate(`/season/${i + 1}`)} key={i + 1}>
            <SeasonCover season={i + 1} />
          </div>
        ))}
      </div>
    </div>
  )
}

const Recommend = () => {
  return (
    <>
      <hr />
      <h2 className="display-6"><FavoriteIcon favorite={true} /> Recommendations from your favorites:</h2>
    </>
  )
}