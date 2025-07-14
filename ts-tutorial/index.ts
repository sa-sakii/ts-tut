import express from 'express';
const app = express();

app.use(express.json());

import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

app.get('/', (_req, res) => {
    res.send('you can go to ---- /hello /bmi /exercises')
})

app.get('/hello', (_req, res) => {
    res.send('Hello Full-Stack');
});

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;

    const parsedHeight = Number(height);
    const parsedWeight = Number(weight);

    if (!height || !weight || isNaN(parsedHeight) || isNaN(parsedWeight)){
        return res.status(400).json({
            error: 'malformatted parameters'
        });
    }

    const bmiResult = calculateBmi(parsedWeight, parsedHeight);

    return res.json({
        weight: parsedWeight,
        height: parsedHeight,
        bmi: bmiResult
    })

})

app.post('/exercises', (req, res) => {
    const { exerciseArray } = req.body

    if (!exerciseArray){
        return res.status(400).send({
            error: "Parameters missing"
        });
    }

    if (!Array.isArray(exerciseArray) || exerciseArray.some(d => isNaN(Number(d)))) {
        return res.status(400).send({
            error: "Malformated parameters"
        });
    }

    const dailyExerNums = exerciseArray.map(Number);
    
    const exercisesResult = calculateExercises(dailyExerNums);

    return res.json(exercisesResult);

})
const PORT = 3003

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
})