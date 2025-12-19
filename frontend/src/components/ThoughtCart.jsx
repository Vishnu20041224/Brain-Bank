import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Heart, Trash2, Edit, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useDispatch, useSelector } from "react-redux";

import { deleteThought, favoriteTagoleThought, upDateThought } from "../redux/slices/thoughtSlice.js"
import { useEffect,useState } from "react";
import ThoughtEdit from "./ThoughtEdit.jsx";
const ThoughtCart = ({ thought, inputs }) => {

    const dispatch = useDispatch()
    const { thoughts } = useSelector((state) => state.thought)

    let getCategoryColor = (category) => {
        const colors = {
            Iead: "bg-purple-100 text-purple-800 border-purple-200",
            Goal: "bg-green-100 text-green-800 border-green-200",
            Quote: "bg-yellow-100 text-yellow-800 border-yellow-200",
            Reminder: "bg-red-100 text-red-800 border-red-200",
            Learning: "bg-blue-100 text-blue-800 border-blue-200",
            Random: "bg-gray-100 text-gray-800 border-gray-200",
        }

        return colors[category] || colors.Random

    }

    let dateFormate = (dateString) => {
        const date = new Date(dateString)

        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        })
    }

    const deleteThoughtClick = (id) => {
        dispatch(deleteThought(id))
        console.log(id)
    }

    const likeThoughtClick = (id, favorite) => {
        console.log(id, favorite)
        // dispatch(upDateThought({
        //     id,
        //     thoughtData: { isFavorite: !favorite }
        // }));

        dispatch(favoriteTagoleThought(id))

    };

    let [openForm, setOpenForm] = useState(false)

    const editThoughtClick = (thought) => {
        // inputs.setIsEdit(true)
        // inputs.setTitle(thought.title)
        // inputs.setContent(thought.content)
        // inputs.setCategory(thought.category)
        // inputs.setTags(thought.tags.join())
        // inputs.setEditId(thought._id)
        // console.log(thought.tags.join())
        setOpenForm(true)
    }

    return (
        <Card className={"mb-4 px-4 hover:shadow-2xl flex flex-col justify-between"}>

            <div className="flex justify-between items-center p-0 m-0">
                <CardTitle>{thought.title}</CardTitle>
                <Button variant="ghost" size="icon" className="cursor-pointer" onClick={() => likeThoughtClick(thought._id, thought.isFavorite)}>
                    <Heart className={`h-5 w-5 ${thought.isFavorite ? "fill-red-700 text-red-700" : "text-gray-500"}`} />
                </Button>
            </div>

            <div className="flex gap-3 ">
                <Badge className={`px-2 py-1 ${getCategoryColor(thought.category)}`}>{thought.category}</Badge>
                {thought.isFavorite && (
                    <Badge className={`px-2 py-1 bg-red-100 text-red-500 border-red-500`}>
                        ⭐ Favorite
                    </Badge>
                )}
            </div>

            <CardContent>
                <p className="text-gray-800 pb-2">{thought.content}</p>

                <div className="flex gap-2 flex-wrap">
                    {thought.tags && thought.tags.length > 0 && (
                        thought.tags.map((tag, i) => (
                            <Badge key={i} variant="secondary" className="px-2 py-1 text-sm"># {tag}</Badge>
                        ))
                    )}
                </div>
            </CardContent>

            <CardFooter className="flex justify-between ">

                <div className="flex gap-3 items-center">
                    <Calendar className="text-sm" />
                    {dateFormate(thought.createdAt)}
                </div>

                <div className="flex gap-3 items-center">
                    <Button onClick={() => editThoughtClick(thought)} variant="ghost" size="icon" className="cursor-pointer">
                        <Edit />
                    </Button>

                    <Button onClick={() => deleteThoughtClick(thought._id)} variant="ghost" size="icon" className="cursor-pointer">
                        <Trash2 className="text-destructive h-4 w-4" />
                    </Button>
                </div>
            </CardFooter>
            <ThoughtEdit thought={thought} openForm={openForm} setOpenForm={setOpenForm}/>
        </Card>
    )
}

export default ThoughtCart