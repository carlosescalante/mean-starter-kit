angular.module('GeekCtrl', []).controller('GeekController', function($scope, $http) {

    $scope.users = {};
    $scope.age = null;
    $scope.currentUser = 0;

    $scope.getUsersFromDB = function(){
        $http.get('/api/users')
            //
            .success(function(data){
                console.log("users gotten! ", data);
                $scope.users = data;
                $scope.age = $scope.users[0].age;
            })
            .error(function(error){
                console.log("error", error);
            });
    };

    $scope.persistChanges = function(){
        $http.post('/api/users', $scope.users)
            .success(function(data){
                console.log("modified collection", data);
            })
            .error(function(error){
                console.log("error saving users to db");
            });
    };

});