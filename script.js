$(document).ready(function() { //===BEGINNING OF ALL PAGE

var getCity = JSON.parse(localStorage.getItem('getCity')) || [];

//VARIABLE FOR STATE TO BE CONVERTED
var stateIDforAPI = "";

function renderCity() {
    $("#newCityList").empty();
    for (var i = 0; i < getCity.length; i++) {
        var a = $("<a>");
        a.addClass("city-link");
        a.attr("data-name", getCity[i]);
        a.text(getCity[i]);
        $("#newCityList").append(a);
    };
};
//run the function to add new city on the sideline
renderCity();

$("#searchIcon").on("click", function() {
    event.preventDefault();
    $(".showAllStateFacts").show();
    // information typed on search bar input here for city to display
    var newCityInput = $("#searchInput").val().trim();
    //insert function for city picture display
      //=============================

      //=============================
    // use that input info for getCity variable
    getCity.push(newCityInput);
    //save any new city typed in to search bar
    localStorage.setItem('getCity', JSON.stringify(getCity));
    //display the cities in the sidebar
    renderCity();
    $("#stateName").append(newCityInput)
    convertState(newCityInput);
    //write function for ajax here
    ajaxCallStateData();
    displayStatePic();
});

//click function for covidbutton
$("#covidButton").on("click", function() {  
    $('.ui.modal').modal('show');
    //insert what goes inside the modal here
});

function convertState(newCityInput) {
    for (var i = 0; i < stateNames.length; i++) {
        if (newCityInput.toLowerCase() === stateNames[i].toLowerCase()) {
            stateNames[i] = stateID[i];
            stateIDforAPI = stateID[i]; 
        }
    }
}

function ajaxCallStateData(newCityInput) {
    var triposoAccount = "BD0IOKOY";
    var triposo = "mvo5l46vms96lmtmgvhmj9gztbc138fi";
    
    var queryURL = "https://www.triposo.com/api/20200803/location.json?us_statecode="+ stateIDforAPI + "&account=" + triposoAccount + "&token=" + triposo;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (stateData) {
        var stateSnip = stateData.results[1].snippet;
        $(".snippetGoesHere").append(stateSnip);
        var stateImage = stateData.results[1].images[1].source_url;
        $(".tinyImageGoesHere").attr("src", stateImage);
        $(".tinyImageGoesHere").attr("width", "150px");
    }) //== END OF $.ajax function
} //=== ENF OF ajaxCallStateData

function displayStatePic(){
    var apiKey = "xFUVUkBbo_C02js7Z6F1qftvkYa-c2GTQfHNQ_B7mJk"
    var queryUrl = "https://api.unsplash.com/search/photos?query="+ stateIDforAPI +"&client_id=" + apiKey
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {
        $(".bigImage1").attr('src',response.results[0].urls.thumb);
        $(".bigImage2").attr('src',response.results[1].urls.thumb);
        $(".bigImage3").attr('src',response.results[2].urls.thumb);
        $(".bigImage4").attr('src',response.results[3].urls.thumb);
    })
    }

$(document).on("click", ".city-link", function() {
    var savedCity = $(this).attr("data-name");
    ajaxCallStateData(savedCity);
    displayStatePic(savedCity);
})


}) //=== END OF ALL PAGE

