// main module
(function(){
	'use strict';

	angular
		.module("handyrides", imports());

	// returns a list of imports needed by the module
	function imports(){
		var imports = [];

		imports.push('ngRoute');
		imports.push('ngResource');
		imports.push('ui.bootstrap');
		imports.push('ngCookies');
		imports.push('ngAnimate');
		imports.push('ngAria');
		imports.push('ngMaterial');
		return imports;
	}

})();