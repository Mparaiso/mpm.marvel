"use strict"
###
@author mparaiso <mparaiso@online.fr>
@license LGPL
###
_request = require 'request'
###
# @namespace
###
request = exports

###
http client, can be mocked and cached
###
class request.Request

    request:_request

    ###
    execute a request
    @param  {String}   uri    
    @param  {Function} callback 
    ###
    execute:(uri,callback)->
    	if @cache and @cache.execute instanceof Function
    		@cache.execute(uri,callback)
    	else
	        @request uri,(err,res,body)->
	            if err
	                callback(err)
	            else
	                callback(undefined,JSON.parse(body))


      