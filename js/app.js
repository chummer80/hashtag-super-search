$(document).ready(function() {
	$('#twitter_test').click(function() {
		console.log("Twitter test: searching for top #NBA tweet");
		var queryData = {
			q: '#nba',
			result_type: 'popular',
			count: 1
		};
		$.getJSON('https://api.twitter.com/1.1/search/tweets.json', queryData)
			.done(function() {
				console.log("Successful query for #NBA");
			})
			.fail(function() {
				console.log("Failed to query for #NBA");
			});
	});

});