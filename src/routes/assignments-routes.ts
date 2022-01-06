import express from "express";
import Assignment from "../models/assignments-model";
const routes = express.Router();

let assignmentsArray: Assignment[] = [
    {assignment: "Walrus Worksheet", score: 9, total: 10, completed: true, id: 1},
    {assignment: "Jellyfish Project", score: 15, total: 15, completed: true, id: 2},
    {assignment: "Dolphin Quiz", score: 8, total: 10, completed: true, id: 3},
    {assignment: "Oceans Unit Test", score: 0, total: 25, completed: false, id: 4},
];

routes.get("/", (req, res) => {
    const calc = (array: Assignment[]): any => {
        for (let i = 0; i < array.length; i++) {
            let scores = 0;
            let totals = 0;
            scores += array[i].score;
            totals += array[i].total;
            let avg = scores/totals;
            return avg;
        }
    }
    let average = calc(assignmentsArray)*100;
    res.render("home", {assignmentsArray, average});
})

routes.get("/adding-assignment", (req, res) => {
    res.render("addPage");
})

let nextID = 5;
routes.post("/", (req, res) => {
    let newAssignment:Assignment = {assignment: req.body.name, score: req.body.score, total: req.body.total, completed: req.body.completed, id: nextID}
    nextID++;
    assignmentsArray.push(newAssignment);
    res.status(201);
    res.render('assignment-added', newAssignment)
})

routes.get("/assignment-added", (req, res) => {
    res.render("assignment-added")
})

routes.delete("/to-be-deleted/:id", (req, res) => {
    let tobeDeleted:number = Number.parseInt(req.params.id);
    for (let i = 0; i < assignmentsArray.length; i++) {
        if (assignmentsArray[i].id === tobeDeleted) {
            assignmentsArray.splice(i, 1);
        }
    }
    res.status(204);
    res.json("delete was successful");
})

routes.get("/to-be-deleted/:id", (req, res) => {
    let num = Number.parseInt(req.params.id);
    let name = assignmentsArray[num];
    res.render("assignment-deleted", {name})
})


export default routes;