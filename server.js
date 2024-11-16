const express = require('express')
const axios = require('axios')
const app = express()
const port = 3000

// This Middleware is very important to parse forms action url, otherwise it will give the CANNOT POST error
app.use(express.urlencoded({ extended: true }))
//landing page
app.get('/', async (req, res) => {
  res.render('index.ejs')
})

// Weather route
app.post('/weather', async (req, res) => {
  const zipCode = req.body.zipCode
  await axios({
    method: 'get',
    url: `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&units=imperial&appid=ed0673bdc41868ad71eb2be69f2de40e`
  })
    .then((response) => {
      console.log(response.data)
      res.render('../views/show.ejs', { data: response.data })
    })
    .catch((err) => {
      console.log(err)
    })
})

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}`)
})
