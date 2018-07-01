const fs = require('fs')
class FileReader {
    static readFile(fileName) {
        return new Promise((resolve, reject) => {
            try {
                const data = fs.readFileSync(fileName)
                resolve({data : data.toString()})
            }
            catch(e) {
                reject({m:"error", e})
            }
        })
    }

    static checkFile(fileName) {
        return new Promise((resolve, reject, err) => {
            fs.access(fileName, (err) => {
                if (err == null) {
                    resolve({status:"success"})
                }
                else {
                    reject({status : "error"})
                }
            })
        })
    }
}
module.exports = FileReader
