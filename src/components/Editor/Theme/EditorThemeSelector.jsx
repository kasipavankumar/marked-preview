import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContentText from '@material-ui/core/DialogContentText'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

import { themes } from './data/AvailableThemes'

import { changeEditorTheme } from '../../../redux/actions'

import { transformThemeNames } from '../../../utils/TransformThemeNames'

const mapDispatchToProps = (dispatch) => {
    return {
        onEditorThemeChange: (theme) => dispatch(changeEditorTheme(theme)),
    }
}

const ThemeSelectorDialog = (props) => {
    const { onClose, selectedValue, open } = props

    const handleClose = () => {
        onClose(selectedValue)
    }

    const originalEditorThemeValue = 'originalEditorThemeValue'

    const defaultThemeValue =
        localStorage.getItem(originalEditorThemeValue) || 'iPlastic'

    const [editorTheme, setEditorTheme] = useState(defaultThemeValue)

    const handleSelectChange = (event) => {
        setEditorTheme(event.target.value)
        localStorage.setItem(originalEditorThemeValue, event.target.value)
    }

    const handleEditorThemeChange = () => {
        props.onEditorThemeChange(transformThemeNames(editorTheme))
        handleClose()
    }

    return (
        <Dialog
            onClose={handleClose}
            aria-labelledby="Theme selector dialog"
            open={open}>
            <DialogContent
                style={{
                    padding: '1rem',
                }}>
                <DialogContentText>Select Editor Theme</DialogContentText>
                <FormControl
                    style={{ width: '100%', height: 'auto' }}
                    variant="outlined">
                    <Select value={editorTheme} onChange={handleSelectChange}>
                        {themes.map((theme) => (
                            <MenuItem key={theme} value={theme}>
                                {theme}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button
                    color="primary"
                    onClick={() => handleEditorThemeChange()}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}

ThemeSelectorDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
}

const ThemeSelectorDialogContainer = connect(
    null,
    mapDispatchToProps
)(ThemeSelectorDialog)

const EditorThemeSelector = () => {
    const [open, setOpen] = useState(false)
    const [selectedValue, setSelectedValue] = useState(themes[1])

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = (value) => {
        setOpen(false)
        setSelectedValue(value)
    }

    return (
        <div>
            <MenuItem onClick={handleClickOpen}>Choose Theme</MenuItem>
            <ThemeSelectorDialogContainer
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
            />
        </div>
    )
}

export { ThemeSelectorDialogContainer }
export default EditorThemeSelector
