import express from "express";
import { getThoughts, getOneThought, postThoughts ,updataThoughts,deleteThought, favoriteTagole, getAllFavorite,getStatistics,statistics} from "../controller/thoughtController.js";

const router = express.Router()

router.route("/")
.get(getThoughts)
.post(postThoughts)

router.get("/favoritethought",getAllFavorite)
router.get("/stat",statistics)
router.get("/statistics",getStatistics)

router.route("/:id")
.get(getOneThought)
.put(updataThoughts)
.delete(deleteThought)
.patch(favoriteTagole)


export default router
