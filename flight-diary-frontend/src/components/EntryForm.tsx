import { useState } from "react";
import type { Weather, Visibility, DiaryEntry } from "../types";
import axios from "axios";

import { createEntry } from "../diaryService";

interface EntryFormProps {
    entries: DiaryEntry[];
    setEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
}

const EntryForm = ({ entries, setEntries }: EntryFormProps) => {
    const [date, setDate] = useState('');
    const [visibility, setVisibility] = useState<Visibility | "">("");
    const [weather, setWeather] = useState<Weather | "">("");
    const [comment, setComment] = useState('');

    const [errorMessage, setErrorMessage] = useState('');


    const entryCreation = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        if (weather === "" || visibility === "") {
            setErrorMessage("Please select weather and visibility");
            setTimeout(() => {
                setErrorMessage("");
            }, 4000);
            return;
        }

        const entryToAdd = {
            date: date,
            visibility: visibility,
            weather: weather,
            comment: comment,
            id: Number(entries.length + 1),
        };
        try {
            const data = await createEntry(entryToAdd);
            setEntries(entries.concat(data));

            setComment('');
            setWeather('');
            setVisibility('');
            setDate('');
        } catch (error: unknown) {
            if (error instanceof axios.AxiosError) {
                const message = error.response?.data?.error || "Unknown error";
                setErrorMessage(`Failed to create entry ${message}`);
                setTimeout(() => {
                    setErrorMessage("");
                }, 5000);
            } else {
                setErrorMessage("Unexpected Error occurred");
                setTimeout(() => {
                    setErrorMessage("");
                }, 5000);
            }
        }
    }

    return (
        <div>
            <form onSubmit={entryCreation}>
                <h1>Add new diary entry</h1>
                {
                    errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>
                }
                <div>
                    date:
                    <input type="text" value={date} onChange={(event) => setDate(event.target.value)} />
                </div>
                <div>
                    weather:
                    <select value={weather} onChange={(event) => setWeather(event.target.value as Weather)}>
                        <option value="" disabled>Select Weather</option>
                        <option value="sunny">sunny</option>
                        <option value="rainy">rainy</option>
                        <option value="cloudy">cloudy</option>
                        <option value="stormy">stormy</option>
                        <option value="windy">windy</option>
                    </select>
                </div>
                <div>
                    visibility:
                    <select value={visibility} onChange={(event) => setVisibility(event.target.value as Visibility)}>
                        <option value="" disabled>Select Visibility</option>
                        <option value="ok">ok</option>
                        <option value="good">good</option>
                        <option value="poor">poor</option>
                        <option value="great">great</option>
                    </select>
                </div>
                <div>
                    comment:
                    <input type="text" value={comment} onChange={(event) => setComment(event.target.value)} />
                </div>
                <div>
                    <button type="submit">add entry</button>
                </div>
            </form>
        </div>
    )
}

export default EntryForm;