import express from "express";
import diagnosisService from "../services/diagnosisService";

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(diagnosisService.getDiagnosisEntries());
});

router.post('/', (_req, res) => {
    res.send("savind a patient detail");
});

export default router;