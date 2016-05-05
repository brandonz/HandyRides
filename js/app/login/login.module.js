// main module
(function(){
	'use strict';

	angular
		.module("login", imports());

	// returns a list of imports needed by the module
	function imports(){
		var imports = [];

		imports.push('ngResource');
		imports.push('ui.bootstrap');
		imports.push('ngCookies');
		return imports;
	}

})();