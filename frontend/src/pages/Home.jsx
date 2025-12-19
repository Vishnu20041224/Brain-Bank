import { useThought } from "../context/Thoughts"
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"


import { useDispatch, useSelector } from "react-redux";
import { getThought, createThought, upDateThought } from "../redux/slices/thoughtSlice";
import { setFilter, clearFilter } from "../redux/slices/thoughtSlice";
import ThoughtCart from "../components/ThoughtCart";
import ThoughtForm from "../components/ThoughtForm";

import { Loader2, Search, X } from "lucide-react"
// import { Search, X, loader2 } from "lucide-react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const Home = () => {

    const dispatch = useDispatch()
    const catogory = ["All", "Iead", "Goal", "Quote", "Reminder", "Learning", "Random"]

    const { thoughts,stat, loading, error, filter } = useSelector((state) => state.thought)
    // const {  } = useSelector((state) => state.thought);

    // const {
    //     thoughtsCount,
    //     thoughtFavoritesCount,
    //     thoughtCategoriesCount,
    //     thoughtTagsCount,
    //     categoryBreakdown = [],
    //     uniqueTags = [],
    //     quickFacts = {},
    //     thoughtTagsData
    // } = statistics;



    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [category, setCategory] = useState("")
    const [tags, setTags] = useState("")

    const [searchInput, setSearchInput] = useState("")
    const [selectCatogory, setSeleteCatogory] = useState("All")
    const [selecteTags, setSeleteTags] = useState("All")
    const [allTags, setAllTags] = useState([])

    // const 

    const [isEdit, setIsEdit] = useState(false)
    const [editId, setEditId] = useState(null)


    const tagsFormat = (tagsSting) => {
        return tagsSting.split(",")
    }
    const addThought = (e) => {
        e.preventDefault();
        dispatch(createThought({ title, content, category, tags: tagsFormat(tags) }));
        setTitle("")
        setContent("")
        setCategory("Random")
        setTags("")
    };

    const updateThoughtClick = (e) => {
        e.preventDefault();
        dispatch(upDateThought({
            id: editId,
            thoughtData: { title, content, category, tags: tagsFormat(tags) }
        }));
        setTitle("")
        setContent("")
        setCategory("Random")
        setTags("")
        setIsEdit(false)
    };


    const headleSearch = () => {
        let params = {}

        if (searchInput.trim()) {
            params.search = searchInput.trim()
        }

        if (selectCatogory !== "All") {
            params.category = selectCatogory
        }

        if (selecteTags !== "All") {
            params.tag = selecteTags
        }



        console.log(params)

        dispatch(setFilter(params))
        dispatch(getThought(params))
        // dispatch(getThought(params))

    }

    const getAllTags = () => {
        let tagsSet = new Set()
        thoughts.forEach((thought) => (
            thought.tags.forEach((tag) => tagsSet.add(tag))
        ))

        setAllTags(Array.from(tagsSet).sort())
    }


    async function searchTag(tag) {
        setSeleteTags(tag)
        let params = {}

        if (searchInput.trim()) {
            params.search = searchInput.trim()
        }

        if (selectCatogory !== "All") {
            params.category = selectCatogory
        }

        if (tag !== "All") {
            params.tag = tag
        }
        dispatch(setFilter(params))
        dispatch(getThought(params))

    }

    const headleClearFilter = () => {
        setSeleteCatogory("All")
        setSearchInput("")
        setSearchInput("All")
        dispatch(clearFilter())
        dispatch(getThought())

    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            headleSearch()
        }
        console.log(e.key)
    }

    useEffect(() => {
        dispatch(getThought())

        // console.log(thoughts)
        // console.log(thoughts.stat)
        console.log(stat)
        getAllTags()

    }, [dispatch])




    return (




        <div className="space-y-8">
            {/* header */}

            <div >
                <div className="flex justify-between max-w-7xl mx-auto items-center">

                    <div>
                        <h1 className="text-4xl font-bold">My Thought</h1>
                        <p>Your Personal thought repositoty</p>
                    </div>

                    {/* Thought Form */}
                    <ThoughtForm />
                </div>

                {/* Search */}

                <div className="flex gap-3">
                    <Input placeholder="Search " className="flex-1" onKeyPress={handleKeyPress} onChange={(e) => setSearchInput(e.target.value)} value={searchInput} />
                    <Select onValueChange={(e) => setSeleteCatogory(e)} value={selectCatogory}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {catogory.map((cat, i) => (
                                    <SelectItem key={i} value={cat}>{cat}</SelectItem>
                                ))}

                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Button onClick={headleSearch}>Search <Search /></Button>
                    {(selectCatogory !== "All" || selecteTags !== "All" || searchInput) && < Button onClick={headleClearFilter}> Clear < X /> </Button>}
                </div>

                {/* search Tags */}

                {allTags.length > 0 && <div className="flex flex-wrap gap-2 mt-4">
                    <Badge onClick={() => searchTag("All")} className="py-2 px-3 cursor-pointer border border-gray-700" size={"sm"} variant={selecteTags === "All" ? "default" : "outline"}>{"All"}</Badge>

                    {allTags.map((tag) => (
                        <Badge onClick={() => searchTag(tag)} className="py-2 px-3 cursor-pointer border border-gray-700" size={"sm"} variant={selecteTags === tag ? "default" : "outline"}>{"# " + tag}</Badge>
                    ))}
                </div>}

            </div>

            {loading && (<div className="flex justify-center items-center p-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>)}
            {
                !loading && thoughts.length > 0 && (<div>
                    <div className="grid md:grid-cols-4 gap-4">
                        {thoughts.map((thought) => (
                            <ThoughtCart key={thought._id} thought={thought} inputs={{ setTitle, setContent, setCategory, setTags, setIsEdit, setEditId }} />
                        ))}
                    </div>
                </div>)
            }
        </div >
    )
}

export default Home