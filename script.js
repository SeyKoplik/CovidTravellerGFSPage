$("#covidButton").on("click", function() {  
    $('.ui.modal').modal('show');
    //insert what goes inside the modal here
});

var getCity = JSON.parse(localStorage.getItem('getCity')) || [];

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
    $(".showAllStateFacts").show();
    event.preventDefault();
    // information typed on search bar input here for city to display
    var newCityInput = $("#searchInput").val().trim();
    //insert function for city picture display
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
});

var googleAPIKey = "AIzaSyBmtloOP1ulwJc773TYUNTOXo1n-QncgFo";
var triposoAccount = "BD0IOKOY";
var triposo = "mvo5l46vms96lmtmgvhmj9gztbc138fi";

var stateIDforAPI = "";

function convertState(newCityInput) {
    for (var i = 0; i < stateNames.length; i++) {
        if (newCityInput.toLowerCase() === stateNames[i].toLowerCase()) {
            stateNames[i] = stateID[i];
            stateIDforAPI = stateID[i]; 
        }
    }
}


