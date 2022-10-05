import Helmet from 'react-helmet'
import project from '../../package.json'

const SEO = () => {
    const seo = Object.freeze({
        name: 'Marked Preview',
        title: 'Marked Preview',
        description: 'Instant markdown preview in delightful Material Design.',
        image:
            'https://og-image.vercel.app/Marked%20Preview.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg&images=https%3A%2F%2Fraw.githubusercontent.com%2Fkasipavankumar%2Fmarked-preview%2Fmaster%2Fpublic%2Fmarkdown.svg',
        URL: 'https://markedpreview.web.app',
        locale: `en_US`,
        type: `website`,
        twitterUsername: 'dkpk_',
    })

    return (
        <Helmet
            title={seo.title}
            link={[
                {
                    rel: `canonical`,
                    href: seo.URL,
                },
                {
                    rel: 'preconnect',
                    href: 'https://fonts.gstatic.com',
                },
            ]}>
            <html key="base-html" lang="en" dir="ltr" app-version={project.version} />
            <meta name="robots" content="index, follow" />
            <meta name="description" content={seo.description} />
            <meta name="image" content={seo.image} />

            {/* Open Graph: Start*/}
            {seo.URL && <meta property="og:url" content={seo.URL} />}
            {seo.title && <meta property="og:title" content={seo.title} />}
            {seo.description && (
                <meta property="og:description" content={seo.description} />
            )}
            {seo.image && <meta property="og:image" content={seo.image} />}
            {seo.locale && <meta property="og:locale" content={seo.locale} />}
            {seo.type && <meta property="og:type" content={seo.type} />}
            {seo.name && <meta property="og:site_name" content={seo.name} />}
            {/* Open Graph: End */}

            {/* Twitter: Start */}
            <meta name="twitter:card" content="summary_large_image" />
            {seo.twitterUsername && (
                <meta name="twitter:creator" content={seo.twitterUsername} />
            )}
            {seo.title && <meta name="twitter:title" content={seo.title} />}
            {seo.description && (
                <meta name="twitter:description" content={seo.description} />
            )}
            {seo.image && <meta name="twitter:image" content={seo.image} />}
            {/* Twitter: End */}
        </Helmet>
    )
}

export default SEO
