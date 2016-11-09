// logout.js
module.exports = (app, config, partials) => {
  app.get('/logout', (req, res) => {
    req.session.destroy()
    return res.redirect('/')
  })
}
