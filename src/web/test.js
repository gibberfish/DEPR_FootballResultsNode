
var waitForPeriod = function waitForPeriod () {
	var time = process.hrtime();
	var modulo = time[1] % 25000;
	
	console.log("Waiting for " + modulo + " ms");

	setTimeout (waitForPeriod, modulo);
}

module.exports.waitForPeriod = waitForPeriod;
