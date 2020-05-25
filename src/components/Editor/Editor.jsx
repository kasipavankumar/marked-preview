import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AceEditor from 'react-ace'

// Redux.
import { setEditorContent, setPreviewContent } from '../../redux/actions'

// Placeholder text.
import { placeholderText } from '../../data/placeholder'

// Markdown mode for editor.
import 'ace-builds/src-noconflict/mode-markdown'

// Themes.
import 'ace-builds/src-noconflict/theme-ambiance'
import 'ace-builds/src-noconflict/theme-chaos'
import 'ace-builds/src-noconflict/theme-chrome'
import 'ace-builds/src-noconflict/theme-clouds'
import 'ace-builds/src-noconflict/theme-clouds_midnight'
import 'ace-builds/src-noconflict/theme-cobalt'
import 'ace-builds/src-noconflict/theme-crimson_editor'
import 'ace-builds/src-noconflict/theme-dawn'
import 'ace-builds/src-noconflict/theme-dracula'
import 'ace-builds/src-noconflict/theme-dreamweaver'
import 'ace-builds/src-noconflict/theme-eclipse'
import 'ace-builds/src-noconflict/theme-eclipse'
import 'ace-builds/src-noconflict/theme-github'
import 'ace-builds/src-noconflict/theme-gob'
import 'ace-builds/src-noconflict/theme-gruvbox'
import 'ace-builds/src-noconflict/theme-idle_fingers'
import 'ace-builds/src-noconflict/theme-iplastic'
import 'ace-builds/src-noconflict/theme-katzenmilch'
import 'ace-builds/src-noconflict/theme-kr_theme'
import 'ace-builds/src-noconflict/theme-kuroir'
import 'ace-builds/src-noconflict/theme-merbivore'
import 'ace-builds/src-noconflict/theme-merbivore_soft'
import 'ace-builds/src-noconflict/theme-mono_industrial'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/theme-nord_dark'
import 'ace-builds/src-noconflict/theme-pastel_on_dark'
import 'ace-builds/src-noconflict/theme-solarized_dark'
import 'ace-builds/src-noconflict/theme-solarized_light'
import 'ace-builds/src-noconflict/theme-sqlserver'
import 'ace-builds/src-noconflict/theme-terminal'
import 'ace-builds/src-noconflict/theme-textmate'
import 'ace-builds/src-noconflict/theme-tomorrow'
import 'ace-builds/src-noconflict/theme-tomorrow_night'
import 'ace-builds/src-noconflict/theme-tomorrow_night_blue'
import 'ace-builds/src-noconflict/theme-tomorrow_night_bright'
import 'ace-builds/src-noconflict/theme-tomorrow_night_eighties'
import 'ace-builds/src-noconflict/theme-twilight'
import 'ace-builds/src-noconflict/theme-vibrant_ink'
import 'ace-builds/src-noconflict/theme-xcode'

const mapStateToProps = (state) => {
    return {
        editorBodyContent: state.editor.content,
        editorTheme: state.editor.theme,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onEditorChange: (value) => dispatch(setEditorContent(value)),
        setPreviewContent: (event) =>
            dispatch(setPreviewContent(event.target.value)),
    }
}

class Editor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editorContent: '',
            previewContent: placeholderText,
        }

        this.onChange = this.onChange.bind(this)
    }

    onChange = (event) => {
        this.setState({
            previewContent: event.target.value,
        })
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     if (this.state.editorContent !== nextState.editorContent) {
    //         return true
    //     } else {
    //         return false
    //     }
    // }

    componentWillReceiveProps(nextProps) {
        if (this.props.editorBodyContent !== nextProps.editorBodyContent) {
            this.setState({
                editorContent: nextProps.editorBodyContent,
            })
        }
    }

    componentDidMount() {
        this.setState({
            editorContent: this.props.editorBodyContent,
        })
    }

    render() {
        const editorStyles = {
            height: 'calc(100vh - 56px)',
            width: 'auto',
        }

        const setOptions = {
            cursorStyle: 'smooth',
            wrap: true,
        }

        return (
            <Fragment>
                <textarea
                    id="editor"
                    defaultValue={this.state.editorContent}
                    onChange={this.props.setPreviewContent}
                    style={{
                        display: 'none',
                    }}
                />

                <AceEditor
                    fontSize={12}
                    mode="markdown"
                    // theme="iplastic"
                    theme={this.props.editorTheme}
                    name="editor"
                    showPrintMargin={false}
                    style={editorStyles}
                    value={this.state.editorContent}
                    onChange={this.props.onEditorChange}
                    setOptions={setOptions}
                />
            </Fragment>
        )
    }
}

Editor.propTypes = {
    setPreviewContent: PropTypes.func.isRequired,
    onEditorChange: PropTypes.func.isRequired,
    editorBodyContent: PropTypes.string.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor)
