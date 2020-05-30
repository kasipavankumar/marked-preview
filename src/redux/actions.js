import {
    CHANGE_EDITOR_THEME,
    CHANGE_EDITOR_CONTENT,
    CHANGE_PREVIEW_CONTENT,
    CLEAR_EDITOR,
    TOGGLE_PREVIEW,
    INITIALIZE_EDITOR,
} from './constants'

/** Action to initialize the editor. */
export const initializeEditor = () => ({ type: INITIALIZE_EDITOR })

/** Action to clear the editor content. */
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

/** Action to set preview content on change. */
export const setPreviewContent = (text) => {
    return {
        type: CHANGE_PREVIEW_CONTENT,
        payload: text,
    }
}

/** Action to toggle preview on smaller screens. */
export const togglePreview = () => {
    return {
        type: TOGGLE_PREVIEW,
    }
}

/** Action to change editor theme. */
export const changeEditorTheme = (theme) => {
    localStorage.setItem('editorTheme', JSON.stringify(theme))

    return {
        type: CHANGE_EDITOR_THEME,
        payload: theme,
    }
}
