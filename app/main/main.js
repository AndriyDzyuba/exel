'use strict';

angular.module('exel.main', ['ngRoute'])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
        .state('main', {
            url:'/main',
            templateUrl: 'main/main.html',
            controller: 'MainPageController'
        })

        .state('main.subcategory', {
            url:'/subcategory/:subcatId',
            templateUrl: 'products/category.html',
            controller: 'SubCategoryController'
        })

        .state('main.ssubcategory', {
            url:'/ssubcategory/:ssubcatId',
            templateUrl: 'products/category.html',
            controller: 'SsubCategoryController'
        })
}])

//фільтр товарів за ціною
.filter('priceLessThan', function () {

    return function (input, price) {
        var output = [];
        if (isNaN(price)) {

            output = input;
        }
        else {
            angular.forEach(input, function (item) {

                if (item.price < price) {
                    output.push(item)
                }
            });
        }
        return output;
    }
})


.controller('SubCategoryController', ['$scope', '$http', '$location', '$stateParams', '$modalStack', 'catService', 'productsService', 'confirmService', 'filtersService', 'currencyService',
    function($scope, $http, $location, $stateParams, $modalStack, catService, productsService, confirmService, filtersService, currencyService) {

    console.log('çontroller runs');
    $scope.categoryId = $stateParams.catId;
    $scope.subcatId = $stateParams.subcatId;
    $scope.subcategory = {};
    $scope.subcategory.c_id = $scope.categoryId;

    if ($scope.subcatId) {
        catService.getSubcat($scope.subcatId).then(function(data){
            $scope.subcategory = data;
        })
    }

    $scope.category = {};

    catService.getSsubcatsBySubCategoryId($stateParams.subcatId).then(function(data){
        $scope.ssubs = data;
        console.log($scope.ssubs);
    })

    $scope.makers = [];
    $scope.loadMakers = function() {
        $scope.lostproducts.length = 0;

        var params = {
        s_id: $stateParams.subcatId,
        limit: 20,
        offset: $scope.makers.length
        }

        filtersService.getListBySubCategoryId(params).then(function(response) {
                console.log(response);
            if (response) {

                for (var i =0; i < response.length; i++) {

                $scope.makers.push(response[i]);

                }
            }
        })
    }
    $scope.loadMakers();

    $scope.products = [];

    $scope.onSelectOptionChanged = function() {
        $scope.products.length = 0;
        $scope.loadMore();
    }

    $scope.loadMore = function() {
        $scope.lostproducts.length = 0;
        var params = {
        s_id: $stateParams.subcatId,
        limit: 12,
        offset: $scope.products.length
        }

        if ($scope.maker) {
            params.maker = $scope.maker
        }

        productsService.getListBySubCategoryId(params).then(function(response) {
            console.log(response);
            if (response) {
                for (var i =0; i < response.length; i++) {
                $scope.products.push(response[i]);
                }
            }
        })
    }
    $scope.loadMore();

    currencyService.getCurrency(1).then(function(data){
            $scope.currency = data;
            console.log($scope.currency);
    })


    $scope.maker = null;

    $scope.cleanFilter = function() {
        $scope.products.length = 0;
        $scope.maker = null;
        $scope.loadMore();
    }

}])

.controller('SsubCategoryController', ['$scope', '$http', '$location', '$stateParams', '$modalStack', 'catService', 'productsService', 'confirmService', 'filtersService', 'currencyService',
    function($scope, $http, $location, $stateParams, $modalStack, catService, productsService, confirmService, filtersService, currencyService) {
    console.log('çontroller runs');
    $scope.subcategoryId = $stateParams.subcatId;
    $scope.ssubcatId = $stateParams.ssubcatId;
    $scope.ssubcategory = {};
    $scope.ssubcategory.s_id = $scope.subcatId;

    if ($scope.ssubcatId) {
        catService.getSsubcat($scope.ssubcatId).then(function(data){
            $scope.ssubcategory = data;
        })
    }

    catService.getCats().then(function(data){

        $scope.categories = data;

    });

    $scope.category = {};

    $scope.makers = [];
    $scope.loadMakers = function() {

        $scope.lostproducts.length = 0;

        var params = {
        s_id: $stateParams.subcatId,
        limit: 20,
        offset: $scope.makers.length
        }

        filtersService.getListBySubCategoryId(params).then(function(response) {
            console.log(response);
            if (response) {
                for (var i =0; i < response.length; i++) {
                $scope.makers.push(response[i]);
                }
            }
        })
    }
    $scope.loadMakers();

    $scope.products = [];

    $scope.onSelectOptionChanged = function() {
        $scope.products.length = 0;
        $scope.loadMore();
    }

    $scope.loadMore = function() {
        $scope.lostproducts.length = 0;
        var params = {
        s_id: $stateParams.subcatId,
        limit: 12,
        offset: $scope.products.length
        }

        if ($scope.maker) {
            params.maker = $scope.maker
        }

        productsService.getListBySsubCategoryId(params).then(function(response) {
             console.log(response);
            if (response) {
                for (var i =0; i < response.length; i++) {
                $scope.products.push(response[i]);
                }
            }
        })
    }
    $scope.loadMore();

    currencyService.getCurrency(1).then(function(data){
            $scope.currency = data;
            console.log($scope.currency);
    })

    $scope.maker = null;

    $scope.cleanFilter = function() {
        $scope.products.length = 0;
        $scope.maker = null;
        $scope.loadMore();
    }

}])


.controller('MainPageController', ['$scope', '$http', '$animate', 'productsService', 'catService', '$stateParams', 'currencyService',
 function($scope, $http, $animate, productsService, catService, $stateParams, currencyService) {

    $scope.newProducts = [];
    $scope.loadMore = function() {
        var params = {
        limit: 12,
        offset: $scope.newProducts.length
        }

        productsService.getProducts(params).then(function(response) {
            console.log(response);
            if (response) {
                for (var i =0; i < response.length; i++) {
                $scope.newProducts.push(response[i]);
                }
            }
        })
    }
    $scope.loadMore();


    currencyService.getCurrency(1).then(function(data){
            $scope.currency = data;
            console.log($scope.currency);
    })

    catService.getCats().then(function(data){
            $scope.categories = data;
        });

        $scope.category = {};

    var $j = jQuery.noConflict();
        $j(document).ready(function(){
          $j('.dropSubMenu').hover(function(e){
            $j(this).next('ul').toggle();
            e.stopPropagation();
          });
          $j('.dropMenu').hover(function(e){
            $j(this).toggle();
            e.stopPropagation();
          });

    });

    $j(document).ready(function(){
      $j("#clickSearch").focusin(function(){
          var div = $j("#formSearch");
          div.animate({width: '100%'}, "slow");
      });
      $j("#clickSearch").focusout(function(){
          var div = $j("#formSearch");
          div.animate({width: '34%'}, "slow");
      });
    });

}]);
