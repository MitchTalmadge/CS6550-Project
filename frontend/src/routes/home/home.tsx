import { API_URL } from "@/const/api";
import { episodes } from "@/const/episodes";
import { IEpisode } from "@/models/episode";
import { useAppSelector } from "@/redux/store";
import { FavoriteIcon } from "@/shared/favorite-icon/favorite-icon";
import { SeasonCover } from "@/shared/season-cover/season-cover";
import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom";
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

  const favorites = useAppSelector(s => s.favoriteEpisodes);

  const [recommends, setRecommends] = useState<IEpisode[]>(undefined);

  useEffect(() => {
    setRecommends(undefined);
    if (favorites.length === 0) {
      setRecommends([]);
      return;
    }
    axios.post(`${API_URL}/recommend`, favorites)
      .then(res => {
        if (res.status === 200) {
          setRecommends(res.data);
        } else {
          console.log("Failed to get episode recommendations", res);
        }
      })
      .catch(err => {
        console.log("Failed to get episode recommendations", err);
      })
  }, [favorites]);


  return (
    <>
      <hr />
      <h2 className="display-6"><FavoriteIcon favorite={true} /> Recommendations from your favorites:</h2>
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th style={{ width: "50%" }}>Favorites</th>
            <th style={{ width: "50%" }}>Recommendations</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {favorites.length === 0
                ? <p>No favorites selected.</p>
                :
                <ul>
                  {favorites.map(favorite => (
                    <li key={`${favorite.season}-${favorite.id}`}>
                      <Link to={`/season/${favorite.season}/episode/${favorite.id}`}>
                        Season {favorite.season} Episode {favorite.id}: {episodes[favorite.season][favorite.id].name}
                      </Link>
                    </li>
                  ))}
                </ul>
              }
            </td>
            <td>
              {!recommends
                ? <p>Loading...</p>
                : recommends.length === 0
                  ? <p>Please favorite an episode or two first!</p>
                  :
                  <ol>
                    {recommends.map(result => (
                      <li key={`${result.season}-${result.id}`}>
                        <Link to={`/season/${result.season}/episode/${result.id}`}>
                          Season {result.season} Episode {result.id}: {episodes[result.season][result.id].name}
                        </Link>
                      </li>
                    ))}
                  </ol>
              }
            </td>
          </tr>
        </tbody>
      </table>
      {

      }
    </>
  )
}