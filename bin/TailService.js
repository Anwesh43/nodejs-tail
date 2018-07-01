const constants = require('./constants')

const FileReader = require('./FileReader')

class TailService {
    static tail(options) {
        FileReader.checkFile(options.fileName.trim()).then(() => {
            const TAIL_FUNC_MAP = {
                'continuous' : TailService.tailContinuously,
                'last' : TailService.tailLastN
            }
            if (options.type in TAIL_FUNC_MAP) {
                TAIL_FUNC_MAP[options.type](options)
            }
        }).catch((err) => {
            console.log(err)
            console.log(`${options.fileName} doesn't exist`)
        })

    }

    static tailContinuously(options) {
        const contTailService = new ContTailService(options.fileName)
        contTailService.tail()
    }

    static tailLastN(options) {
        const lastTailService = new LastTailService(options.n, options.fileName)
        lastTailService.tail()
    }
}

class ContTailService {
    constructor(fileName) {
        this.l = 0
        this.fileName = fileName
        this.init()
    }

    init() {
        FileReader.readFile(this.fileName).then((obj) => {
            const lines = obj.data.split("\n")
            this.l = lines.length
            this.read = true
        })
    }

    tail() {
        setInterval(() => {
            if (this.read) {
              this.read = false
              FileReader.readFile(this.fileName).then((obj) => {
                  const lines = obj.data.split("\n")
                  if (this.l < lines.length) {
                      const diff = lines.length - this.l
                      const k = lines.length
                      console.log(lines.splice(lines.length - diff -1, diff).join('\n'))
                      this.l = k
                  }
                  this.read = true
              }).catch((err) => {
                  this.read = true
              })
            }
        }, 1)
    }
}

class LastTailService {
    constructor(n, fileName) {
        this.n = n
        this.fileName = fileName
        this.init()
    }

    init() {
        FileReader.readFile(this.fileName).then((obj) => {
          this.lines = obj.data.split("\n")
          this.l = this.lines.length
          this.read = true
      })
    }

    tail() {
        const interval = setInterval(() => {
            if (this.read && this.n < this.l) {
                console.log(this.lines.splice(this.l - this.n - 1, this.n).join("\n"))
                clearInterval(interval)
            }
        }, 1)
    }
}

module.exports = TailService
