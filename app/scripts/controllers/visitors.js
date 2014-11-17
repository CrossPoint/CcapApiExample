'use strict';

angular.module('ccapApp')
    .controller('VisitorsController', function($scope, $wamp) {

        // Create chart
        $scope.chart = {
            options: {
                chart: {
                    type: 'column'
                }
            },
            title: {
                text: 'Visitors'
            },
            loading: true,
            exporting: { enabled: false }
        };

        // Load entrances from the CCAP
        var loadEntrances = function() {
            // Get the entrances
            $wamp.call('com.crosspoint.accesspoint.getentrances').then(
                function(res) {
                    var kwargs = res.kwargs;
                    var entrances = Enumerable.from(kwargs.entrance).where(function(e) { return e.enabled == 'true'; }).toArray();
                    console.log('Enabled entrances', entrances);
                    $scope.entrances = entrances;

                    loadCountings();
                });
        };

        // Load incoming visitors from the CCAP
        var loadCountings = function() {
            // Get the entrances
            $wamp.call('com.crosspoint.accesspoint.getcounters', [
                {
                    resolution: 'hour',
                    timebase: 'today',
                    Countings: [
                        {
                            Counting: [
                                {
                                    group: 0, // Visitors
                                    type: 0 // Incoming side A
                                }, {
                                    group: 0, // Visitors
                                    type: 2 // Incoming side B
                                }
                            ]
                        }
                    ]
                }
            ]).then(
                function(res) {
                    var kwargs = res.kwargs;

                    // Create results
                    var result = [];
                    Enumerable.range(0, 23).forEach(function(r) {
                        result[r] = 0;
                    });

                    Enumerable.from(kwargs.period).forEach(function(p) {
                        var hour = new Date(Date.parse(p.timestamp)).getHours();
                        result[hour] = Enumerable.from(p.device).select(function(d) {
                            if (d.counting) {
                                return Enumerable.from(d.counting).select(function(c) { return parseInt(c.value); }).sum();
                            }
                            return 0;
                        }).sum();
                    });

                    // Update the chart
                    console.log(result);
                    $scope.chart.series = [
                        {
                            name: 'Incoming visitors',
                            data: result
                        }
                    ];
                    $scope.chart.loading = false;
                });
        };

        // Trigger on counters changed event
        $wamp.subscribe('com.crosspoint.accesspoint.counterschanged', function(args) {
            var hour = new Date(Date.parse(args.time)).getHours();
            var counting = Enumerable.from(args.counting).where(function(c) {
                return (c.group == 0 && (c.type == 0 || c.type == 2)); // Group visitors and side A or B incoming
            }).select(function(c) {
                return parseInt(c.value);
            }).sum();

            // Update the serie
            var serie = $scope.chart.series[0];
            serie.data[hour] += counting;
        });

        // Load the counting data
        loadCountings();
    });