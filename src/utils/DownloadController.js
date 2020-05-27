/**
 * ### Initiates download of .md file.
 * @param {string} content - The content to be downloaded.
 * @param {string} filename - Name which will be used to download.
 */
export const downloadControllerMarkdown = (content, filename) => {
    if (filename !== null) {
        const element = document.createElement('a')
        const file = new File([content], {
            type: 'text/markdown',
        })

        element.href = URL.createObjectURL(file)
        // element.download = 'markdown.md'
        element.download = `${filename}.md`

        // This is needed to work in Firefox.
        document.body.appendChild(element)

        element.click()
    } else {
        return
    }
}
