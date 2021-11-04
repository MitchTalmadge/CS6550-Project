import React, { useCallback } from "react"
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
    navigate("/search/" + event.target[0].value);
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