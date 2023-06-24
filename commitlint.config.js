const { TYPE_ENUM_COMMIT } = require('./.husky/constant');

module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [
            2,
            'always',
            TYPE_ENUM_COMMIT
        ],
        'body-max-line-length': [
            2,
            'always',
            1
        ],
        'body-leading-blank': [
            0,
            'never'
        ],
        'header-max-length': [
            2,
            'always',
            70
        ]
    }
};
