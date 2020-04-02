angular.module('app',[])

    .controller('ctrl', ['$scope', function($scope) {

        $scope.table = [];
        $scope.columns =[];
        $scope.rows = [];

        $scope.vff = vff;

        vff.onController('table', e => {
            // console.log(e.data);
            e.data.columns = e.data.columns || [];
            e.data.rows = e.data.rows || [];


            $scope.columns = e.data.columns;
            $scope.rows = e.data.rows.map(objToArr);
            let columns = e.data.columns, rows = e.data.rows;
            let table = rows.map(row => {
                return Object.keys(row).reduce((res, key) => {
                    res[columns[key]] = row[key];
                    return res;
                },{})
            });
            $scope.table = table;
            // console.table(table);
            $scope.$apply();

        });


        function objToArr(obj){
            let arr = [];
            Object.keys(obj).forEach(key => {
                if(!isNaN(key)){
                    arr[key] = obj[key];
                }
            });
            return arr;
        }

    }]);

