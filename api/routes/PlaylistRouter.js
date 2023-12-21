import express, { query } from "express";

const router = express.Router();

import {
  CreatePlaylist, 
  DeletePlaylist, 
  UserPlaylist,
} from "../controller/Playlist.js"

router.post("/create-playlist", CreatePlaylist);
router.get("/get-user-playlist/:id", UserPlaylist);
router.delete("/delete-playlist/:id", DeletePlaylist);


export { router as PlaylistRouter };