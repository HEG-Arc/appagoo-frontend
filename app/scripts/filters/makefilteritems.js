'use strict';

var filters = angular.module('app.filters', []);

filters.filter('makeFilterItems', function() {

        return function(items, filterOn, removeNulls) {

            if (filterOn === false) {
                return items;
            }

            if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
                var hashCheck = {}, filterItems = {}
                filterItems.check = {}
                filterItems.unchosen = []
                filterItems.chosen = []

                var extractValueToCompare = function(item) {
                    if (angular.isObject(item) && angular.isString(filterOn)) {
                        return item[filterOn];
                    } else {
                        return item;
                    }
                };

                items.sort(function(a, b) {
                    if (a[filterOn] > b[filterOn])
                        return 1;
                    if (a[filterOn] < b[filterOn])
                        return -1;
                    // a must be equal to b
                    return 0;
                });

                angular.forEach(items, function(item) {
                    var valueToCheck, isDuplicate = false;

                    for (var i = 0; i < filterItems.chosen.length; i++) {
                        if (angular.equals(extractValueToCompare(filterItems.chosen[i]), extractValueToCompare(item))) {
                            isDuplicate = true;
                            break;
                        }
                    }
                    if (removeNulls) {
                        if (item[filterOn]) {
                            filterItems.check[item] = true;
                            if (!isDuplicate) {
                                filterItems.chosen.push(item)
                            }
                        }
                    } else {
                        if (!isDuplicate) {
                            filterItems.check[item] = true;
                            filterItems.chosen.push(item)
                        }
                    }

                });

                return filterItems;
            };
        };
    });


