import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import Navbar from '../components/Navbar/Navbar'
import Editor from '../components/Editor/Editor'
import Preview from '../components/Preview/Preview'

import 'ace-builds/src-noconflict/mode-markdown'
import 'ace-builds/src-noconflict/theme-github'

import '../static/scss/App.scss'
import '../static/scss/Editor.scss'
import '../static/scss/Preview.scss'

const mapStateToProps = (state) => {
    return {
        editorBodyContent: state.editor.content,
    }
}

const App = (props) => (
    <Fragment>
        <Navbar />
        <div className="App">
            <Editor />
            <Preview content={props.editorBodyContent} />
        </div>
    </Fragment>
)

export default connect(mapStateToProps)(App)
