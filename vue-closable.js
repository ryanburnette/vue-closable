(function () {
  'use strict';

  var vueClosable = {};

  vueClosable.install = function (Vue) {
    var handleOutsideClick;

    Vue.directive('closable', {
      bind: function (el, binding, vnode) {
        function handleOutsideClick(ev) {
          if (ev) {
            ev.stopPropagation();
          }

          var handler = binding.value.handler || function () {};
          var exclude = binding.value.exclude || [];

          if (
            !el.contains(ev.target) &&
            !clickedOnExcludedEl(exclude, ev.target)
          ) {
            vnode.context[handler]();
          }
        }

        document.addEventListener('click', handleOutsideClick);
        document.addEventListener('touchstart', handleOutsideClick);
      },
      unbind: function () {
        document.removeEventListener('click', handleOutsideClick);
        document.removeEventListener('touchstart', handleOutsideClick);
      }
    });
  };

  function clickedOnExcludedEl(exclude, target) {
    return (exclude || []).reduce(function (result, sel) {
      var elements = document.querySelectorAll(sel);
      Array.from(elements).forEach(function (el) {
        if (el.contains(target)) {
          result = true;
        }
      });
      return result;
    }, false);
  }

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = vueClosable;
  }
  if (window) {
    window.vueClosable = vueClosable;
  }
})();
