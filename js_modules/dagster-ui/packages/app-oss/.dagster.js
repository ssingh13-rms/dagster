/**
 * Configuration for custom @dagster-io/react-scripts behavior.
 * https://github.com/dagster-io/create-react-app
 *
 * This file is generated by react-scripts/scripts/init.js.
 *
 * For Webpack, all paths must be absolute, e.g. using path.resolve().
 */

const path = require('path');

const dagsterUICorePath = path.resolve('../ui-core/src');
const dagsterUIComponentsPath = path.resolve('../ui-components/src');
const graphQLArtifactDirectory = path.resolve(dagsterUICorePath, 'graphql');

const noncePlaceholder = 'NONCE-PLACEHOLDER';

module.exports = {
  /**
   * Proxy origin, probably defined via env var, e.g. `process.env.REACT_APP_BACKEND_ORIGIN`.
   */
  proxyOrigin: process.env.REACT_APP_BACKEND_ORIGIN,

  /**
   * Nonce placeholder string, to be replaced at runtime by server.
   */
  noncePlaceholder,

  /**
   * Configuration for GraphQL codegen. Used by `client-preset` babel plugin to deduplicate
   * query documents in built output.
   */
  graphQL: {
    // Local directory of GraphQL codegen output.
    artifactDirectory: graphQLArtifactDirectory,
    // Function name for tagged GraphQL documents in code.
    gqlTagName: 'graphql',
  },

  /**
   * Modules that must be deduped for the Webpack build, e.g. `react`. Ex:
   *
   * {
   *   react: path.resolve(pathToLocalDagsterUI, 'node_modules/react'),
   * }
   */
  moduleAliases: {
    '@dagster-io/ui-core': dagsterUICorePath,
    '@dagster-io/ui-components': dagsterUIComponentsPath,
  },

  /**
   * `src` paths that must be babelified by Webpack, e.g. linked packages that are also
   * development targets, but are outside of the CRA's own `src` directory. Ex:
   *
   * [
   *   path.resolve(pathToLocalDagsterUI, 'packages/ui-core/src'),
   * ]
   */
  srcPaths: [dagsterUICorePath, dagsterUIComponentsPath],

  /**
   * CSP Configuration. Receives the webpack environment to return the appropriate CSP
   * values based on prod/dev/etc. Values are supplied to `CspHtmlWebpackPlugin`.
   */
  csp: (webpackEnv) => {
    return {
      // https://csp.withgoogle.com/docs/strict-csp.html
      policy: {
        'base-uri': `'none'`,
        'object-src': `'none'`,
        'script-src': [
          `'nonce-${noncePlaceholder}'`,
          `'unsafe-inline'`,
          `'strict-dynamic'`,
          `https:`,
          'http:',
        ],
      },
      options: {
        hashEnabled: {
          'script-src': false,
          'style-src': false,
        },
        nonceEnabled: {
          'script-src': false,
          'style-src': false,
        },
      },
      outputFilename: 'csp-header.conf',
    };
  },

  /**
   * Jest module name mappings. Similar to the Webpack aliases above, this is used to
   * dedupe shared modules.
   */
  jestAliases: {},
};