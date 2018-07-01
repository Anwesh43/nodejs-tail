#!/usr/local/bin/node
const arguments = process.argv
const tailService = require('./TailService')
arguments.splice(0, 2)
const ArgumentParser = require('./ArgumentParser')
ArgumentParser.parse(arguments).then((res) => {
    tailService.tail(res)
}).catch((err) => {
    console.log(err)
})
