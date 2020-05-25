export const transformThemeNames = (themeName) => {
    /* let trimmedStr = themeName
        .replace(/([A-Z])/g, ' $1')
        .trim()
        .toLowerCase()
        .split(/[^A-Za-z0-9-]+/gim) */

    let trimmedStr = themeName
        .replace(/(\s)/g, ' $1')
        .trim()
        .toLowerCase()
        .split(/[^A-Za-z0-9-]+/gim)

    let spinalCased = trimmedStr.filter(function (word) {
        return word.length !== 0
    })

    return spinalCased.join('_')
}
