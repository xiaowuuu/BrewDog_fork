import { useEffect } from "react";
import { useState } from "react";

const BeerContainer = () => {
    const [beers, setBeers] = useState([]);

    useEffect(() => {
        fetch("https://api.punkapi.com/v2/beers")
            .then((res) => res.json())
            .then((data) => setBeers(data));
    }, []);

    // let BeersList;
    // if (beers.length != 0) {
    //     BeersList = ({ beers }) => {
    //         return beers.map((beer) => (beer.name));
    //     };
    //     console.log(beers);
    // }
    //console.log(beers);

    return (
        <>
            {beers.length == 0 ? (
                <h1>Loading</h1>
            ) : (
                <>
                    <h1>BrewDog Beers</h1>

                    <BeersList beers={beers} />


                </>
            )}
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
        {beer.name}
        {beer.abv}
        {beer.tagline}
        {beer.description}

        </>
    )
}
export default BeerContainer;
