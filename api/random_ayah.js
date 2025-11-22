import axios from "axios";
import getToken from "./token_util.js";

export default async function handler(req, res) {
  try {
    const token = await getToken();

    const response = await axios({
      method: 'get',
      url: `${process.env.ENDPOINT_API}/verses/random`,
      headers: {
          "Accept": 'application/json',
          "x-auth-token": token,
          "x-client-id": process.env.CLIENT_ID,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({
      error: error.response?.data || error.message,
    });
  }
}
