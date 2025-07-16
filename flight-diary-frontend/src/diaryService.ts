import axios from "axios";
import type { DiaryEntry } from "./types";

const baseUrl = 'http://localhost:3000/api/diaries';

export const getAllEntries = async () => {
    const response = await axios.get<DiaryEntry[]>(baseUrl);
    return response.data;
}

export const createEntry = async (object: DiaryEntry) => {
    const response = await axios.post<DiaryEntry>(baseUrl, object);
    return response.data;
}