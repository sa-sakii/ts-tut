import express from "express"; 
import diagnosesRouter from "./routes/diagnosis";
import patientsRouter from "./routes/patient";

import cors from "cors";

const app = express(); 

app.use(cors());
app.use(express.json()); 

const PORT = 3000; 

app.get('/', (_req, res) => {
    res.send('go to /ping');
});

app.get("/ping", (_req, res) => {
    console.log("Someone pinged here!"); 
    res.send('Pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});