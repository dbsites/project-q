module.exports = {
  roots: [
    '<rootDir>/src',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node',
  ],
  moduleNameMapper: {
    '\\.(png|svg)$': '<rootDir>/assetsTransformer.js', // Proxy to mock images
    '\\.(css|scss)$': 'identity-obj-proxy', // ES6 Proxy to mock CSS Modules
  },
};
