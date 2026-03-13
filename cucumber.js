module.exports = {
  default: {
    require: [
      'features/step-definitions/**/*.js',
      'features/support/**/*.js'
    ],
    parallel: 2
  },
  smoke: {
    require: [
      'features/step-definitions/**/*.js',
      'features/support/**/*.js'
    ],
    tags: '@smoke',
    parallel: 2
  },
  regression: {
    require: [
      'features/step-definitions/**/*.js',
      'features/support/**/*.js'
    ],
    tags: '@regression',
    parallel: 2
  }
};
