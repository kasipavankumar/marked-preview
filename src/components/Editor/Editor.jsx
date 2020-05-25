import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import AceEditor from 'react-ace'

import { setEditorContent, setPreviewContent } from '../../redux/actions'
import { placeholderText } from '../../data/placeholder'

import 'ace-builds/src-noconflict/mode-markdown'
import 'ace-builds/src-noconflict/theme-github'

const mapStateToProps = (state) => {
    return {
        editorBodyContent: state.editor.content,
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
                    theme="github"
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

export default connect(mapStateToProps, mapDispatchToProps)(Editor)
