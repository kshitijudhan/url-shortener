import { Url } from "../models/url.model.js";

const generateShortCode = async () => {
  const longString =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let shortCode = "";
  for (let i = 0; i < 6; i++) {
    const index = Math.floor(Math.random() * longString.length);
    shortCode += longString.charAt(index);
  }

  const existingUrl = await Url.findOne({ shortCode });

  if (existingUrl) {
    const result = await generateShortCode();
    return result;
  } else {
    return shortCode;
  }
};

export const saveUrl = async (req, res) => {
  const { originalUrl } = req.body;

  if (originalUrl) {
    try {
      new URL(originalUrl);
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "A valid URL is required",
      });
    }

    try {
      const shortCode = await generateShortCode();

      await Url.create({
        originalUrl,
        shortCode,
      });

      const shortUrl = `http://localhost:${process.env.PORT}/${shortCode}`;

      res.status(200).json({
        success: true,
        shortUrl,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: "URL is required",
    });
  }
};

export const redirecturl = async (req, res) => {
  try {
    const url = await Url.findOne({
      shortCode: req.params.shortCode,
    });

    if (url) {
      return res.redirect(url.originalUrl);
    } else {
      return res.status(404).json({
        success: false,
        message: "Short URL not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
