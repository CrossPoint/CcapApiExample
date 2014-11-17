'use strict';

angular.module('ccapWebApp').directive('myResizeButtons', ['$window', '$interval', function($window, $interval) {
	return {
		link: function($scope, element) {
			$scope.resizeButtons = function() {
				var columns = 2;
				var buttons = $('.btn');
				var rows = Math.ceil(buttons.length / columns);
				$('.btn').css({ 'height': ((($(window).height() - 72) / rows) - 10) + 'px' });
			};
			
			$scope.resizeButtons();
			
			$scope.interval = $interval(function() {
				$scope.resizeButtons();
			}, 100);
			
			$scope.$on('$destroy', function() {
				$interval.cancel($scope.interval);
			});
			
			return angular.element($window).bind('resize', function() {
				$scope.resizeButtons();
			});
		}
	};
}]);