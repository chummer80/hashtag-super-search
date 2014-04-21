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
		if (searchString.length === 0) {
			alert("Search string cannot be blank");
			return false;
		}
		
		if (searchString.search(VALID_HASHTAG_PATTERN) == -1) {
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
	
	
	/*************************
	*	Twitter API functions
	*************************/
	
	// function to generate a nonce string of 32 random digits
	var generateNonce = function generateNonce() {
		var nonce = '';			
		for (var i = 1; i <= 32; i++) {
			nonce += Math.floor(Math.random()*10).toString();			
		}
		return nonce;
	};
		
	var generateOAuthSignature = function generateOAuthSignature(oauthParamList) {
		// make an ordered list of all the parameters
		var paramNames = [];
		for (var key in oauthParamList) {
			paramNames.push(key);
		}
		paramNames.sort();
		
		var signature = '';
		
		for (var i = 0; i < paramNames.length; i++) {
			if (i > 0) {
				signature += '&';
			}
			signature += paramNames[i] + '=' + oauthParamList[paramNames[i]];
		}
		
		return signature;
	};
	
		
	// Take all the oauth parameters and append them all together in a string that will be used in the
	// HTTP request header sent to the Twitter API.
	var twitterBuildOAuthHeaderString = function twitterBuildOAuthHeaderString(oauthParamList) {
		// append a parameter name and value to the OAuth header string
		var appendParameter = function appendParameter(outputString, parameterName, value) {
			// The header string should begin with 'OAuth '.
			if (!outputString) {
				outputString = 'OAuth ';
			}
			// add a comma and a space if this is not the first parameter.
			else {
				outputString += ', ';
			}
			
			// parameter name and value must be percent-encoded
			outputString += encodeURIComponent(parameterName) + '="' + encodeURIComponent(value) + '"';	
			
			return outputString;
		};
		
		
		// build OAuth header string
		var outputString = '';
		
		for (var key in oauthParamList) {
			appendParameter(outputString, key, oauthParamList[key]);
		}
		
		// appendParameter(outputString, 'oauth_consumer_key', 'TcTBMur5S4sxfJOO2qD0UMnjE');
		// appendParameter(outputString, 'oauth_nonce', generateNonce());
		// appendParameter(outputString, 'oauth_signature', '');
		// appendParameter(outputString, 'oauth_signature_method', 'HMAC-SHA1');
		// appendParameter(outputString, 'oauth_timestamp', new Date().getTime() / 1000);	// number of seconds since epoch
		// appendParameter(outputString, 'oauth_version', '1.0');
		
		// access token will not be available yet at first
		// if (accessToken) {
			// appendParameter(outputString, 'oauth_token', accessToken);
		// }
		
		return outputString;
	};
	
	
	// send ajax request to get a Twitter API request token
	var obtainRequestToken = function obtainRequestToken() {
		// these are all the oauth params except the signature which must be generated afterward.
		var oauthParamList = {
			oauth_consumer_key: TWITTER_KEY,
			oauth_nonce: generateNonce(),
			oauth_signature: '',
			oauth_signature_method: 'HMAC-SHA1',
			oauth_timestamp: new Date().getTime() / 1000,	// number of seconds since epoch
			oauth_version: '1.0',
			oauth_callback: encodeURIComponent('http://www.google.com')
		};
		oauthParamList.signature = generateOAuthSignature(oauthParamList);
		
		var oAuthHeaderString = twitterBuildOAuthHeaderString(oauthParamList);
		 
		$.ajax({
			url: 'https://api.twitter.com/oauth/request_token',
			type: 'GET',
			dataType: 'jsonp',
			headers: {
				Authorization: oAuthHeaderString
			}
		})
			.done(function() {
				console.log("Twitter obtainRequestToken success");
			})
			.fail(function() {
				console.log("Twitter obtainRequestToken failed");
			});
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
		// console.log("Getting Twitter bearer token");
		// $.ajax({
			// url: 'https://api.twitter.com/oauth2/token',
			// type: 'POST',
			// dataType: 'jsonp',
			// headers: {
				// Authorization: 'Basic ' + twitterCredentialBase64,
				// 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			// },
			// data: {
				// grant_type: 'client_credentials'
			// }
		// })
			// .done(function(data) {
				// console.log("Successfully got Twitter bearer token");
			
			// })
			// .fail(function() {
				// console.log("Failed to get Twitter bearer token");
			// });
	// });
	
	$('.sign_in_button').click(function() {
		var service = this.dataset['service'];
		
		console.log(service + " button clicked!");
	
	
		if (service === 'twitter') {
			// sign in to twitter
			obtainRequestToken();
			console.log("twitter authorize request sent");
		}
	});
});