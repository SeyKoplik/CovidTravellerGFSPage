$(document).ready(function () { //===BEGINNING OF ALL PAGE

    var getState = JSON.parse(localStorage.getItem('getState')) || [];

    function renderState() {
        $("#newStateList").empty();
        for (var i = 0; i < getState.length; i++) {
            var a = $("<button>");
            a.addClass("state-link");
            a.attr("data-name", getState[i]);
            a.text(getState[i]);
            $("#newStateList").append(a);
        };
    };
    // USING THE FUNCTION TO SHOW STATE ON SIDEBAR
    renderState();

    // FUNCTION THAT ATTACHES ACTIONS TO CLICKING THE SEARCH ICON
    $("#searchIcon").on("click", function () {
        event.preventDefault();
        // DISPLAYING DIVS WITH STATE CONTENT
        $(".showAllStateFacts").show();
        // CALLING INPUT VALUE TO BE USED
        var newStateInput = $("#searchInput").val().trim();
        // PUSHING VALUE TO LOCALSTORAGE BOX
        getState.push(newStateInput);
        // SAVE INPUT OF STATE INTO LOCALSTORAGE HERE
        localStorage.setItem('getState', JSON.stringify(getState));
        // DISPLAYS STATE ON SIDEBAR WHEN SEARCH IS CLICKED
        renderState();
        $("#stateName").empty();
        $("#stateName").append(newStateInput);
        convertState(newStateInput);
        // ENTER FUNCTIONS FOR AJAX CALL AND POSTING ON PAGE
        ajaxCallStateData(newStateInput);
        displayStatePic(newStateInput);
        ajaxCallForCovid(convertState(newStateInput));
    });

    // FUNCTION THAT ATTACHES ACTIONS TO THE SIDEBAR LINKS
    $(document).on("click", ".state-link", function () {
        // DISPLAYING DIVS WITH STATE CONTENT
        $(".showAllStateFacts").show();
        // MAKING NEW VARIABLE TO CALL WHATEVER WAS ADDED ON INPUT
        var savedState = $(this).attr("data-name");
        console.log(savedState);
        pieChartData = [];
        window.myPie.destroy();
        ajaxCallStateData(savedState);
        displayStatePic(savedState);
        ajaxCallForCovid(convertState(savedState));
    });

    // NEED TO USE 2 LETTER STATE CODE FOR A COUPLE AJAX
    // THIS FUNCTION WILL HELP CONVERT STATE INPUT INTO STATE CODE
    function convertState(newStateInput) {
        for (var i = 0; i < stateNames.length; i++) {
            if (newStateInput.toLowerCase() === stateNames[i].toLowerCase()) {
                return stateID[i];
            }
        }
    }
    // FUNCTION TO DISPLAY SNIPPET AND THUMBNAIL
    function ajaxCallStateData(newStateInput) {
        var triposoAccount = "BD0IOKOY";
        var triposo = "mvo5l46vms96lmtmgvhmj9gztbc138fi";

        var queryURL = "https://www.triposo.com/api/20200803/location.json?us_statecode=" + convertState(newStateInput) + "&account=" + triposoAccount + "&token=" + triposo;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (stateData) {
            var stateSnip = stateData.results[1].snippet;
            $("#stateName").empty();
            $("#stateName").append(newStateInput);
            $(".snippetGoesHere").empty();
            $(".snippetGoesHere").append(stateSnip);
            var stateImage = stateData.results[1].images[1].source_url;
            $(".tinyImageGoesHere").attr("src", stateImage);
            $(".tinyImageGoesHere").attr("width", "150px");
        })
    }
    // FUNCTION TO DISPLAY PICTURES OF STATE
    function displayStatePic(newStateInput) {
        var apiKey = "xFUVUkBbo_C02js7Z6F1qftvkYa-c2GTQfHNQ_B7mJk"
        var queryUrl = "https://api.unsplash.com/search/photos?query=" + newStateInput + "&client_id=" + apiKey
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (response) {
            $(".bigImage1").attr('src', response.results[0].urls.thumb);
            $(".bigImage2").attr('src', response.results[1].urls.thumb);
            $(".bigImage3").attr('src', response.results[2].urls.thumb);
            $(".bigImage4").attr('src', response.results[3].urls.thumb);
        })
    }
    // FUNCTION TO DISPLAY COVID CHART
    function ajaxCallForCovid(stateIDForAPI) {
        var queryURL = "https://api.covidtracking.com/v1/states/current.json";
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

                    var pieChartData = [];

                    pieChartData.push(positiveCases);
                    pieChartData.push(negativeCases);
                    pieChartData.push(deaths);
                    pieChartData.push(hospitalizedNow);
                    pieChartData.push(recoveredNum);

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

                    var ctx = document.getElementById("chart-area-pie").getContext("2d");
                    console.log(window.myPie);
                    window.myPie;
                    window.myPie = new Chart(ctx, config);
                    window.myPie.update();

                }
            }
        });
    }

}); //=== END OF ALL PAGE