angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

    .factory('tasks', function() {
      // Might use a resource here that returns a JSON array

      // Some fake testing data
      var tasks = [{
        title: 'ejemplo'
      },{
        descripcion: 'ejemplo descripcion'
      },
      {
        checked: true
      },
      {
        fecha:new Date()
      },
        {
          face: 'img/task.png'

      }

    ];

      return {
        all: function() {
          var projectString = window.localStorage['tasks'];
           if(projectString) {
             return angular.fromJson(projectString);
           }
           return tasks;
        },
        remove: function(task) {
          tasks.splice(tasks.indexOf(task), 1);
        },

        save: function(tasks) {
         window.localStorage['tasks'] = angular.toJson(tasks);
       }


      };
    })


  .factory('comentarios', function() {
      // Might use a resource here that returns a JSON array

      // Some fake testing data
      var comentarios = [{
        title: ''
      },{
        descripcion: ''
      }

    ];

      return {
        all: function() {
          var projectString = window.localStorage['comentarios'];
           if(projectString) {
             return angular.fromJson(projectString);
           }
           return comentarios;
        },
        remove: function(comentario) {
          comentarios.splice(comentarios.indexOf(comentario), 1);
        },

        save: function(comentarios) {
         window.localStorage['comentarios'] = angular.toJson(comentarios);
       }


      };
    })




    .factory('ngFB', function ($q, $window) {

            function init(params) {
                return $window.openFB.init(params);
            }

            function login(options) {
                var deferred = $q.defer();
                $window.openFB.login(function(result) {
                    if (result.status === "connected") {
                        deferred.resolve(result);
                    } else {
                        deferred.reject(result);
                    }
                }, options);
                return deferred.promise;
            }

            function logout() {
                var deferred = $q.defer();
                $window.openFB.logout(function() {
                    deferred.resolve();
                });
                return deferred.promise;
            }

            function api(obj) {
                var deferred = $q.defer();
                obj.success = function(result) {
                    deferred.resolve(result);
                };
                obj.error = function(error) {
                    deferred.reject(error);
                };
                $window.openFB.api(obj);
                return deferred.promise;
            }

            function revokePermissions() {
                var deferred = $q.defer();
                $window.openFB.revokePermissions(
                    function() {
                        deferred.resolve();
                    },
                    function() {
                        deferred.reject();
                    }
                );
                return deferred.promise;
            }

            function getLoginStatus() {
                var deferred = $q.defer();
                $window.openFB.getLoginStatus(
                    function(result) {
                        deferred.resolve(result);
                    }
                );
                return deferred.promise;
            }

            return {
                init: init,
                login: login,
                logout: logout,
                revokePermissions: revokePermissions,
                api: api,
                getLoginStatus: getLoginStatus
            };

        });
