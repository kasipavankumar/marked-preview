import { placeholderText } from '../data/placeholder'
import {
    CLEAR_EDITOR,
    CHANGE_EDITOR_THEME,
    CHANGE_EDITOR_CONTENT,
    CHANGE_PREVIEW_CONTENT,
    TOGGLE_PREVIEW,
} from './constants'

const initialEditorState = {
    content:
        JSON.parse(localStorage.getItem('editorContent')) || placeholderText,
    theme: JSON.parse(localStorage.getItem('editorTheme')) || 'iplastic',
}

export const editor = (state = initialEditorState, action) => {
    switch (action.type) {
        case CLEAR_EDITOR:
            localStorage.setItem('editorContent', JSON.stringify(''))

            return Object.assign({}, state, {
                content: '',
            })
        case CHANGE_EDITOR_CONTENT:
            return Object.assign({}, state, {
                content: action.payload,
            })
        case CHANGE_EDITOR_THEME:
            return Object.assign({}, state, {
                theme: action.payload,
            })
        default:
            return state
    }
}

const initialPreviewState = {
    show: false,
    content: placeholderText,
}

export const preview = (state = initialPreviewState, action) => {
    switch (action.type) {
        case TOGGLE_PREVIEW:
            return Object.assign({}, state, {
                show: !state.show,
            })
        case CHANGE_PREVIEW_CONTENT:
            return Object.assign({}, state, {
                content: action.payload,
            })
        default:
            return state
    }
}
