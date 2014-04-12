$(document).ready(function() {
	var twitterKey = 'TcTBMur5S4sxfJOO2qD0UMnjE';
	var twitterSecret = '21ctTZsvmWvuUG2624h2kOhzRjfuEPbDefwtztHkNhRWy1YVA8';
	var twitterCredential = twitterKey + ':' + twitterSecret;
	var twitterCredentialBase64 = btoa(twitterCredential);
	
	// $('#twitter_test').click(function() {
		// console.log("Twitter test: searching for top #NBA tweet");
		// var queryData = {
			// q: '#nba',
			// result_type: 'popular',
			// count: 1
		// };
		// $.getJSON('https://api.twitter.com/1.1/search/tweets.json', queryData)
			// .done(function() {
				// console.log("Successful query for #NBA");
			// })
			// .fail(function() {
				// console.log("Failed to query for #NBA");
			// });
	// });
	
	
	$('#twitter_test').click(function() {
		console.log("Getting Twitter credentials");
		$.ajax({
			url: 'https://api.twitter.com/oauth2/token',
			type: 'POST',
			headers: {
				Authorization: 'Basic ' + twitterCredentialBase64,
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			},
			data: {
				grant_type: 'client_credentials'
			},
			datatype: 'json'
		})
			.done(function(data) {
				console.log("Successfully got Twitter bearer token");
			
			})
			.fail(function() {
				console.log("Failed to get Twitter bearer token");
			});
	});
});