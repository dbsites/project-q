// assetsTransformer enables Jest to transform irregular files

const path = require('path');

module.exports = {
  process(src, filename, config, options) {
    return `'module.exports = ${JSON.stringify(path.basename(filename))};`;
  },
};
