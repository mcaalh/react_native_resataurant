import { useState, useEffect } from 'react';
import yelp from "../api/yelp";

export default () => {

    const [restaurantDetail, setRestaurantDetail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const searchApi = async (id) => {
      try {
        const response = await yelp.get("/search", {
          params: {
            id
          },
        });
        console.log(response);
        setRestaurantDetail(response.data.businesses);
      } catch (error) {
        setErrorMessage("erreur lors de la recherche du restaurant");
      }
    };

    useEffect(() => {
      searchApi('pasta');
    }, []);

    return [searchApi, restaurantDetail, errorMessage];
}