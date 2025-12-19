import mongoose from "mongoose";
import { Thoughts } from "../models/Thoughts.js";

export const getThoughts = async (req, res) => {

    try {

        let query = {}
        if (req.query.search) {
            query.$or = [
                { title: { $regex: req.query.search, $options: "i" } },
                { content: { $regex: req.query.search, $options: "i" } },
            ]
        }

        if (req.query.category) {
            query.category = req.query.category
        }

        if (req.query.tag) {
            query.tags = { $in: [req.query.tag] }
        }

        if (req.query.isFavorite) {
            query.isFavorite = req.query.isFavorite === "true"
        }

        const thought = await Thoughts.find(query).sort({ createdAt: -1 })

        res.status(200).json({
            success: true,
            count: thought.length,
            data: thought
        })
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: e.message
        })
    }
}

export const getOneThought = async (req, res) => {
    let thought = await Thoughts.findById(req.params.id)
    if (!thought) {
        res.status(404).json({
            success: false,
            message: "Thought Not Found",
            error: e.message
        })
    }
    res.status(200).json({
        success: true,
        data: thought
    })
}

export const postThoughts = async (req, res) => {
    try {
        const data = req.body
        const createdThoughts = await Thoughts.create(data)

        res.status(201).json({
            success: true,
            data: createdThoughts
        })
        console.log(data)
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: e.message
        })
    }
}

export const updataThoughts = async (req, res) => {
    try {
        let thought = await Thoughts.findById(req.params.id)
        let { title, content, category, tags, isFavorite } = req.body

        if (!thought)
            res.status(404).json({
                success: false,
                message: "Thought Not Found",
                error: e.message
            })

        thought = await Thoughts.findByIdAndUpdate(req.params.id,
            { title, content, category, tags, isFavorite },
            { new: true }
        )

        res.status(200).json({
            success: true,
            message: "Thought was Updata",
            data: thought
        })
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: e.message
        })
    }
}

export const deleteThought = async (req, res) => {
    try {
        let thought = await Thoughts.findById(req.params.id)

        if (!thought)
            res.status(404).json({
                success: false,
                message: "Thought Not Found",
                error: e.message
            })

        await thought.deleteOne()

        res.status(200).json({
            success: true,
            message: "Thought Delete",
        })

    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: e.message
        })
    }
}


export const favoriteTagole = async (req, res) => {
    try {
        let thought = await Thoughts.findById(req.params.id)

        if (!thought)
            res.status(404).json({
                success: false,
                message: "Thought Not Found",
            })


        thought.isFavorite = !thought.isFavorite

        res.status(200).json({
            success: true,
            data: thought
        })
        return thought.save()

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        })
    }
}

export const getAllFavorite = async (req, res) => {
    try {
        let allFavorite = await Thoughts.find({ isFavorite: true })

        if (allFavorite.length < 1) return res.json({ message: "Favorite Thought Was exempt" })

        return res.status(200).json({
            success: true,
            count: allFavorite.length,
            data: allFavorite
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        })
    }
}


export const statistics = async (req, res) => {
    try {

        let thoughtsData = await Thoughts.find({})
        let thoughtsCount = thoughtsData.length

        let thoughtFavoritesData = await Thoughts.find({ isFavorite: true })
        let thoughtFavoritesCount = thoughtFavoritesData.length

        let thoughtCategoriesData = thoughtsData.map((thought)=>thought.category)
        let uniqueCategoriesData = [...new Set(thoughtCategoriesData)]
        let thoughtCategoriesCount = uniqueCategoriesData.length


        let thoughtTagsData = thoughtsData.flatMap((thought)=>thought.tags)
        let uniqueTagsData =[...new Set(thoughtTagsData)]
        let thoughtTagsCount = uniqueTagsData.length

        let categoryBreakdown = uniqueCategoriesData.map((cat)=>(
            {
                category: cat,
                count:thoughtsData.filter((thought)=>thought.category === cat).length
            }
        ))



        return res.status(200).json({
            success: true,
            
            thoughtsData,
            thoughtsCount,

            thoughtFavoritesData,
            thoughtFavoritesCount,

            thoughtCategoriesData,
            uniqueCategoriesData,
            thoughtCategoriesCount,

            thoughtTagsData,
            uniqueTagsData,
            thoughtTagsCount,

            categoryBreakdown
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        })
    }
}

export const getStatistics = async (req, res) => {
  try {
    const thoughtsData = await Thoughts.find({});
    const thoughtsCount = thoughtsData.length;

    const thoughtFavoritesData = thoughtsData.filter(t => t.isFavorite);
    const thoughtFavoritesCount = thoughtFavoritesData.length;

    const uniqueCategories = [...new Set(thoughtsData.map(t => t.category))];
    const thoughtCategoriesCount = uniqueCategories.length;

    const allTags = thoughtsData.flatMap(t => t.tags);
    const uniqueTags = [...new Set(allTags)];
    const thoughtTagsCount = uniqueTags.length;

    const categoryBreakdown = uniqueCategories.map(cat => ({
      category: cat,
      count: thoughtsData.filter(t => t.category === cat).length
    }));

    const favoriteRate = ((thoughtFavoritesCount / thoughtsCount) * 100).toFixed(2);
    const mostUsedCategory = categoryBreakdown.reduce((max, cat) => cat.count > max.count ? cat : max, { count: 0 }).category;
    const averageTagsPerThought = (thoughtTagsCount / thoughtsCount).toFixed(2);
    const nonFavoriteThoughts = thoughtsCount - thoughtFavoritesCount;

    const quickFacts = {
      favoriteRate,
      mostUsedCategory,
      averageTagsPerThought,
      nonFavoriteThoughts
    };

    res.json({
      thoughtsData,
      thoughtsCount,
      thoughtFavoritesData,
      thoughtFavoritesCount,
      uniqueCategories,
      thoughtCategoriesCount,
      uniqueTags,
      thoughtTagsCount,
      categoryBreakdown,
      quickFacts
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
};