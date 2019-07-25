# vue-who-moved-my-cheese
#### Can detect computed or watcher is updated by which specific variable

## How to use?

import, then watch `computed` or `watcher`

```js
<template>
  <div>
    <div>
      <span>Last Name</span>
      <input v-model="lastname" >
    </div>
    <div>
      <span>First Name</span>
      <input v-model="firstname" >
    </div>
    <div> FullName: {{fullname}}</div>
  </div>
</template>

<script>
  import {WhoMovedMyCheese} from 'vue-who-moved-my-cheese';

  export default {
    name: 'UserInfo',
    data() {
      return {
        firstname: 'Ken',
        lastname: 'Gao',
      }
    },
    mounted() {
      WhoMovedMyCheese(this, ['fullname', 'updateComponent']);
    },
    computed: {
      fullname() {
        return this.lastname + ', ' + this.firstname;
      },
    },
  }
</script>

<style scoped>
</style>
```
if you change `firstname` or `lastname`, `fullname` will updated with it.

and `WhoMovedMyCheese` will know the effection from which variable exactly.

![image](https://github.com/gaokun/media-resource/blob/master/who-moved-my-cheese/3.png)

## What it did?

just add `name` on vue `Dep`.
![image](https://github.com/gaokun/media-resource/blob/master/who-moved-my-cheese/1.png)

