SystemJS.config({
  paths: {
    "npm:": "jspm_packages/npm/",
    "github:": "jspm_packages/github/",
    "merlin-feedback/": "src/"
  },
  browserConfig: {
    "baseURL": "/"
  },
  devConfig: {
    "map": {
      "plugin-babel": "npm:systemjs-plugin-babel@0.0.12",
      "babel-plugin-syntax-flow": "npm:babel-plugin-syntax-flow@6.8.0",
      "fs": "github:jspm/nodelibs-fs@0.2.0-alpha",
      "path": "github:jspm/nodelibs-path@0.2.0-alpha",
      "babel-plugin-transform-flow-strip-types": "npm:babel-plugin-transform-flow-strip-types@6.8.0",
      "babel-plugin-transform-export-extensions": "npm:babel-plugin-transform-export-extensions@6.8.0",
      "babel-plugin-transform-class-properties": "npm:babel-plugin-transform-class-properties@6.10.2"
    },
    "packages": {
      "npm:babel-plugin-syntax-flow@6.8.0": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.9.2"
        }
      },
      "npm:babel-runtime@6.9.2": {
        "map": {
          "core-js": "npm:core-js@2.4.0",
          "regenerator-runtime": "npm:regenerator-runtime@0.9.5"
        }
      },
      "npm:babel-plugin-transform-flow-strip-types@6.8.0": {
        "map": {
          "babel-plugin-syntax-flow": "npm:babel-plugin-syntax-flow@6.8.0",
          "babel-runtime": "npm:babel-runtime@6.9.2"
        }
      },
      "npm:babel-plugin-transform-export-extensions@6.8.0": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.9.2",
          "babel-plugin-syntax-export-extensions": "npm:babel-plugin-syntax-export-extensions@6.8.0"
        }
      },
      "npm:babel-plugin-syntax-export-extensions@6.8.0": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.9.2"
        }
      },
      "npm:babel-plugin-transform-class-properties@6.10.2": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.9.2",
          "babel-plugin-syntax-class-properties": "npm:babel-plugin-syntax-class-properties@6.8.0"
        }
      },
      "npm:babel-plugin-syntax-class-properties@6.8.0": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.9.2"
        }
      }
    }
  },
  transpiler: "plugin-babel",
  packages: {
    "merlin-feedback": {
      "main": "merlin-feedback.js",
      "meta": {
        "*.js": {
          "loader": "plugin-babel",
          "babelOptions": {
            "plugins": [
              "babel-plugin-transform-flow-strip-types",
              "babel-plugin-transform-export-extensions",
              "babel-plugin-transform-class-properties"
            ]
          }
        }
      }
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json",
    "github:*/*.json"
  ],
  map: {
    "es6-promise": "npm:es6-promise@3.2.1",
    "fetch": "github:github/fetch@1.0.0",
    "process": "github:jspm/nodelibs-process@0.2.0-alpha"
  },
  packages: {}
});
