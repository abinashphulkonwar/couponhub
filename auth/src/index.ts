import express  from "express"
import { json } from  "express"
import { currentUserRouter } from "./routes/current-user";
import { loginRouter } from "./routes/login";

const app = express();

app.use(json())



app.use("/api/users",currentUserRouter )
app.use("/api/users",loginRouter )

app.listen(3000,() => {
    console.log("listing on port 3000")
})