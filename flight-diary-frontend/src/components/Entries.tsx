import Entry from "./Entry";
import type { DiaryEntry } from "../types";

interface EntriesProps {
    diaryEntries: DiaryEntry[];
}

const Entries = ({diaryEntries}: EntriesProps) => {
    const renderEntries = () =>
         diaryEntries.map(ent => <Entry key={ent.id} entry={ent}/>);

    return (
        <div>
            {renderEntries()}
        </div>
    );
}

export default Entries;