"use strict"
###
# @author mparaiso <mparaiso@online.fr>
# @license LGPL
###
http = require('http')
util = require('util')
events = require('events')
url = require('url')
request = require('./request')
crypto = require('crypto')

###*
 * marvel api
 * @namespace
 * @param  {String} publicKey
 * @param  {String} privateKey
 * @return {marvel.Marvel}
###
marvel = (publicKey, privateKey)-> new marvel.Marvel(publicKey, privateKey)

###*
 * hash a string
 * @param  {String} string the string to hash
 * @return {String}      
###
marvel.md5 = (string)->crypto.createHash('md5').update(string).digest('hex')

marvel.host = "gateway.marvel.com"
marvel.protocol = "http"
marvel.rootPath = 'v1/public'
###
 * A hash of entities
 * @type {Array}
####
marvel.entities = [
    {
        name: "characters",
        url: "characters",
        links: ["comics", "events", "series", "stories"]
    },
    {
        name: "comics",
        url: "comics",
        links: ['characters', 'creators', 'events', 'stories']
    },
    {
        name: "creators",
        url: "creators",
        links: ['comics', 'events', 'series', 'stories']
    },
    {
        name: "events",
        url: "events",
        links: ['characters', 'comics', 'creators', 'series', 'stories']
    },
    {
        name: "series",
        url: "series",
        links: ['characters', 'comics', 'creators', 'events', 'stories']
    },
    {
        name: "stories",
        url: 'stories',
        links: ['characters', 'comics', 'creators', 'events']
    }
]

class marvel.Marvel 
    ###
     * [Marvel description]
     * @param {String} publicKey
     * @param {String} privateKey
    ### 
    constructor: (@publicKey, @privateKey,@_request)->
        @_request ?= new request.Request()
        ### the api is created dynamically according to the entity array###
        marvel.entities.forEach (entity)=>
            options = {}
            ###
             * F
             * @param {String}   id
             * @param {Function} callback
             * @return {F|request.Request}
            ###
            F = (id, callback)=>
                @timestamp = Date.now()
                if id instanceof Function
                    ### argument 1 is a function,argument 1 is the callbacks ###
                    callback = id
                    id = undefined
                else if typeof id == 'object'
                    ### id is a option hash ###
                    options = id
                    id = id.id
                F.request =  @_request 
                F.publicKey = @publicKey
                F.privateKey = @privateKey
                F.urlOptions = { 
                    protocol: marvel.protocol, 
                    host: marvel.host,
                    pathname: marvel.rootPath.concat('/').concat(entity.url).concat(if id then '/'.concat(id) else ''),
                    query: { ts: @timestamp,apikey: @publicKey,hash: marvel.md5(@timestamp + @privateKey + @publicKey) }
                }
                ###if options , copy options to query hash###
                Object.keys(options).forEach (key)->
                    F.urlOptions.query[key] = options[key]
                ###if callback execute callback###
                if callback
                    return F.request.execute(url.format(F.urlOptions), callback)
                ### else create entity functions###
                entity.links.forEach (link)=>
                    F[link] = @makeLink(F, link)
                return F

            ### end forEach ###
            this[entity.name] = F


    ###
     * Create a link entity function
     * @param  {Function} parent entity
     * @param {String} link link name
     * @return {Function}
    ###
    makeLink:(F, link)->
        ###
         * entity link function
         * @param  {Object}   options
         * @param  {Function} callback
         * @return {marvel.request}
        ###
        return (options, callback)->
            ###if callback first argument then callback is options###
            if options instanceof Function
                callback = options
                options = undefined
        
            timestamp = Date.now()
            urlOptions = {
                protocol: marvel.protocol,
                host: marvel.host,
                pathname: F.urlOptions.pathname.concat('/').concat(link),
                query: {
                    ts: timestamp,
                    apikey: F.urlOptions.query.apikey,
                    hash: marvel.md5(timestamp + F.privateKey + F.publicKey)
                }
            }
        
            if options
                Object.keys(options).forEach (key)->
                    urlOptions.query[key] = options[key]

            return F.request.execute(url.format(urlOptions), callback)

module.exports = marvel