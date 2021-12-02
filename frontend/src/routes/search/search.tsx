import { API_URL } from "@/const/api";
import axios from "axios";
import React, { useEffect, useMemo } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import { IEpisode } from "@/models/episode";
import { episodes } from "@/const/episodes";

export const Search = () => {
  const params = useParams();
  const navigate = useNavigate();

  const query = params.query;
  const [results, setResults] = React.useState<IEpisode[]>([]);

  useEffect(() => {
    setResults([]);
    axios.post(`${API_URL}/search`, query)
      .then(res => {
        if (res.status === 200) {
          setResults(res.data);
        } else {
          console.error("Failed to fetch search results", res);
        }
      })
      .catch(err => {
        console.error("Failed to fetch search results", err);
      });
  }, [query]);

  return (
    <div>
      <h2>Search for "{params.query}"</h2>
      <hr />
      <h3>Results - Ordered by Relevance</h3>
      {results.length === 0
        ? <p>Loading...</p>
        :
        <ol>
          {results.map(result => (
            <li key={`${result.season}-${result.id}`}>
              <Link to={`/season/${result.season}/episode/${result.id}`}          >
                Season {result.season} Episode {result.id}: {episodes[result.season][result.id].name}
              </Link>
            </li>
          ))}
        </ol>
      }

    </div>
  )
}
