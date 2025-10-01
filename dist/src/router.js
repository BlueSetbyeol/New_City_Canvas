"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */
var artistsActions_1 = __importDefault(require("./modules/artists/artistsActions"));
var artworkActions_1 = __importDefault(require("./modules/artwork/artworkActions"));
var authActions_1 = __importDefault(require("./modules/auth/authActions"));
var userActions_1 = __importDefault(require("./modules/user/userActions"));
var nominatimActions_1 = __importDefault(require("./nominatimActions"));
router.get("/api/geolocalisation", nominatimActions_1.default.geocode);
router.get("/api/artworks", artworkActions_1.default.browse);
router.get("/api/artwork/:id", artworkActions_1.default.read);
router.get("/api/user-artworks/:id", artworkActions_1.default.readUser);
router.post("/api/artwork", authActions_1.default.verifyToken, artistsActions_1.default.add, artworkActions_1.default.add);
router.get("/api/artists", artistsActions_1.default.browse);
router.post("/api/login", authActions_1.default.login);
router.post("/api/users", authActions_1.default.hashPassword, userActions_1.default.add);
router.get("/api/user", authActions_1.default.verifyToken, userActions_1.default.read);
router.put("/api/user", authActions_1.default.verifyToken, userActions_1.default.edit);
/* ************************************************************************* */
exports.default = router;
