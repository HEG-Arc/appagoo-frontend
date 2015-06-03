'use strict';

/**
 * @ngdoc function
 * @name appagooApp.controller:StoreCtrl
 * @description
 * # StoreCtrl
 * Controller of the appagooApp
 */
angular.module('appagooApp')
  .controller('StoreCtrl', function ($scope, $http, $filter, $cookies) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    //profile
        
    var getProfile = function(){
      $http.get('/api/profiles/?format=json').then(function(results) {
         $scope.profiles = results.data;
         getApps();
      });
    };
    
    $scope.profilUpdate = function(obj) {
      if ($scope.authenticated) {
        $http.put('/api/profiles/'+obj.id+'/', obj);  
        getInstalledApps();
      }
      getApps(); 
    }
    
    getProfile();

    $scope.$on('user:login', function(event,data) {
      $scope.authenticated = true;
      getProfile();
      getInstalledApps();
    });
    
    //store
    
    var makeFilterItems = $filter('makeFilterItems');
    
    $scope.name = "";
    
    $scope.priceFilter = {
      free:true,
      commercial:false
    };
    
    $scope.filters = {
      order : "downloads",
      minRate : 0.25,
      categories : [1],
      price : 0
    };
    
    $scope.filter = {
      check : [],
      chosen : {},
      unchosen : {}
    }
    
    $scope.currentPage = 1;
    $scope.totalItems = 500000;
    $scope.numPerPage = 18;
    $scope.maxSize = 5;
    
    $scope.changed = function(item) {
      getApps();
    }
    
    $scope.$watch('name', function() {
      $scope.currentPage = 1;
      getApps();
    });
    
    $scope.$watch('filters.order', function() {
      getApps();
    });
    
    $scope.$watch('filters.minRate', function() {
      $scope.currentPage = 1;
      getApps();
    });
    
    $scope.$watch('priceFilter.free', function() {
      $scope.currentPage = 1;
      setPrice();
      getApps();
    });
    
    $scope.$watch('priceFilter.commercial', function() {
      $scope.currentPage = 1;
      setPrice();
      getApps();
    });
    
    $scope.$watch('filters.categories.length', function() {
      getApps();
    });
    
    var getCategories = function() {
      $http.get('/api/categories/?format=json').then(function(results) {
        $scope.categories = results.data;
        $scope.filter = makeFilterItems($scope.categories, "label", true); 
      });
    };
    
    getCategories();

    var getApps = function() {  
      if(null != $scope.profiles) {
        if($scope.name == "") {
          $http.get('/api/applications/?format=json&minRate='+($scope.filters.minRate-0.25)+'&order='+$scope.filters.order+'&categories='+$scope.filters.categories+'&page='+$scope.currentPage+'&price='+$scope.filters.price+'&profile='+(10-$scope.profiles[0].value)+','+(10-$scope.profiles[1].value)+','+(10-$scope.profiles[2].value)+','+(10-$scope.profiles[3].value)+','+(10-$scope.profiles[4].value)+','+(10-$scope.profiles[5].value)+','+(10-$scope.profiles[6].value)).then(function(results) {
            $scope.applications = results.data.results;
            $scope.totalItems = results.data.count;
          });
        } else {
          $http.get('/api/applications/?format=json&minRate='+($scope.filters.minRate-0.25)+'&order='+$scope.filters.order+'&categories='+$scope.filters.categories+'&page='+$scope.currentPage+'&price='+$scope.filters.price+'&profile='+(10-$scope.profiles[0].value)+','+(10-$scope.profiles[1].value)+','+(10-$scope.profiles[2].value)+','+(10-$scope.profiles[3].value)+','+(10-$scope.profiles[4].value)+','+(10-$scope.profiles[5].value)+','+(10-$scope.profiles[6].value)+'&name='+$scope.name).then(function(results) {
            $scope.applications = results.data.results;
            $scope.totalItems = results.data.count;
          });
        }
       }
    };
    
    $scope.changeCommercialPriceFilter = function() {
      $scope.priceFilter.commercial = !$scope.priceFilter.commercial;
      setPrice();
    };

    $scope.changeFreePriceFilter = function() {
      $scope.priceFilter.free = !$scope.priceFilter.free;
      setPrice();
    };
    
    var setPrice = function() {
      if($scope.priceFilter.free && $scope.priceFilter.commercial) {
          $scope.filters.price = 2;
      }
      if(!$scope.priceFilter.free && !$scope.priceFilter.commercial) {
          $scope.filters.price = 2;
      }
      if($scope.priceFilter.free && !$scope.priceFilter.commercial) {
          $scope.filters.price = 0;
      }
      if(!$scope.priceFilter.free && $scope.priceFilter.commercial) {
          $scope.filters.price = 1;
      }
    };

    $scope.filterByCategory = function(item) {
        return $scope.filter.check[item.category];
    };
    
    $scope.addCategoryFilter = function(item) {
      removeFromArray($scope.filter.unchosen, item);
      $scope.filter.chosen.push(item);
      $scope.filter.check[item] = true;
      removeFromArray($scope.filters.categories, item.id);
    };

    $scope.removeCategoryFilter = function(item) {
      removeFromArray($scope.filter.chosen, item);
      $scope.filter.unchosen.push(item);
      $scope.filter.check[item] = false;
      $scope.filters.categories.push(item.id);
    };
    
    function removeFromArray(array, item) {
      var idx = array.indexOf(item);
      if (idx > -1) {
          array.splice(idx, 1);
      }
      return array;
    };
    
    //check
    var getInstalledApps = function() {  
      if ($scope.authenticated) {
        if(null != $scope.profiles) {
          $http.get('/api/userProfiles/?format=json'+'&profile='+(10-$scope.profiles[0].value)+','+(10-$scope.profiles[1].value)+','+(10-$scope.profiles[2].value)+','+(10-$scope.profiles[3].value)+','+(10-$scope.profiles[4].value)+','+(10-$scope.profiles[5].value)+','+(10-$scope.profiles[6].value)).then(function(results) {
            $scope.installedApps = results.data;
          });
        }
      }
    };
    
});
