import Axios from 'axios';

export default Axios.create({
  baseURL: "https://api.yelp.com/v3/businesses",
  headers: {
    Authorization:
      "Bearer iH1WUeuLWJIEKaPUlpCVPOTxHUkJfNJiizqY3OeoG7x1u-zGoSer6A1EeoOgkofUcA36VpR7ErgYUqJsWDHo5jBZI_G2ahP9dTYrJ3AdlG61EB64J0lgJJZh8TKxXnY",
  },
});
