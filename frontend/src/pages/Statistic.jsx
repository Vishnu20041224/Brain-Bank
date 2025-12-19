import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { statThought } from "../redux/slices/thoughtSlice.js"
import { Brain, Heart, FolderOpen, Tag, TrendingUp } from 'lucide-react';
import { Badge } from "@/components/ui/badge"
import { useCookies } from "react-cookie";

const Statistic = () => {

    const dispatch = useDispatch()
    let { stat } = useSelector((state) => state.thought)
    const [cookie] = useCookies(["userName","userAge"])

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

    let getCategoryBorder = (category) => {
        const colors = {
            Iead: "bg-purple-500 ",
            Goal: "bg-green-500 ",
            Quote: "bg-yellow-500 ",
            Reminder: "bg-red-500 ",
            Learning: "bg-blue-500 ",
            Random: "bg-gray-500 ",
        }

        return colors[category] || colors.Random

    }
    let categoryColor = (category) => {
        const colors = {
            Iead: "text-purple-700  ",
            Goal: "text-green-700 ",
            Quote: "text-yellow-700 ",
            Reminder: "text-red-700",
            Learning: "text-blue-700 ",
            Random: "text-gray-700",
        }

        return colors[category] || colors.Random

    }

    useEffect(() => {
        dispatch(statThought({}))
        console.log(stat)
        console.log(cookie.userName)
        console.log(cookie.userAge)

    }, [])
    return (
        <div className='bg-gray-200'>
            <div className='bg-white p-10 rounded-2xl'>
                <div className='grid md:grid-cols-4 sm:grid-cols-2 gap-3 pb-5'>
                    <div className='border border-gray-400 p-6 rounded-2xl flex flex-col justify-between '>
                        <div className='flex justify-between pb-6 items-center'>
                            <h1 className='text-2xl font-medium'>Total Thought</h1>
                            <Brain size={28} className='bg-blue-200 text-blue-800 p-1 rounded-md' />
                        </div>
                        <div>
                            <h1 className='text-3xl font-bold'>{stat.thoughtsCount}</h1>
                        </div>
                    </div>

                    <div className='border border-gray-400 p-6 rounded-2xl flex flex-col justify-between '>
                        <div className='flex justify-between pb-6 items-center'>
                            <h1 className='text-2xl font-medium'>Favorites</h1>
                            <Heart size={28} className='bg-red-200 text-red-800 p-1 rounded-md' />
                        </div>
                        <div>
                            <h1 className='text-3xl font-bold'>{stat.thoughtFavoritesCount}</h1>
                        </div>
                    </div>

                    <div className='border border-gray-400 p-6 rounded-2xl flex flex-col justify-between '>
                        <div className='flex justify-between pb-6 items-center'>
                            <h1 className='text-2xl font-medium'>Categories</h1>
                            <FolderOpen size={28} className='bg-green-200 text-green-800 p-1 rounded-md' />
                        </div>
                        <div>
                            <h1 className='text-3xl font-bold'>{stat.thoughtCategoriesCount}</h1>
                        </div>
                    </div>

                    <div className='border border-gray-400 p-6 rounded-2xl flex flex-col justify-between '>
                        <div className='flex justify-between pb-6 items-center'>
                            <h1 className='text-2xl font-medium'>Tag</h1>
                            <Tag size={28} className='bg-purple-200 text-purple-800 p-1 rounded-md' />
                        </div>
                        <div>
                            <h1 className='text-3xl font-bold'>{stat.thoughtTagsCount}</h1>
                        </div>
                    </div>
                </div>

                <div className='border border-gray-400 p-6 rounded-2xl '>
                    <div className='flex items-center gap-4 pb-10 font-bold text-3xl'>
                        <TrendingUp size={30} />
                        <h1>Category Breakdown</h1>
                    </div>

                    <div>
                        {stat.categoryBreakdown?.map((cat,i) => (
                            <div className='pb-5' key={i}>

                                <div className='flex justify-between gap-4 items-center pb-3'>
                                    <div className='flex gap-5 items-center'>
                                        <h1><Badge className={`px-2 py-1 ${getCategoryColor(cat.category)}`}>{cat.category}</Badge></h1>
                                        <h1 className={categoryColor(cat.category)} >{cat.count} Thought</h1>
                                    </div>
                                    <h1 className='font-semibold'>
                                        {((cat.count / stat.thoughtsCount) * 100).toFixed(2)}%
                                    </h1>
                                </div>

                                <div className='h-3 w-full bg-gray-300 rounded-full'>
                                    <div className={`${getCategoryBorder(cat.category)} h-3 rounded-full`} style={{ width: `${(cat.count / stat.thoughtsCount) * 100}%` }}></div>
                                </div>

                            </div>

                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Statistic