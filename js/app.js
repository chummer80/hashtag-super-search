$(document).ready(function() {
	/********************
	*	Constants
	********************/
	
	var ENTER_KEY_CODE = 13;
	
	// hashtags must start with a letter, and may only contain letters, digits, and underscore.
	var VALID_HASHTAG_PATTERN = /^[a-z]\w*$/i;
	
	var TWITTER_KEY = 'TcTBMur5S4sxfJOO2qD0UMnjE';
	var TWITTER_SECRET = '21ctTZsvmWvuUG2624h2kOhzRjfuEPbDefwtztHkNhRWy1YVA8';
	
	var twitterCredential = TWITTER_KEY + ':' + TWITTER_SECRET;
	var twitterCredentialBase64 = btoa(twitterCredential);
	
	/********************
	*	Functions
	********************/
	
	var trimSearchString = function trimSearchString(searchString) {
		// remove leading and trailing white space
		searchString = searchString.trim();
		
		// remove leading pound signs if they were accidentally typed in.
		var i = 0;
		while (searchString[i] === '#' && i < searchString.length) {
			i++;
		}
		searchString = searchString.slice(i);
		
		return searchString;
	};
	
	// validate the user inputted hashtag
	var searchIsValid = function searchIsValid(searchString) {
		if (searchString.length === 0) 
		{
			alert("Search string cannot be blank");
			return false;
		}
		
		if (searchString.search(VALID_HASHTAG_PATTERN) == -1) 
		{
			console.log("VALID_HASHTAG_PATTERN was not found in " + searchString);
			alert("Hashtags must start with a letter and can only contain letters, numbers, and underscore.");
			return false;
		}
		
		return true;
	};
	
	var startNewSearch = function startNewSearch() {
		var searchString = $('#search_textbox').val();
		searchString = trimSearchString(searchString);
		
		if (searchIsValid(searchString)) {
			
		}
	};
	
	/********************
	*	Event Handlers
	********************/
	
	$('#search_textbox').keydown(function() {
		if (event.which == ENTER_KEY_CODE) {
			startNewSearch();
		}
	});
	
	$('#search_button').click(function() {
		startNewSearch();
	});
	
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
		console.log("Getting Twitter bearer token");
		$.ajax({
			url: 'https://api.twitter.com/oauth2/token',
			type: 'POST',
			dataType: 'jsonp',
			headers: {
				Authorization: 'Basic ' + twitterCredentialBase64,
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			},
			data: {
				grant_type: 'client_credentials'
			}
		})
			.done(function(data) {
				console.log("Successfully got Twitter bearer token");
			
			})
			.fail(function() {
				console.log("Failed to get Twitter bearer token");
			});
	});
});