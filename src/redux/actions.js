import { CHANGE_EDITOR_CONTENT, CLEAR_EDITOR } from './constants'

export const clearEditor = () => ({ type: CLEAR_EDITOR })

export const setEditorContent = (text) => {
    localStorage.setItem('editorContent', JSON.stringify(text))

    return {
        type: CHANGE_EDITOR_CONTENT,
        payload: text,
    }
}
