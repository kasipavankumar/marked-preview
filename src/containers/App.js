import React, { Fragment, lazy, Suspense } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

import Editor from '../components/Editor/Editor'

import '../static/scss/App.scss'

const Navbar = lazy(() => import('../components/Navbar/Navbar'))
const Preview = lazy(() => import('../components/Preview/Preview'))

const mapStateToProps = (state) => {
    return {
        editorBodyContent: state.editor.content,
    }
}

const useStyles = makeStyles((theme) => ({
    showProgress: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
    },
}))

const ShowProgress = () => {
    const classes = useStyles()

    return (
        <div className={classes.showProgress}>
            <CircularProgress />
        </div>
    )
}

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
