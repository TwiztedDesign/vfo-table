angular.module('app',[])

    .controller('ctrl', ['$scope', function($scope) {

        let row = {
            Col1: "",
            Col2: 0,
            position : "",
        };

        let baseColumns = ["Col1","Col2", "Col3"];


        $scope.tableData = {};

        $scope.tableData.rows = [];
        $scope.tableData.columns = baseColumns;

        function createRow(){
            return $scope.tableData.columns.map(col => {
                return "";
            });

        }

        $scope.addRow = function(){
            $scope.tableData.rows.push(createRow());
        };
        $scope.addColumn = function(){
            $scope.tableData.columns.push("");
        };
        $scope.removeRow = function(index){
            $scope.tableData.rows.splice(index, 1);
        };
        $scope.removeColumn = function(index){
            $scope.tableData.columns.splice(index, 1);

            $scope.tableData.rows.forEach(row => {
                row.splice(index, 1);
                // delete row[index];
            });
        };

        $scope.$watch(()=>{return vff.data();}, (data) => {
            if(data && data.table){
                $scope.tableData.rows = data.table.rows || [];
                $scope.tableData.columns = data.table.columns || [];
            }
        },true);


        setInterval(()=>{
            try{ $scope.$apply(); } catch (e) {}
        }, 500);


    }]);



