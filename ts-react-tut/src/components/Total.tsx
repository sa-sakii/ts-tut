interface TotalProps {
    totalExercises: number;
}

const Total = (props: TotalProps) => {
    return (
        <div>
            <p>
                Number of total exercises is <strong>{props.totalExercises}</strong>
            </p>
        </div>
    );
}

export default Total;