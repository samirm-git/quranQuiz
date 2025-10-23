export default async function handler(req, res) {
  const code = req.query.code; // The OAuth2 code from Quran Foundation

  if (!code) {
    return res.status(400).json({ error: "Missing authorization code" });
  }

  // For now, just confirm the callback is working
  return res.status(200).json({
    message: "Callback received successfully!",
    code,
  });
}