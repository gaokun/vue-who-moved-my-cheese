const fs = require('fs');

/**
 *
 change vue.runtime.esm.js file, add name on Dep

 change:

 ```js
   function defineReactive$$1 (
   obj,
   key,
   val,
   customSetter,
   shallow
   ) {
    var dep = new Dep();
 ```
 into:

 ```js
   function defineReactive$$1 (
   obj,
   key,
   val,
   customSetter,
   shallow
   ) {
    var dep = new Dep();
    dep.name = key;   // <==== new

 * */

try {
  const vueRuntimeEsmFileName = '../vue/dist/vue.runtime.esm.js';
  fs.accessSync(vueRuntimeEsmFileName, fs.constants.R_OK | fs.constants.W_OK);
  const file = fs.openSync(vueRuntimeEsmFileName, 'rw');
  console.log('file found');
  const content = fs.readFileSync(vueRuntimeEsmFileName, {encoding: 'utf8'});
  console.log('got file content');
  const defineReactiveFunctionIndex = content.indexOf('function defineReactive');
  if (defineReactiveFunctionIndex > 0) {
    const keyString = 'var dep = new Dep();';
    const keyStringIndex = content.indexOf(keyString, defineReactiveFunctionIndex);
    if (keyStringIndex > 0) {
      fs.writeSync(file, 'dep.name = key;\n', keyStringIndex, 'utf8');
      console.log('write file succeed');
    }
  }
} catch (err) {
  console.error('Does not detect vue or something wrong');
}

