import { useState } from "react"
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
import { createThought } from "../redux/slices/thoughtSlice.js"
import { useDispatch } from "react-redux"

const ThoughtForm = () => {

    const dispatch = useDispatch()
    const catogorys = ["Iead", "Goal", "Quote", "Reminder", "Learning", "Random"]

    let [loading, setLoading] = useState(false)
    let [openForm, setOpenForm] = useState(false)
    let [formData, setFormData] = useState({
        title: "",
        content: "",
        catogory: "",
        tags: ""
    })

    const heandelChange = (e) => {
        let { name, value } = e.target
        setFormData((pres) => ({ ...pres, [name]: value }))
    }

    const headelCatogoryChange = (value) => {
        console.log(value)
        setFormData((pres) => ({ ...pres, catogory: value }))
    }

    const createNewThought = async (e) => {
        e.preventDefault()
        setLoading(true)
        const thoughtData = {
            title: formData.title,
            content: formData.content,
            catogory: formData.catogory,
            tags: formData.tags.split(",").map((tag) => tag.trim()).filter((tag) => tag !== "")
        }
        console.log(thoughtData)

       const newThought = await dispatch(createThought(thoughtData))
       console.log(newThought)

        // clear states
        setLoading(false)
        setOpenForm(false)
        setFormData({
            title: "",
            content: "",
            catogory: "",
            tags: ""
        })
    }




    return (
        <Dialog open={openForm} onOpenChange={setOpenForm}>
            <DialogTrigger asChild>
                <Button variant="outline" size="lg">Add New Thought</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Thought</DialogTitle>
                    <DialogDescription>
                        Capture your ideas,goals or anything on your mind
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={createNewThought}>
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
                            <Label htmlFor="catogory">Catogory</Label>
                            <Select value={formData.catogory} onValueChange={headelCatogoryChange}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a Catogory" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Catogory</SelectLabel>
                                        {catogorys.map((catogory, i) => (
                                            <SelectItem key={i} value={catogory}>{catogory}</SelectItem>
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
                        <Button type="submit">{loading ? "creating" : "Add Thought"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
    )
}

export default ThoughtForm