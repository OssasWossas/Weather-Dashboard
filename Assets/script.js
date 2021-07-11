var today_date = moment().format("dddd, MMMM Do") ;

//------------------------------------------------------------------------Constatnts-----------------------------------------------------------------------------------------------------------------------

const The_Search_Button = document.getElementById('The_Search_Button');
const The_Search_Field = document.getElementById('The_Search_Field');
const Search_History = document.getElementById('Search_History');
var History_Button = "";
const API_KEY = "abf1e1cc656d2b8163004add681e213a";

const City_Name = document.getElementById('City_Name');
const Main_UL = document.getElementById('Main_Data');
const Weather_Icon = document.getElementById('Weather_Icon');

//------------------------------------------------------------------------Functions------------------------------------------------------------------------------------------------------------------------
$('#currentDay').text(today_date);

function generateIconUrl(iconCode){
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
}

function history(){
    console.log("HISTORY WORKS");
    for (var i = 0; i < localStorage.length; i++){
        console.log("HISTORY Create");
        
        button = document.createElement('button');
        button.setAttribute("type", "button"); 
        button.classList.add("btn", "btn-primary", "btn-lg", "History_Button");
        button.textContent = localStorage.getItem(localStorage.key(i));
        button.style.float = "left";

        
        Search_History.append(button);
        History_Button = document.getElementsByClassName('History_Button');

    }
};

function Main(){

    var MAIN_URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=" + The_Search_Field.value + "&appid=" + API_KEY ;

    fetch(MAIN_URL)
    .then(response => response.json())
    .then(data => {
        var name = data['name'];
        var temp = data['main']['temp'];
        var wind = data['wind']['speed'];
        var humidity = data['main']['humidity'];
        var icon = data['weather']['0']['icon'];
        var lat = data['coord']['lat'];
        var lon = data['coord']['lon'];;

        City_Name.textContent = name;
        Main_UL.children[0].textContent = "Temp: " + temp;
        Main_UL.children[1].textContent = "Wind: " + wind + " km/h";
        Main_UL.children[2].textContent = "Humidity: " + humidity;
        Weather_Icon.src = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
        

        var UV_Index = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=daily,alerts,hourly,minutely&appid=" + API_KEY;

        localStorage.setItem(name, name);

        fetch(UV_Index)
            .then(response => response.json())
            .then(data => {
                var uvi = data['current']['uvi'];
                Main_UL.children[3].textContent = "UV Index: " + uvi;
            });


    })

.catch(err => alert("Wrong City Name"))

}


//------------------------------------------------------------------------Events----------------------------------------------------------------------------------------------------------------------------
The_Search_Button.addEventListener('click',function(){
    console.log("Pee pee")
    Main();
    
});



history();