<template>
    <div ng-app="kityminderDemo" ng-controller="MainController">
        <h1 class="editor-title">
            <slot name="title">
                <span @click="gotoGithub">
                    KityMinder Editor
                </span>
            </slot>
            <a href=""
               class="diy export"
               @click="exportHandler('json')"
            >导出json</a>
            <a href="" class="diy export" @click="exportHandler('markdown')">导出md</a>
            <a href="" class="diy export" @click="exportHandler('json')">导出km</a>
            <a href="" class="diy export" @click="exportHandler('svg')">导出svg</a>
            <a href="" class="diy export" @click="exportHandler('text')">导出text</a>
            <a href="" class="diy export" @click="exportHandler('png')">导出png</a>
            <button class="diy input" @click="inputHandler">
                导入
            </button>
            <input type="file" class="fileInput" ref="fileInput" accept=".km,.txt,.md,.json">
        </h1>
        <kityminder-editor on-init="initEditor(editor, minder)"></kityminder-editor>
    </div>
</template>

<script>
  import 'marked';
  import 'kity';
  import '../assets/bower_components/bootstrap/dist/css/bootstrap.css'
  import '../assets/bower_components/codemirror/lib/codemirror.css'
  import '../assets/bower_components/hotbox/hotbox.css'
  import 'kityminder-core/dist/kityminder.core.css'
  import '../assets/bower_components/color-picker/dist/color-picker.min.css'
  import '../assets/kityminder.editor.min.css'


  import '../assets/bower_components/angular/angular.js';
  import '../assets/bower_components/angular-bootstrap/ui-bootstrap-tpls.js';

  import 'codemirror';
  import 'codemirror/mode/xml/xml.js';
  import 'codemirror/mode/javascript/javascript.js';
  import 'codemirror/mode/css/css.js';
  import 'codemirror/mode/htmlmixed/htmlmixed.js';
  import 'codemirror/mode/markdown/markdown.js';
  import 'codemirror/addon/mode/overlay.js';
  import 'codemirror/mode/gfm/gfm.js';


  import '../assets/bower_components/angular-ui-codemirror/ui-codemirror.js';

  import '../assets/bower_components/hotbox/hotbox.js';
  import '../assets/bower_components/json-diff/json-diff.js';
  import 'kityminder-core/dist/kityminder.core.min.js';
  import '../assets/bower_components/color-picker/dist/color-picker.min.js';


  import '../assets/kityminder.editor.min.js';

  export default {
    name: 'kityMinder',
    data() {
      return {
        editor: '',
        minder: '',
      }
    },
    props: {
      value: {
        type: [Object, Array, String],
        default: () => []
      },
      type: {
        type: String,
        default: 'json'
      }
    },
    watch: {
      value: {
        handler() {
          this.importData();
        },
        deep: true,
      },
      type: {
        handler() {
          this.importData();
        },
        deep: true,
      }
    },
    mounted() {
      let that = this;
      angular.module('kityminderDemo', ['kityminderEditor'])
        .config(function (configProvider) {
          configProvider.set('imageUpload', '../server/imageUpload.php');
        })
        .controller('MainController', function ($scope) {
          $scope.initEditor = function (editor, minder) {
            that.editor = editor;
            that.minder = minder;
            that.$emit('init', editor, minder);
            that.importData();
            that.minder.on('contentchange', function (val) {
              that.contentChangeHandler(that.type)
            });
          };
        });
      this.$refs.fileInput.addEventListener('change', this.fileChangeHandler)
    },
    destroyed() {
      this.$emit('destroyed')
      this.$refs.fileInput.removeListener('change', this.fileChangeHandler)
    },
    methods: {
      contentChangeHandler() {
        this.editor.minder.exportData(this.type).then((content) => {
          this.$emit('contentchange', content, this.type)
        });
      },
      inputHandler() {
        this.$refs.fileInput.click();
      },
      fileChangeHandler(event) {
        const f = this.$refs.fileInput;
        const {files} = f;
        if (files) {
          [...files].forEach((file) => {
            let fileType = file.name.substr(file.name.lastIndexOf('.') + 1);
            switch (fileType) {
              case 'md':
                this.type = 'markdown'
                break;
              case 'txt':
                fileType = 'text';
                this.type = 'text';
                break;
              case 'km':
                fileType = 'json';
                this.type = 'json';
                break;
              case 'json':
                fileType = 'json';
                this.type = 'json';
                break;
              default:
                alert('只支持.km、.md、、text、.json文件');
                return;
            }
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = (e) => {
              const {result} = e.target;
              this.editor.minder.importData(this.type, result).then((data) => {
                this.$emit('import', data, this.type)
                // this.innerValue = data;
              });
            };
          });
        }
        event.target.value = '';
      },
      gotoGithub() {
        window.open('https://github.com/YMFL/ymfl-kityMinder');
      },
      exportHandler(exportType) {
        this.editor.minder.exportData(exportType).then((content) => {
          this.$emit('export', content, exportType)
        });
      },
      // dataURLtoBlob(dataurl) {
      //   var arr = dataurl.split(',');
      //   //注意base64的最后面中括号和引号是不转译的
      //   var _arr = arr[1].substring(0, arr[1].length - 2);
      //   var mime = arr[0].match(/:(.*?);/)[1],
      //     bstr = atob(_arr),
      //     n = bstr.length,
      //     u8arr = new Uint8Array(n);
      //   while (n--) {
      //     u8arr[n] = bstr.charCodeAt(n);
      //   }
      //   return new Blob([u8arr], {
      //     type: mime
      //   });
      // },
      importData() {
        this.editor.minder.importData(this.type, this.value).then(function (data) {
          console.log(data)
        });
      }
    },
  }
</script>
<style scoped>
    h1.editor-title {
        cursor: pointer;
        background: #393F4F;
        color: white;
        margin: 0;
        height: 40px;
        font-size: 14px;
        line-height: 40px;
        font-family: 'Hiragino Sans GB', 'Arial', 'Microsoft Yahei';
        font-weight: normal;
        padding: 0 20px;
    }

    div.minder-editor-container {
        position: absolute;
        top: 40px;
        bottom: 0;
        left: 0;
        right: 0;
    }

    .diy {
        margin-top: 0;
        float: right;
        background-color: #fff;
        min-width: 60px;
        text-decoration: none;
        color: #999;
        padding: 0 10px;
        border: none;
        border-right: 1px solid #ccc;
    }

    .input {
        overflow: hidden;
        position: relative;
    }

    .fileInput {
        display: none;
    }
</style>
