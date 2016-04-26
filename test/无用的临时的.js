angular.module('mainApp').directive('onFinishRenderFilters', function($timeout) {
		return {
			restrict: 'A',
			link: function(scope, element, attr) {
				if (scope.$last === true) {
					$timeout(function() {
						//根据controller的关系是选择$emit或者$broadcast
						scope.$emit('ngRepeatFinished');
					});
				}
			}
		};
	})
	.controller('test', ["$scope", function($scope) {
		$scope.$on('ngRepeatFinished'，function(ngRepeatFinishedEvent) {
			$('#div_scrollbar').tinyscrollbar();
		});
	}]);
	
	
angular.module('mainApp').directive('onFinishRenderFilters', function($timeout) {
		return {
			restrict: 'A',
			link: function(scope, element, attr) {
				if (scope.$last === true) {
					var finishFunc = scope.$parent[attr.onFinishRenderFilters];
					if (finishFunc) {
						finishFunc();
					}
				}
			}
		};
	})
	.controller('test', ["$scope", function($scope) {
		$scope.Complete = function() {
			$('#div_scrollbar').tinyscrollbar();
		}
	}]);