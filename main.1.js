import 'whatwg-fetch'

function getData(url) {
    return fetch(url).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            return {
                "err": "Network response was not ok."
            }
        }
    }).catch((error) => {
        return {
            "err": "There has been a problem with your fetch operation: " + error.message
        }
    }).then((result) => {
        return result;
    })
}

let urls = [
    "http://api.geonames.org/citiesJSON?north=44.1&south=-9.9&east=-22.4&west=55.2&lang=de&username=demo",
    "http://api.geonames.org/citiesJSON?north=44.1&south=-9.9&east=-22.4&west=55.2&lang=de&username=demo",
    "http://api.geonames.org/citiesJSON?north=44.1&south=-9.9&east=-22.4&west=55.2&lang=de&username=demo",
    "http://api.geonames.org/citiesJSON?north=44.1&south=-9.9&east=-22.4&west=55.2&lang=de&username=demo",
    "http://api.geonames.org/citiesJSON?north=44.1&south=-9.9&east=-22.4&west=55.2&lang=de&username=demo",
    "http://api.geonames.org/citiesJSON?north=44.1&south=-9.9&east=-22.4&west=55.2&lang=de&username=demo",
    "http://api.geonames.org/citiesJSON?north=44.1&south=-9.9&east=-22.4&west=55.2&lang=de&username=demo",
    "http://api.geonames.org/citiesJSON?north=44.1&south=-9.9&east=-22.4&west=55.2&lang=de&username=demo",
    "http://api.geonames.org/citiesJSON?north=44.1&south=-9.9&east=-22.4&west=55.2&lang=de&username=demo",
    "http://api.geonames.org/citiesJSON?north=44.1&south=-9.9&east=-22.4&west=55.2&lang=de&username=demo",
]

async function setPromiseArr(urls) {
    let promiseArr = urls.map((url) => {
        return getData(url)
    })
    return await Promise.all([...promiseArr])
}

function sendRequests(urls, split = 2, result = []) {
    let urlsList = [];

    if (urls.length > 0) {
        urlsList = urls.splice(0, split)
        console.log('send %s urls start', split);
        setPromiseArr(urlsList).then((data) => {
            result = result.concat(data)
            console.log('get %s urls result= %s', split, result);
            sendRequests(urls, split, result);
        })
    } else {
        console.log(result);
        return result;
    }
}

let result = sendRequests(urls);
console.log(result);