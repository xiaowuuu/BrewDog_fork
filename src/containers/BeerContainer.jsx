import { useEffect } from "react";
import { useState } from "react";

const BeerContainer = () => {
  const [beers, setBeers] = useState([]);
  const [favBeers, setFavBeers] = useState([]);
  
  useEffect(() => {
    fetch("https://api.punkapi.com/v2/beers")
      .then((res) => res.json())
      .then((data) => setBeers(data));
  }, []);

  const handleFavClick = (beer) => {
    if (favBeers.some((favBeer) => favBeer.id === beer.id)) {
      setFavBeers(favBeers.filter((favBeer) => favBeer.id !== beer.id));
    } else {
      setFavBeers([...favBeers, beer]);
    }
  };

  return (
    <div>
      <h1>BrewDog Beers</h1>
      <div className="beers-container">
        <BeersList beers={beers} handleFavClick={handleFavClick} favBeers={favBeers} />
        <div className="fav-beers">
          <h2>My favorite beers</h2>
          <ul>
            {favBeers.map((favBeer) => (
              <li key={favBeer.id}>{favBeer.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const BeersList = ({ beers, handleFavClick, favBeers }) => {
  return (
    <div className="beers-list">
      {beers.map((beer) => (
        <Beer key={beer.id} beer={beer} handleFavClick={handleFavClick} favBeers={favBeers} />
      ))}
    </div>
  );
};

const Beer = ({ beer, handleFavClick, favBeers }) => {
  const [favButton, setFavButton] = useState(false);

  useEffect(() => {
    setFavButton(favBeers.some((favBeer) => favBeer.id === beer.id));
  }, [favBeers, beer.id]);

  const handleButtonClick = (buttonClicked, setButtonClicked) => {
    setButtonClicked(!buttonClicked);
  };
  const [buttonClicked, setButtonClicked] = useState(false);
  
  return (
    <div className="beer-item">
      <ul type="none">
        <li>
          <img src={beer.image_url} alt={beer.name} style={{ width: 100, height: 300 }} />
        </li>
        <br />
        <li key={beer.id}>{beer.name}</li>
        <button onClick={() => handleFavClick(beer)}>
          {favButton ? "Dislike" : "I like it"}
        </button>
        <li>{beer.tagline}</li>
        <button onClick={() => handleButtonClick(buttonClicked, setButtonClicked)}>
          {buttonClicked == false ? "Show Description:" : "Hide Description"}
        </button>
          {buttonClicked == true && (
            <div>
              <li>Description: {beer.description}</li>
              <li>abv: {beer.abv}</li>
            </div>
          )}
        </ul>
    </div>
  );
};

export default BeerContainer;