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

const errorMsg = '';

try {
  const vueRuntimeEsmFileName = '../vue/dist/vue.runtime.esm.js';
  fs.accessSync(vueRuntimeEsmFileName, fs.constants.R_OK | fs.constants.W_OK);
  const file = fs.openSync(vueRuntimeEsmFileName, 'r+');
  console.log('file found');
  const content = fs.readFileSync(vueRuntimeEsmFileName, {encoding: 'utf8'});
  if (!content) {
    throw 'no content';
  }
  console.log('got file content');
  const ifChanged = content.indexOf('vue-who-moved-my-cheese');
  if (ifChanged > 0) {
    console.log('already changed');
    return;
  }
  const defineReactiveFunctionIndex = content.indexOf('function defineReactive');
  if (defineReactiveFunctionIndex > 0) {
    const keyString = 'var dep = new Dep();';
    const keyStringIndex = content.indexOf(keyString, defineReactiveFunctionIndex);
    if (keyStringIndex > 0) {
      const newContent = content.substring(0, keyStringIndex + keyString.length)
        + 'dep.name = key; // vue-who-moved-my-cheese'
        + content.substring(keyStringIndex + keyString.length);

      fs.writeSync(file, newContent);
      console.log('write file succeed');
    } else {
      console.error('dose not found keyString');
    }
  } else {
    console.error('dose not found defineReaction');
  }
} catch (err) {
  console.error('Does not detect vue or something wrong');
  console.error(err);
}

