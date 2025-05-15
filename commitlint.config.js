// commitlint.config.js
module.exports = {
    parserPreset: {
        parserOpts: {
            headerPattern: /^\[(\d+)\]\[(.+?)\]\[(.+?)\] (.+)$/,
            headerCorrespondence: ['ticket', 'author', 'task', 'subject']
        }
    },
    rules: {
        'header-match-pattern': [2, 'always', /^\[(\d+)\]\[(.+?)\]\[(.+?)\] .+$/],
        'subject-empty': [2, 'never'],
        'type-enum': [0], // tắt rule loại commit thông thường
    }
};
