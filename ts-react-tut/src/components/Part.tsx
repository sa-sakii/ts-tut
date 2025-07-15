import type { CoursePart } from "../types";

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}
    `);
};

interface PartProps {
    partDetail: CoursePart;
}
const Part = ({ partDetail }: PartProps) => {
    switch (partDetail.kind) {
        case "basic":
            return (
                <div>
                    <p>
                        <strong>{partDetail.name} {partDetail.exerciseCount}</strong>
                        <div><i>{partDetail.description}</i></div>
                    </p>

                </div>
            );
        case "group":
            return (
                <div>
                    <p>
                        <strong>{partDetail.name} {partDetail.exerciseCount}</strong>
                        <div><i>group project count {partDetail.groupProjectCount}</i></div>
                    </p>
                </div>
            );
        case "background":
            return (
                <div>
                    <p>
                        <strong>{partDetail.name} {partDetail.exerciseCount}</strong>
                        <div><i>{partDetail.description}</i></div>
                        <div>background material {partDetail.backgroundMaterial}</div>
                    </p>
                </div>
            );
        case "special":
            return (
                <div>
                    <p>
                        <strong>{partDetail.name} {partDetail.exerciseCount}</strong>
                        <div><i>{partDetail.description}</i></div>
                        <div>required skills: <i>{partDetail.requirements.map(s => `"${s}" `)}</i></div>
                    </p>
                </div>
            );
        default:
            return assertNever(partDetail);
    }

}

export default Part;