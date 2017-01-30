import React from 'react'
import ReactDOM from 'react-dom'
import Main from './components/main.js'

// Load application stylesheets
import './styles/bootstrap-3.3.5/css/bootstrap.min.css'
import './styles/bootstrap-modal-fix.css'
import './styles/fonts.css'

ReactDOM.render(<Main />, window.document.getElementById('root'))
