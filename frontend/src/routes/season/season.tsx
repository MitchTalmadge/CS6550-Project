import React, { useEffect, useMemo } from 'react'
import { useNavigate, useParams } from "react-router-dom";

export const Season = () => {
  const params = useParams();
  const navigate = useNavigate();

  /* Converts the season parameter to a number. */
  const seasonNumber = useMemo(() => Number.parseInt(params.season), [params.season]);

  /* Ensures a valid season number is used. */
  useEffect(() => {
    if (Number.isNaN(seasonNumber) || seasonNumber < 1 || seasonNumber > 19) {
      navigate('/');
    }
  }, [seasonNumber])

  return (
    <div>
      <h2>Season {seasonNumber}</h2>
    </div>
  )
}
