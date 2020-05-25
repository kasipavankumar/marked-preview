import React, { useState } from 'react'
import { connect, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import SettingsIcon from '@material-ui/icons/Settings'
import VisibilityIcon from '@material-ui/icons/Visibility'

import EditorThemeSelector from '../Editor/Theme/EditorThemeSelector'

import { clearEditor, togglePreview } from '../../redux/actions'

import './Navbar.scss'

const mapDispatchToProps = (dispatch) => {
    return {
        onEditorClear: () => dispatch(clearEditor()),
        togglePreview: () => dispatch(togglePreview()),
    }
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}))

/**
 * Navbar component.
 */
const Navbar = (props) => {
    const classes = useStyles()
    const showPreviewIcon = useMediaQuery('(max-width: 620px)')
    const [anchorElement, setAnchorElement] = useState(null)
    const open = Boolean(anchorElement)

    const handleClick = (event) => {
        setAnchorElement(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorElement(null)
    }

    const handleClearEditor = () => {
        props.onEditorClear()
        handleClose()
    }

    const currentEditorContent = useSelector((state) => state.editor.content)

    const downloadMarkdown = () => {
        const element = document.createElement('a')
        const file = new Blob([currentEditorContent], {
            type: 'text/markdown',
        })
        element.href = URL.createObjectURL(file)
        element.download = 'test.md'
        document.body.appendChild(element)
        element.click()
        handleClose()
    }

    return (
        <div className={`${classes.root} navbar`}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <a href="/">Markdown Preview</a>
                    </Typography>
                    {showPreviewIcon && (
                        <IconButton
                            onClick={props.togglePreview}
                            style={{
                                marginRight: '10px',
                            }}>
                            <VisibilityIcon
                                style={{
                                    fill: 'white',
                                }}
                            />
                        </IconButton>
                    )}
                    <IconButton
                        onClick={handleClick}
                        style={{
                            padding: '0',
                        }}>
                        <SettingsIcon
                            style={{
                                fill: 'white',
                            }}
                        />
                    </IconButton>
                    <Menu
                        anchorEl={anchorElement}
                        open={open}
                        onClose={handleClose}>
                        <EditorThemeSelector />
                        <MenuItem onClick={() => downloadMarkdown()}>
                            Download Markdown
                        </MenuItem>
                        <MenuItem onClick={handleClearEditor}>
                            Clear Editor
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default connect(null, mapDispatchToProps)(Navbar)
