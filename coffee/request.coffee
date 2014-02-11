"use strict"

_request = require 'request'
request = exports

###*
 * http client API, can be mocked and cached
 * @type {function}
###
class request.Request
    request:_request
    execute:(uri,callback)->
    	if @cache
    		@cache.execute(uri,callback)
    	else
	        @request uri,(err,res,body)->
	            if err
	                callback(err)
	            else
	                callback(undefined,JSON.parse(body))


      