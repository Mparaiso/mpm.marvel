mpm.marvel
==========

Marvel API client for NodeJS ! 

more infos : http://developer.marvel.com/documentation/getting_started

author: mparaiso <mparaiso@online.fr>

### INSTALLATION

with npm :
	
	npm install mpm.marvel

### USAGE


```javascript

	var assert = require('assert');
	var marvel = require('mpm.marvel');

	var marvelClient = marvel(yourPublicKey,yourPrivateKey);

	// GET /v1/public/characters Fetches lists of characters.

	marvelClient.characters(function(err,result){
		assert.equal(result.code,200);
	});
	marvelClient.characters({limit:3},function(err,result){});

	// GET /v1/public/characters/{characterId} Fetches a single character by id.

	marvelClient.characters(someCharacterId,function(err,res){});
	marvelClient.characters({id:someCharacterId},function(err,res){});

	// GET /v1/public/characters/{characterId}/comics Fetches lists of comics filtered by a character id.

	marvelClient.characters(someCharacterId).comics(function(err,res){});

	// GET /v1/public/characters/{characterId}/events Fetches lists of events filtered by a character id.

	marvelClient.characters(someCharacterId).events(function(err,res){});

	// GET /v1/public/characters/{characterId}/series Fetches lists of series filtered by a character id.

	marvelClient.characters(someCharacterId).series(function(err,res){});
	events

	// GET /v1/public/characters/{characterId}/stories Fetches lists of stories filtered by a character id.
	
	marvelClient.characters(someCharacterId).stories(function(err,res){});
	events
	
	/** and so on ...

		Here is the API : 

		GET /v1/public/comics Fetches lists of comics.
		GET /v1/public/comics/{comicId} Fetches a single comic by id.
		GET /v1/public/comics/{comicId}/characters Fetches lists of characters filtered by a comic id.
		GET /v1/public/comics/{comicId}/creators Fetches lists of creators filtered by a comic id.
		GET /v1/public/comics/{comicId}/events Fetches lists of events filtered by a comic id.
		GET /v1/public/comics/{comicId}/stories Fetches lists of stories filtered by a comic id.
		GET /v1/public/creators Fetches lists of creators.
		GET /v1/public/creators/{creatorId} Fetches a single creator by id.
		GET /v1/public/creators/{creatorId}/comics Fetches lists of comics filtered by a creator id.
		GET /v1/public/creators/{creatorId}/events Fetches lists of events filtered by a creator id.
		GET /v1/public/creators/{creatorId}/series Fetches lists of series filtered by a creator id.
		GET /v1/public/creators/{creatorId}/stories Fetches lists of stories filtered by a creator id.
		GET /v1/public/events Fetches lists of events.
		GET /v1/public/events/{eventId} Fetches a single event by id.
		GET /v1/public/events/{eventId}/characters Fetches lists of characters filtered by an event id.
		GET /v1/public/events/{eventId}/comics Fetches lists of comics filtered by an event id.
		GET /v1/public/events/{eventId}/creators Fetches lists of creators filtered by an event id.
		GET /v1/public/events/{eventId}/series Fetches lists of series filtered by an event id.
		GET /v1/public/events/{eventId}/stories Fetches lists of stories filtered by an event id.
		GET /v1/public/series Fetches lists of series.
		GET /v1/public/series/{seriesId} Fetches a single comic series by id.
		GET /v1/public/series/{seriesId}/characters Fetches lists of characters filtered by a series id.
		GET /v1/public/series/{seriesId}/comics Fetches lists of comics filtered by a series id.
		GET /v1/public/series/{seriesId}/creators Fetches lists of creators filtered by a series id.
		GET /v1/public/series/{seriesId}/events Fetches lists of events filtered by a series id.
		GET /v1/public/series/{seriesId}/stories Fetches lists of stories filtered by a series id.
		GET /v1/public/stories Fetches lists of stories.
		GET /v1/public/stories/{storyId} Fetches a single comic story by id.
		GET /v1/public/stories/{storyId}/characters Fetches lists of characters filtered by a story id.
		GET /v1/public/stories/{storyId}/comics Fetches lists of comics filtered by a story id.
		GET /v1/public/stories/{storyId}/creators Fetches lists of creators filtered by a story id.
		GET /v1/public/stories/{storyId}/events Fetches lists of events filtered by a story id.
	*/

```
