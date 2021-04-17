const path = require('path');

const config = {
  projectName: 'foretodo',
  date: '2021-4-17',
  designWidth: 750,
  deviceRatio: {
    '640': 375 / 640,
    '750': 1,
    '828': 375 / 828,
  },
  sourceRoot: 'src',
  outputRoot: `dist/${process.env.TARO_ENV}`,
  alias: {
    '@/components': path.resolve(__dirname, '../src/components'),
    '@/pages': path.resolve(__dirname, '../src/pages'),
    '@/models': path.resolve(__dirname, '../src/models'),
    '@/services': path.resolve(__dirname, '../src/services'),
    '@/utils': path.resolve(__dirname, '../src/utils'),
    '@/layouts': path.resolve(__dirname, '../src/layouts'),
    '@/assets': path.resolve(__dirname, '../src/assets'),
    '@theme': path.resolve(__dirname, '../src/theme'),
  },
  plugins: {
    babel: {
      sourceMap: true,
      presets: [
        [
          'env',
          {
            modules: false,
          },
        ],
      ],
      plugins: [
        'transform-decorators-legacy',
        'transform-class-properties',
        'transform-object-rest-spread',
      ],
    },
  },
  defineConstants: {
    'process.env.TEST': process.env.TEST,
  },
  copy: {
    patterns: [],
    options: {},
  },
  weapp: {
    compile: {
      include: ['taro-f2'],
    },
    module: {
      postcss: {
        autoprefixer: {
          enable: true,
          config: {
            browsers: ['last 3 versions', 'Android >= 4.1', 'ios >= 8'],
          },
        },
        pxtransform: {
          enable: true,
          config: {},
        },
        url: {
          enable: true,
          config: {
            limit: 10240, // 设定转换尺寸上限
          },
        },
        cssModules: {
          enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]',
          },
        },
      },
    },
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    esnextModules: ['taro-f2'],
    module: {
      postcss: {
        autoprefixer: {
          enable: true,
          config: {
            browsers: ['last 3 versions', 'Android >= 4.1', 'ios >= 8'],
          },
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]',
          },
        },
      },
    },
  },
};

module.exports = function(merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'));
  }
  return merge({}, config, require('./prod'));
};
