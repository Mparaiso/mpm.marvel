"use strict"

_request = require 'request'
request = exports

###*
 * http client API, can be mocked
 * @type {function}
###
class request.Request
    request:_request
    execute:(uri,callback)->
        @request uri,(err,res,body)->
            if err
                callback(err)
            else
                callback(undefined,JSON.parse(body))