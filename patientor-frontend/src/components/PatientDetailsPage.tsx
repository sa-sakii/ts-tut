import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Patient, Entry, Diagnosis } from '../types';

const PatientDetailsPage = () => {
    const { id } = useParams();
    const [patient, setPatient] = useState<Patient | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const response = await axios.get<Patient>(`http://localhost:3000/api/patients/${id}`);
                setPatient(response.data);
            } catch (err: unknown) {
                if (axios.isAxiosError(err)) {
                    setError(err.response?.data || "Something went wrong");
                } else {
                    setError("Unknown error");
                }
            }
        };

        fetchPatient();
    }, [id]);

    useEffect(() => {
        const fetchDiagnoses = async () => {
            try {
                const response = await axios.get<Diagnosis[]>('http://localhost:3000/api/diagnoses');
                setDiagnoses(response.data);
            } catch (error) {
                console.error("Failed to fetch diagnoses", error);
            }
        };

        fetchDiagnoses();
    }, []);

    if (error) return <div style={{ color: 'red' }}>{error}</div>;
    if (!patient) return <div>Loading...</div>;

    const EntryDetails = ({ entry }: { entry: Entry }) => {
        return (
            <div style={{ marginBottom: "1rem" }}>
                <p>{entry.date} - {entry.description}</p>
                <p>Type: {entry.type}</p>

                {entry.diagnosisCodes?.length && (
                    <div>
                        <h4>Diagnoses Details</h4>
                        <ul>
                            {entry.diagnosisCodes.map(code => {
                                const diagnosis = diagnoses.find(d => d.code === code);
                                return (
                                    <li key={code}>
                                        {code} {diagnosis ? `- ${diagnosis.name}` : ''}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </div>
        );
    };


    // const EntryDetails = ({ entry }: { entry: Entry }) => {
    //     return (
    //         <div>
    //             <p>{entry.date} - {entry.description}</p>
    //             <p>Type: {entry.type}</p>
    //             {/* Handle type-specific fields with a switch */}
    //         </div>
    //     );
    // };

    return (
        <div>
            <h1>{patient.name}</h1>
            <p><strong>SSN:</strong> {patient.ssn}</p>
            <p><strong>Occupation:</strong> {patient.occupation}</p>
            <p><strong>Gender:</strong> {patient.gender}</p>
            <p><strong>Date of Birth:</strong> {patient.dateOfBirth}</p>
            <h3>Entries</h3>
            <ul>
                {patient.entries.map((entry: Entry) => (
                    <EntryDetails key={entry.id} entry={entry} />
                ))}
            </ul>
        </div>
    );
};

export default PatientDetailsPage;
