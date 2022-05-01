import quotes from './quotes.json'

/**
 * Quotes sourced from
 * {@link https://github.com/freeCodeCamp/freeCodeCamp/blob/master/client/src/utils/words.json freeCodeCamp's Repository}.
 * @returns a random quote.
 */
const getRandomQuote = () => {
    const motivationalQuotes = quotes.motivationalQuotes

    return motivationalQuotes[
        Math.floor(Math.random() * motivationalQuotes.length)
    ]
}

const randomQuote = getRandomQuote()
const currentYear = new Date().getFullYear()

/**
 * Default placeholder text shown on the first visit of the site.
 */
export const placeholderText = `# 👋, Welcome to Marked Preview

## Get instant preview of the markdown you type in the editor. ⚡

That being said, [Undesign](https://undesign.learn.uno) is a place where you can find intriguing developer resources.

How about getting a random value from an array, arr?
\`Math.floor(Math.random() * arr.length)\`

🖥️ **PC Shopping List**
1. [ ] AMD Ryzen 7 5800X
2. [ ] Asus ROG Strix B550-F Gaming
3. [x] G.Skill TridentZ 32GB DDR4 @ 3600MHz
4. [x] Samsung 970 Pro, 1TB NVMe PCIe SSD
5. [x] Seagate Firecuda 2TB SSHD
6. [ ] MSI | Nvidia RTX 2070 Super
7. [x] NZXT H510 Elite
8. [x] Corsair RM850

Here is a random quote for you -
> ${randomQuote.quote}
> <span>${randomQuote.author}</span>

\`\`\`javascript
const Say = ({ message }) => (
    <>
        <h1>{message}</h1>
    </>
)
\`\`\`

An image that can be your next wallpaper. 📷
![Random Image from Unsplash](https://source.unsplash.com/1920x1080/?textures-patterns)

You can take a look at the source code over at [Github](https://github.com/kasipavankumar/marked-preview) or maybe, play around with the code on [Codesandbox](https://codesandbox.io/s/1ekvy).

**DKP. Kumar • ${currentYear}**
`
