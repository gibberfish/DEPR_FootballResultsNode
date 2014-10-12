
var request = require('request');
var cheerio = require('cheerio');

var parseFixturesFromDatePage = function (date, callback) {
	// Date in the format YYYY-MM-DD
	var fixtures = [];

	request('http://www.soccerbase.com/matches/results.sd?date=' + date, function (error, response, html) {
	  if (!error && response.statusCode == 200) {
	  
		var $ = cheerio.load(html);
			
		var divId = '';
		var divName = '';
		var fixDate = '';
		var homeTeamId = '';
		var homeTeamName = '';
		var awayTeamId = '';
		var awayTeamName = '';
		var homeGoals = '';
		var awayGoals = '';
		var team = '';
		
		$('tbody tr').each (function (i, element) {
			var tr = $(this);
			var as = tr.find('a');
			
			for (i=0; i < as.length; i++) {
				var a = $(as[i]);
				
				var href = a.attr('href');
				
				var index = href.indexOf('comp_id');
			
				if (index > -1) {
					index = index + 8;
					divName = a.text();
					divId = href.substring (index);
				}

				index = href.indexOf('results.sd');
				
				if (index > -1) {
					index = index + 16;
					fixDate = href.substring (index);
					team = 'H';
				}
				
				index = href.indexOf('team.sd');
				
				if (index > -1) {
					index = index + 16;
					var id = href.substring (index);
					var name = a.text();
					if (team == 'H') {
						homeTeamId = id;
						homeTeamName = name;
						team = 'A';
					} else {
						awayTeamId = id;
						awayTeamName = name;
						team = 'H';
						
						// We now have the complete fixture
						
						var fixture = new Object();
						fixture.date = fixDate;
						fixture.divId = divId;
						fixture.divName = divName;
						fixture.homeTeamId = homeTeamId;
						fixture.homeTeamName = homeTeamName;
						fixture.awayTeamId = awayTeamId;
						fixture.awayTeamName = awayTeamName;
						fixture.homeGoals = homeGoals;
						fixture.awayGoals = awayGoals;
						
						fixtures.push(fixture);
					}
				}
				
				if (href == '#' && a.parent().hasClass('score')) {
					homeGoals = '';
					awayGoals = '';
					a.children('em').each (function (i, element) {
						if (homeGoals == '') {
							homeGoals = $(this).text();
						} else {
							awayGoals = $(this).text();
						}
					});
				}			
			}
		});	
	  }
	  callback(fixtures);
	});
}

/*
// TEST RUN
parseFixturesFromDatePage('2015-01-01', function(fixtures) {
	for (i=0; i<fixtures.length; i++) {
						console.log("FIXTURE: DIV[" + fixtures[i].divId + ":" + fixtures[i].divName +
							"] DATE[" + fixtures[i].date +
							"] HM[" + fixtures[i].homeTeamId + ":" + fixtures[i].homeTeamName +
							"] AW[" + fixtures[i].awayTeamId + ":" + fixtures[i].awayTeamName +
							"] SCO[" + fixtures[i].homeGoals + "-" + fixtures[i].awayGoals + "]");
	}
});
*/

module.exports.parseFixturesFromDatePage = parseFixturesFromDatePage;
