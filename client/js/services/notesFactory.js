angular.module('notes')
.factory('notesFactory', function(localStorageService) {

  return {
    update: function(note) {
      var notes = this.get()

      notes[note.index] = note

      localStorageService.set('notes', notes)
    },
    create: function(note) {
      var notes = this.get()

      note.index = notes.length

      notes.push(note)

      localStorageService.set('notes', notes)
    },
    get: function(id) {
      var notes = localStorageService.get('notes')

      if(!notes) {
        notes = [] 
      }

      return id === undefined ? notes : notes[id]
    }
  }
})
