require('dotenv').config()

require('../src').validate()
  .then((result) => {
    console.log(result)


    console.log(process.env.MESSAGE)

    process.exit(0)
  })
  .catch((error) => {
    console.error(error)

    process.exit(1)
  })
