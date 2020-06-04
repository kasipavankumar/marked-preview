import React, { Fragment } from 'react'
import ReactDOMServer from 'react-dom/server'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import marked from 'marked'
import DOMPurify from 'dompurify'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import Typography from '@material-ui/core/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import EmptyPreview from '../../static/illustrations/EmptyPreview/empty_preview.png'

const mapStateToProps = (state) => {
    return {
        previewContent: state.preview.content,
        showPreview: state.preview.show,
    }
}

const renderer = new marked.Renderer()

renderer.table = (header, body) => {
    const htmlString = ReactDOMServer.renderToString(
        <TableContainer>
            <Table>
                <TableHead>
                    ${header}
                    <TableRow>
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>{body}</TableBody>
            </Table>
        </TableContainer>
    )

    return `
        <div class="MuiPaper-root MuiTableContainer-root MuiPaper-elevation1 MuiPaper-rounded">
            <table class="MuiTable-root">
                <thead class="MuiTableHead-root">
                    ${header}
                </thead>
                <tbody class="MuiTableBody-root">
                    ${body}
                </tbody>
            </table>
        </div>
    `
}

renderer.tablerow = (content) => {
    return `<tr class="MuiTableRow-root MuiTableRow-head">${content}</tr>`
}

renderer.tablecell = (content, flags) => {
    const cellTag = flags.header ? `MuiTableCell-head` : `MuiTableCell-body`
    return `<th class="MuiTableCell-root ${cellTag}">${content}</th>`
}

renderer.image = (href, title, text) => {
    return `<img data-src="${href}" class="lazyload" alt="${text}" />`
}

renderer.link = (href, title, text) => {
    const internalLinks = ['https://markedpreview.web.app']
    let relAttributes = ''

    if (internalLinks.some((domain) => href.indexOf(domain) === -1)) {
        relAttributes = 'target="_blank" rel="noopener noreferrer"'
    }

    return `<a href="${href}" ${relAttributes}>${text}</a>`
}

const Preview = ({ content, previewContent, showPreview }) => {
    const responsivePreviewMQ = useMediaQuery('(max-width: 620px)')

    return (
        <Fragment>
            <PreviewMain
                isMq={responsivePreviewMQ}
                isContentEmpty={content.length === 0}
                content={content}
                previewContent={previewContent}
                show={showPreview}
            />
        </Fragment>
    )
}

Preview.propTypes = {
    content: PropTypes.string.isRequired,
    previewContent: PropTypes.string.isRequired,
    showPreview: PropTypes.bool.isRequired,
}

const PreviewMain = (props) => {
    const { isMq, show, isContentEmpty, previewContent, content } = props
    const previewDesktop = !isContentEmpty && !isMq && `preview__desktop`
    const previewMobile = show && !isContentEmpty && isMq && `preview__mobile`
    const showPreview = !show && isMq && `preview__display_none`
    const previewClasses = `preview ${previewDesktop} ${previewMobile} ${showPreview}`

    if (isContentEmpty) {
        if (isMq) {
            return show && <EmptyPreviewIllustration />
        }

        return <EmptyPreviewIllustration />
    }

    return (
        <Fragment>
            <div
                id="preview"
                style={{
                    display: 'none',
                }}
                dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                        marked(previewContent, {
                            gfm: true,
                            breaks: true,
                        })
                    ),
                }}
            />

            <div
                id="md_preview"
                className={previewClasses}
                dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                        marked(content, {
                            gfm: true /** Enables Github flavoured markdown. */,
                            breaks: true /** Intreprets line breaks (\n) as <br /> */,
                            renderer,
                        })
                    ),
                }}
            />
        </Fragment>
    )
}

PreviewMain.propTypes = {
    isMq: PropTypes.bool.isRequired,
    isContentEmpty: PropTypes.bool.isRequired,
    show: PropTypes.bool.isRequired,
    previewContent: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
}

/**
 * Displays an illustration when there is no content in the editor.
 */
const EmptyPreviewIllustration = () => (
    <div className="preview preview__empty preview__fade_in">
        <img src={EmptyPreview} alt="Editor has no content." />
        <Typography variant="h6" color="primary">
            {/* Nothing to preview. <br /> Add something to the editor. */}
            Heads up! There is nothing to preview.
        </Typography>
    </div>
)

export default connect(mapStateToProps, null)(Preview)
