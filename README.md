mpm.marvel
==========

[![NPM](https://nodei.co/npm/mpm.marvel.png)](https://nodei.co/npm/mpm.marvel/)

Marvel API client for NodeJS ! 

mpm.marvel helps developpers request data from the Marvel API. 
With mpm.marvel, developpers no longer need to make complicated raw http request calls to 
query the Marvel API ! 

mpm.marvel is written in coffee-script and compiled in readable Javascript.

more infos : http://developer.marvel.com/documentation/getting_started

author: mparaiso <mparaiso@online.fr>

version: 0.0.2

### INSTALLATION

with npm :
	
	npm install mpm.marvel

### USAGE


```javascript

	var assert = require('assert');
	var marvel = require('mpm.marvel');

	var marvelClient = marvel(yourPublicKey,yourPrivateKey);

	// get characters
	marvelClient.characters(function(err,result){
		assert.equal(result.code,200);
	});
```

#### API

##### CHARACTERS

**marvelClient.characters(callback)** : Fetches lists of characters.

	marvelClient.characters(function(err,result){
			assert.equal(result.code,200);
		});

**marvelClient.characters(optionHash,callback)**

	marvelClient.characters({limit:3},function(err,result){});

**marvelClient.characters(characterId,callback)** : Fetches a single character by id.

	marvelClient.characters(someCharacterId,function(err,res){});
	marvelClient.characters({id:someCharacterId},function(err,res){});


**marvelClient.characters(characterId).comics(callback)** : Fetches lists of comics filtered by a character id.

	marvelClient.characters(someCharacterId).comics(function(err,res){});

**marvelClient.characters(characterId).comics(optionsHash,callback)**

**marvelClient.characters(characterId).stories(callback)** : Fetches lists of stories filtered by a character id.

	marvelClient.characters(someCharacterId).stories(function(err,res){});

**marvelClient.characters(characterId).stories(optionsHash,callback)**

**marvelClient.characters(characterId).series(callback)** : Fetches lists of series filtered by a character id.

	marvelClient.characters(someCharacterId).series(function(err,res){});

**marvelClient.characters(characterId).series(optionsHash,callback)**

**marvelClient.characters(characterId).events(callback)** : Fetches lists of events filtered by a character id.

	marvelClient.characters(someCharacterId).events(function(err,res){});

**marvelClient.characters(characterId).events(optionsHash,callback)**



##### COMICS

**marvelClient.comics(callback)** :  Fetches lists of comics.

	marvelClient.comics(function(error,result){});

**marvelClient.comics(options,callback)**

	marvelClient.comics({limit:5},function(error,result){});

**marvelClient.comics(comicId)** : Fetches a single comic by id.

	marvelClient.comics(comicId,function(error,result){});
	marvelClient.comics({id:comicId},function(error,result){});

```javascript
	

	// GET /v1/public/comics/{comicId}/characters Fetches lists of characters filtered by a comic id.

	marvelClient.comics(comicId).characters(function(error,result){});

	// GET /v1/public/comics/{comicId}/creators Fetches lists of creators filtered by a comic id.

	marvelClient.comics(comicId).creators(function(error,result){});

	// GET /v1/public/comics/{comicId}/events Fetches lists of events filtered by a comic id.

	marvelClient.comics(comicId).events(function(error,result){});

	// GET /v1/public/comics/{comicId}/stories Fetches lists of stories filtered by a comic id.
	
	marvelClient.comics({id:comicId,limit:5}).stories(function(error,result){});

```

##### AND SO ON


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
