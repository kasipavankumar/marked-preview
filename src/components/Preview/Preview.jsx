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
    const previewDesktop = show && !isContentEmpty && !isMq && `preview__desktop`
    const previewMobile = show && !isContentEmpty && isMq && `preview__mobile`

    const previewClassnames = `preview ${previewDesktop} ${previewMobile}`

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
                className={previewClassnames}
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
}

PreviewMain.propTypes = {
    isMq: PropTypes.bool.isRequired,
    isContentEmpty: PropTypes.bool.isRequired,
    show: PropTypes.bool.isRequired,
    previewContent: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
}

const EmptyPreviewIllustration = () => (
    <div className={`preview preview__empty`}>
        <img src={EmptyPreview} alt="Editor has no content." />
        <Typography variant="button" color="error">
            Nothing to preview. <br /> Add something to the editor.
        </Typography>
    </div>
)

export default connect(mapStateToProps, null)(Preview)
