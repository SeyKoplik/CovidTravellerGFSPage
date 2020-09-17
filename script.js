$(document).ready(function () { //===BEGINNING OF ALL PAGE

    var getState = JSON.parse(localStorage.getItem('getState')) || [];

    function renderCity() {
        $("#newStateList").empty();
        for (var i = 0; i < getState.length; i++) {
            var a = $("<button>");
            a.addClass("state-link");
            a.attr("data-name", getState[i]);
            a.text(getState[i]);
            $("#newStateList").append(a);
        };
    };
    //run the function to add new state on the sideline
    renderCity();

    $("#searchIcon").on("click", function () {
        event.preventDefault();
        $(".showAllStateFacts").show();
        // information typed on search bar input here for state to display
        var newCityInput = $("#searchInput").val().trim();
        getState.push(newCityInput);
        //save any new state typed in to search bar
        localStorage.setItem('getState', JSON.stringify(getState));
        //display the cities in the sidebar
        renderCity();
        $("#stateName").empty();
        $("#stateName").append(newCityInput);
        convertState(newCityInput);
        //write function for ajax here
        ajaxCallStateData(newCityInput);
        displayStatePic(newCityInput);
        ajaxCallForCovid(convertState(newCityInput));
    });

    function convertState(newCityInput) {
        for (var i = 0; i < stateNames.length; i++) {
            if (newCityInput.toLowerCase() === stateNames[i].toLowerCase()) {
                return stateID[i];
            }
        }
    }

    function ajaxCallStateData(newCityInput) {
        var triposoAccount = "BD0IOKOY";
        var triposo = "mvo5l46vms96lmtmgvhmj9gztbc138fi";

        var queryURL = "https://www.triposo.com/api/20200803/location.json?us_statecode=" + convertState(newCityInput) + "&account=" + triposoAccount + "&token=" + triposo;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (stateData) {
            console.log("ajaxCallStateData");
            var stateSnip = stateData.results[1].snippet;
            $("#stateName").empty();
            $("#stateName").append(newCityInput);
            $(".snippetGoesHere").empty();
            $(".snippetGoesHere").append(stateSnip);
            var stateImage = stateData.results[1].images[1].source_url;
            $(".tinyImageGoesHere").attr("src", stateImage);
            $(".tinyImageGoesHere").attr("width", "150px");
        }) //== END OF $.ajax function
    } //=== ENF OF ajaxCallStateData

    function displayStatePic(newCityInput) {
        var apiKey = "xFUVUkBbo_C02js7Z6F1qftvkYa-c2GTQfHNQ_B7mJk"
        var queryUrl = "https://api.unsplash.com/search/photos?query=" + newCityInput + "&client_id=" + apiKey
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (response) {
            console.log("displayStatePic")
            $(".bigImage1").attr('src', response.results[0].urls.thumb);
            $(".bigImage2").attr('src', response.results[1].urls.thumb);
            $(".bigImage3").attr('src', response.results[2].urls.thumb);
            $(".bigImage4").attr('src', response.results[3].urls.thumb);
        })
    }

    $(document).on("click", ".state-link", function () {
        var savedCity = $(this).attr("data-name");
        ajaxCallStateData(savedCity);
        displayStatePic(savedCity);
        ajaxCallForCovid(convertState(savedCity));
    })

    var queryURL = "https://api.covidtracking.com/v1/states/current.json";

    function ajaxCallForCovid(stateIDForAPI) {
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
            var results = response;
            var states = stateIDForAPI;
            for (var i = 0; i < results.length; i++) {
                if (states == results[i].state) {
                    var positiveCases = results[i].positive;
                    var negativeCases = results[i].negative;
                    var deaths = results[i].death;
                    var hospitalizedNow = results[i].hospitalizedCurrently;
                    var recoveredNum = results[i].recovered;

                    pieChartData.push(positiveCases);
                    pieChartData.push(negativeCases);
                    pieChartData.push(deaths);
                    pieChartData.push(hospitalizedNow);
                    pieChartData.push(recoveredNum);
                    var ctx = document.getElementById("chart-area-pie").getContext("2d");
                    window.myPie = new Chart(ctx, config);

                }
            }
        });
    }

    //PIE CHART DATA
    var pieChartData = [];

    /*************************CHART CONFIGURATION*******************/
    //PIE CHART CONFIG
    var config = {
        type: "pie",
        data: {
            datasets: [
                {
                    data: pieChartData,
                    backgroundColor: [
                        window.chartColors.red,
                        window.chartColors.green,
                        window.chartColors.black,
                        window.chartColors.orange,
                        window.chartColors.purple,
                    ],
                    label: "Dataset 1",
                },
            ],
            labels: [
                "Positive Cases",
                "Negative Cases",
                "Deaths",
                "Hospitalized Currently",
                "Recovered",
            ],
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: "Covid-19 Chart",
            },
        },
    };

}); //=== END OF ALL PAGE