import mongoose from "mongoose"
import { Thoughts } from "../models/Thoughts.js"
import dotenv from "dotenv"

dotenv.config()

const seedProduct = [
  {
    title: "Morning Reflection",
    content: "Start your day with gratitude and calmness. Focus on what you can control.",
    category: "Reminder",
    tags: ["mindfulness", "morning", "focus"],
    isFavorite: true
  },
  {
    title: "Career Vision",
    content: "Visualize the person you want to become in five years and work towards it every single day.",
    category: "Goal",
    tags: ["career", "motivation", "growth"],
    isFavorite: false
  },
  {
    title: "Learning from Failure",
    content: "Failure is not the opposite of success; it’s a part of it.",
    category: "Learning",
    tags: ["failure", "success", "growth"],
    isFavorite: true
  },
  {
    title: "Quote of the Day",
    content: "Discipline equals freedom. – Jocko Willink",
    category: "Quote",
    tags: ["discipline", "freedom", "motivation"],
    isFavorite: false
  },
  {
    title: "Weekend Plan",
    content: "Spend quality time with family, read one new chapter, and plan for the upcoming week.",
    category: "Reminder",
    tags: ["weekend", "balance", "planning"],
    isFavorite: false
  },
  {
    title: "New App Idea",
    content: "An AI-powered journaling app that gives motivational feedback and suggests daily goals.",
    category: "Iead",
    tags: ["startup", "AI", "journaling"],
    isFavorite: true
  },
  {
    title: "Daily Learning",
    content: "Today I learned about JavaScript async/await and how it simplifies promise handling.",
    category: "Learning",
    tags: ["javascript", "async", "coding"],
    isFavorite: false
  },
  {
    title: "Motivational Boost",
    content: "Push yourself because no one else is going to do it for you.",
    category: "Quote",
    tags: ["motivation", "self", "growth"],
    isFavorite: false
  },
  {
    title: "Goal for November",
    content: "Complete the React Native project and deploy it on the Play Store.",
    category: "Goal",
    tags: ["react", "app", "goal"],
    isFavorite: true
  },
  {
    title: "Random Thought",
    content: "Sometimes, the best ideas come when you’re not even trying to think of them.",
    category: "Random",
    tags: ["creativity", "thoughts", "inspiration"],
    isFavorite: false
  }
]

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("mongoose connected")

    await Thoughts.deleteMany({})
    const createdThoughts = await Thoughts.insertMany(seedProduct)
    console.log(`✅ Seeded ${createdThoughts.length} thoughts successfully`)
  } catch (e) {
    console.error("❌ Seed ERROR:", e.message)
  } finally {
    process.exit(0)
  }
}

run()
