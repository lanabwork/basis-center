const path = require('path');

const resolve = (dir) => (
  path.resolve(__dirname, dir)
);

module.exports = {

  chainWebpack: config => {
    function addLoader(params) {
      params.types.forEach(type => {
        config.module.rule(params.rule).oneOf(type)
          .use(params.loader)
          .loader(params.loader)
          .options(params.options)
          .end();
      });
    }
    config.module.rule('fonts')
      .test(/\.(woff(2)?|svg)(\?.*)?$/i)
      .include
      .add(resolve('src/assets/fonts/'))
      .end();
    config.module.rule('json')
      .test(/\.json$/)
      .use(resolve('utils/split-json-loader.js'))
      .loader(resolve('utils/split-json-loader.js'))
      .options({
        dir: resolve('src/data')
      })
      .end();
    addLoader({
      types: ['vue-modules', 'vue', 'normal-modules', 'normal'],
      rule: 'scss',
      loader: 'sass-resources-loader',
      options: {
        includePath: resolve('src'),
        resources: './src/scss/_common.scss',
      }
    });

    config.optimization.splitChunks({
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    });
  },
};
