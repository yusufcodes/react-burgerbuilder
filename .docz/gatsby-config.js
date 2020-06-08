const { mergeWith } = require('docz-utils')
const fs = require('fs-extra')

let custom = {}
const hasGatsbyConfig = fs.existsSync('./gatsby-config.custom.js')

if (hasGatsbyConfig) {
  try {
    custom = require('./gatsby-config.custom')
  } catch (err) {
    console.error(
      `Failed to load your gatsby-config.js file : `,
      JSON.stringify(err),
    )
  }
}

const config = {
  pathPrefix: '/',

  siteMetadata: {
    title: 'Burger',
    description: 'My awesome app using docz',
  },
  plugins: [
    {
      resolve: 'gatsby-theme-docz',
      options: {
        themeConfig: {},
        src: './',
        gatsbyRoot: null,
        themesDir: 'src',
        mdxExtensions: ['.md', '.mdx'],
        docgenConfig: {},
        menu: [],
        mdPlugins: [],
        hastPlugins: [],
        ignore: [],
        typescript: false,
        ts: false,
        propsParser: true,
        'props-parser': true,
        debug: false,
        native: false,
        openBrowser: null,
        o: null,
        open: null,
        'open-browser': null,
        root:
          'C:\\Users\\YUSUF\\Documents\\Self Study\\React\\React - The Complete Guide\\Course Projects\\burger\\.docz',
        base: '/',
        source: './',
        'gatsby-root': null,
        files: '**/*.{md,markdown,mdx}',
        public: '/public',
        dest: '.docz/dist',
        d: '.docz/dist',
        editBranch: 'master',
        eb: 'master',
        'edit-branch': 'master',
        config: '',
        title: 'Burger',
        description: 'My awesome app using docz',
        host: 'localhost',
        port: 3000,
        p: 3000,
        separator: '-',
        paths: {
          root:
            'C:\\Users\\YUSUF\\Documents\\Self Study\\React\\React - The Complete Guide\\Course Projects\\burger',
          templates:
            'C:\\Users\\YUSUF\\Documents\\Self Study\\React\\React - The Complete Guide\\Course Projects\\burger\\node_modules\\docz-core\\dist\\templates',
          docz:
            'C:\\Users\\YUSUF\\Documents\\Self Study\\React\\React - The Complete Guide\\Course Projects\\burger\\.docz',
          cache:
            'C:\\Users\\YUSUF\\Documents\\Self Study\\React\\React - The Complete Guide\\Course Projects\\burger\\.docz\\.cache',
          app:
            'C:\\Users\\YUSUF\\Documents\\Self Study\\React\\React - The Complete Guide\\Course Projects\\burger\\.docz\\app',
          appPackageJson:
            'C:\\Users\\YUSUF\\Documents\\Self Study\\React\\React - The Complete Guide\\Course Projects\\burger\\package.json',
          appTsConfig:
            'C:\\Users\\YUSUF\\Documents\\Self Study\\React\\React - The Complete Guide\\Course Projects\\burger\\tsconfig.json',
          gatsbyConfig:
            'C:\\Users\\YUSUF\\Documents\\Self Study\\React\\React - The Complete Guide\\Course Projects\\burger\\gatsby-config.js',
          gatsbyBrowser:
            'C:\\Users\\YUSUF\\Documents\\Self Study\\React\\React - The Complete Guide\\Course Projects\\burger\\gatsby-browser.js',
          gatsbyNode:
            'C:\\Users\\YUSUF\\Documents\\Self Study\\React\\React - The Complete Guide\\Course Projects\\burger\\gatsby-node.js',
          gatsbySSR:
            'C:\\Users\\YUSUF\\Documents\\Self Study\\React\\React - The Complete Guide\\Course Projects\\burger\\gatsby-ssr.js',
          importsJs:
            'C:\\Users\\YUSUF\\Documents\\Self Study\\React\\React - The Complete Guide\\Course Projects\\burger\\.docz\\app\\imports.js',
          rootJs:
            'C:\\Users\\YUSUF\\Documents\\Self Study\\React\\React - The Complete Guide\\Course Projects\\burger\\.docz\\app\\root.jsx',
          indexJs:
            'C:\\Users\\YUSUF\\Documents\\Self Study\\React\\React - The Complete Guide\\Course Projects\\burger\\.docz\\app\\index.jsx',
          indexHtml:
            'C:\\Users\\YUSUF\\Documents\\Self Study\\React\\React - The Complete Guide\\Course Projects\\burger\\.docz\\app\\index.html',
          db:
            'C:\\Users\\YUSUF\\Documents\\Self Study\\React\\React - The Complete Guide\\Course Projects\\burger\\.docz\\app\\db.json',
        },
      },
    },
  ],
}

const merge = mergeWith((objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue)
  }
})

module.exports = merge(config, custom)
