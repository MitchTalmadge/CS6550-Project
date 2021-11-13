import { episodes } from "@/const/episodes";
import { SeasonCover } from "@/shared/season-cover/season-cover";
import React, { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import "./season.scss";


export const Season = () => {

  const { number: seasonNumber, valid: seasonValid } = useSeasonParamGuard();

  if (!seasonValid)
    return null

  return (
    <div id="season">
      <SeasonCover season={seasonNumber} />
      <h2>Season {seasonNumber}</h2>
      <hr />
      <div className="episodes">
        {Object.keys(episodes[seasonNumber]).map(episodeNumber => (
          <Link key={episodeNumber} to={`/season/${seasonNumber}/episode/${episodeNumber}`} className="episode">
            Episode {episodeNumber} - {episodes[seasonNumber][episodeNumber].name}
          </Link>
        ))}
      </div>
    </div>
  )
}

export function useSeasonParamGuard() {
  const params = useParams();
  const navigate = useNavigate();

  /* Converts the season parameter to a number. */
  const number = useMemo(() => Number.parseInt(params.season), [params.season]);
  const [valid, setValid] = useState(false);

  /* Ensures a valid season number is used. */
  useEffect(() => {
    if (Number.isNaN(number) || number < 1 || number > 19) {
      navigate('/');
    } else {
      setValid(true);
    }
  }, [number])

  return { number, valid };
}
