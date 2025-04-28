import type { RequestHandler } from "express";

// Import access to data
import artistRepository from "./artistRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const artists = await artistRepository.ReadAll();
    res.json(artists).status(200);
  } catch (error) {
    next(error);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const addedArtist = String(req.body.artist_name);

    const findArtist = await artistRepository.read(addedArtist);

    if (findArtist) {
      req.body.id_artist = findArtist.id;
      next();
    } else {
      const newArtist = await artistRepository.create(addedArtist);

      if (newArtist !== null) {
        req.body.id_artist = newArtist;
        next();
      } else {
        res.status(404);
      }
    }
  } catch (err) {
    next(err);
  }
};

export default { add, browse };
