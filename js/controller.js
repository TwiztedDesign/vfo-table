angular.module('app',[])

    .controller('ctrl', ['$scope', function($scope) {

        $scope.tableData = {
            columns : ["Col1","Col2", "Col3"],
            rows : [["", "", ""]]
        };

        function createRow(){
            return $scope.tableData.columns.map(() => "");
        }

        $scope.addRow = function(){
            $scope.tableData.rows.push(createRow());
        };
        $scope.addColumn = function(){
            $scope.tableData.columns.push("");
        };
        $scope.removeRow = function(index){
            $scope.tableData.rows.splice(index, 1);
            if(!$scope.tableData.rows.length){
                $scope.addRow();
            }
        };
        $scope.removeColumn = function(index){
            $scope.tableData.columns.splice(index, 1);

            $scope.tableData.rows.forEach(row => {
                row.splice(index, 1);
            });
            if(!$scope.tableData.columns.length){
                $scope.addColumn();
                vff.controller.update();
            }
        };

        vff.onController('table',(e)=>{
            console.log(e.data);
            $scope.tableData.columns = e.data.columns;
            $scope.tableData.rows = e.data.rows;
            $scope.$apply();
        }, {changeOnly : false})

    }]);



