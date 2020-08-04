const base = require('./base');
const colors = require('./colors');
const fonts = require('./fonts');

module.exports = ({
  '@primary-color': colors.primary,
  '@body-background': colors.bodyBackground,
  '@success-color': colors.success,
  '@warning-color': colors.warning,
  '@error-color': colors.error,
  '@heading-color': colors.heading,
  '@text-color': colors.text,
  '@text-color-secondary': colors.textSecondary,
  '@box-shadow-base': base.boxShadow,
  '@font-family': fonts.opensSans,
  '@border-radius-base': base.borderRadius,
});
