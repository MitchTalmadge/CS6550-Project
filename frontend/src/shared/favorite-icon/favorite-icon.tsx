import React from 'react'
import StarFullSvg from "@/assets/star-full.svg";
import StarEmptySvg from "@/assets/star-empty.svg";
import "./favorite-icon.scss";

interface Props {
  favorite: boolean;
}

export const FavoriteIcon = (props: Props) => {
  return props.favorite ? <StarFullSvg className="favorite-icon" /> : <StarEmptySvg className="favorite-icon empty" />
}
