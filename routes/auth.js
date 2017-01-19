// auth.js
import Cosmic from 'cosmicjs'
import async from 'async'
import _ from 'lodash'
import bcrypt from 'bcrypt'
const saltRounds = 10
module.exports = (app, config, partials) => {
  // Submit form
  app.post('/auth', (req, res) => {
    const data = req.body
    Cosmic.getObjectType({ bucket: { slug: config.COSMIC_BUCKET, read_key: config.COSMIC_READ_KEY } }, { type_slug: 'users' }, (err, response) => {
      if (err)
        res.status(500).json({ status: 'error', data: response })
      else {
        async.eachSeries(response.objects.all, (user, eachCallback) => {
          if (!_.find(user.metafields, { key: 'email', value: data.email.trim().toLowerCase() }))
            return eachCallback()
          const stored_password = _.find(user.metafields, { key: 'password' }).value
          bcrypt.compare(data.password, stored_password, function(err, correct) {
            if(correct)
              res.locals.user_found = user
            eachCallback()
          })
        }, () => {
          if (res.locals.user_found) {
            req.session.user = {
              first_name: res.locals.user_found.metafield.first_name.value,
              last_name: res.locals.user_found.metafield.last_name.value,
              email: res.locals.user_found.metafield.email.value
            }
            req.session.save()
            return res.json({ status: 'success', data: response })
          }
          return res.status(404).json({ status: 'error', message: 'This user was not found or the email and password are incorrect.' })
        })
      }
    })
  })
}
