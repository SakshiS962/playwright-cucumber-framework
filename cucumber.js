module.exports = {
  default: {
    paths: ['src/features/**/*.feature'], // 👈 VERY IMPORTANT
    require: [
      'src/step-definitions/**/*.ts',
      'src/hooks/**/*.ts'
    ],
    requireModule: ['ts-node/register'],
    format: ['progress']
  }
};
