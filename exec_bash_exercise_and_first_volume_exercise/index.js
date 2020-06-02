const fsPromises = require('fs').promises

const SECRET_MESSAGE = process.env.SECRET_MESSAGE
const filePath = `${__dirname}/logs.txt`
let rounds = 0
let filehandle

const printTimeToFile = async () => {
  const startTime = new Date().getTime()
  if (filehandle === undefined) {
    try {
      filehandle = await fsPromises.open(filePath, 'w')
    } catch (err) {
      console.error('Failed to open file', filePath, err)
      return
    }
  }
  rounds++
  const GMTString = new Date().toGMTString()
  const writeString = (rounds % 5 === 0) ? `Secret message is:\n"${SECRET_MESSAGE}"` : GMTString
  try {
    await filehandle.appendFile(`${writeString}\n`)
    console.log(`Wrote to file ${filePath}`)
  } catch (err) {
    console.error('Failed to write to file', err)
  }

  const timeNow = new Date().getTime()
  setTimeout(printTimeToFile, 3000 - (timeNow - startTime))
}

printTimeToFile()

const gracefulClose = async () => {
  if (filehandle !== undefined) console.log('Closing file') && await filehandle.close()
  process.exit(0)
}

process.on('SIGTERM', gracefulClose)
process.on('SIGINT', gracefulClose)
