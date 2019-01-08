/*
13.	Погода Anomaly 
Напишите функцию, которая должна находить в массиве объекты с  минимальным и максимальным
значением поля, которое передается как параметр.
Пример
> console.log(findAnomaly(array, “param”));
{
    min: {
        id: "id123".
        param: "-13"
    },
    max: {
        id: "id321",
        param: "45
    }
}
*/

function findAnomaly(inputArray, param) {

    let objectsWithProperty = inputArray.filter(element => {
        if (element.hasOwnProperty(param)) {
            return element;
        } else {
            return "property doesn't exist";
        }
    });

    let max = objectsWithProperty[0];
    let min = objectsWithProperty[0];

    objectsWithProperty.forEach(element => {
        //let paramValue = parseInt(element[param]);
        if (parseInt(element[param]) > parseInt(max[param])) {
            max = element;
        }
        if (parseInt(element[param]) < parseInt(min[param])) {
            min = element;
        }
    })
    return {
        'max': max, 
        'min': min
    };
}

array = [
    {
        id: "id111",
        temperature: "-13",
        pressure: 1005.58,
        windspeed:  2.93,
    },
    {
        id: "id123",
        temperature: "-18",
        pressure: 1006.9,
        windspeed:  2.81,
    },
    {
        id: "id123",
        temperature: "25",
        pressure: 1008.41,
        windspeed:  2.61,
    },
    {
        id: "id894",
        temperature: "0",
        pressure: 1008.41,
        windspeed:  2.61,
    },
    {
        id: "id321",
        temperature: "45"
    },
    {
        id: "id368",
        temperature: "68"
    },
    {
        id: "id388",
        temperature: "-15",
    }
    
]
console.log(findAnomaly(array, 'temperature'));