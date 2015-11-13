angular.module('ionicApp', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('signin', {
      url: '/sign-in',
      templateUrl: 'templates/sign-in.html',
      controller: 'SignInCtrl'
    })
    .state('forgotpassword', {
      url: '/forgot-password',
      templateUrl: 'templates/forgot-password.html'
    })
    .state('home', {
      url: '/home',
      templateUrl: 'templates/home.html',  
    });


   $urlRouterProvider.otherwise('/sign-in');

})

.controller('SignInCtrl', function($scope, $state, $timeout, $ionicModal) {
  
  $scope.signIn = function(user) {
    console.log('Sign-In', user);
    $state.go('home');
  };
  
  $ionicModal.fromTemplateUrl('my-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
    
  });
  
  $scope.openModal = function() {
    $scope.modal.show();
    
    var selected = [];
    $(".image").click(function () {
      var productId = $(this).attr("data-product-id");
      var index = selected.indexOf(productId);
      if (index === -1) {
        selected.push(productId);
        $(this).addClass("checked");
      } else {
        selected.splice(index, 1);
        $(this).removeClass("checked");
      }

      if (selected.length === 3 && 
          selected.indexOf("5") !== -1 && 
          selected.indexOf("9") !== -1 &&
          selected.indexOf("11") !== -1) {
        console.log("success");
      }
    })
    $(".continue-button").click(function () {
      $(".success").show();
      $(".captcha").hide();

      setTimeout(function () {
        $scope.$apply(function () {
          $scope.modal.hide();
          $timeout(function () {
            $state.go('home');
          }, 50);
        });
      }, 2000);
    });    
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });


})

.controller('HomeTabCtrl', function($scope) {
  console.log('HomeTabCtrl');
});


