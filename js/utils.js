function getDataFromApi(url, callbacks) {
    const xhr = new XMLHttpRequest();
    console.log(callbacks);
    xhr.onload = function() {
        if (this.readyState === 4 && this.status === 200) {
            let response = JSON.parse(xhr.responseText);
            callbacks.forEach(callback => {
                callback(response);
            })
        }
    }
    xhr.open('GET', url, true);
    xhr.send();
}

function setAttributes(element, attributes) {
    for(var key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function insertElement(destinationId, data) {
    document.getElementById(destinationId).innerHTML = data;
}

function getPrecipitationVolume(data) {
    if (data.rain) {
        if (data.rain['1h']) {
            return data.rain['1h'];
        }
        if (data.rain['3h']) {
            return data.rain['3h'];
        }
    } else {
        if (data.snow) {
            if (data.snow['1h']) {
                return data.snow['1h'];
            }
            if (data.snow['3h']) {
                return data.snow['3h'];
            }
        } 
    }
    return 0;
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
    } 
}

function definePartOfDay(hours) {
    if (hours < 6) {
        return 'night';
    } else if (hours < 12) {
        return 'morning';
    } else if (hours < 18) {
        return 'day';
    } else if (hours < 24) {
        return 'evening';
    }
}

function getPrecipitationLevel(prec) {
    if (prec < 1) {
        return 'low';
    } else if (prec < 2) {
        return 'middle';
    } else {
        return 'high';
    }
}

function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}