import app from "./app.ts";
import http from 'http';


const PORT = process.env.PORT || 4000
const server = http.createServer(app)


server.listen(PORT, () => {
    console.log(`server is running on PORT: ${PORT}`);
})