<template>
    <kityMinder
            :value="JSON.stringify(json)"
            :type="type"
            @init="initHandler"
            @destroyed="destroyedHandler"
            @import="importHandler"
            @export="exportHandler"
            @contentchange="contentchangeHandler"
    >
        <span slot="title">
            title
        </span>
    </kityMinder>
</template>

<script>
  export default {
    data: () => ({
      json: {
        'data': {
          'id': 2,
          'text': 'Design project',
        },
        'children': [
          {
            'data': {'text': 'Designsy', 'priority': 1, 'id': 3},
            'children': [
              {
                'data': {'text': 'Designsy', 'id': 4},
                'children': [
                  {'data': {'text': 'Designsy', 'id': 5}},
                  {'data': {'text': 'Designsy', 'id': 5}},
                  {'data': {'text': 'Designsy', 'id': 5}},
                ]
              },
              {'data': {'text': 'Designsy', 'id': 5}},
              {'data': {'text': 'Designsy', 'id': 62}},
              {'data': {'text': 'Designsy', 'id': 73}},
              {'data': {'text': 'Designsy', 'id': 84}}
            ]
          },
          {'data': {'text': 'Designsy', 'priority': 2, 'id': 9}},
          {'data': {'text': 'Designsy', 'priority': 3, 'id': 102}},
          {'data': {'text': 'Designsy', 'priority': 4, 'id': 113}},
          {'data': {'text': 'Designsy', 'priority': 5, 'id': 124}}
        ]
      },
      type: 'json',
    }),
    methods: {
      initHandler(editor, minder) {
        console.log('init');
        console.log(editor);
        console.log(minder);
      },
      destroyedHandler() {
        console.log('destroyed');
      },
      contentchangeHandler(content, type) {
        console.log('contentchangeHandler');
        console.log(content);
        console.log(type);
      },
      importHandler(content, type) {
        console.log('importHandler');
        console.log(content);
        console.log(type);
      },
      exportHandler(content, type) {
        console.log('exportHandler');
        console.log(content);
        console.log(type);
      },
    }
  }
</script>
