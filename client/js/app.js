angular.module('notes', ['hc.marked', 'LocalStorageModule'])
.config(function(markedProvider, localStorageServiceProvider) {
  markedProvider.setOptions({
    gfm: true,
    tables: true,
    highlight: function (code) {
      return hljs.highlightAuto(code).value
    }
  })

  localStorageServiceProvider.setPrefix('notes')
})
