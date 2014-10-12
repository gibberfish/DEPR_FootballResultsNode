
var request = require('request');
var cheerio = require('cheerio');

request('http://www.soccerbase.com/matches/results.sd?date=2014-01-01', function (error, response, html) {
  if (!error && response.statusCode == 200) {
  
	//console.log(html);
  
    var $ = cheerio.load(html);
	
	/*
	// Loop through each division on the page
	$('a').each(function(i, element){
		var a = $(this);
		var href = a.attr('href');
		
		var index = href.indexOf('comp_id');
		
		if (index > -1) {
			var name = a.text();
			index = index + 8;
			var id = href.substring (index);
			console.log(id + " : " + name);
		}
	});
	*/
	
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
				//console.log("DIVISION: " + divId + " : " + divName);
			}

			index = href.indexOf('results.sd');
			
			if (index > -1) {
				index = index + 16;
				fixDate = href.substring (index);
				team = 'H';
				//console.log("FIXTURE DATE: " + fixDate);
			}
			
			index = href.indexOf('team.sd');
			
			if (index > -1) {
				index = index + 16;
				var id = href.substring (index);
				var name = a.text();
				if (team == 'H') {
					homeTeamId = id;
					homeTeamName = name;
					//console.log("HOME TEAM : " + id + " : " + name);
					team = 'A';
				} else {
					awayTeamId = id;
					awayTeamName = name;
					//console.log("AWAY TEAM : " + id + " : " + name);
					team = 'H';
					
					// We now have the complete fixture
					console.log("FIXTURE: DIV[" + divId + ":" + divName +
						"] DATE[" + fixDate +
						"] HM[" + homeTeamId + ":" + homeTeamName +
						"] AW[" + awayTeamId + ":" + awayTeamName +
						"] SCO[" + homeGoals + "-" + awayGoals + "]");
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
				
				//console.log("SCORE: " + homeGoals + " - " + awayGoals);
			}			
		}
	});
	
	
	
	
	/*
    $('td.homeTeam a').each(function(i, element){
	  var href = $(this).attr('href');
	
      //var a = $(this);
      //console.log(a.text());
	  console.log(href);
    });
	*/
  }
});
