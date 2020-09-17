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

// var queryURL = "https://api.covidtracking.com/v1/states/info.json";

function loadDoc() {
  var state = $("#states").val();
  var url = "https://api.covidtracking.com/v1/states/current.json" + state;
  console.log(state);
}

var statesInfo;
var queryURL = "https://api.covidtracking.com/v1/states/current.json";

$(document).ready(function () {
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    var results = response;
    // clear pieChartData
    // pieChartData = [];
    var states = "PA";
    for (var i = 0; i < results.length; i++) {
      if (states == results[i].state) {
        var positiveCases = results[i].positive;
        var negativeCases = results[i].negative;
        var deaths = results[i].death;
        var hospitalizedNow = results[i].hospitalizedCurrently;
        var recoveredNum = results[i].recovered;
        console.log(results);
        // alert(negativeCases);
        pieChartData.push(positiveCases);
        pieChartData.push(negativeCases);
        pieChartData.push(deaths);
        pieChartData.push(hospitalizedNow);
        pieChartData.push(recoveredNum);
        var ctx = document.getElementById("chart-area-pie").getContext("2d");
        window.myPie = new Chart(ctx, config);
        // window.myPie.update();
      }
    }
  });
});

//   $.ajax({
//     url: queryURL,
//     type: "Get",
//   }).then(function (response) {
//     console.log(response);
//   });
// });
