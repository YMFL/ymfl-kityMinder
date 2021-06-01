
import _CodeMirror from 'codemirror'
import marked from 'marked'


window.CodeMirror = _CodeMirror
window.marked = marked
window.$ = require('jquery');
window.jquery = require('jquery');
window.jQuery = require('jquery');

import kityMinder from './src/minder.vue'

kityMinder.install = function (Vue) {
  Vue.component(kityMinder.name, kityMinder)
}

export default kityMinder
