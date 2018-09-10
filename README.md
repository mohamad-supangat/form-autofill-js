# form-autofill-js

Tool for auto filling html forms based on the fake data generator: [casual.js](https://github.com/boo1ean/casual)


The Tool identify the html component based on the `name` and `type` params and fill it with a random pair from the object `casual`o

## How to install

`npm i -S -D form-autofill-js`

or 

`yarn add form-autofill-js --dev`

## how to use

```` javascript
import AutoFill from 'form-autofill-js'

Autofill.fill()
````
You can use a Button tool for do it with a button click event:

````javascript
Autofill.tool()
````
