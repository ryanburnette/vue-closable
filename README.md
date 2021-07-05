# [vue-closable](https://github.com/ryanburnette/vue-closable)

A Vue directive that detects clicks outside of an element.

This is a fork of
[TahaSh/vue-closable](https://github.com/TahaSh/vue-closable). This version is
written in Common Js, has no build step, takes exclusions as an array of
selectors, and allows exclusions to be outside the context of the closable
element.

## Install

```
npm install @ryanburnette/vue-closable
```

## Include

```js
var VueClosable = require('vue-closable');
Vue.use(VueClosable);
```

Include it directly with a `<script>` tag. In this case, you don't need to write
`Vue.use(VueClosable)`, this will be done automatically for you.

## Usage

To listen for clicks outside an element, use the `v-closable` directive on it.
Provide the name of the handler that closes the popup. Exclude elements by
passing an array of selectors that will be passed to document.querySelectorAll.
If any of those elements contain the target, the handler won't be called. Note
that exclusions don't need to be children of the contextual app... it searches
the whole document.

```html
<div
  v-closable="{
    handler: 'onClose'
    exclude: ['.foo', 'button.bar']
  }"
></div>
```

# Example: Close an element on outside click

I named this directive `v-closable` because the common use case for detecting
outside clicks is to close elements (like dropdowns and modals). And to do that,
we have to use `v-show` or `v-if` on the element and set its value to `false`
when the user clicks outside it.

Here's an example:

```html
<template>
  <div id="app">
    <button ref="button" class="toggle-button" @click="showPopup = !showPopup">
      TOGGLE
    </button>
    <div
      v-show="showPopup"
      v-closable="{
        exclude: ['button'],
        handler: 'onClose'
      }"
      class="popup-box"
    >
      Test Popup Box
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import VueClosable from 'vue-closable';

  Vue.use(VueClosable);

  export default {
    data() {
      return {
        showPopup: false
      };
    },

    methods: {
      onClose() {
        this.showPopup = false;
      }
    }
  };
</script>
```
