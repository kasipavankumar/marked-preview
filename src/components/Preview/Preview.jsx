import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import marked from 'marked'
import DOMPurify from 'dompurify'
import Typography from '@material-ui/core/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import EmptyPreview from '../../static/illustrations/EmptyPreview/empty_preview.png'

const mapStateToProps = (state) => {
    return {
        previewContent: state.preview.content,
        showPreview: state.preview.show,
    }
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

    const renderer = {
        image(href, title, text) {
            return `
                <img data-src="${href}" class="lazyload" alt="${text}" />
            `
        },
    }

    marked.use({ renderer })

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
