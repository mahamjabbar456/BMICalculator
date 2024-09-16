'use client';
import { useState,ChangeEvent } from "react";
import { Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent
 } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

// Define a TypeScript interface for the BMI result
interface BMIResult {
    bmi:string;
    category: string;
}

// Default export of the BmiCalculator function
const BmiCalculator = () => {
    // State hooks for managing height, weight, BMI result, and error message
    const [height,setHeight] = useState<string>("");
    const [weight,setWeight] = useState<string>("");
    const [result,setResult] = useState<BMIResult | null>(null);
    const [error,setError] = useState<string>("");

      // Handler for updating height state on input change
    const handleHeightChange = (e : ChangeEvent<HTMLInputElement>) : void => {
        setHeight(e.target.value);
    }
     // Handler for updating weight state on input change
    const handleWeightChange = (e : ChangeEvent<HTMLInputElement>) : void => {
        setWeight(e.target.value);
    }

     // Function to calculate the BMI and determine the category
    const calculateBMI = ():void =>{
        if(!height || !weight){
           setError("Please enter both height and weight."); // Alert if either input is empty
           return;
        }

        const heightInMeters = parseFloat(height) /100;
        if(heightInMeters <=0){
            setError("Height must be a positive number."); // Alert if height is not positive
        }

        const weightInKg = parseFloat(weight);
        if(weightInKg <= 0){
            setError("Weight must be a positive number."); // Alert if weight is not positive
        }

        const bmiValue = weightInKg / (heightInMeters * heightInMeters);
        let category = "";

        if(bmiValue < 18.5){
            category = "Underweight"; // Set category based on BMI value
        }else if(bmiValue >= 18.5 && bmiValue <25){
            category = "Normal";
        }else if(bmiValue >=25 && bmiValue < 30){
            category = "Over Weight";
        }else{
            category = "Obese";
        }

        setResult({bmi: bmiValue.toFixed(1),category}); // Set the BMI result state
        setError(""); // Clear any previous error message
    }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
        {/* Center the BMI calculator card within the screen */}
      <Card className="w-full max-w-md bg-white">
         <CardHeader>
            {/* Header with title and description */}
            <CardTitle className="text-[18px]">BMI Calculator</CardTitle>
            <CardDescription>
            Enter your height and weight to calculate your BMI.
            </CardDescription>
         </CardHeader>
         <CardContent className="space-y-4">
          {/* Input for height */}
         <div className="grid gap-2">
            <Label className="font-bold" htmlFor="height">Height (cm)</Label>
            <Input
            id="height"
            type="number"
            placeholder="Enter your height"
            className="rounded-2xl"
            value={height}
            onChange={handleHeightChange}
            />
         </div>
          {/* Input for weight */}
          <div className="grid gap-2">
            <Label htmlFor="weight" className="font-bold">Weight (cm)</Label>
            <Input 
            id="weight"
            type="number"
            placeholder="Enter your weight"
            className="rounded-2xl"
            value={weight}
            onChange={handleWeightChange}
            />
          </div>
            {/* Button to calculate BMI */}
            <Button onClick={calculateBMI} className="rounded-2xl font-bold">Calculate</Button>
            {/* Display error message if any */}
            {error && <div className="text-center text-red-500">{error}</div>}
            {/* Display BMI result if available */}
            {result && (
                <div className="grid gap-2 text-center">
                    <div className="font-bold text-2xl">{result.bmi}</div>
                    <div>{result.category}</div>
                </div>
            )}
         </CardContent>
      </Card>
    </div>
  )
}

export default BmiCalculator
