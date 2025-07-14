interface bmiValues {
    height: number; 
    weight: number; 
}

const parseArguments = (args: string[]): bmiValues => {
    if (args.length < 4) throw new Error('Insufficient arguments');
    if (args.length > 4) throw new Error('Excess arguments'); 
    
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))){
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        }
    }
    else {
        throw new Error("Provided values are not of type Number")
    }
}

export const calculateBmi = (weight: number, height: number): string => {
    const heightInMetres = height / 100
    const bmi = weight / (heightInMetres * heightInMetres)

    switch (true) {
        case bmi < 16.0:
          return `BMI: ${bmi} - Underweight (Severe thinness)`;
        case bmi >= 16.0 && bmi < 17.0:
          return `BMI: ${bmi} - Underweight (Moderate thinness)`;
        case bmi >= 17.0 && bmi < 18.5:
          return `BMI: ${bmi} - Underweight (Mild thinness)`;
        case bmi >= 18.5 && bmi < 25.0:
          return `BMI: ${bmi} - Normal range`;
        case bmi >= 25.0 && bmi < 30.0:
          return `BMI: ${bmi} - Overweight (Pre-obese)`;
        case bmi >= 30.0 && bmi < 35.0:
          return `BMI: ${bmi} - Obese (Class I)`;
        case bmi >= 35.0 && bmi < 40.0:
          return `BMI: ${bmi} - Obese (Class II)`;
        default:
          return `BMI: ${bmi} - Obese (Class III)`;
      }      

};

if (require.main === module){
    try {
        const { weight, height } = parseArguments(process.argv);
        console.log(calculateBmi(weight, height));
    }
    catch (error: unknown) {
        let errormessage = "ERROR: ";
        if (error instanceof Error){
            errormessage += error.message;
        }
        console.log(errormessage);
        process.exit(1);
    }
}