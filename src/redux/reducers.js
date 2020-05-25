import { placeholderText } from '../data/placeholder'
import {
    CLEAR_EDITOR,
    CHANGE_EDITOR_CONTENT,
    CHANGE_PREVIEW_CONTENT,
    TOGGLE_PREVIEW,
} from './constants'

const initialEditorState = {
    content: placeholderText,
}

export const editor = (state = initialEditorState, action) => {
    switch (action.type) {
        case CLEAR_EDITOR:
            return Object.assign({}, state, {
                content: '',
            })
        case CHANGE_EDITOR_CONTENT:
            return Object.assign({}, state, {
                content: action.payload,
            })
        default:
            return state
    }
}

const initialPreviewState = {
    show: false,
    content: '',
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
