import axios from "axios";

let cachedToken = null;
let tokenExpiry = 0;

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET; 
const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

export default async function getToken() {
  const now = Date.now();

  // Return cached token if still valid
  if (cachedToken && now < tokenExpiry) {
    return res.status(200).json({ access_token: cachedToken });
  }

  try {
    const response = await axios({
      method: 'post',
      url:  `${process.env.ENDPOINT_AUTH}/oauth2/token`,
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: 'grant_type=client_credentials&scope=content'
    });

    const data = response.data;

    // Cache token
    cachedToken = data.access_token;
    tokenExpiry = now + (data.expires_in - 60) * 1000; // 1-min safety buffer

    return cachedToken;
  } catch (error) {
    console.error("OAuth Token Error:", error.response?.data || error);
  }
}
