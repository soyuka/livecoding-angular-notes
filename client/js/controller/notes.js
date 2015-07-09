angular.module('notes')
.controller('notesCtrl', function($scope, localStorageService, notesFactory) {

  $scope.notes = notesFactory.get()

  $scope.note = {}

  $scope.createOrUpdate = function() {

    if($scope.note.index === undefined) {
      notesFactory.create($scope.note)
    } else {
      notesFactory.update($scope.note) 
    }

    $scope.notes = notesFactory.get()
    $scope.note = {}
  }

  $scope.update = function(id) {
    $scope.note = $scope.notes[id]
  }

})
