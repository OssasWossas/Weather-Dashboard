var today_date = moment().format("dddd, MMMM Do") ;

//------------------------------------------------------------------------Constatnts-----------------------------------------------------------------------------------------------------------------------

const The_Search_Button = document.getElementById('The_Search_Button');
const The_Search_Field = document.getElementById('The_Search_Field');
const Search_History = document.getElementById('Search_History');

const CARDS = document.getElementById('CARDS');
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
        button.id = localStorage.getItem(localStorage.key(i));

        
        Search_History.append(button);
        History_Button = document.getElementsByClassName('History_Button');



    }
    
};

function forecast(){

    var day_foresast = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=" + The_Search_Field.value + "&exclude=hourly,minutely&appid=" + API_KEY ;

    fetch(day_foresast)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        var array_length = data['list'].length;
        for(var i = 3; i < array_length; i += 8){
            
            var Temp = data['list'][i]['main']['temp'];
            var Wind = data['list'][i]['wind']['speed'];
            var humidity = data['list'][i]['main']['humidity'];
            var icon = data['list'][i]['weather']['0']['icon'];
            var date = data['list'][i]['dt_txt'];
            var card_date = date.split(" ");
            console.log(Temp, Wind, humidity, icon);

            var div = document.createElement('div');
            div.classList.add("card");
            div.style.width = "18rem";

            CARDS.append(div);
            
            h2_date = document.createElement('h2');
            h2_date.classList.add("card-text");
            h2_date.textContent = card_date[0];

            div.append(h2_date);

            img = document.createElement('img');
            
            img.src = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            
            img.classList.add("card-img-top")
            

            div.append(img);
            
            card_body = document.createElement('div');
            card_body.classList.add("card-body");
            div.append(card_body);

            h2_temp = document.createElement('h2');
            h2_temp.classList.add("card-text");
            h2_temp.textContent = "Temp: " + Temp;

            h2_wind = document.createElement('h2');
            h2_wind.classList.add("card-text");
            h2_wind.textContent = "Wind: " + Wind + " km/h";

            h2_Humidity = document.createElement('h2');
            h2_Humidity.classList.add("card-text");
            h2_Humidity.textContent = "Humidity: " + humidity + "%"

            card_body.append(h2_temp, h2_wind, h2_Humidity);


        };

    })

.catch(err => alert("Wrong City Name"))
}

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
        Main_UL.children[2].textContent = "Humidity: " + humidity + "%";
        Weather_Icon.src = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
        

        var UV_Index = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=daily,alerts,hourly,minutely&appid=" + API_KEY;

        localStorage.setItem(name, name);

        forecast();

        fetch(UV_Index)
            .then(response => response.json())
            .then(data => {
                 uvi = data['current']['uvi'];
                Main_UL.children[3].textContent = "UV Index: " + uvi;
                var UV_Index = document.getElementsByClassName('active');

                if( uvi == 0){
                    document.getElementsByClassName('active')[0].style.backgroundColor = "green";

                }
                else if( uvi < 3 ){
                    document.getElementsByClassName('active')[0].style.backgroundColor = "orange";
                }
                else{
                    document.getElementsByClassName('active')[0].style.backgroundColor = "red";
                }
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

