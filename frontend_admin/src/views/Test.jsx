import { React, useState } from "react";
import ReactDOM from "react-dom";

function Test(totalPoints) {
    let tp = totalPoints;
    let totalSum = 0;
    const maxValue = Math.floor(tp * 0.70);
    const [health, setHealth] = useState(0);
    const [stamina, setStamina] = useState(0);
    const [speed, setSpeed] = useState(0);
    const properties = [health, stamina, speed];

    const changeValue = (type,value) => {
        switch (type) {
            case 1:
                setHealth(value)
                break;
            case 2:
                setStamina(value) ;
                break;
            case 3:
                setSpeed(value);
                break;
        }
    }

    const add = (value) => {
        totalSum += value;
        tp -= value;


    }

    const substract = (value) => {
        totalSum -= value;
        tp += value;

    }



    const isSum = (value) => {
        properties.forEach(p => {
            if (value > p)
                return true;
        });
        return false;
    }




    const handleChange = (type, value) => {

            

        if (isSum(value))
            add( value)

        else
            substract(value)

        changeValue(type,value);


    }


    return (
        <div>
            Character stats: <span id="points">0</span> points left.
            <div>
                <input
                    onChange={(e) => handleChange(1, e.target.value)}
                    type="range"
                    id="health"
                    min="0"
                    max={maxValue}
                    value={health}
                    readOnly={tp === 0}
                    step="1" />Health
            </div>
            <div>
                <input
                    onChange={(e) => handleChange(2, e.target.value)}
                    type="range"
                    id="stamina"
                    min="0"
                    max={maxValue}
                    value={stamina}
                    readOnly={tp === 0}
                    step="1" />Stamina
            </div>
            <div>
                <input
                    onChange={(e) => handleChange(3, e.target.value)}
                    type="range"
                    id="speed"
                    min="0"
                    max={maxValue}
                    value={speed}
                    readOnly={tp === 0}
                    step="1" />Speed

            </div>
        </div>
    );
}


export default Test;