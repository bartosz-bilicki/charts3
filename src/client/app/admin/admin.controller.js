(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('AdminController', AdminController);

  AdminController.$inject = ['$q', 'dataservice', 'logger'];
  /* @ngInject */
  function AdminController($q, dataservice, logger) {
    var vm = this;
    vm.title = 'Admin title from controller';

    vm.options = {
        chart: {
            type: 'discreteBarChart',
            height: 450,
            margin : {
                top: 20,
                right: 20,
                bottom: 60,
                left: 20
            },
            x: function(d){ return d.label; },
            y: function(d){ return d.value; },
            showValues: true,
            valueFormat: function(d){
                return d3.format(',.4f')(d);
            },
            transitionDuration: 500,
            xAxis: {
                axisLabel: 'X Axis'
            },
            yAxis: {
                axisLabel: 'Y Axis',
                axisLabelDistance: 30
            }
        }
    };

    vm.pieOptions = {
                chart: {
                    type: 'pieChart',
                    height: 500,
                    x: function(d){return d.key;},
                    y: function(d){return d.y;},
                    showLabels: true,
                    duration: 500,
                    labelThreshold: 0.01,
                    labelSunbeamLayout: true,
                    legend: {
                        margin: {
                            top: 5,
                            right: 35,
                            bottom: 5,
                            left: 0
                        }
                    }
                }
            };

    activate();

    function activate() {
       var promises = [getData()];
            return $q.all(promises).then(function() {
              logger.info('Activated Dashboard View');
            });
    }

    function getData() {
          return dataservice.getData().then(function(data) {
            vm.data = data;
            return vm.data;
          });
        }

  }
})();
