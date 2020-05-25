import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContentText from '@material-ui/core/DialogContentText'
import FormControl from '@material-ui/core/FormControl'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

import { themes } from './data/AvailableThemes'

const ThemeSelectorDialog = (props) => {
    const { onClose, selectedValue, open } = props

    const handleClose = () => {
        onClose(selectedValue)
    }

    const [editorTheme, setEditorTheme] = useState('Github')

    const handleSelectChange = (event) => {
        setEditorTheme(event.target.value)
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
                <DialogContentText>
                    <Typography variant="body">Select Editor Theme</Typography>
                </DialogContentText>
                <FormControl
                    style={{ width: '100%', height: 'auto' }}
                    variant="outlined">
                    <Select value={editorTheme} onChange={handleSelectChange}>
                        {themes.map((theme) => (
                            <MenuItem value={theme}>{theme}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button color="primary">Cancel</Button>
                <Button color="primary">Save</Button>
            </DialogActions>
        </Dialog>
    )
}

ThemeSelectorDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
}

const EditorThemeSelector = () => {
    const [open, setOpen] = React.useState(false)
    const [selectedValue, setSelectedValue] = React.useState(themes[1])

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
            <ThemeSelectorDialog
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
            />
        </div>
    )
}

export default EditorThemeSelector
