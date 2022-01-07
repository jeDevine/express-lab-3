import express from 'express';
import Assignment from '../models/assignments-model';
const apiRoutes = express.Router();

let assignmentsArray: Assignment[] = [
    {assignment: "Walrus Worksheet", score: 9, total: 10, completed: true, id: 1},
    {assignment: "Jellyfish Project", score: 15, total: 15, completed: true, id: 2},
    {assignment: "Dolphin Quiz", score: 8, total: 10, completed: true, id: 3},
    {assignment: "Oceans Unit Test", score: 0, total: 25, completed: false, id: 4},
];

apiRoutes.get("/assignments", (req, res) => {
    res.json(assignmentsArray)
})

apiRoutes.get("/summary", (req, res) => {
    const calc = (array: Assignment[]): any => {
        for (let i = 0; i < array.length; i++) {
            if (assignmentsArray[i].completed === true) {
            let scores = 0;
            let totals = 0;
            scores += array[i].score;
            totals += array[i].total;
            let avg = scores/totals;
            return avg;
            }
        }
    }
    let average = calc(assignmentsArray)*100;
    let newOBJ = {average: average, assignments: assignmentsArray}
    res.json(newOBJ);
})

export default apiRoutes;