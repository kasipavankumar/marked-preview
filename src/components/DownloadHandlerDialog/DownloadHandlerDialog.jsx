import React, { useState, Fragment } from 'react'
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core'

import { downloadControllerMarkdown } from '../../utils/DownloadController'

const DownloadHandlerDialog = (props) => {
    const [fileName, setFileName] = useState(null)
    const { handleClose, open, content } = props

    const handleCancelClick = () => {
        handleClose()
        downloadControllerMarkdown('', null)
    }

    const handleTextFieldChange = (event) => {
        setFileName(event.target.value)
    }

    const handleDownloadClick = () => {
        handleClose()
        downloadControllerMarkdown(content, fileName)
    }

    return (
        <Fragment>
            <Dialog
                id="download-handle-dialog"
                open={open}
                onClose={handleClose}
                aria-labelledby="download-handle-dialog">
                <DialogTitle>File Name</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        What should we name your markdown file?
                    </DialogContentText>
                    <TextField
                        fullWidth
                        autoFocus
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

                    <Button onClick={handleDownloadClick} color="primary">
                        Download
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default DownloadHandlerDialog
