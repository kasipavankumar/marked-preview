import React, { useState, Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import MuiAlert from '@material-ui/lab/Alert'
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Snackbar,
} from '@material-ui/core'

import { downloadControllerMarkdown } from '../../utils/DownloadController'

/**
 * Prompt for filename & call download handler.
 * @param {object} props - The properties.
 */
const DownloadHandlerDialog = (props) => {
    const { handleClose, open, content } = props
    const [fileName, setFileName] = useState(null)
    const [snackbarOpenStatus, setSnackbarOpenStatus] = useState(open)
    const [hasValidFileName, setFileNameValidity] = useState(true)

    const handleCancelClick = () => {
        handleClose()
        downloadControllerMarkdown('', null)
    }

    const handleTextFieldChange = (event) => {
        let { value } = event.target

        if (value.length === 0) {
            setFileNameValidity(true)
        } else {
            setFileNameValidity(false)
            setFileName(value)
        }
    }

    const handleDownloadClick = () => {
        handleClose()
        downloadControllerMarkdown(content, fileName)
    }

    const handleSnackbarClose = () => {
        setSnackbarOpenStatus(false)
        handleClose()
    }

    useEffect(() => {
        setSnackbarOpenStatus(open)
    }, [open])

    if (content.length === 0) {
        return (
            <Fragment>
                <Snackbar
                    open={snackbarOpenStatus}
                    autoHideDuration={2500}
                    onClose={handleSnackbarClose}>
                    <MuiAlert
                        style={{ flexGrow: 1 }}
                        elevation={6}
                        variant="filled"
                        severity="warning">
                        Nothing to download.
                    </MuiAlert>
                </Snackbar>
            </Fragment>
        )
    }

    return (
        <Fragment>
            <Dialog
                id="download-handle-dialog"
                open={open}
                onClose={handleClose}
                aria-labelledby="download-handle-dialog">
                <DialogTitle>Filename</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Provide a name for the file to be downloaded.
                    </DialogContentText>
                    <DialogContentText>
                        For example, "Awesome Markdown" will result in a download of
                        "Awesome Markdown.md"
                    </DialogContentText>
                    <TextField
                        required
                        fullWidth
                        autoFocus
                        helperText="Extension (.md) will added to download."
                        margin="dense"
                        id="download-file-name"
                        label="Filename"
                        type="text"
                        onChange={handleTextFieldChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelClick} color="primary">
                        Cancel
                    </Button>

                    <Button
                        disabled={hasValidFileName}
                        onClick={handleDownloadClick}
                        color="primary">
                        Download
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

DownloadHandlerDialog.propTypes = {
    handleClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    content: PropTypes.string.isRequired,
}

export default DownloadHandlerDialog
