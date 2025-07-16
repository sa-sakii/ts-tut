import Header from "./components/Header";
import Entries from "./components/Entries";
import { useEffect, useState } from "react";
import { getAllEntries } from "./diaryService";

import type { DiaryEntry } from "./types";
import EntryForm from "./components/EntryForm";

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllEntries()
      .then(data => {
        setEntries(data);
      });
  }, []);

  return (
    <div>
      <EntryForm entries={entries} setEntries={setEntries}/>
      <Header />
      <Entries diaryEntries={entries} />
    </div>
  );
};

export default App;