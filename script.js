// var queryURL = "https://api.covidtracking.com/v1/states/info.json";

var covid19 = $(this).attr("data-name");
var queryURL = "https://api.covidtracking.com/v1/states/current.json";

$(document).ready(function () {
  $.ajax({
    url: queryURL,
    type: "Get",
    success: function (response) {
      console.log(response);
    },
  });
});
