# DilCMS React PageModelRenderer
Provides an importable library for using the PageModelRenderer to render the content of a page.

See [DilCMS Server](https://github.com/drkrompe/dilcms-server) for more on content serving.

## Installation
npm
```sh
npm install [path-to-this-directory]
```

Yarn
```sh
yarn add [path-to-this-directory]
```

## Future install
This package can be uploaded to NPM cloud package repo.

[Creating an npm package](https://docs.npmjs.com/creating-and-publishing-private-packages)

## Usage
Where to Mount PageModelRenderer:
- Generally there should only be one PageModelRenderer
- Generally should be near the Root of the application, but there is nothing stopping you from doing otherwise.

App.js
```jsx
import React from 'react';
import PageModelRenderer from '@drkrompe/dilcms-react-model-renderer';
import YourComponentClass from './yourcomponentclass/YourComponentClass';

const webComponentToReactComponent = (webComponent) => {
  // A webcomponent has:
  // componentType: str
  // componentId: str
  // componentProps: {}
  switch (webComponent.componentType) {
    case 'yourcomponenttype':
      return <YourComponentClass {...webComponent.componentProps} />;
  }
}

export default function App() {
  return (
    <PageModelRenderer webComponentToReactComponentFunc={webComponentToReactComponent} />
  )
}
```
