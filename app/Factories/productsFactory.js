angular.module('exel').factory('productsService', ['$http', '$q', '$modal', function($http, $q, $modal, Cropper) {
     
    var productsService = {};
    var defer;


    _createProduct = function(product) {
    	defer = $q.defer();
    	console.log("dd");
    	$http.post('api/products/createProduct.php', product).success(function(data){
            defer.resolve(data);
        });
        return defer.promise;
    }
  
	_getProducts = function() {
		defer = $q.defer();
		$http.get('api/products/getProducts.php').success(function(data){
	        defer.resolve(data);
	    });
	    return defer.promise;
	};

	_getProduct = function(id) {
		var defer = $q.defer();
		$http.post('api/products/getProduct.php', id).success(function(data){
	        defer.resolve(data);
	    });
	    return defer.promise;
	};

	_editProduct = function(product) {
		defer = $q.defer();
		$http.post('api/products/editProduct.php', product).success(function(data){
			defer.resolve(data);
		});
		return defer.promise;
	}

	_deleteProduct = function(id) {
		defer = $q.defer();
		$http.post('api/products/deleteProduct.php', id).success(function(data){
			defer.resolve(data);
		});
		return defer.promise
	};

	_getListByCategoryId = function(id) {
		defer = $q.defer();
		$http.post('api/products/getProductsByCategoryId.php', id).success(function(data){
			defer.resolve(data);
		});
		return defer.promise
	};
	
	_getListBySubCategoryId = function(id) {
		defer = $q.defer();
		$http.post('api/products/getProductsBySubCategoryId.php', id).success(function(data){
			defer.resolve(data);
		});
		return defer.promise
	};

	



	productsService.createProduct = _createProduct;
	productsService.getProducts = _getProducts;
	productsService.getProduct = _getProduct;
	productsService.editProduct = _editProduct;
	productsService.deleteProduct = _deleteProduct;
	productsService.getListByCategoryId = _getListByCategoryId;
	productsService.getListBySubCategoryId = _getListBySubCategoryId;
	
    return productsService;
}]);