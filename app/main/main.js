'use strict';  

angular.module('exel.main', ['ngRoute'])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
        .state('main', {
            url:'/main',
            templateUrl: 'main/main.html',
            controller: 'MainPageController'
        })

        .state('main.category', {
            url:'/category/:catId',
            templateUrl: 'products/category.html',
            controller: 'CategoryController'
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

        .state('main.product', {
            url:'/product/:id',
            templateUrl: 'product/product.html',
            controller: 'ProductController'
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

.controller('ProductController', ['$scope', '$location', '$state', '$stateParams', 'productsService', 'modalsService', function($scope, $location, $state, $stateParams, productsService, modalsService) {
    console.log("xx")
    productsService.getProduct($stateParams.productId).then(function(data){
        $scope.product = data;
    })

    productsService.getProducts().then(function(data){
        $scope.products = data.reverse();
    })

    $scope.callModal = function () {
        modalsService.openModal();
    }

}])

.controller('CategoryController', ['$scope', '$http', '$location', '$timeout', '$modal', '$stateParams', 'cropperService', '$modalStack', 'catService', 'productsService', 'confirmService', function($scope, $http, $location, $timeout, $modal, $stateParams, cropperService, $modalStack, catService, productsService, confirmService) {
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

    catService.getCats().then(function(data){
        $scope.categories = data;
        
    });

    $scope.category = {};

    /*
    productsService.getListByCategoryId($stateParams.catId).then(function(data){
        $scope.products = data;
    })
    */
}])

.controller('SubCategoryController', ['$scope', '$http', '$location', '$timeout', '$modal', '$stateParams', 'cropperService', '$modalStack', 'catService', 'productsService', 'confirmService', 'filtersService', function($scope, $http, $location, $timeout, $modal, $stateParams, cropperService, $modalStack, catService, productsService, confirmService, filtersService) {
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

   filtersService.getMakers($stateParams.productId).then(function(data){
            $scope.makers = data;   
    });


    $scope.products = [];

    $scope.onSelectOptionChanged = function() {
        $scope.products.length = 0;
        $scope.loadMore();
    }
   
    $scope.loadMore = function() {

        var params = {
        s_id: $stateParams.subcatId,
        limit: 10,
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

    $scope.filtproducts = [];

    $scope.maker = null;

    $scope.cleanFilter = function() {

        $scope.products.length = 0;
        $scope.maker = null;
        $scope.loadMore();

    }



}])

.controller('SsubCategoryController', ['$scope', '$http', '$location', '$timeout', '$modal', '$stateParams', 'cropperService', '$modalStack', 'catService', 'productsService', 'confirmService', 'filtersService', function($scope, $http, $location, $timeout, $modal, $stateParams, cropperService, $modalStack, catService, productsService, confirmService, filtersService) {
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


    filtersService.getMakers($stateParams.productId).then(function(data){
            $scope.makers = data;   
    });


    $scope.products = [];

    $scope.onSelectOptionChanged = function() {
        $scope.products.length = 0;
        $scope.loadMore();
    }
   
    $scope.loadMore = function() {

        var params = {
        s_id: $stateParams.subcatId,
        limit: 10,
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

    $scope.filtproducts = [];

    $scope.maker = null;

    $scope.cleanFilter = function() {

        $scope.products.length = 0;
        $scope.maker = null;
        $scope.loadMore();

    }




}])



.controller('MainPageController', ['$scope', '$http', '$animate', 'productsService', 'catService', 
    function($scope, $http, $animate, productsService, catService) {



    productsService.getProducts().then(function(data){
        console.log(data);
      $scope.newProducts = data.reverse();
      if ($scope.newProducts.length > 4) {
        $scope.newProducts = $scope.newProducts.splice(0, 9);
      }
      //$scope.mainProduct = $scope.products.splice(0, 1)[0];
    })

    catService.getCats().then(function(data){
            $scope.categories = data;
            
        });

        $scope.category = {};

    var $j = jQuery.noConflict();
        $j(document).ready(function(){
          $j('.dropSubMenu').mouseenter (function(e){
            $j(this).next('ul').toggle();
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