/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

 const siteMetadata = require('./config/metadata');

module.exports = {
  /* Your site config here */
  siteMetadata,
  plugins: [
    // Provides drop-in support for server rendering data added with React Helmet.
    // React Helmet is a component which lets you control your document head using their React component.
    // With this plugin, attributes you add in their component, e.g. title, meta attributes, etc. will get added to the static HTML pages Gatsby builds.
    // This is important not just for site viewers, but also for SEO — title and description metadata stored in the document head is a key component used 
    //by Google in determining placement in search results.
    `gatsby-plugin-react-helmet`,
    // soh gera na hora do build
    `gatsby-plugin-sitemap`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // config pwa
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Nomedaempresa`,
        short_name: `Nome`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#a2466c`,
        display: `standalone`,
        // tem que colocar essa uma imagem nesse path
        // icon: `src/images/icon.png` //512 x 512 ele jah gera todos os tamanhos de icones pros
        // diferentesc casos de tamanho 
      },
    },
    
    // pra criar pwa
    `gatsby-plugin-offline`,
    {
      // loading que aparece em cima do browser
      resolve: `gatsby-plugin-nprogress`,
      options: {
        // Setting a color is optional.
        color: `#7159c1`,
        // Disable the loading spinner.
        showSpinner: false,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: "YOUR_GOOGLE_ANALYTICS_TRACKING_ID",
      },
    },
    // plugin do google fonts nao ta atualizado, tava dando problema entao tiramos
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        displayName: process.env.NODE_ENV !== 'production'
      },
    },
    {
      resolve: `gatsby-plugin-page-creator`,
      options: {
        path: `${__dirname}/src/pages`,
        ignore: [`**/styles.js`],
      },
    },
  ]
}
