import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createThought, upDateThought } from "../redux/slices/thoughtSlice.js"
import { useDispatch } from "react-redux"

const ThoughtEdit = ({ thought, openForm, setOpenForm }) => {

    const dispatch = useDispatch()
    const categorys = ["Iead", "Goal", "Quote", "Reminder", "Learning", "Random"]

    let [loading, setLoading] = useState(false)
    // let [openForm, setOpenForm] = useState(false)
    let [formData, setFormData] = useState({
        title: "",
        content: "",
        category: "Reminder",
        tags: ""
    })

    const heandelChange = (e) => {
        let { name, value } = e.target
        setFormData((pres) => ({ ...pres, [name]: value }))
    }

    const headelcategoryChange = (value) => {
        console.log(value)
        setFormData((pres) => ({ ...pres, category: value }))
    }


    const editThoughtClick = async (e) => {
        e.preventDefault()
        setLoading(true)
        const thoughtData = {
            title: formData.title,
            content: formData.content,
            category: formData.category,
            tags: formData.tags.split(",").map((tag) => tag.trim()).filter((tag) => tag !== "")
        }
        console.log(thoughtData)

        // const newThought = await dispatch(createThought(thoughtData))
        // console.log(newThought)
        if (!thoughtData.title || !thoughtData.category || !thoughtData.content || !thoughtData.tags) return alert("Input invailed")
        const updateThought = await dispatch(upDateThought({ id: thought._id, thoughtData: thoughtData }))
        console.log(updateThought)
        // clear states
        setLoading(false)
        setOpenForm(false)
    }

    useEffect(() => {
        setFormData({
            title: thought.title,
            content: thought.content,
            category: thought.category,
            tags: thought.tags.join(",")
        })
    }, [])
    /* {
    
    category: "Learning"
    content: "Failure is not the opposite of success; it’s a part of it."
    createdAt: "2025-11-06T07:52:35.043Z"
    isFavorite: false
    tags: (3) ['failure', 'success', 'growth']
    title: "Learning from Failure"
    

    {
    "title": "Learning from Failure",
    "content": "Failure is not the opposite of success; it’s a part of it.",
    "tags": "failure,success,growth",
    "category": undefined
}
    }*/

    return (
        <Dialog open={openForm} onOpenChange={setOpenForm}>
            <DialogTrigger asChild>
                {/* <Button variant="outline" size="lg">Add New Thought</Button> */}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Thought</DialogTitle>
                    <DialogDescription>
                        Capture your ideas,goals or anything on your mind
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={editThoughtClick}>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" name="title" placeholder="Enter your Thought Thing" maxLength={100} value={formData.title} onChange={heandelChange} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="content">Conten</Label>
                            <Input id="content" name="content" placeholder="What your Mind" maxLength={1000} value={formData.content} onChange={heandelChange} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="category">category</Label>
                            <Select value={formData.category} onValueChange={headelcategoryChange}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>category</SelectLabel>
                                        {categorys.map((category, i) => (
                                            <SelectItem key={i} value={category}>{category}</SelectItem>
                                        ))}

                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="tags">Tags</Label>
                            <Input id="tags" name="tags" placeholder="Tags" maxLength={100} value={formData.tags} onChange={heandelChange} />
                        </div>
                    </div>



                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" disabled={loading}>Cancel</Button>
                        </DialogClose>
                        <Button type="submit">{loading ? "Updating..." : "Update Thought"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
    )


}

export default ThoughtEdit