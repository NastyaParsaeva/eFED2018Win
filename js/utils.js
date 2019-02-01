function getDataFromApi(url, callback1, callback2) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            const response = JSON.parse(xhr.responseText);
            if (callback1) {
                callback1(response);
            }
            if (callback2) {
                callback2(response);
            }
        }
    };
    xhr.open('GET', url, true);
    xhr.send();
}

function setAttributesForDomElement(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
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

function getWindDirection(degree) {
    if (degree <= 23 || degree > 338) {
        return 'north';
    } if (degree > 23 && degree <= 68) {
        return 'northeast';
    } if (degree > 68 && degree <= 113) {
        return 'east';
    } if (degree > 113 && degree <= 158) {
        return 'southeast';
    } if (degree > 158 && degree <= 203) {
        return 'south';
    } if (degree > 203 && degree <= 248) {
        return 'southwest';
    } if (degree > 248 && degree <= 293) {
        return 'west';
    } if (degree > 293 && degree <= 338) {
        return 'northwest';
    }
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
    return `http://openweathermap.org/img/w/${iconId}.png`;
}