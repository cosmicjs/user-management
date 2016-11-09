// signup.js
import Cosmic from 'cosmicjs'
module.exports = (app, config, partials) => {
  app.get('/signup', (req, res) => {
    Cosmic.getObjects({ bucket: { slug: config.COSMIC_BUCKET } }, (err, response) => {
      res.locals.cosmic = response
      return res.render('signup.html', {
        partials
      })
    })
  })
}
