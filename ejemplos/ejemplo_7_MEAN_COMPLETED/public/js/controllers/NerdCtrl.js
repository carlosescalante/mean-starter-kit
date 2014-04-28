angular.module('NerdCtrl', []).controller('NerdController', function($scope, $http) {

    $scope.tagline = 'Nothing beats a pocket protector!';
    $scope.user = {
        id: "007",
        password: "passw0rdddd"
    }

    $scope.team = {};
    $scope.currentUser = {};

    $http.get('http://localhost:8080/api/people').success(function(data) {
        console.log("retrieving people from mongodb through angularjs $http.get()", data);
        $scope.team = data;
    }).error(function(err){
            console.log("something went wrong", err);
        });


    function getPersonById(id) {
        $http.get('http://localhost:8080/api/people/' + id).success(function(data) {
            console.log("selecting by id from mongodb with id: " + id, data);
            $scope.currentUser = data;
            $scope.currentUser.isAdmin = $scope.currentUser.isDeveloper = $scope.currentUser.isManager = false;

            for(var i= 0, len = data.roles.length; i < len; i++) {
                switch (data.roles[i]){
                    case "Administrator" :
                        console.log("User *" + data.name + "* is admin");
                        $scope.currentUser.isAdmin = true;
                        break;
                    case "Developer" :
                        console.log("User *" + data.name + "* is a dev!");
                        $scope.currentUser.isDeveloper = true;
                        break;
                    case "Manager" :
                        console.log("User *" + data.name + "* is manager");
                        $scope.currentUser.isManager = true;
                        break;
                }
            }
        }).error(function(err){
                console.log("something went wrong", err);
            });
    }

    $scope.login = function(id) {
        var _id = null;
        for(var i= 0, len = $scope.team.length; i < len; i++) {
            if($scope.team[i].id == id) {
                console.clear();
                console.log("id match found in team!")
                _id = $scope.team[i]._id;
                getPersonById(_id);
                break;
            } else {
                //console.log("no such person!");
            }
        }
    }
});