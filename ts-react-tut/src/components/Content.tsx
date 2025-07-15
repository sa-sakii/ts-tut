import type { CoursePart } from "../types";
import Part from "./Part";

interface ContentProps {
    courseParts: CoursePart[];
};

const Content = ({ courseParts }: ContentProps) => {
    return (
        <div>
            {courseParts.map(part => 
                <Part  key={part.name} partDetail={part}/> 
            )}
        </div>
    );
}

export default Content;