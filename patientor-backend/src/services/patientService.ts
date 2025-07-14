import { v1 as uuid } from 'uuid';

import patientsData from '../data/patients';


import { NonSensitivePatientEntry, Patient, NewPatientEntry } from '../types';

const patients: Patient[] = patientsData;

const getPatientsEntries = (): Patient[] => {
    return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatientEntry = (entry: NewPatientEntry): Patient => {
    const newPatientEntry = {
        id: uuid(),
        ...entry
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
}

export default {
    getPatientsEntries,
    getNonSensitiveEntries,
    addPatientEntry
};