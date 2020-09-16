//PIE CHART DATA
var pieChartData = [15, 42, 52, 102, 56];

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
          window.chartColors.orange,
          window.chartColors.yellow,
          window.chartColors.green,
          window.chartColors.blue,
        ],
        label: "Dataset 1",
      },
    ],
    labels: ["Red", "Orange", "Yellow", "Green", "Blue"],
  },
  options: {
    responsive: true,
    title: {
      display: true,
      text: "Pie Chart",
    },
  },
};

//ONLOAD FUNCTION
window.onload = function () {
  //SET PIE CHART
  var ctx = document.getElementById("chart-area-pie").getContext("2d");
  window.myPie = new Chart(ctx, config);
};

// var queryURL = "https://api.covidtracking.com/v1/states/info.json";

var queryURL = "https://api.covidtracking.com/v1/states/current.json";

$(document).ready(function () {
  $.ajax({
    url: queryURL,
    type: "Get",
  }).then(function (response) {
    console.log(response);
  });
});
