#!/usr/local/bin/node
const arguments = process.argv
arguments.splice(0, 2)
const ArgumentParser = require('./ArgumentParser')
ArgumentParser.parse(arguments).then((res) => {
    console.log(res)
}).catch((err) => {
    console.log(err)
})
