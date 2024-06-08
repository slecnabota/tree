module.exports = {
    parser: 'vue-eslint-parser',
    extends: [
        "plugin:vue/vue3-essential",
        "eslint:recommended"
    ],
    parserOptions: {
        parser: '@babel/eslint-parser',
    },
    rules: {
        'vue/multi-word-component-names': 'off',
        "no-unused-vars": "off"
    },
};
