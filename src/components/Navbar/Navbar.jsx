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
import VisibilityIcon from '@material-ui/icons/VisibilityRounded'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOffRounded'

// Shared components.
import { ThemeSelectorDialogContainer } from '../Editor/Theme/EditorThemeSelector'
import DownloadHandlerDialog from '../DownloadHandlerDialog/DownloadHandlerDialog'

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
    titleLink: {
        display: 'inline-flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    svgFillWhite: {
        fill: 'white',
    },
    visibilityIconButton: {
        marginRight: '10px',
    },
    settingsIconButton: {
        padding: 0,
    },
}))

/**
 * Markdown logo sourced from Github Octicons.
 * @param {object} props - Properties.
 * @see {@link https://primer.style/octicons/markdown Github Octicons}
 */
const MarkdownLogo = (props) => (
    <svg viewBox="0 0 16 16" width={26} height={26} {...props}>
        <path
            fillRule="evenodd"
            d="M14.85 3H1.15C.52 3 0 3.52 0 4.15v7.69C0 12.48.52 13 1.15 13h13.69c.64 0 1.15-.52 1.15-1.15v-7.7C16 3.52 15.48 3 14.85 3zM9 11H7V8L5.5 9.92 4 8v3H2V5h2l1.5 2L7 5h2v6zm2.99.5L9.5 8H11V5h2v3h1.5l-2.51 3.5z"
        />
    </svg>
)

/** Top Appbar.
 * @param {object} props - Properties.
 * @param {Function} togglePreview - Redux action to toggle preview on mobile screens.
 * @param {Function} onEditorClear - Redux action to clear the editor content.
 */
const Navbar = (props) => {
    const classes = useStyles()

    /** Anchor element for Menu. */
    const [anchorElement, setAnchorElement] = useState(null)

    /** Boolean value indicating whether menu is open. */
    const open = Boolean(anchorElement)

    /** Boolean value based on useMediaQuery which programmatically
     * shows/hides preview icon.
     */
    const showPreviewIcon = useMediaQuery('(max-width: 620px)')

    /** Grab current editor content for DownloadController. */
    const currentEditorContent = useSelector((state) => state.editor.content)

    /** Grab current preview visibility status. */
    const previewVisibilityState = useSelector((state) => state.preview.show)

    /** Boolean value for theme selector dropdown. */
    const [themeSelectorOpen, setThemeSelectorOpen] = useState(false)

    /** Currently selected theme value. */
    const [themeSelectedValue, setThemeSelectedValue] = useState('')

    /** Download handle dialog open status */
    const [downloadDialogOpenStatus, setDownloadDialogOpenStatus] = useState(false)

    const handleClick = (event) => {
        setAnchorElement(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorElement(null)
    }

    const handleClearEditor = () => {
        handleClose()
        props.onEditorClear()
    }

    const handleThemeSelectorOpen = () => {
        handleClose()
        setThemeSelectorOpen(true)
    }

    const handleThemeSelectorClose = (value) => {
        setThemeSelectorOpen(false)
        setThemeSelectedValue(value)
    }

    const handleDownloadDialogOpen = () => {
        handleClose()
        setDownloadDialogOpenStatus(true)
    }

    const handleDownloadDialogClose = () => {
        setDownloadDialogOpenStatus(false)
    }

    return (
        <div className={`${classes.root} navbar`}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <a className={classes.titleLink} href="/">
                            <MarkdownLogo className={classes.svgFillWhite} />
                            <span style={{ marginLeft: '5px' }}>Preview</span>
                        </a>
                    </Typography>

                    {showPreviewIcon && (
                        <ToolTip title="Preview">
                            {!previewVisibilityState ? (
                                <IconButton
                                    className={classes.visibilityIconButton}
                                    onClick={props.togglePreview}>
                                    <VisibilityIcon
                                        className={classes.svgFillWhite}
                                    />
                                </IconButton>
                            ) : (
                                <IconButton
                                    className={classes.visibilityIconButton}
                                    onClick={props.togglePreview}>
                                    <VisibilityOffIcon
                                        className={classes.svgFillWhite}
                                    />
                                </IconButton>
                            )}
                        </ToolTip>
                    )}

                    <ToolTip title="Settings">
                        <IconButton
                            className={classes.settingsIconButton}
                            onClick={handleClick}>
                            <SettingsIcon className={classes.svgFillWhite} />
                        </IconButton>
                    </ToolTip>

                    <Menu anchorEl={anchorElement} open={open} onClose={handleClose}>
                        <MenuItem onClick={handleThemeSelectorOpen}>
                            Choose Theme
                        </MenuItem>

                        <MenuItem onClick={handleDownloadDialogOpen}>
                            Download Markdown
                        </MenuItem>

                        <MenuItem onClick={handleClearEditor}>Clear Editor</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            <ThemeSelectorDialogContainer
                selectedValue={themeSelectedValue}
                open={themeSelectorOpen}
                onClose={handleThemeSelectorClose}
            />

            <DownloadHandlerDialog
                open={downloadDialogOpenStatus}
                handleClose={handleDownloadDialogClose}
                content={currentEditorContent}
            />
        </div>
    )
}

Navbar.propTypes = {
    togglePreview: PropTypes.func.isRequired,
    onEditorClear: PropTypes.func.isRequired,
}

export default connect(null, mapDispatchToProps)(Navbar)
