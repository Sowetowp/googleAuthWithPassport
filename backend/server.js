 
import path from "path"
import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import passport from "./utils/passport.js"
import authRoutes from "./routes/authRoutes.js"

dotenv.config({path: "./config/.env"})


const PORT = process.env.PORT || 5000

const app = express()

//https://stackoverflow.com/questions/57009371/access-to-xmlhttprequest-at-from-origin-localhost3000-has-been-blocked

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173")
  next()
})

app.use(
  cors({
    origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
    methods: "GET, POST, PATCH, DELETE, PUT",
    credentials: true,
  })
)

app.use(cookieParser())
passport(app)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use("/auth", authRoutes)

const __dirname = path.resolve()
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve()
  app.use("/uploads", express.static(path.join(__dirname, "uploads")))
  app.use(express.static(path.join(__dirname, "/client/dist")))
  app.use("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"))
  )
} else {
  app.use("/uploads", express.static(path.join(__dirname, "uploads")))
  app.get("/", (req, res) => {
    res.send("Api is running...")
  })
}


app.listen(PORT, () => {
  console.log(`Server is runing on port ${PORT}`)
})