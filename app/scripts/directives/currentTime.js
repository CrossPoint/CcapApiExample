'use strict';

angular.module('ccapWebApp').directive('myCurrentTime', ['$interval', 'dateFilter', function($interval, dateFilter) {
	return function(scope, element, attrs) {
		var format,
			timer;

		function updateTime() {
			element.text(dateFilter(new Date(), format));
		}
		
		scope.$watch(attrs.myCurrentTime, function(value) {
			format = value;
			updateTime();
		});
		
		timer = $interval(updateTime, 1000);
		
		element.bind('$destroy', function() {
			$interval.cancel(timer);
		});
	};
}]);