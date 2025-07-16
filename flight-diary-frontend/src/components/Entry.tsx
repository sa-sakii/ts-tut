import {type  DiaryEntry } from "../types";

interface EntryProps{
    entry: DiaryEntry;
}

const Entry = ({ entry }: EntryProps ) => {
    return (
        <div>
            <h3><i>{entry.date}</i></h3>
            <div><b>Visibility: </b>{entry.visibility}</div>
            <div><b>Weather: </b>{entry.weather}</div>
        </div>
    );
}

export default Entry;