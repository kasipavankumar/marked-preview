import { motivationalQuotes } from './quotes.json'

/**
 * Quotes sourced from
 * {@link https://github.com/freeCodeCamp/freeCodeCamp/blob/master/client/src/utils/words.json freeCodeCamp's Repository}.
 * @returns a random quote.
 */
const getRandomQuote = () =>
    motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]

const randomQuote = getRandomQuote()
const currentYear = new Date().getFullYear()

/**
 * Default placeholder text shown on the first visit of the site.
 */
export const placeholderText = `# 👋, Welcome to Markdown Preview

## Get instant preview of what you type in the editor. ⚡

That being said, [Undesign](https://undesign.learn.uno/) is a place where you can find intriguing developer resources.

How about getting a random value from an array, arr?
\`Math.floor(Math.random() * arr.length)\`

🖥️ **PC Shopping List**
1. [ ] Intel Core i5 10600K
2. [ ] Asus ROG Strix Z490F
3. [x] G.Skill TridentZ 32GB DDR4 @ 3200MHz
4. [x] Samsung 970 Pro, 1TB NVMe PCIe SSD
5. [x] Seagate Firecuda 2TB SSHD
6. [ ] MSI | Nvidia RTX 2070 Super
7. [x] NZXT H510 Elite
8. [x] Corsair RM750

Here is a random quote for you -
> ${randomQuote.quote}
> <span>${randomQuote.author}</span>

\`\`\`javascript
const Say = ({ message }) => (
    <React.Fragment>
        <h1>{message}</h1>
    </React.Fragment>
)
\`\`\`

An image that can be your next wallpaper. 📷
![Image by Paweł Czerwiński on Unsplash](https://images.unsplash.com/photo-1590508965885-90c5502bd6f4)

You can take a look at the source code over at [Github](https://github.com/code-plus-coffee/marked-preview) or maybe, play around with the code on [Codesandbox](https://codesandbox.io/s/1ekvy).

**Code Plus Coffee • ${currentYear}**
`
