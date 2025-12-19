import { createContext, useContext, useEffect, useState } from "react";
import { updateThughts } from "../utils/app";


const ThoughtCtx = createContext(null)


export function ThoughtProvider({ children }) {
    let API_PORT = import.meta.env.VITE_API_URL || "http://localhost:3000"
    let [thoughts, setThoughts] = useState([])

    let [category, setCategory] = useState("")
    let [content, setContent] = useState("")
    let [title, setTitle] = useState("")

    let [isEdit, setEdit] = useState(false)
    let [editId, setEditId] = useState("")

    //search

    let [searchText, setSecrchText] = useState("")
    let [searchCategory, setSearchCategory] = useState("")
    let [searchWishList, setSearchWishList] = useState(false)

    async function getThoughts() {
        try {
            let res = await fetch(`${API_PORT}/api/thoughts?category=${searchCategory}&search=${searchText}&isFavorite=${searchWishList ? searchWishList : ""}`)
            let data = await res.json()
            setThoughts(data.data)

            console.log(data)
        } catch (e) {
            throw new Error(e.message)
        }
    }

    async function likeThought(id, favorite) {
        try {
            let res = await fetch(`${API_PORT}/api/thoughts/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    isFavorite: !favorite
                })
            })

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            console.log("Thought liked successfully:", data);
            // let data = updateThughts(id, { isFavorite: !favorite, })
            getThoughts()

            return data;
        } catch (error) {
            console.error("Error liking thought:", error);
        }
    }

    async function deleteThought(id) {
        let res = await fetch(`${API_PORT}/api/thoughts/${id}`, {
            method: "DELETE"
        })
        let data = await res.json()
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
        console.log("Thought Delete successfully:", data);
        getThoughts()

    }

    async function edit(id) {
        setEdit(true)
        setEditId(id)
        let res = await fetch(`${API_PORT}/api/thoughts/${id}`)
        let { data } = await res.json()
        console.log(data)
        setCategory(data.category)
        setContent(data.content)
        setTitle(data.title)
    }

    async function putThought(e) {
        e.preventDefault()
        try {
            let res = await fetch(`${API_PORT}/api/thoughts/${editId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title, content, category
                })
            })
            let data = await res.json()
            console.log(data)
            getThoughts()

            setCategory("")
            setContent("")
            setTitle("")
            setEdit(false)

        } catch (error) {
            console.error("Error PUT thought:", error);
        }
    }

    async function postThought(e) {
        e.preventDefault()
        let res = await fetch(`${API_PORT}/api/thoughts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                category,
                content,
                title
            })
        })

        let data = await res.json()
        console.log(data)
        getThoughts()

        setCategory("")
        setContent("")
        setTitle("")
    }



    useEffect(() => {
        (() => {

            getThoughts()

        })()
    }, [searchText, searchCategory, searchWishList])

    // useEffect(() => {
    //     getThoughts()

    // }, [thoughts])
    return (
        <ThoughtCtx.Provider value={{
            thoughts, API_PORT,
            category, setCategory,
            content, setContent,
            title, setTitle,
            isEdit, setEdit,
            likeThought, deleteThought, edit, postThought, putThought,
            searchText, setSecrchText,
            searchCategory, setSearchCategory,
            searchWishList, setSearchWishList,

        }}>
            {children}
        </ThoughtCtx.Provider>
    )
}

export const useThought = () => useContext(ThoughtCtx)