
var databaseUrl = "localhost:27017/football"; // "username:password@example.com/mydb"
var collections = ["fixture", "team"];
var mongojs = require("mongojs");
var db = mongojs.connect(databaseUrl, collections);

var getDistinctDivisionsInSeason = function (season, callback) {
	db.fixture.distinct('div_id', {ssn_num: season}, function(err, divisions) {
		if( err || !divisions)
			console.log("No divisions for this season");
		else {
			callback(divisions);
		}
	});
}

var getDistinctTeamsForDivisionInSeason = function (season, divId, callback) {
	db.fixture.distinct('home_team_id', {ssn_num: season, div_id: divId}, function(err, fixtures) {
		if( err || !fixtures)
			console.log("No teams for division in season");
		else {
			callback(fixtures);
		}
	});
}

var getTeam = function (teamId, callback) {
	db.team.findOne({_id:mongojs.ObjectId(teamId)}, function(err, teams) {
		if( err || !teams)
			console.log("No team with this ID");
		else {
			callback(teams);
		}		
	});
}


getDistinctDivisionsInSeason(2001, function(divisions) {
	divisions.forEach( function(division) {
		console.log("Division: " + division);


		getDistinctTeamsForDivisionInSeason(2001, division, function(teamIds) {
			teamIds.forEach( function(teamId) {
				console.log("Team ID: " + teamId);
			});
			
			db.close();
		});

		
	});
});

/*
getTeam('54301f4cbd51087ce0420561', function(teamName) {
	console.log(teamName);
	db.close();
});
*/




