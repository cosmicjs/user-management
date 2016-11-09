// auth.js
import Cosmic from 'cosmicjs'
import async from 'async'
import _ from 'lodash'
import md5 from 'md5'
module.exports = (app, config, partials) => {
  // Submit form
  app.post('/auth', (req, res) => {
    const data = req.body
    let users_found
    Cosmic.getObjectType({ bucket: { slug: config.COSMIC_BUCKET } }, 'users', (err, response) => {
      if (err)
        res.status(500).json({ status: 'error', data: response })
      else {
        users_found = _.filter(response.objects.all, user => {
          if (_.find(user.metafields, { key: 'email', value: data.email.trim().toLowerCase() }) && _.find(user.metafields, { key: 'password', value: md5(data.password.trim()) }))
            return user
        })
      }
      if (users_found && users_found.length > 0) {
        req.session.user = {
          first_name: users_found[0].metafield.first_name.value,
          last_name: users_found[0].metafield.last_name.value,
          email: users_found[0].metafield.email.value
        }
        req.session.save()
        return res.json({ status: 'success', data: response })
      }
      return res.status(404).json({ status: 'error', message: 'This user was not found or the email and password are incorrect.' })
    })
  })
}
