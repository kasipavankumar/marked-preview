import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import marked from 'marked'
import DOMPurify from 'dompurify'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const mapStateToProps = (state) => {
    return {
        previewContent: state.preview.content,
        showPreview: state.preview.show,
    }
}

const Preview = ({ content, previewContent, showPreview }) => {
    const responsivePreviewMQ = useMediaQuery('(max-width: 620px)')

    if (responsivePreviewMQ) {
        return showPreview && <PreviewMobile content={content} />
    }

    return <PreviewDesktop content={content} previewContent={previewContent} />
}

Preview.propTypes = {
    content: PropTypes.string.isRequired,
    previewContent: PropTypes.string.isRequired,
    showPreview: PropTypes.bool.isRequired,
}

const PreviewDesktop = ({ content, previewContent }) => (
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
            className="preview preview__desktop"
            dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                    marked(content, {
                        gfm: true /** To enable Github flavoured markdown. */,
                        breaks: true /** Intreprets \n as <br /> */,
                    })
                ),
            }}
        />
    </Fragment>
)

PreviewDesktop.propTypes = {
    content: PropTypes.string.isRequired,
    previewContent: PropTypes.string.isRequired,
}

const PreviewMobile = ({ content }) => (
    <Fragment>
        <div
            id="md_preview"
            className="preview preview__mobile"
            dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                    marked(content, {
                        gfm: true /** To enable Github flavoured markdown. */,
                        breaks: true /** Intreprets \n as <br /> */,
                    })
                ),
            }}
        />
    </Fragment>
)

PreviewMobile.propTypes = {
    content: PropTypes.string.isRequired,
}

export default connect(mapStateToProps)(Preview)
