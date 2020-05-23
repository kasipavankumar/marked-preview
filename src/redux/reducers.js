import { placeholderText } from '../data/placeholder'
import { CLEAR_EDITOR, CHANGE_EDITOR_CONTENT } from './constants'

const initialEditorState = {
    // editorBodyContent: JSON.parse(localStorage.getItem('editorContent')) || placeholderText,
    editorBodyContent: placeholderText,
}

/**
 * Reducers related to the editor.
 */
export const editorReducers = (state = initialEditorState, action) => {
    switch (action.type) {
        case CLEAR_EDITOR:
            return Object.assign({}, state, {
                editorBodyContent: '',
            })
        case CHANGE_EDITOR_CONTENT:
            return Object.assign({}, state, {
                editorBodyContent: action.payload,
            })
        default:
            return state
    }
}
