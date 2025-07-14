import diagnosisData from "../data/diagnoses"

import { Diagnosis } from "../types";

const diagnoses: Diagnosis[] = diagnosisData;

const getDiagnosisEntries = (): Diagnosis[] => {
    return diagnoses; 
};

export default {
    getDiagnosisEntries
};