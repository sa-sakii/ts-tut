import express from "express";
import patientService from "../services/patientService";
// import toNewPatientEntry from "../utils";
import { NewEntrySchema } from "../utils";

import { z } from 'zod';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitiveEntries());
    // res.send(patientService.getPatientsEntries());
});

router.post('/', (req, res) => {
    try {
        const newPatientEntry = NewEntrySchema.parse(req.body);
        // const newPatientEntry = toNewPatientEntry(req.body); -- before zod schema
        const addedEntry = patientService.addPatientEntry(newPatientEntry); 
        res.json(addedEntry);
    } catch (error: unknown) {
        if (error instanceof z.ZodError) {
            res.status(400).send({ error: error.issues });
        } else {
            res.status(400).send({ error: 'unknown error' });
        }
        // let errorMessage = "ERROR: "; 
        // if (error instanceof Error) {
        //     errorMessage += error.message;
        // }
        // res.status(400).send(errorMessage);
    }
    // const { name, dateOfBirth, gender, occupation, ssn } = req.body;
    // const addedEntry = patientService.addPatientEntry({
    //     name,
    //     dateOfBirth,
    //     gender,
    //     occupation,
    //     ssn
    // });
    // res.json(addedEntry);
    // res.send("saving a patient detail");
});

export default router;