import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import ToolTip from '@material-ui/core/Tooltip'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import SettingsIcon from '@material-ui/icons/Settings'
import VisibilityIcon from '@material-ui/icons/Visibility'

// Shared components.
import { ThemeSelectorDialogContainer } from '../Editor/Theme/EditorThemeSelector'

// Utility functions.
import { downloadControllerMarkdown } from '../../utils/DownloadController'

// Redux.
import { clearEditor, togglePreview } from '../../redux/actions'

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

const Logo = (props) => (
    <svg viewBox="0 0 16 16" width={26} height={26} {...props}>
        <path
            fillRule="evenodd"
            d="M14.85 3H1.15C.52 3 0 3.52 0 4.15v7.69C0 12.48.52 13 1.15 13h13.69c.64 0 1.15-.52 1.15-1.15v-7.7C16 3.52 15.48 3 14.85 3zM9 11H7V8L5.5 9.92 4 8v3H2V5h2l1.5 2L7 5h2v6zm2.99.5L9.5 8H11V5h2v3h1.5l-2.51 3.5z"
        />
    </svg>
)

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

    const handleDownloadMarkdown = () => {
        downloadControllerMarkdown(currentEditorContent)
        handleClose()
    }

    const [themeSelectorOpen, setThemeSelectorOpen] = useState(false)
    const [themeSelectedValue, setThemeSelectedValue] = useState('')

    const handleThemeSelectorOpen = () => {
        handleClose()
        setThemeSelectorOpen(true)
    }

    const handleThemeSelectorClose = (value) => {
        setThemeSelectorOpen(false)
        setThemeSelectedValue(value)
    }

    return (
        <div className={`${classes.root} navbar`}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <a
                            href="/"
                            style={{
                                display: 'inline-flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                            <Logo fill={'white'} />
                            <span style={{ marginLeft: '5px' }}>Preview</span>
                        </a>
                    </Typography>

                    {showPreviewIcon && (
                        <ToolTip title="Preview">
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
                        </ToolTip>
                    )}

                    <ToolTip title="Settings">
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
                    </ToolTip>

                    <Menu
                        anchorEl={anchorElement}
                        open={open}
                        onClose={handleClose}>
                        {/* <EditorThemeSelector /> */}
                        <MenuItem onClick={handleThemeSelectorOpen}>
                            Choose Theme
                        </MenuItem>
                        <MenuItem onClick={() => handleDownloadMarkdown()}>
                            Download Markdown
                        </MenuItem>
                        <MenuItem onClick={handleClearEditor}>
                            Clear Editor
                        </MenuItem>
                    </Menu>
                </Toolbar>

                <ThemeSelectorDialogContainer
                    selectedValue={themeSelectedValue}
                    open={themeSelectorOpen}
                    onClose={handleThemeSelectorClose}
                />
            </AppBar>
        </div>
    )
}

Navbar.propTypes = {
    togglePreview: PropTypes.func.isRequired,
    onEditorClear: PropTypes.func.isRequired,
}

export default connect(null, mapDispatchToProps)(Navbar)
