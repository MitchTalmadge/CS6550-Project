import { episodes } from "@/const/episodes";
import { SeasonCover } from "@/shared/season-cover/season-cover";
import React, { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSeasonParamGuard } from "../season/season";
import "./episode.scss"
import { FavoriteIcon } from "@/shared/favorite-icon/favorite-icon";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { rootSlice } from "@/redux/root";
import { IEpisode } from "@/models/episode";
import axios from "axios";
import { API_URL } from "@/const/api";

export const Episode = () => {
  const { number: seasonNumber, valid: seasonValid } = useSeasonParamGuard();
  const { number: episodeNumber, valid: episodeValid } = useEpisodeParamGuard(seasonNumber);
  const episode: IEpisode = useMemo(() => ({ id: episodeNumber, season: seasonNumber }), [episodeNumber, seasonNumber]);

  const [recommends, setRecommends] = useState<IEpisode[]>([]);

  useEffect(() => {
    setRecommends([]);
    if (seasonValid && episodeValid) {
      axios.post(`${API_URL}/recommend`, [episode])
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
    }
  }, [episode.id, episode.season, seasonValid, episodeValid]);

  if (!seasonValid || !episodeValid) {
    return null;
  }

  return (
    <div id="episode">
      <div className="title">
        <SeasonCover season={seasonNumber} />
        <div>
          <h2>Season {seasonNumber}, Episode {episodeNumber}</h2>
          <p className="h4">{episodes[seasonNumber][episodeNumber].name}</p>
          <FavoriteButton episode={episode} />
        </div>
      </div>
      <hr />
      <h2 className="display-6 mt-3">If you like this, you may also like:</h2>
      {recommends.length === 0
        ? <p>Loading...</p>
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
    </div>
  )
}

const FavoriteButton = (params: { episode: IEpisode }) => {
  const favorite = useAppSelector(s => s.favoriteEpisodes.some(e => e.id === params.episode.id && e.season === params.episode.season));
  const dispatch = useAppDispatch();

  return (
    <div
      className="favorite-button"
      onClick={() => dispatch(rootSlice.actions.setFavoriteEpisode({ episode: params.episode, favorite: !favorite }))}>
      <FavoriteIcon favorite={favorite} />
    </div>
  )
}

function useEpisodeParamGuard(seasonNumber: number) {
  const params = useParams();
  const navigate = useNavigate();

  /* Converts the episode parameter to a number. */
  const number = useMemo(() => Number.parseInt(params.episode), [params.episode]);
  const [valid, setValid] = useState(false);

  /* Ensures a valid episode number is used. */
  useEffect(() => {
    if (Number.isNaN(number) || episodes[seasonNumber][number] === undefined) {
      console.error(`Episode ${number} of Season ${seasonNumber} does not exist.`);
      navigate(`/season/${seasonNumber}`);
    } else {
      setValid(true);
    }
  }, [number, seasonNumber])

  return { number, valid };
}