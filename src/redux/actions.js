import {
    CHANGE_EDITOR_CONTENT,
    CHANGE_PREVIEW_CONTENT,
    CLEAR_EDITOR,
    TOGGLE_PREVIEW,
} from './constants'

/**
 * Action to clear the editor content.
 */
export const clearEditor = () => ({ type: CLEAR_EDITOR })

/**
 * Action to change the editor content in real time as user types.
 * @param {string} text
 */
export const setEditorContent = (text) => {
    localStorage.setItem('editorContent', JSON.stringify(text))

    return {
        type: CHANGE_EDITOR_CONTENT,
        payload: text,
    }
}

export const setPreviewContent = (text) => {
    return {
        type: CHANGE_PREVIEW_CONTENT,
        payload: text,
    }
}

/**
 * Action to toggle preview on smaller screens.
 */
export const togglePreview = () => {
    return {
        type: TOGGLE_PREVIEW,
    }
}
