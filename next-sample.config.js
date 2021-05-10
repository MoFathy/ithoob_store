const withSass = require('@zeit/next-sass')
const webpack = require('webpack')
const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

module.exports = withPlugins([
  [optimizedImages, {
    /* config for next-optimized-images */
  }],

  // your other plugins here
  withSass({
    webpack (config, {dev}) {
      config.module.rules.push({
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            limit: 100000,
            name: '[path][name].[ext]',
            publicPath: `/_next/static/files`,
            outputPath: 'static/files'
          }
        }
      })
      config.plugins.push(
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery',
        })
      )
      return config
    },
    /**
     * 
     * -----------------------------
     * | Development Configuration |
     * -----------------------------
     * endpoint: https://ithoobapi.web-keyz.com
     * 
     * ----------------------------
     * | Production Configuration |
     * ----------------------------
     * endpoint: "http://35.158.52.251:5001"
     * 
     */
    env: {
      endpoint: "http://localhost:5001",
      // endpoint: "https://api.ithoob.com:5002/api/",
      whatsAppNumber: "966594704888",
      facebook: "https://www.facebook.com/ithoob/",
      twitter: "https://twitter.com/ithoob",
      instagram: "https://www.instagram.com/_ithoob/"
    }
  })
])