import type { RequestHandler } from "express";

// Import access to data
import artworkRepository from "./artworkRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    const artworks = await artworkRepository.readAll();
    const newArtworks = [];
    let newEnsemble = {};
    let coordinate = [];
    let i = 0;
    while (Object.keys(artworks)[i]) {
      coordinate.push(artworks[i].latitude, artworks[i].longitude);
      newEnsemble = {
        id: artworks[i].id,
        name: artworks[i].name,
        address: artworks[i].address,
        image: artworks[i].image,
        picture_date: artworks[i].picture_date,
        type_of_art: artworks[i].type_of_art,
        coordinates: coordinate,
        picture_credit: artworks[i].picture_credit,
        id_artist: artworks[i].id_artist,
      };
      newArtworks.push(newEnsemble);
      newEnsemble = {};
      coordinate = [];
      i++;
    }
    res.json(newArtworks).status(200);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const artworkId = Number(req.params.id);
    const artwork = await artworkRepository.read(artworkId);
    if (artwork == null) {
      res.status(503);
    } else {
      res.json(artwork);
    }
  } catch (err) {
    next(err);
  }
};

const readUser: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);
    const listArtworks = await artworkRepository.readUser(userId);
    if (listArtworks == null) {
      res.status(503);
    } else {
      res.json(listArtworks);
    }
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newArtworks = {
      name: String(req.body.name),
      address: String(req.body.address),
      image: String(req.body.image),
      picture_date: String(req.body.picture_date),
      type_of_art: String(req.body.type_of_art),
      latitude: Number.parseFloat(req.body.latitude),
      longitude: Number.parseFloat(req.body.longitude),
      picture_credit: String(req.body.picture_credit),
      id_artist: Number(req.body.id_artist),
      id_user: Number(req.body.id_user),
    };

    // expression régulière pour vérifier que le lien donné est bien une image et non un lien dangereux.
    function checkURL(url: string) {
      if (typeof url !== "string") return false;
      return url.match(/\.(jpg|jpeg|gif|png)$/) != null;
    }

    if (
      newArtworks.address === null ||
      checkURL(newArtworks.image) === false ||
      newArtworks.latitude === null ||
      newArtworks.longitude === null ||
      newArtworks.picture_credit === null
    ) {
      res.status(400);
    }

    const insertArtwork = await artworkRepository.create(newArtworks);
    if (insertArtwork !== null) {
      res.status(200).json({ insertArtwork });
    } else {
      res.status(404);
    }
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, readUser };
