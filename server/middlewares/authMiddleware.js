const { verify } = require("jsonwebtoken")

const isAdmin = (req, res, next) => {
  const accessToken = req.header("accessToken");
  if (!accessToken) return res.json({ error: "Login etmediniz?" });
  try {
    const validToken = verify(accessToken, process.env.JWT_key);
    req.user = validToken
    if (validToken) {
      if (req.user.role !== "Admin") {
        return res.status(403).json({ error: "Sizin hich hili hukugynyz yok!!" });
      }
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

const isSOS = (req, res, next) => {
  const accessToken = req.header("accessToken");
  if (!accessToken) return res.json({ error: "Login etmediniz?" });
  try {
    const validToken = verify(accessToken, process.env.JWT_key);
    req.user = validToken
    if (validToken) {
      if (req.user.role !== "SOS") {
        return res.status(403).json({ error: "Sizin hich hili hukugynyz yok!!" });
      }
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

const isUNIT = (req, res, next) => {
  const accessToken = req.header("accessToken");
  if (!accessToken) return res.json({ error: "Login etmediniz?" });
  try {
    const validToken = verify(accessToken, process.env.JWT_key);
    req.user = validToken
    if (validToken) {
      if (req.user.role !== "UNIT") {
        return res.status(403).json({ error: "Sizin hich hili hukugynyz yok!!" });
      }
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};


const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");
  if (!accessToken) return res.json({ error: "User not logged in!" });
  try {
    const validToken = verify(accessToken, process.env.JWT_key);
    req.user = validToken;
    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};
module.exports = { isAdmin, validateToken, isSOS, isUNIT };