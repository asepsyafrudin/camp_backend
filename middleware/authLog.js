export const authLog = (req, res, next) => {
  const apiKey = req.body.API_KEY;
  const apiSecret = req.body.API_SECRET;

  if (!apiKey || !apiSecret) {
    return res.status(400).json({
      msg: "Api Key and Api Secret are required",
    });
  }

  if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
    return res.status(401).json({
      msg: "Unauthorized",
    });
  }

  console.log("Auth Log");
  next();
};
