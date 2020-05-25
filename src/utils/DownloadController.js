/**
 * To initiate the download of markdown content as a file with .md extension.
 * @param {string} content - The content to be downloaded.
 */
export const downloadControllerMarkdown = (content) => {
    const element = document.createElement('a')
    const file = new File([content], {
        type: 'text/markdown',
    })

    element.href = URL.createObjectURL(file)
    element.download = 'markdown.md'

    // This is needed to work in Firefox.
    document.body.appendChild(element)

    element.click()
}
