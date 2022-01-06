import express from 'express';
import cors from "cors";
import path from "path";

import routes from "./routes/assignments-routes";

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.use("/", routes);

const port = 3000;

app.listen(port,  () => console.log(`listening on port ${port}`));