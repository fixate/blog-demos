# Fixate Blog Demos

## New post

```bash
$ cp -r posts/_template posts/new-post
$ cd posts/new-post
$ npm i
```

## Webpack config

Override what you like in your post folder's webpack config. Sensible defaults
are all configured in the factory folder in the project root.

Take a look at [webpack.factory.js](./webpack-factory-js) and [_template/webpack.config.js](./_template/webpack.config.js).

## Dev

```bash
# from post folder
npm run dev
```

## Build

```bash
# from post folder
npm run build
```

Files build to the `build` folder in that post's folder.

## Test

```bash
# from post folder
npm run build
```

