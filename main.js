import 'whatwg-fetch'

function getData(url) {
    return fetch(url)
        .then(response => response.ok ? response.json() : { "err": "Network response was not ok." })
        .catch(error => ({ "err": "There has been a problem with your fetch operation: " + error.message }))
}

function getDataAsync(urlSplit) {
    return Promise.all(
        urlSplit.map(url => getData(url))
    )
}

async function loadDataTask(urls, split = 2) {
    let urlList = [...urls];
    let results = [];

    while (urlList.length > 0) {
        let urlSplit = urlList.splice(0, split);
        console.log('start')
        let data = await getDataAsync(urlSplit);
        console.log('end')
        results = results.concat(data);
    }

    return results;
};


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

loadDataTask(urls, 2).then((arr) => {
    console.log(arr)
});