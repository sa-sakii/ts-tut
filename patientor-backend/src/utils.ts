import { z } from "zod";
import { NewPatientEntry, Gender } from "./types";

export const NewEntrySchema = z.object({
    name: z.string(), 
    dateOfBirth: z.iso.date(),
    gender: z.enum(Gender),
    occupation: z.string(), 
    ssn: z.string(),
})
const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    return NewEntrySchema.parse(object);
};

export default toNewPatientEntry;