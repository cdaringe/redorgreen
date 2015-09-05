import React from 'react'
import Main from './components/main.js'
import domready from 'domready'

// Load application stylesheets
// require('style!../styles/bootstrap-3.3.5/css/bootstrap.min.css');
import '../styles/fonts.css'
import '../styles/chile.css'
import '../styles/holy-grail.css'

domready(() => {
    React.render(<Main />, document.body)
})
