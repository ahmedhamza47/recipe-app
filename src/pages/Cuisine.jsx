import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";

function Cuisine() {
  const [cuisine, setCuisine] = useState([]);

  let params = useParams(); // fetch keywords from the url
  useEffect(() => {
    getCuisine(params.type);
    console.log(params.type);
  }, [params.type]);
  //get cuisine from the api-
  const getCuisine = async (name) => {
    let check = localStorage.getItem(`${name}`);
    if (check) {
      setCuisine(JSON.parse(check));
    } else {
      let api = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`
      );
      let data = await api.json();
      console.log(data);
      localStorage.setItem(`${name}`, JSON.stringify(data.results));

      setCuisine(data.results);
    }
  };
  return (
    <Grid
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {cuisine.map((item) => {
        return (
          <Card key={item.id}>
            <Link to={"/recipes/" + item.id}>
              <img src={item.image} alt={item.title} />
              <h4>{item.title}</h4>
            </Link>
          </Card>
        );
      })}
    </Grid>
  );
}
const Grid = styled(motion.div)`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;
`;
const Card = styled.div`
  overflow: hidden;
  position: relative;
  img {
    position: relative;
    left: 0;
    width: 80%;
    height: 80%;
    border-radius: 2rem;
  }
  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    padding: 1rem;
  }
`;
export default Cuisine;
