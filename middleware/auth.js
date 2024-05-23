import JWT from "jsonwebtoken";

export const auth = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(403).json({ error: "No credentials sent!" });
    } else {
      var result = req.headers.authorization.substring(
        1,
        req.headers.authorization.length - 1
      );

      const verify = JWT.verify(result, "Samsung@6plus");
      if (verify) {
        next();
      } else {
        return res.status(403).json({ error: "No credentials sent!" });
      }
    }
  } catch (error) {
    return res.status(403).json({ error: "invalid token!" });
  }
};
