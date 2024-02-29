# eslint-config-react

This package provides Lomray eslint config as an extensible shared config for React.

## Usage

1. Install package:

  ```sh
  npm i --save-dev @lomray/eslint-config-react
  ```

2. Add config to your `eslint.config.js`
```js
import lomrayConfig from '@lomray/eslint-config-react';

export default [
    ...lomrayConfig.recommended,  
];
```
