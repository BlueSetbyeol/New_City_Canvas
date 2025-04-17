import type { RequestHandler } from "express";

import userRepository from "./userRepository";

const read: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.body.auth.id);
    const user = await userRepository.read(userId);

    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  const currentDate = new Date().toISOString().split("T")[0];

  try {
    const newUser = {
      email: req.body.email,
      pseudo: req.body.pseudo,
      hashed_password: req.body.hashed_password,
      inscription_date: currentDate,
      profile_picture: req.body.image,
      conditions_accepted: req.body.conditionsAccepted,
    };

    const insertId = await userRepository.create(newUser);

    if (insertId) {
      res.status(201).json({ insertId });
    } else {
      res.status(400);
    }
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const user = {
      id: Number(req.body.auth.id),
      email: String(req.body.email),
      pseudo: String(req.body.pseudo),
    };

    const userUpdated = await userRepository.update(user);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default { read, add, edit };
