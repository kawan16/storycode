Storycode
=========

Most of computer programs are developped by applying the separation of concerns principle. As a result, it appears pieces of code 
locally understandable ( in case of clean and well commented code ) but without the global purpose they serve. In big and/or 
complex projects, that may bring troubles in terms of maintenability, extensibility, refactoring, etc.

Storycode is a Javascript library that allows to track the motivational context into which your  code  is, which 
basically means the use cases expected to fulfil through the code. To do this, Storycode parses your code, looks for 
special annotations in your inline and block comments which describes use cases steps through your code, and extract and store
them in Javascript Object.

Note that your code can be Javascript but not only. Indeed, Storycode covers inline comment using the ```// ``` and block comments using ```/* */ ``` which is also the case for Java, C, C++, C#, etc.


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

## Features

### Use Case Context

In order to mention you are in a Storycode context, you must to start your comment with the use case identifier i.e. UC<Number>

```js
  // UC1 Storycode will analyze this
  /* UC2 Storycode will analyze that as well */
 
```

Then you introduce your annotations.

#### Title

The title of your use case is specified with ```@T```

```js
  // UC1 @T A superbe use case title such as 'Adding two numbers'
```

#### Abstract

The description of your use cas is specified with ```@A```


```js
  // UC1 @A A user can make a simple two numbers addition
```

#### Scenario

The core of Storycode is to describe how an use case is executed through your code. To do this, you annote your pieces of code with ```@S<Number>``` where ```<Number>``` is the n-th step of the scenario and defines in this way the use case scenario.


```js
  var a , b , result;
  
  // UC1 @S1 Users inputs two numbers
  function setInputs( first , second ) {
    a = first; b = second;
  }
  
  // UC1 @S2 System calculates the sum
  function add() {
    result = a + b;
  }
  
  // UC1 @S3 System displays the sum in the console
  function display() {
    console.log('The sum of ' , a , ' and ' , b , ' is equal to ' , result );
  }
```

## Output

The output format is a Javascript array of objects which corresponds to each Storycode comment identified. Each object contains at least the number of the use case as well as the file and line from which the comment was extracted. Then the annotation information is stored in a specific filed ( step and description for @S, title for @ T and abstract for @A for instance ).

```js
[ { id: 1,
    title: 'A superbe use case title such as Adding two numbers'
    line: 2,
    file: 'use-cases.txt' },
  { id: 1,
    abstract: 'A user can make a simple two numbers addition.',
    line: 3,
    file: 'use-cases.txt' },
  { id: 1,
    step: 1 ,
    description: 'Users inputs two numbers',
    line: 3,
    file: 'code.js' },
  { id: 1,
    step: 2 ,
    description: 'System calculates the sum',
    line: 11,
    file: 'code.js' },
  { id: 1,
    step: 3 ,
    description: 'System displays the sum in the console',
    line: 18,
    file: 'code.js' },

```

## Grunt plugin

Storycode comes with a grunt plugin which goes a step further since with the Storycode result, it generates an HTML report into which you can navigate through your use cases 







