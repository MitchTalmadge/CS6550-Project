import React from 'react'

const seasonCovers = [
  require("./covers/1.jpg"),
  require("./covers/2.jpg"),
  require("./covers/3.jpg"),
  require("./covers/4.jpg"),
  require("./covers/5.jpg"),
  require("./covers/6.jpg"),
  require("./covers/7.jpg"),
  require("./covers/8.jpg"),
  require("./covers/9.jpg"),
  require("./covers/10.jpg"),
  require("./covers/11.jpg"),
  require("./covers/12.jpg"),
  require("./covers/13.jpg"),
  require("./covers/14.jpg"),
  require("./covers/15.jpg"),
  require("./covers/16.jpg"),
  require("./covers/17.jpg"),
  require("./covers/18.jpg"),
  require("./covers/19.jpg"),
]

interface Props {
  season: number
}

export const SeasonCover = (props: Props) => {

  if (props.season < 1 || props.season > seasonCovers.length) {
    console.error("Invalid season", props.season);
    return null
  }

  return (
    <img className={`season-cover season-cover-${props.season}`} src={seasonCovers[props.season - 1]} />
  )
}
