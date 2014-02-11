"use strict"
###
# @author mparaiso <mparaiso@online.fr>
# @license LGPL
###
request = require('./request')
async = require('async')
url = require('url')

### 
# @namespace 
###
cache = exports
### default duration is 3 days ###
cache.defaultDuration = 1000 * 60 * 60 * 24 * 3

class cache.Mongoose extends request.Request

    ###
    # Mongoose request cache strategy
    # @param {Mongoose} mongoose a mongoose instance
    # @param {String} collectionName name of the collection
    # @param {String} duration duration in ms,default is 3 days
    ###
    constructor:(@mongoose,@collectionName="Entry",@duration=cache.defaultDuration)->
        if not (this instanceof cache.Mongoose)
            return new cache.Mongoose(@mongoose,@collectionName,@duration)
        else
            # create Entry model if not exist.
            if not @mongoose.models[@collectionName]
                @EntrySchema = @mongoose.Schema
                    uri: Object
                    created_at: 
                        type: Date
                        default: Date.now
                    expires_at: 
                        type: Date
                        default: => Date.now() + @duration
                    data: Object

                @Entry = @mongoose.model(@collectionName,@EntrySchema)
            else
                @Entry = @mongoose.model(@collectionName)

    ###
    # execute cached request
    # @param  {String} @uri   
    # @param  {Function} @callback 
    ###
    execute:(@uri,@callback)->
        @parsedUri = url.parse(@uri)
        delete @parsedUri.query.ts
        delete @parsedUri.query.hash
        delete @parsedUri.apikey
        @Entry.findOne({uri:@parsedUri,expires_at:{"$gte":Date.now()}}, @onMongooseQuery.bind(this))

    ### event listener for mongoose query ###
    onMongooseQuery:(err, res)->
        if err
            @callback(err)
        else if !res
            @request(@uri, @onApiRequest.bind(this))
        else 
            @callback(undefined, res)

    ### event listener for api query ###
    onApiRequest:(err, res, body)->
        if err
            @callback(err)
        else 
            entry = new @Entry({uri: @parsedUri,data: body})
            entry.save(@onEntrySave.bind(this))

    ### event listener one mongoose save ###
    onEntrySave:(err, res)=>
        @callback(err, res.data or undefined)
