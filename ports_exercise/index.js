const express = require("express")

const app = express()

const PORT = 80

app.get('*', (req, res) => res.send('Ports configured correctly!!').end())

app.listen(PORT, () =>
  console.log(`Listening on port ${PORT}, this means inside of the container. Use -p to map the port to a port of your local machine.`))
