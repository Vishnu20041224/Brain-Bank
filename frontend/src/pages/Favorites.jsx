import { useEffect } from 'react'
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux"
import ThoughtCart from "../components/ThoughtCart"
import { favoritesThught } from "../redux/slices/thoughtSlice"

const Favorites = () => {
  let { favoritesThughtArray, thoughts } = useSelector((state) => state.thought)
  const dispatch = useDispatch()

  const [cookie, setCookies, removeCookies] = useCookies(["userName","userAge"])

  function saveCookies() {
    setCookies("userName", "Vishnu Shankar", {
      path: "/favorites",
      maxAge: 60 * 60 * 24 * 7 // 7 days
    })

     setCookies("userAge", 21, {
      path: "/favorites",
      maxAge: 60 * 60 * 24 * 10 // 7 days
    })
  }


  useEffect(() => {
    dispatch(favoritesThught({}))
    saveCookies()
  }, [dispatch])

  return (
    <div className='grid md:grid-cols-4 gap-4'>
      {favoritesThughtArray?.map((thought) => (
        <ThoughtCart key={thought._id} thought={thought} />
      ))}

      { }
    </div>
  )
}

export default Favorites
