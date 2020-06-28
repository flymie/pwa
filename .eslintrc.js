module.exports ={
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": "airbnb",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
        "Images": true
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "no-plusplus": "off",
        "react/jsx-max-props-per-line": "off",
        "import/no-mutable-exports": "off",
        "react/prefer-stateless-function": "off",
        "no-param-reassign": "off",
        "react/require-default-props": "off",
        "global-require": 0,
        "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
        "import/no-unresolved": "off",
        "properties": "never",
        "jsx-a11y/label-has-for": false,
        "jsx-a11y/label-has-associated-control": "off",
        "react/button-has-type": "off",
        "react/destructuring-assignment": [1, "always"],
        "object-curly-newline": ["error", {
            // "ObjectExpression": "never",
            // "ObjectPattern": { "multiline": true },
            // "ImportDeclaration": "never",
            "ExportDeclaration": { "multiline": false, "minProperties": 3 }
        }]
    },
    "settings": {
        "import/resolver": {
            "webpack":{
                "config": "build/webpack.base.conf.js"
            }
        }
    }
}
