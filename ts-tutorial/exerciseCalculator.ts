interface exerciseResult{
    periodLength: number;
    trainingDays: number; 
    success: boolean;
    rating: number;
    ratingDescription: String;
    target: number;
    average: number;
}

const parseWeekArguments = (args: string[]): number[] => {
    if (args.length < 3) throw new Error('Insufficient arguments');
    if (args.length > 9) throw new Error('Excess arguments'); 

    const inputs = args.slice(2).map((n) => {
        if (isNaN(Number(n))) {
            throw new Error('Provided value is not a number');
        }
        return Number(n);
    });

    return inputs;
}

export const calculateExercises = (exerciseArray: number[]): exerciseResult => {
    const checkPeriodLength = exerciseArray.length

    const checkAverage = exerciseArray.reduce((a, b) => a + b, 0) / checkPeriodLength

    const checkTrainingDays = exerciseArray.filter(e => e !== 0).length
    
    const checkTarget = 5

    const checkSuccess = checkTarget === checkTrainingDays

    const checkRatings = (() => {
        switch(true) {
            case checkTrainingDays <= 2:
                return 1
            case checkTrainingDays > 2 && checkTrainingDays <= 5:
                return 2
            default: 
                return 3 
        }
    })();

    const checkRatingDescriptions = (() => {
        switch(checkRatings) {
            case 1: 
                return "You need to train more";
            case 2: 
                return "Not bad, but room for improvement";
            case 3: 
                return "Great job";
            default: 
                return "No description"
        }
    })();


    return {
        periodLength: checkPeriodLength,
        trainingDays: checkTrainingDays,
        success: checkSuccess,
        rating: checkRatings,
        ratingDescription: checkRatingDescriptions,
        target: checkTarget,
        average: checkAverage,
    }
}
// [3, 0, 2, 4.5, 0, 3, 1]
try {
    const exerciseArray = parseWeekArguments(process.argv)
    console.log(calculateExercises(exerciseArray))
} catch (error: unknown){
    let errormessage = "ERROR: ";
    if (error instanceof Error) {
        errormessage += error.message;
    }
    console.log(errormessage)
}
