const CONSTANTS = require('./constants')
const argumentMap = {
    "2-f" : (resolve, reject, args) => {
        const fileName = args[0]
        resolve({fileName, type: CONSTANTS.CONT})
    },
    "3-n" : (resolve, reject, args) => {
        try {
            const n = parseInt(args[0])
            const fileName = args[1]
            resolve({fileName, n,type: CONSTANTS.LAST})
        }
        catch(e) {
            reject("please provide a number when using -n")
        }
    }
}
class ArgumentParser {
    static parse(args) {
        return new Promise((resolve, reject) => {
            if (args.length > 1) {
                const argumentKey = `${args.length}${args[0]}`
                args.splice(0, 1)
                if (argumentKey in argumentMap) {
                    argumentMap[argumentKey](resolve, reject, args)
                } else {
                    reject({message:"please enter -f fileName or -n lines fileName"})
                }
            }
            else {
                reject({message:"please enter filename and give a option"})
            }
        })
    }
}
module.exports = ArgumentParser
