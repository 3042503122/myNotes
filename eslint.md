# 参考

[文章参考]: https://segmentfault.com/a/1190000009077086



# 内容

本文将讲解如何在 VSCode 中配合 ESLint 扩展来实践团队内部的前端编码规范。

- [前端编码规范](https://github.com/fedesigner/styleguide)
- [ESLint 完整配置文件](https://github.com/fedesigner/styleguide/blob/master/eslint/.eslintrc.js)



## 什么是 ESLint

[ESLint](http://eslint.org/)（[中文站点](http://eslint.cn/)）是一个开源的 JavaScript 代码检查工具，使用 Node.js 编写，由 Nicholas C. Zakas 于 2013 年 6 月创建。ESLint 的初衷是为了让程序员可以创建自己的检测规则，使其可以在编码的过程中发现问题而不是在执行的过程中。ESLint 的所有规则都被设计成可插入的，为了方便使用，ESLint 内置了一些规则，在这基础上也可以增加自定义规则。



## vscode编辑代码自动eslint

使 ESLint 适用于你所有的项目



### 安装ESLint扩展

首先，打开 VSCode 扩展面板并搜索 ESLint 扩展，然后点击安装

![图片描述](https://segmentfault.com/img/bVMeLp?w=1010&h=761)

安装完毕之后点击 `重新加载` 以激活扩展，但想要让扩展进行工作，我们还需要先进行 ESLint 的安装配置。

### 安装 ESLint

使 ESLint 适用于你所有的项目

```
$ npm install eslint eslint-plugin-html babel-eslint -g
```

如果想使 ESLint 适用于你所有的项目，我们建议使用全局安装，使用全局安装 ESLint 后，你使用的任何 ESLint 插件或可分享的配置也都必须在全局安装。

这里我们使用全局安装：

安装完毕后，我们使用 `eslint --init` 命令在用户目录中生成一个配置文件（也可以在任何你喜欢的位置进行生成）

![图片描述](https://segmentfault.com/img/bVMePL?w=576&h=271)

我们在第一个选项中选择自定义代码风格，之后根据需要自行选择。

设置完成后我们会得到一份文件名为 `.eslintrc.js` 的配置文件：

```
module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ]
    }
};
```



### 配置ESLint

```
module.exports = {
  root: true,
  parser: 'babel-eslint',
  globals: {
    _: true,
    log: true,
    wx: true,
    App: true,
    Page: true,
    getApp: true,
    Component: true,
    getCurrentPages: true,
    requirePlugin: true
  },
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: 'eslint:recommended',
  // required to lint *.vue files
  plugins: ['html'],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  //it is base on https://github.com/vuejs/eslint-config-vue
  rules: {
    'accessor-pairs': 2,
    'arrow-spacing': [
      2,
      {
        before: true,
        after: true
      }
    ],
    'block-spacing': [2, 'always'],
    'brace-style': [
      2,
      '1tbs',
      {
        allowSingleLine: true
      }
    ],
    camelcase: [
      0,
      {
        properties: 'always'
      }
    ],
    'comma-dangle': [2, 'never'],
    'comma-spacing': [
      2,
      {
        before: false,
        after: true
      }
    ],
    'comma-style': [2, 'last'],
    'constructor-super': 2,
    curly: [2, 'multi-line'],
    'dot-location': [2, 'property'],
    'eol-last': 2,
    eqeqeq: [0, 'allow-null'],
    'generator-star-spacing': [
      2,
      {
        before: true,
        after: true
      }
    ],
    'handle-callback-err': [2, '^(err|error)$'],
    indent: [
      2,
      2,
      {
        SwitchCase: 1,
        MemberExpression: 'off'
      }
    ],
    'jsx-quotes': [2, 'prefer-single'],
    'key-spacing': [
      2,
      {
        beforeColon: false,
        afterColon: true
      }
    ],
    'keyword-spacing': [
      2,
      {
        before: true,
        after: true
      }
    ],
    'new-cap': [
      2,
      {
        newIsCap: true,
        capIsNew: false
      }
    ],
    'new-parens': 2,
    'no-array-constructor': 2,
    'no-caller': 2,
    'no-console': 'off',
    'no-class-assign': 2,
    'no-cond-assign': 2,
    'no-const-assign': 2,
    'no-control-regex': 2,
    'no-delete-var': 2,
    'no-dupe-args': 2,
    'no-dupe-class-members': 2,
    'no-dupe-keys': 2,
    'no-duplicate-case': 2,
    'no-empty-character-class': 2,
    'no-empty-pattern': 2,
    'no-eval': 2,
    'no-ex-assign': 2,
    'no-extend-native': 0,
    'no-extra-bind': 2,
    'no-extra-boolean-cast': 2,
    'no-extra-parens': [2, 'functions'],
    'no-fallthrough': 2,
    'no-floating-decimal': 2,
    'no-func-assign': 2,
    'no-implied-eval': 2,
    'no-inner-declarations': [2, 'functions'],
    'no-invalid-regexp': 2,
    'no-irregular-whitespace': 2,
    'no-iterator': 2,
    'no-label-var': 2,
    'no-labels': [
      2,
      {
        allowLoop: false,
        allowSwitch: false
      }
    ],
    'no-lone-blocks': 2,
    'no-mixed-spaces-and-tabs': 2,
    'no-multi-spaces': 2,
    'no-multi-str': 2,
    'no-multiple-empty-lines': [
      2,
      {
        max: 1
      }
    ],
    'no-native-reassign': 2,
    'no-negated-in-lhs': 2,
    'no-new-object': 2,
    'no-new-require': 2,
    'no-new-symbol': 2,
    'no-new-wrappers': 2,
    'no-obj-calls': 2,
    'no-octal': 2,
    'no-octal-escape': 2,
    'no-path-concat': 2,
    'no-proto': 2,
    'no-redeclare': 2,
    'no-regex-spaces': 2,
    'no-return-assign': [2, 'except-parens'],
    'no-self-assign': 2,
    'no-self-compare': 2,
    'no-sequences': 2,
    'no-shadow-restricted-names': 2,
    'no-spaced-func': 2,
    'no-sparse-arrays': 2,
    'no-this-before-super': 2,
    'no-throw-literal': 2,
    'no-trailing-spaces': 2,
    'no-undef': 2,
    'no-undef-init': 2,
    'no-unexpected-multiline': 2,
    'no-unmodified-loop-condition': 2,
    'no-unneeded-ternary': [
      2,
      {
        defaultAssignment: false
      }
    ],
    'no-unreachable': 2,
    'no-unsafe-finally': 2,
    'no-unused-vars': [
      2,
      {
        vars: 'all',
        args: 'none'
      }
    ],
    'no-useless-call': 2,
    'no-useless-computed-key': 2,
    'no-useless-constructor': 2,
    'no-useless-escape': 0,
    'no-whitespace-before-property': 2,
    'no-with': 2,
    'one-var': [
      2,
      {
        initialized: 'never'
      }
    ],
    'operator-linebreak': [
      2,
      'after',
      {
        overrides: {
          '?': 'before',
          ':': 'before'
        }
      }
    ],
    'padded-blocks': [2, 'never'],
    quotes: [
      2,
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ],
    semi: [2, 'never'],
    'semi-spacing': [
      2,
      {
        before: false,
        after: true
      }
    ],
    'space-before-blocks': [2, 'always'],
    'space-before-function-paren': [2, 'never'],
    'space-in-parens': [2, 'never'],
    'space-infix-ops': 2,
    'space-unary-ops': [
      2,
      {
        words: true,
        nonwords: false
      }
    ],
    'spaced-comment': [
      2,
      'always',
      {
        markers: [
          'global',
          'globals',
          'eslint',
          'eslint-disable',
          '*package',
          '!',
          ','
        ]
      }
    ],
    'template-curly-spacing': [2, 'never'],
    'use-isnan': 2,
    'valid-typeof': 2,
    'wrap-iife': [2, 'any'],
    'yield-star-spacing': [2, 'both'],
    yoda: [2, 'never'],
    'prefer-const': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'object-curly-spacing': [
      0,
      'always',
      {
        objectsInObjects: false
      }
    ],
    'array-bracket-spacing': [2, 'never']
  }
}

```

配置文件生成之后，我们接着可以进行自定义修改，这里我们只粗略讲解常用的配置项，完整的可配置项可访问[官方文档](http://eslint.cn/docs/user-guide/configuring)

#### 配置环境

在上文生成的配置文件中可以使用 `env` 属性来指定要启用的环境，将其设置为 `true`，以保证在进行代码检测时不会把[这些环境](http://eslint.cn/docs/user-guide/configuring#specifying-environments)预定义的全局变量识别成未定义的变量而报错：

```
"env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "jquery": true
}
```

#### 设置语言选项

默认情况下，ESLint 支持 ECMAScript 5 语法，如果你想启用对 ECMAScript 其它版本和 JSX 等的支持，ESLint 允许你使用 `parserOptions` 属性进行指定想要支持的 JavaScript [语言选项](http://eslint.cn/docs/user-guide/configuring#specifying-parser-options)，不过你可能需要自行安装 `eslint-plugin-react` 等插件。

```
"parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
        "jsx": true
    }
}
```

#### 配置规则

在上文的配置文件中， `"extends": "eslint:recommended"` 选项表示启用推荐规则，在推荐规则的基础上我们还可以根据需要使用 `rules` 新增自定义规则，每个规则的第一个值都是代表该规则检测后显示的错误级别：

- `"off"` 或 `0` - 关闭规则
- `"warn"` 或 `1` - 将规则视为一个警告
- `"error"` 或 `2` - 将规则视为一个错误

```
"rules": {
    "indent": [
        "error",
        4
    ],
    "linebreak-style": [
        "error",
        "windows"
    ],
    "quotes": [
        "error",
        "single"
    ],
    "semi": [
        "error",
        "never"
    ]
}
```

完整的可配置规则列表可访问：<http://eslint.cn/docs/rules/>

其中带 `√` 标记的表示该规则为推荐规则。



### 配置VScode

安装并配置完成 ESLint 后，我们继续回到 VSCode 进行扩展设置，依次点击 `文件 > 首选项 > 设置` 打开 VSCode 配置文件

从左侧系统设置中可以看到，ESLint 扩展默认已经启用，我们现在只需在右侧用户设置中添加配置来指定我们创建的 `.eslintrc.js` 配置文件路径即可启用自定义规则检测，ESLint 会查找并自动读取它们：

```
"eslint.options": {
    "configFile": "E:/git/github/styleguide/eslint/.eslintrc.js"
},
```

至此，我们已经可以使用 ESLint 扩展来检测我们的 js 文件了。

**"configFile": "E:/self/mahongluRecord/notes/.eslintrc.js",** 修改为自己的（如果针对的是项目自己的.eslintrc.js 此项不配置）

```
// 将设置放入此文件中以覆盖默认设置
{
    "gitlens.keymap": "chorded",
    "gitlens.advanced.messages": {
        "suppressShowKeyBindingsNotice": true
    },
    "files.associations": {
        "*.cjson": "jsonc",
        "*.wxss": "css",
        "*.wxs": "javascript"
    },
    "emmet.includeLanguages": {
        "wxml": "html"
    },
    "minapp-vscode.disableAutoConfig": true,
    "window.zoomLevel": 1,
    "git.confirmSync": false,
    "git.autofetch": true,
    "explorer.confirmDelete": false,
    "vim.useCtrlKeys": false,
    //配置eslint
    "eslint.autoFixOnSave": true,
    "files.autoSave":"off",
    "eslint.validate": [
       "javascript",
       "javascriptreact",
       "html",
       { "language": "vue", "autoFix": true }
     ],
     "eslint.options": {
        "configFile": "E:/self/mahongluRecord/notes/.eslintrc.js",
        "plugins": ["html"]
     },
     //为了符合eslint的两个空格间隔原则
    "editor.tabSize": 2,
    "workbench.colorTheme": "Visual Studio Dark",
    "[json]": {
        "editor.defaultFormatter": "HookyQR.beautify"
    },
    "terminal.integrated.shell.windows": "C:\\Program Files\\Git\\bin\\bash.exe",
    "git.path": "C:\\Program Files\\Git\\cmd\\git.exe",
    "terminal.explorerKind": "external",
    "[javascript]": {
        "editor.defaultFormatter": "HookyQR.beautify"
    },
    "[html]": {
        "editor.defaultFormatter": "HookyQR.beautify"
    },
    "[javascriptreact]": {}
}
```





