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

function getDataAsync(urlSplit) {
    var promiseArr = urlSplit.map((url) => {
        return getData(url);
    });

    return Promise.all(promiseArr);
}

function genLoadDataTask(urls, split = 2) {
    var urlList = [...urls];

    return function* () {
        var results = [];

        while (urlList.length > 0) {
            let urlSplit = urlList.splice(0, split);

            let data = yield getDataAsync(urlSplit);

            results = results.concat(data);
        }

        return results;
    };
}


function taskRunner(task) {
    return new Promise((resolve, reject) => {
        var g = task();

        function next(data) {
            var result = g.next(data);
            if (result.done) return resolve(result.value);
            result.value.then(function (data) {
                next(data);
            });
        }

        next();
    });
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

const loadDataTask = genLoadDataTask(urls);
taskRunner(loadDataTask).then((value) => {
    console.log(value)
})


