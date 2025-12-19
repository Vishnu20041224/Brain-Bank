import mongoose from "mongoose";

const thoughtsSchema = new mongoose.Schema({
    title: {
        type: String,
        require: [true, "Please add a title"],
        trim: true,
        maxlength: [100, "Title connot be more that 100 characters"]
    },
    content: {
        type: String,
        require: [true, "Please add a content"],
        trim: true,
        maxlength: [1000, "content connot be more that 100 characters"]
    },
    category: {
        type: String,
        require: [true, "Please Select a catagory"],
        enum: ["Iead", "Goal", "Quote", "Reminder", "Learning", "Random"],
        default: "Random"
    },
    tags: {
        type: [String],
        default: []
    },
    isFavorite: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
}
)

export const Thoughts = mongoose.model("thoughts",thoughtsSchema)