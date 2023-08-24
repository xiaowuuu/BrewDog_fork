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
const BeersList = ({ beers}) => {
    return beers.map((beer, index) => <Beer key={index} beer={beer}/>
    );
};

const Beer = ({beer}) => {
    return (
        <>
            <ul type="none">
                <li>
                    <img src={beer.image_url} alt={beer.name} style={{ width: 100, height: 300 }}/>
                    <br />
                    {beer.name}
                    <hr />
                    {beer.abv}
                    {beer.tagline}
                    {beer.description}
                    </li>
            </ul>
        </>
    )
}
export default BeerContainer;
