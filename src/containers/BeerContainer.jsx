/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useState } from "react";

const BeerContainer = () => {
  const [beers, setBeers] = useState([]);
  
  useEffect(() => {
    fetch("https://api.punkapi.com/v2/beers")
      .then((res) => res.json())
      .then((data) => setBeers(data));
  }, []);

  return (
    <>
      <h1>BrewDog Beers</h1>
      <BeersList beers={beers} />
    </>
  );
};
const BeersList = ({ beers }) => {
  return beers.map((beer, index) => (
    <Beer
      key={index}
      beer={beer}
    />
  ));
};


const Beer = ({ beer }) => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [favBeers, setFavBeers] = useState([]);
  const [favButton, setFavButton] = useState(false);

    // favorite button
    const handleFavClick = () => {
      if (favBeers.some((favBeer) => favBeer.id === beer.id)) {
        setFavBeers(favBeers.filter((favBeer)=> favBeer.id !== beer.id));
      } else {
        setFavBeers([...favBeers, beer]);
      }
      setFavButton(!favButton);
    }
  return (
    <>
      <ul type="none">
        <li>
          <img
            src={beer.image_url}
            alt={beer.name}
            style={{ width: 100, height: 300 }}
          /></li>
          <br />
          <li key={beer.id}>{beer.name}</li>
          <li>{beer.tagline}</li>
          <button 
          onClick={()=>{
            handleFavClick(favButton,setFavButton)
          }}
          >
              {favButton ? "Dislike" : "I like it" }
            </button>
          <button
            onClick={() => {
              handleButtonClick(buttonClicked, setButtonClicked);
            }}
          >
            {buttonClicked == false ? "Show Description:" : "Hide Description"}
          </button>
          {buttonClicked == true && (
            <div>
              <li>Description: {beer.description}</li>
              <li>abv: {beer.abv}</li>
            </div>
          )}
          <hr />
      </ul>
      {/* display the liked beers */}
      <div>
        <h2>My favorite beer</h2>
        <ul>
          {favBeers.map((beer)=> (
            <li key={beer.id}>{beer.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
};


//more info button
const handleButtonClick = (buttonClicked, setButtonClicked) => {
  if (buttonClicked == true) {
    setButtonClicked(false);
  } else {
    setButtonClicked(true);
  }


};


export default BeerContainer;
