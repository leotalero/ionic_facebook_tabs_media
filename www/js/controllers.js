angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {

    console.log('dash');
})

.controller('ComentarioController', function($scope,$ionicModal,comentarios) {


  $scope.comentarios = comentarios.all();



  // Create and load the Modal
  $ionicModal.fromTemplateUrl('new-comentario.html', function(modal) {
    $scope.comentarioModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  // Called when the form is submitted
  $scope.createComentario= function(comentario) {
    $scope.comentarios.push({
      title: comentario.title,
      descripcion: comentario.descripcion,
      checked: false,
      fecha: new Date().format("dd-mm-yyyy HH:MM:ss"),
      face: 'img/comment_green.jpg'
    });
    $scope.comentarioModal.hide();
    comentarios.save($scope.comentarios);
    comentario.title = "";
    comentario.descripcion = "";
  };

  // Open our new task modal
  $scope.newComentario = function() {
    $scope.comentarioModal.show();
  };

  // Close the new task modal
  $scope.closeNewComentario = function() {
    $scope.comentarioModal.hide();
  };

  $scope.comentarios= comentarios.all();
  $scope.remove = function(comentario) {
  $scope.comentarios.splice($scope.comentarios.indexOf(comentario), 1);
  tasks.save($scope.comentarios);
  };





})

.controller('todoController', function($scope,$ionicModal,tasks) {


  $scope.tasks = tasks.all();

  $scope.pushNotificationChange = function(task) {
  tasks.save($scope.tasks);
      console.log('Push Notification Change', task.checked);
    };

  // Create and load the Modal
  $ionicModal.fromTemplateUrl('new-task.html', function(modal) {
    $scope.taskModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  // Called when the form is submitted
  $scope.createTask = function(task) {
    $scope.tasks.push({
      title: task.title,
      descripcion: task.descripcion,
      checked: false,
      fecha: new Date().format("dd-mm-yyyy HH:MM:ss"),
      face: 'img/task.png'
    });
    $scope.taskModal.hide();
    tasks.save($scope.tasks);
    task.title = "";
    task.descripcion = "";
  };

  // Open our new task modal
  $scope.newTask = function() {
    $scope.taskModal.show();
  };

  // Close the new task modal
  $scope.closeNewTask = function() {
    $scope.taskModal.hide();
  };

  $scope.tasks = tasks.all();
  $scope.remove = function(task) {
  $scope.tasks.splice($scope.tasks.indexOf(task), 1);
  tasks.save($scope.tasks);
  };





})



.controller('ChatsCtrl', function($scope) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  console.log("chats");






})


.controller('MusicCtrl', function($scope) {
    console.log("music:");
    $scope.tracks = [
      {
          url: 'https://ionic-audio.s3.amazonaws.com/Roxane.mp3',
          artist: 'The Police',
          title: 'Roxane',
          art: 'https://ionic-audio.s3.amazonaws.com/The_Police_Greatest_Hits.jpg'
      },
        {
            url: 'https://ionic-audio.s3.amazonaws.com/Message%20in%20a%20bottle.mp3',
            artist: 'The Police',
            title: 'Message in a bottle',
            art: 'https://ionic-audio.s3.amazonaws.com/The_Police_Greatest_Hits.jpg'
        }
    ];
})



.controller('AccountCtrl', function($scope, $http, $localStorage, $location) {


  console.log("acount");
  $scope.settings = {
    enableFriends: true
  };


      if($localStorage.hasOwnProperty("accessToken") === true) {
          $http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: $localStorage.accessToken, fields: "id,name,gender,location,website,picture,relationship_status", format: "json" }}).then(function(result) {


            console.log(result.data);
              $scope.profileData = result.data;
          }, function(error) {
              alert("Problemas conectandose con el perfil.");
              console.log(error);
          });
      } else {
          alert("Not signed in");
          $location.path("/login");
      }




})



  .controller("LoginController", function($scope,$http, $localStorage,$state ,$location,ngFB) {

              // Defaults to sessionStorage for storing the Facebook token
        ngFB.init({appId: '1631387813743280'});

      console.log("ingresalog:");
      // Defaults to sessionStorage for storing the Facebook token


      //  Uncomment the line below to store the Facebook token in localStorage instead of sessionStorage
      //  openFB.init({appId: 'YOUR_FB_APP_ID', tokenStore: window.localStorage});

      $scope.login = function() {
                console.log("path:"  + window.sessionStorage);

       if(window.sessionStorage.hasOwnProperty("fbAccessToken") === false || window.sessionStorage.fbAccessToken =="null") {
          ngFB.login({scope: 'email,public_profile,user_website,user_location,user_relationships'}).then(

              function(response) {
                  alert('Facebook login ejecutado correctamente');
                    $localStorage.accessToken = response.authResponse.accessToken;
                    console.log("token:"+response.authResponse.accessToken);
                    console.log("path:"  +  $location.path());
                    ngFB.api({path: '/me'}).then(
                      function(user) {
                          console.log(JSON.stringify(user));
                          $scope.user = user;
                          $localStorage.usuario=user;

                      },
                      errorHandler);
                    window.location = '#/tab/dash';
              },
              function(error) {
                  alert('Facebook login fallo: ' + error);
              });

     }else{
           window.location = '#/tab/dash';

      }


      }

      $scope.getInfo = function() {

           if($localStorage.hasOwnProperty("usuario") === true  && $localStorage.usuario !=null ) {
             $scope.user = $localStorage.usuario;
           }else{

                                       ngFB.api({path: '/me'}).then(
                                         function(user) {
                                             console.log(JSON.stringify(user));
                                             $scope.user = user;
                                             $localStorage.usuario=user;

                                         },
                                         errorHandler);

           }

          //  }else{
          //      alert("Debe loguearse con facebook");

          //  }




      }

      $scope.share = function() {
          ngFB.api({
              method: 'POST',
              path: '/me/feed',
              params: {message: document.getElementById('Message').value || 'Testing Facebook APIs'}
          }).then(
              function() {
                  alert('the item was posted on Facebook');
              },
              errorHandler);
      }

      $scope.readPermissions = function() {
          ngFB.api({
              method: 'GET',
              path: '/me/permissions'
          }).then(
              function(result) {
                  alert(JSON.stringify(result.data));
              },
              errorHandler
          );
      }

      $scope.revoke = function() {
          ngFB.revokePermissions().then(
              function() {
                  alert('Permissions revoked');
              },
              errorHandler);
      }

      $scope.logout = function() {

          ngFB.logout().then(
              function() {
                window.sessionStorage.fbAccessToken=null;
                  alert('Logout successful');
              },
              errorHandler);
      }


      function errorHandler(error) {
          alert(error.message);
      }


  })






  .controller("ProfileController", function($scope, $http, $localStorage, $location) {
      console.log("profile");

          if($localStorage.hasOwnProperty("accessToken") === true) {
              $http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: $localStorage.accessToken, fields: "id,name,gender,location,website,picture,relationship_status,work", format: "json" }}).then(function(result) {
                console.log("data:"+result.data);
                  $scope.profileData = result.data;
              }, function(error) {
                  alert("There was a problem getting your profile.  Check the logs for details."+error);
                  console.log(error);
              });
          } else {
              alert("Not signed in");
              $location.path("/login");
          }


  })
