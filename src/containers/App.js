import React, { Component, Fragment } from 'react'
import marked from 'marked'
import DOMPurify from 'dompurify'

import { placeholderText } from '../data/placeholder'

import '../static/scss/App.scss'

class App extends Component {
    constructor() {
        super()
        this.state = {
            editorContent: placeholderText,
        }

        this.onEditorContentChange = this.onEditorContentChange.bind(this)
    }

    onEditorContentChange(event) {
        this.setState({
            editorContent: event.target.value,
        })
    }

    render() {
        return (
            <Fragment>
                <h1 className="title">Markdown Preview</h1>
                <div className="App">
                    {/* This the editor area. */}
                    <textarea
                        id="editor"
                        defaultValue={this.state.editorContent}
                        onChange={this.onEditorContentChange}></textarea>

                    {/* This is where the markdown preview will show up. */}
                    <div
                        id="preview"
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(
                                marked(this.state.editorContent, {
                                    gfm: true,
                                    breaks: true,
                                })
                            ),
                        }}
                    />
                </div>
            </Fragment>
        )
    }
}

export default App
