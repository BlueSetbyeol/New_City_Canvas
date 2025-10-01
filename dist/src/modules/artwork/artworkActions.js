"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import access to data
var artworkRepository_1 = __importDefault(require("./artworkRepository"));
// The B of BREAD - Browse (Read All) operation
var browse = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var artworks, newArtworks, newEnsemble, coordinate, i, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, artworkRepository_1.default.readAll()];
            case 1:
                artworks = _a.sent();
                newArtworks = [];
                newEnsemble = {};
                coordinate = [];
                i = 0;
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
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                next(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var read = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var artworkId, artwork, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                artworkId = Number(req.params.id);
                return [4 /*yield*/, artworkRepository_1.default.read(artworkId)];
            case 1:
                artwork = _a.sent();
                if (artwork == null) {
                    res.status(503);
                }
                else {
                    res.json(artwork);
                }
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                next(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var readUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, listArtworks, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = Number(req.params.id);
                return [4 /*yield*/, artworkRepository_1.default.readUser(userId)];
            case 1:
                listArtworks = _a.sent();
                if (listArtworks == null) {
                    res.status(503);
                }
                else {
                    res.json(listArtworks);
                }
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                next(err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// expression régulière pour vérifier que le lien donné est bien une image et non un lien dangereux.
function checkURL(url) {
    if (typeof url !== "string") {
        return false;
    }
    return url.match(/\.(jpg|jpeg|gif|png)$/) != null;
}
var add = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var newArtworks, insertArtwork, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                newArtworks = {
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
                if (newArtworks.address === null ||
                    checkURL(newArtworks.image) === false ||
                    newArtworks.latitude === null ||
                    newArtworks.longitude === null ||
                    newArtworks.picture_credit === null) {
                    res.status(400);
                }
                return [4 /*yield*/, artworkRepository_1.default.create(newArtworks)];
            case 1:
                insertArtwork = _a.sent();
                if (insertArtwork !== null) {
                    res.status(200).json({ insertArtwork: insertArtwork });
                }
                else {
                    res.status(404);
                }
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                next(err_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.default = { browse: browse, read: read, add: add, readUser: readUser };
