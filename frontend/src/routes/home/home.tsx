import React from "react"
import { Button, Form } from "react-bootstrap"
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
  return (
    <div className="search">
      <h2 className="display-6">Search for an episode:</h2>
      <Form>
        <Form.Control></Form.Control>
        <Button type="submit">Search!</Button>
      </Form>
    </div>
  )
}

const Browse = () => {
  return (
    <h2 className="display-6 mt-3">Browse for an episode:</h2>
  )
}

const Recommend = () => {
  return (
    <>
      <hr />
      <h2 className="display-6">You may also enjoy:</h2>
    </>
  )
}