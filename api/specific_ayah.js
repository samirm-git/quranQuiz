import axios from "axios";
import getToken from "./token_util.js";

export default async function handler(req, res) {
  try {
    const token = await getToken(); 
    console.log(`url request:  ${process.env.ENDPOINT_API}/verses/by_key/${req.query}`)
    const response = await axios({
      method: 'get',
      url: `${process.env.ENDPOINT_API}/verses/by_key/${req.query}`,
      headers: {
          "Accept": 'application/json',
          "x-auth-token": token,
          "x-client-id": process.env.CLIENT_ID,
        },
      params: {
        fields: 'text_uthmani,text_indopak',
      }
      }
    );

    console.log('API Response:', response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    res.status(500).json({
      error: error.response?.data || error.message,
    });
  }
}

