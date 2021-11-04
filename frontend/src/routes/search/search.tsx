import React, { useEffect, useMemo } from 'react'
import { useNavigate, useParams } from "react-router-dom";

export const Search = () => {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <h2>Search for "{params.query}"</h2>
    </div>
  )
}
