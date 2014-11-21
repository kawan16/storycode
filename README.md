Storycode
=========

Most of computer programs are developped by applying the separation of concerns principle. As a result, it appears pieces of code 
locally understandable ( in case of clean and well commented code ) but without the global purpose they serve. In big and/or 
complex projects, that may bring troubles in terms of maintenability, extensibility, refactoring, etc.

Storycode is a Javascript library that allows to track the motivational context into which your code  is, which 
basically means the use cases expected to fulfil through the code. To do this, Storycode parses your code, looks for 
special annotations in your inline and block comments which describes use cases steps through your code, and extract and store
them in Javascript Object.

## Installation

To install Storycode, you just need to type:
```shell
  npm install storycode --save-dev
```

Running Storycode is hardly difficult. In some Javascript file, type:

```js
  var StoryCode = require("storycode"),
      result    = StoryCode().process( [ "FILE_PATH" ] );
  // Do something with result
```

