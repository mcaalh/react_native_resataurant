import { useState, useEffect } from 'react';
import yelp from "../api/yelp";

export default () => {

    const [restaurants, setRestaurants] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const searchApi = async (search) => {
      try {
        const response = await yelp.get("/search", {
          params: {
            limit: 50,
            term: search,
            location: "18 rue Antoine Barnave, 26000",
          },
        });
        setRestaurants(response.data.businesses);
      } catch (error) {
        setErrorMessage("erreur lors de la recherche de restaurant");
      }
    };

    useEffect(() => {
      searchApi('');
    }, []);

    return [searchApi, restaurants, errorMessage];
}