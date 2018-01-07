// Get the IP information
$.getJSON('http://ip-api.com/json', function(data) {
        console.log("success IP: ", data);
        getWeather(data.lat, data.lon);
    }) // End of getting Ip information

// Weather information
function getWeather(latitude, longitude) {
    // variables declaration
    var appid = "&APPID=db7e39bc1dbf44fd0909996f88eee48d";
    var units = "&units=metric";
    var weather, city, iconCode, celsius, weatherDescription, codeCountry, fahrenheit;
    var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "" + appid + "" + units + "";

    // Get the weather API
    $.getJSON(url, function(data) {
            console.log("success Weather: ", data);
            showWeather(data);
        })
        .fail(function() {
            console.log("error");
        })
} // End of the weather function


// Show weather information
function showWeather(data) {

    // Hiding the loader
    showingWeather();

    // Variables declaration
    city = data.name, weatherDescription = data.weather[0].description, celsius = Math.trunc(data.main.temp);
    codeCountry = data.sys.country;
    wind = data.wind.speed;
    pressure = data.main.pressure;
    humidity = data.main.humidity;

    // Convert celsius to fahrenheit
    fahrenheit = Math.trunc(celsius * 9 / 5 + 32);


    // Get Background Pictures
    var thePicUrl = weatherPic[data.weather[0].icon].picUrl;
    $('body').css("background-image", "url(" + thePicUrl + ")");

    // Get Icon
    iconCode = data.weather[0].id;
    if (data.dt >= data.sys.sunrise && data.dt < data.sys.sunset) {
        $("#icon").attr('class', 'wi wi-owm-day-' + iconCode);
    } else {
        $("#icon").attr('class', 'wi wi-owm-night-' + iconCode);
    }

    // get Icon Wind
    var windDeg = data.wind.deg;
    $("#windDeg").attr('class', 'wi wi-wind towards-' + windDeg + '-deg');
    console.log(windDeg);

    // The results of the current weather
    $("#city").html("<h2><strong>" + city + ", " + codeCountry + "</strong></h2>");
    $("#weather").html("" + weatherDescription + "");
    $("#temperature").html(" " + celsius + " °C");
    $("#wind").html("" + wind + "");
    $("#pressure").html("" + pressure + " hPa");
    $("#humidity").html("" + humidity + "%");

    // Change between celsius and fahrenheit
    $('input[type=checkbox]').change(function() {
        if ($(this).prop("checked")) {
            $("#temperature").html(" " + fahrenheit + " °F");
            return;
        }
        $("#temperature").html(" " + celsius + " °C");
    });
} // End of showing information

// Get Current time
function updateTime() {
    var currentTime = new Date()
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();

    if (minutes < 10) {
        minutes = "0" + minutes
    }
    var timeStr = hours + ":" + minutes + ":" + seconds + " ";
    if (hours > 11) {
        timeStr += "PM";
    } else {
        timeStr += "AM";
    }
    document.getElementById('currTime').innerHTML = timeStr;
};
setInterval(updateTime, 1000);


// Get current Date
window.onload = function currDate() {
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    var date = new Date();
    var dayNumber = date.getDate();
    var month = months[date.getMonth()];
    var day = days[date.getDay()];

    var currentDate = day + ", " + month + " " + dayNumber;
    console.info("The Date: ", currentDate);

    document.getElementById('currDate').innerHTML = currentDate;
}

// Get pictures links
var weatherPic = {
    '01d': {
        'picUrl': 'https://c1.staticflickr.com/8/7497/15624352568_93cf2ed91d_k.jpg',
    },
    '01n': {
        'picUrl': 'https://c1.staticflickr.com/1/600/32572224391_c9404b56de_k.jpg',
    },
    '02d': {
        'picUrl': 'https://c2.staticflickr.com/6/5587/14136452831_c33319c220_b.jpg',
    },
    '02n': {
        'picUrl': 'https://c1.staticflickr.com/3/2861/9502213531_af470418f0_k.jpg',
    },
    '03d': {
        'picUrl': 'https://c1.staticflickr.com/9/8054/8093608394_d257b586e2_b.jpg',
    },
    '03n': {
        'picUrl': 'https://c2.staticflickr.com/8/7642/16735149627_f9386eb330_h.jpg',
    },
    '04d': {
        'picUrl': 'https://c2.staticflickr.com/8/7223/6930629204_a688acfa37_b.jpg',
    },
    '04n': {
        'picUrl': 'https://c2.staticflickr.com/8/7294/11407529026_3ce5cc8100_k.jpg',
    },
    '09d': {
        'picUrl': 'https://c1.staticflickr.com/3/2899/14760056514_930443297e_k.jpg',
    },
    '09n': {
        'picUrl': 'https://c2.staticflickr.com/6/5562/14317566863_893b75b768_b.jpg',
    },
    '10d': {
        'picUrl': 'https://c1.staticflickr.com/3/2855/13348276325_7d19cfeb65_b.jpg',
    },
    '10n': {
        'picUrl': 'https://c1.staticflickr.com/7/6235/6278156496_3ebebe08ce_b.jpg',
    },
    '11d': {
        'picUrl': 'https://c2.staticflickr.com/6/5066/5632698322_1422aba72c_b.jpg',
    },
    '11n': {
        'picUrl': 'https://c2.staticflickr.com/8/7010/6729261175_e0380fb5dd_o.jpg',
    },
    '13d': {
        'picUrl': 'https://c2.staticflickr.com/8/7182/6776815862_b0ebc2bb7e_b.jpg',
    },
    '13n': {
        'picUrl': 'https://c1.staticflickr.com/3/2684/32002910264_12dd9441db_o.jpg',
    },
    '50d': {
        'picUrl': 'https://c1.staticflickr.com/1/598/32909962932_0fd5ba2d17_o.jpg',
    },
    '50n': {
        'picUrl': 'https://c1.staticflickr.com/3/2041/33034742925_df46d2c367_k.jpg',
    }
};

//
function showingWeather() {
    $('.loader').hide('slow');
    $('.weather').show('slow');
}