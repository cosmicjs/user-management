// Config
module.exports = (app, config, partials) => {
  require('./home')(app, config, partials)
  require('./signup')(app, config, partials)
  require('./users')(app, config, partials)
  require('./auth')(app, config, partials)
  require('./logout')(app, config, partials)
  require('./404')(app, config, partials)
}