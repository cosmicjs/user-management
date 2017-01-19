// signup.js
import Cosmic from 'cosmicjs'
module.exports = (app, config, partials) => {
  app.get('/signup', (req, res) => {
    Cosmic.getObjects({ bucket: { slug: config.COSMIC_BUCKET, read_key: config.COSMIC_READ_KEY } }, (err, response) => {
      res.locals.cosmic = response
      return res.render('signup.html', {
        partials
      })
    })
  })
}
