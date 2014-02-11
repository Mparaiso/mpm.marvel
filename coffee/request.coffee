"use strict"
###
# @author mparaiso <mparaiso@online.fr>
# @license LGPL
###
_request = require 'request'
###
# @namespace
###
request = exports

###
# http client API, can be mocked and cached
# @type {function}
###
class request.Request
    request:_request
    execute:(uri,callback)->
    	if @cache and @cache.execute instanceof Function
    		@cache.execute(uri,callback)
    	else
	        @request uri,(err,res,body)->
	            if err
	                callback(err)
	            else
	                callback(undefined,JSON.parse(body))


      