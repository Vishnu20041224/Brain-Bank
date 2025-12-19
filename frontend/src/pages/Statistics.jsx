import React, { useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { TrendingUp, Tag, Heart, Folder } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { statisticsThought ,statThought} from "../redux/slices/thoughtSlice.js";

const Statistics = () => {

  const { statistics, loading } = useSelector((state) => state.thought);
  const dispatch = useDispatch();

  async function fetchStatistics() {

  }
  useEffect(() => {
    let res = dispatch(statisticsThought({}));
    console.log(res)

  }, []);

  if (loading || !statistics) return <div>Loading...</div>;

  const {
    thoughtsCount,
    thoughtFavoritesCount,
    thoughtCategoriesCount,
    thoughtTagsCount,
    categoryBreakdown = [],
    uniqueTags = [],
    quickFacts = {}
  } = statistics;



  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 flex items-center">
        <TrendingUp className="mr-2 text-blue-500" /> Statistics
      </h1>
      <p className="text-gray-600 mb-6 text-lg">Overview of your thought collection</p>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="shadow-md border rounded-lg p-4 bg-white">
          <div className="flex items-center">
            <Folder className="text-blue-500 mr-2" />
            <h2 className="text-lg font-semibold">Total Thoughts</h2>
          </div>
          <p className="text-3xl font-bold mt-2">{thoughtsCount}</p>
        </Card>
        <Card className="shadow-md border rounded-lg p-4 bg-white">
          <div className="flex items-center">
            <Heart className="text-red-500 mr-2" />
            <h2 className="text-lg font-semibold">Favorites</h2>
          </div>
          <p className="text-3xl font-bold mt-2">{thoughtFavoritesCount}</p>
        </Card>
        <Card className="shadow-md border rounded-lg p-4 bg-white">
          <div className="flex items-center">
            <Folder className="text-green-500 mr-2" />
            <h2 className="text-lg font-semibold">Categories</h2>
          </div>
          <p className="text-3xl font-bold mt-2">{thoughtCategoriesCount}</p>
        </Card>
        <Card className="shadow-md border rounded-lg p-4 bg-white">
          <div className="flex items-center">
            <Tag className="text-purple-500 mr-2" />
            <h2 className="text-lg font-semibold">Total Tags</h2>
          </div>
          <p className="text-3xl font-bold mt-2">{thoughtTagsCount}</p>
        </Card>
      </div>

      {/* Category Breakdown Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <TrendingUp className="mr-2 text-blue-500" /> Category Breakdown
        </h2>
        {categoryBreakdown.map(({ category, count }) => (
          <div key={category} className="mb-4">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-gray-700">{category}</span>
              <span className="text-gray-500">{count} thoughts</span>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-3">
              <div
                className="bg-blue-500 h-3 rounded-full"
                style={{ width: `${(count / thoughtsCount) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Tags Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <Tag className="mr-2 text-blue-500" /> All Tags ({uniqueTags.length})
        </h2>
        <div className="flex flex-wrap gap-3">
          {uniqueTags.map(tag => (
            <span
              key={tag}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm shadow-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Quick Facts Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <TrendingUp className="mr-2 text-blue-500" /> Quick Facts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-md border rounded-lg p-4 bg-white">
            <h3 className="text-lg font-semibold">Favorite Rate</h3>
            <p className="text-3xl font-bold mt-2">{quickFacts.favoriteRate}%</p>
          </Card>
          <Card className="shadow-md border rounded-lg p-4 bg-white">
            <h3 className="text-lg font-semibold">Most Used Category</h3>
            <p className="text-3xl font-bold mt-2">{quickFacts.mostUsedCategory}</p>
          </Card>
          <Card className="shadow-md border rounded-lg p-4 bg-white">
            <h3 className="text-lg font-semibold">Average Tags per Thought</h3>
            <p className="text-3xl font-bold mt-2">{quickFacts.averageTagsPerThought}</p>
          </Card>
          <Card className="shadow-md border rounded-lg p-4 bg-white">
            <h3 className="text-lg font-semibold">Non-Favorite Thoughts</h3>
            <p className="text-3xl font-bold mt-2">{quickFacts.nonFavoriteThoughts}</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Statistics;