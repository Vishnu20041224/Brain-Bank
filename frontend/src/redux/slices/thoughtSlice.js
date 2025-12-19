import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import * as api from "../../utils/app.js"

export const getThought = createAsyncThunk(
    "thought/GETthought",
    async (params, { rejectWithValue }) => {
        try {
            const res = await api.fetchThoughts(params)
            console.log(res.data)
            return res.data;
        } catch (error) {
            return rejectWithValue(error.res.data);
        }
    }

)

export const createThought = createAsyncThunk(
    "thought/POSTthought",
    async (data, { rejectWithValue }) => {
        try {
            const res = await api.createThoughts(data)
            return res.data
        } catch (error) {
            return rejectWithValue(error.res.data)
        }
    }
)

export const deleteThought = createAsyncThunk(
    "thought/DELETEthought",
    async (id, { rejectWithValue }) => {
        try {
            const res = await api.deleteThughts(id)
            return id
        } catch (error) {
            return rejectWithValue(error.res.data)
        }
    }
)

export const upDateThought = createAsyncThunk(
    "thought/PUTthought",
    async ({ id, thoughtData }, { rejectWithValue }) => {
        try {
            const res = await api.updateThughts(id, thoughtData)
            console.log(res.data.data)
            console.log(res.data)

            return res.data
        } catch (error) {
            return rejectWithValue(error.res.data)

        }
    }
)

// 
export const favoriteTagoleThought = createAsyncThunk(
    "thought/PACTHthought",
    async (id, { rejectWithValue }) => {
        try {
            const res = await api.favoriteTagole(id)
            console.log(res.data)

            return id
        } catch (error) {
            return rejectWithValue(error.res.data)

        }
    }
)

export const statisticsThought = createAsyncThunk(
    "thought/GETstatistics",
    async ({ }, { rejectWithValue }) => {
        try {
            const res = await api.fetchThughtStatistics()
            console.log(res.data)
            return res.data
        } catch (error) {
            return rejectWithValue(error.res.data)

        }
    }
)

export const statThought = createAsyncThunk(
    "thought/GETstat",
    async ({ }, { rejectWithValue }) => {
        try {
            const res = await api.fetchThughtStat()
            console.log(res.data)
            return res.data
        } catch (error) {
            return rejectWithValue(error.res.data)

        }
    }
)

export const favoritesThught = createAsyncThunk(
    "thought/GETFavorites",
    async ({ }, { rejectWithValue }) => {
        try {
            const res = await api.fetchFavoritesThught()
            console.log(res.data)
            return res.data
        } catch (error) {
            return rejectWithValue(error.res.data)

        }
    }
)



const initialState = {
    thoughts: [],
    favoritesThughtArray: [],
    currentThoght: null,
    loading: false,
    error: null,
    filter: {
        search: "",
        category: "",
        tag: "",
        isFavorite: "",
    },
    statistics: {},
    stat: {},
}







const thoughtSlice = createSlice({
    name: "thought",
    initialState,
    reducers: {
        setFilter: (state, action) => {
            state.filter = { ...state.filter, ...action.payload }
        },
        clearFilter: (state) => {
            state.filter = initialState.filter
        },
        clearError: (state) => {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getThought.pending, (state) => {
                state.loading = true,
                    state.error = null
            })

            .addCase(getThought.fulfilled, (state, action) => {
                state.loading = false,
                    state.thoughts = action.payload.data,
                    console.log(action.payload.data)
            })

            .addCase(getThought.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })

            // created Thought

            .addCase(createThought.pending, (state) => {
                state.loading = true,
                    state.error = null
            })

            .addCase(createThought.fulfilled, (state, action) => {

                state.loading = false,
                    state.thoughts.unshift(action.payload.data),
                    console.log(action.payload.data)
            })

            .addCase(createThought.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })

            // Delete Thought 

            // .addCase(deleteThought.pending, (state) => {
            //     state.loading = true
            //     state.error = null
            // })

            .addCase(deleteThought.fulfilled, (state, action) => {
                state.loading = false
                let id = action.payload
                console.log(id)
                state.thoughts = state.thoughts.filter((tho) => tho._id !== id)
            })

            // .addCase(deleteThought.rejected, (state, action) => {
            //     state.loading = false,
            //         state.error = action.payload
            // })

            // like Thought 
            .addCase(upDateThought.pending, (state) => {
                state.loading = true
                state.error = null
            })

            .addCase(upDateThought.fulfilled, (state, action) => {
                state.loading = false
                let updateData = action.payload.data
                state.thoughts = state.thoughts.map((tho) => tho._id === updateData._id ? updateData : tho)
                console.log("action.payload", action.payload)
                console.log(state.thoughts)
            })

            .addCase(upDateThought.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })

            // favorit 
            .addCase(favoriteTagoleThought.fulfilled, (state, action) => {
                state.thoughts = state.thoughts.map((tho) => tho._id === action.payload ? { ...tho, isFavorite: !tho.isFavorite } : tho)
                state.favoritesThughtArray = state.thoughts.filter(tho => tho.isFavorite === true)
            })

            // statisticsThought
            .addCase(statisticsThought.fulfilled, (state, action) => {
                state.statistics = action.payload
            })

            .addCase(statThought.fulfilled, (state, action) => {
                state.stat = action.payload
            })

            // 
            .addCase(favoritesThught.fulfilled, (state, action) => {
                state.favoritesThughtArray = action.payload.data
                console.log(action.payload.data)
            })
    }
})
export const { setFilter, clearFilter } = thoughtSlice.actions
export default thoughtSlice.reducer