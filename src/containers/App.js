import React, { Fragment, lazy, Suspense } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'

// import Navbar from '../components/Navbar/Navbar'
import Editor from '../components/Editor/Editor'
// import Preview from '../components/Preview/Preview'

import 'ace-builds/src-noconflict/mode-markdown'
import 'ace-builds/src-noconflict/theme-github'

import '../static/scss/App.scss'
import '../static/scss/Editor.scss'
import '../static/scss/Preview.scss'
import '../static/scss/Navbar.scss'

const Navbar = lazy(() => import('../components/Navbar/Navbar'))
const Preview = lazy(() => import('../components/Preview/Preview'))
// const Editor = lazy(() => import('../components/Editor/Editor'))

const mapStateToProps = (state) => {
    return {
        editorBodyContent: state.editor.content,
    }
}

const ShowProgress = () => (
    <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
        }}>
        <CircularProgress />
    </div>
)

const App = (props) => (
    <Fragment>
        <Suspense fallback={<ShowProgress />}>
            <Navbar />
            <div className="App">
                <Editor />
                <Preview content={props.editorBodyContent} />
            </div>
        </Suspense>
    </Fragment>
)

App.propTypes = {
    editorBodyContent: PropTypes.string.isRequired,
}

export default connect(mapStateToProps)(App)
