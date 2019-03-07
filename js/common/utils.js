function getDataFromApiThroughFetch(url, callback1, callback2) {
    fetch(url)  
        .then(function(response) {  
            if (response.status === 404) {  
                console.log('Looks like there was a problem. Status Code: ' +  
                  response.status); 
            }
            return response.json();  
        })
        .then(response => {
            callback1(response);
            if (callback2) callback2(response);
        })  
        .catch(function(error) {  
            console.log(error);
        });
}

function cityNotFound(query) {
    insertElementIntoDom(getElementById('main-content'), createCityNotFoundErrorMessage);
}

function setAttributesForImage(id, iconLink, altText) {
    const elem = document.getElementById(id);
    elem.setAttribute('src', iconLink);
    elem.setAttribute('alt', altText);
}

function insertElementIntoDom(destinationId, data) {
    document.getElementById(destinationId).innerHTML = data;
}

function getPrecipitationVolume(data) {
    if (data.rain) {
        return data.rain['1h'] || data.rain['3h'] || 0;
    } else if (data.snow) {
        return data.snow['1h'] || data.snow['3h'] || 0;
    }
    return 0;
}

function findMaxPrecipitationLevelBiggerThan5(graphsDataArray) {
    let maxPrec = 0;
    graphsDataArray.forEach(dayData => {
        if (dayData.precipitation > maxPrec) {
            maxPrec = dayData.precipitation;
        }
    });
    return (maxPrec > 5) ? maxPrec : undefined;
}

function getWindDirection(degree) {
    if (degree <= 23 || degree > 338) {
        return 'north';
    } else if (degree > 23 && degree <= 68) {
        return 'northeast';
    } else if (degree > 68 && degree <= 113) {
        return 'east';
    } else if (degree > 113 && degree <= 158) {
        return 'southeast';
    } else if (degree > 158 && degree <= 203) {
        return 'south';
    } else if (degree > 203 && degree <= 248) {
        return 'southwest';
    } else if (degree > 248 && degree <= 293) {
        return 'west';
    } else if (degree > 293 && degree <= 338) {
        return 'northwest';
    } else {
        return null;
    }
}

function findTemperatureChartStep(min, data) {
    const max = findMaxTemperature(data);
    return Math.floor(50 / (max - min));
}

function findMinTemperature(data) {
    return data.reduce((min, value) => {
        return Math.min(min, value.temp);
    }, data[0].temp);
};


function findMaxTemperature(data) {
    return data.reduce((max, value) => {
        return Math.max(max, value.temp);
    }, data[0].temp);
}

function definePartOfDay(timeInSec) {
    const hours = new Date(timeInSec * 1000).getHours();
    if (hours < 6) {
        return 'night';
    } if (hours < 12) {
        return 'morning';
    } if (hours < 18) {
        return 'day';
    } if (hours < 24) {
        return 'evening';
    }
}

function getPrecipitationLevel(prec) {
    if (prec < 1) {
        return 'low';
    } 
    if (prec < 2) {
        return 'middle';
    }
    return 'high';
}

function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

function createIconLink(iconId) {
    return `https://openweathermap.org/img/w/${iconId}.png`;
}

function addClassNameForFirstChild(parentId, newClass) {
    document.getElementById(parentId).firstChild.classList.add(newClass);
}

function showSpinner() {
    document.getElementById('entire-overlay').style.display = 'flex';
    document.getElementById('main-overlay').style.display = 'flex';
}

function hideSpinner() {
    // document.getElementById('overlay').style.display = 'none';    
    setTimeout(() => {
        document.getElementById('entire-overlay').style.display = 'none';    
        document.getElementById('main-overlay').style.display = 'none';    
    }, 1000);
}

function getElementsByQuery(cssQuery) {
    return document.querySelectorAll(cssQuery);
};

function addDomClassName(elementsArray, id, className) {
    elementsArray[id].classList.add(className);
};

function removeDomClassName(elementsArray, id, className) {
    elementsArray[id].classList.remove(className);
};