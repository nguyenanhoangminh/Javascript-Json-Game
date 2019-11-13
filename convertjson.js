
// GLOBAL CONSTANTS
const IS_FINISHED = 4;
const IS_OK = 200;

// GLOBAL VAR
var year;
var month;
var day;
var games;
var Index;

// initializes each time run page
function initial() {
    year = 0;
    month = 0;
    day = 0;
    Index = 0;
    games = [];
}
// helper function serves as a "wrapper" around document.getElementById
// the only benefit to using this function is to reduce typing elsewhere 
function $gel(id)
{
    return document.getElementById(id);
}
function retrieveMLBData(year, month, day) {
    
    year = Number.parseInt($gel("year").value);// get value of year
    month = Number.parseInt($gel("month").value);//get value of month
    day = Number.parseInt($gel("day").value);//get value of day
    var url = getURL(year, month, day);// build url for reading json
    getJSONAsync(url, function(jsObject) {
        
        if (jsObject.data.games.game) 
        {
           
            if (jsObject.data.games.game.length) {
                for (var i = 0; i < jsObject.data.games.game.length; i++) {
                    games.push(jsObject.data.games.game[i]);
                }
            } else {
                games.push(jsObject.data.games.game);
            }
        } 
        else
        { alert("there is no match on this day!!! Please Choose Another Date ");}// no data found printf aleart 
    });
}



function getData(index) {
    // get name of home team
    $gel("homeTeamName").value = games[index].home_team_name;
    //get name of away team
    $gel("awayTeamName").value = games[index].away_team_name;
    //get winning pitcher = first +last
    var winningPitcher = "";
    winningPitcher += games[index].winning_pitcher.first + " ";
    winningPitcher += games[index].winning_pitcher.last;
    $gel("winningPitcher").value = winningPitcher;
    //get loosing pitcher = first +last
    var losingPitcher = "";
    losingPitcher += games[index].losing_pitcher.first + " ";
    losingPitcher += games[index].losing_pitcher.last;
    $gel("losingPitcher").value = losingPitcher;
    //get venue
    $gel("venue").value = games[index].venue;
}
// envent handler get previous game
function previous() {
    if (Index > 0) {
        Index--;
    }
    getData(Index);
}

// envent handler get next game
function next() {
    if (Index < games.length - 1) {
        Index++;
    }
    getData(Index);
}



function getJSONAsync(url, callback) 		// callback function callback (alias for myCallBack)
{
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() //responese
    {
        if ((request.readyState == IS_FINISHED) && (request.status == IS_OK)) {
            var jsObject = JSON.parse(request.responseText);
            callback(jsObject);
        }
    };
    request.open("GET", url);
    request.send();
}
// build up the url with year month and day
function getURL(year, month, day) {
    var url = "http://gd2.mlb.com/components/game/mlb/";
    url += "year_";
    url += year;
    url += "/month_";
    if (month < 10) {
        url += "0";
    }
    url += month;
    url += "/day_";
    if (day < 10) {
        url += "0";
    }
    url += day;
    url += "/master_scoreboard.json";
    // console.log(url)
    return url;
}