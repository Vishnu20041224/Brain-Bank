import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Link } from "react-router-dom";
import { Brain, Heart, FolderOpen, Tag, TrendingUp, ChartNoAxesCombined } from 'lucide-react';

const Navbar = () => {


  return (
    <>
      <div className="">
        <div className="mx-auto px-4 py-3 min-h-fit">

          <div className="flex items-center justify-between h-16">
            {/* logo */}
            <Link to={"/"} className="flex items-center justify-between space-x-2">
              <Brain className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold bg-gradient-to-right from-primary to-blue-600 bg-clip-text text-transparent">Brain Bank</span>
            </Link>

            {/* nav */}

            <div className="flex flex-row flex-wrap mt-5 my-5 gap-3">
              <Link to={"/"}>
                <Button className="px-2 py-1 md:px-2 md:py-3"><Brain /> Thought</Button>
              </Link>

              <Link to={"/favorites"}>
                <Button><Heart />Favorites</Button>
              </Link>

              <Link to={"/stat"}>
                <Button><ChartNoAxesCombined /> Statistics</Button>
              </Link>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar