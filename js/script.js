angular.module('app',[])

    .controller('ctrl', ['$scope', function($scope) {


        vff.onController('players', e => {
            // console.log(e.data);
            let players = document.querySelector('.all');
            players.innerHTML = '';
            e.data.forEach(player => {
                let playerEl = document.createElement('div');
                playerEl.innerText = player.name;
                players.appendChild(playerEl);
            });
        });
        vff.onController('player', e => {
            let player = vff.data().players.find(p => p.name === e.data);
            document.querySelector('.selected').innerText = JSON.stringify(player);
        });
        vff.onController('columns', e => {
            // console.log(e.data);
        });

        $scope.table = [];
        $scope.columns =[];
        $scope.rows = [];

        vff.onController('table', e => {
            console.log(e.data);
            if(e.data.columns && e.data.rows){
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
                console.table(table);
                $scope.$apply();

            }
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

