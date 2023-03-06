
//1. create app module
var ItemApp = angular.module('myApp', ["ui.grid", "ui.grid.pagination"]);

//5. create submitStudentForm() function. This will be called when user submits the form

ItemApp.controller("validateCtrl", ['$scope', 'crudService', function ($scope, crudService) {
    ///  document.write("ffff");
    $scope.IsShow = true;
    $scope.IsHidden = true;
    $scope.ListTitle = 'Detail';
    $scope.gridOptions = [];
    $scope.ListItemInfo = [];
    $scope.BillNo = "";
    $scope.Name = "";
    $scope.Address = "";
    $scope.Phone = "";

    $scope.ShowHide = function () {

        $scope.IsHidden = false;
    }
    $scope.SaveUpdate = function () {
        //alert(JSON.stringify(data));
        var apiRoute = '/api/apItem/SaveUpdate/';
        
        var data = {
            BillNo: $scope.BillNo,
            Name: $scope.Name,
            Address: $scope.Address,
            Phone: $scope.Phone

        };
        var cmnparam = "[" + JSON.stringify(data) + "," + JSON.stringify($scope.ListItemInfo) + "]";
        /////alert(cmnparam);
        var create = crudService.GetList(apiRoute, cmnparam);

        
        create.then(function (response) {
            alert(JSON.stringify(response));
            // $scope.Code = "yasin er gusti";

        },
        function (error) {
            console.log("error: " + error);
        }
        );

        

    };

    $scope.showList = function () {

        $scope.gridOptions = {

            paginationPageSizes: [25, 50, 75],

            paginationPageSize: 5,

            columnDefs: [

                { field: 'BillNo' },
                { field: 'Name' },
                { field: 'Address' },
                { field: 'Phone' },

             {
                 name: 'Action',
                 displayName: "Action",

                 enableColumnResizing: false,
                 enableFiltering: false,
                 enableSorting: false,
                 pinnedRight: true,


                 width: '15%',
                 headerCellClass: $scope.highlightFilteredHeader,
                 cellTemplate: '<span class="label label-info label-mini" style="text-align:center !important;">' +
                               '<a href="" title="Edit" ng-click="grid.appScope.Edit(row.entity)">' +
                                 '<i class="icon-edit" aria-hidden="true"></i> Edit' +
                               '</a>' +
                               '</span>' +

                               '<span class="label label-danger label-mini" style="text-align:center !important;">' +
                               '<a href="" title="Delete" ng-click="grid.appScope.delete(row.entity)">' +
                                 '<i class="icon-glyphicon glyphicon-trash" aria-hidden="true"></i> Delete' +
                               '</a>' +
                               '</span>'

             }


            ],

            onRegisterApi: function (gridApi) {

                $scope.grid1Api = gridApi;

            }

        };


        var apiRoute = '/api/apItem/showData/';
        var receiveData = crudService.ShowData(apiRoute);
        receiveData.then(function (response) {
            
            $scope.gridOptions.data = response.data;
        },
         function (error) {
             console.log("error: " + error);
         }
        );



    };

    //var receiveData;

    //$scope.ShowList = function () {
    //    var apiRoute = '/api/apItem/showData/';
    //    receiveData = crudService.ShowData(apiRoute);
    //    receiveData.then(function (response) {
    //        alert(JSON.stringify(response));

    //    },
    //     function (error) {
    //         console.log("error: " + error);
    //     }
    //    );
    //}
    $scope.Edit = function (data) {
        //var apiRouteVCL = '/api/apItem/showData/';
        //var cmnparam = "[" + JSON.stringify(data) + "," + JSON.stringify($scope.ListItemInfo) + "]";
        //var listVcl = crudService.GetList(apiRoute, cmnparam);
        //listVcl.then(function (response) {
        //    $scope.ListItemInfo = response.data;
        //    if ($scope.ListItemInfo.length == 0) {
        //        $scope.AddVehicleInfo();
        //    }

        //},
        //function (error) {
        //    console.log("Error: " + error);
        //});
        alert(JSON.stringify(data));

        $scope.BillNo = data.BillNo;
        $scope.Name = data.Name;
        $scope.Address = data.Address;
        $scope.Phone = data.Phone;

    }
    $scope.delete = function (data) {

    }

    $scope.AddVehicleInfo = function () {
        $scope.ListItemInfo.push({ ItemName: null, Quantity: 0, UnitPrice: 0, price: 0, ModelState: 'Save' });
        

    }
    $scope.AddVehicleInfo();

    $scope.deleteRowVehicle = function (dataModel, index) {
        if ($scope.UserCommonEntity.message == "Saved") {
            $scope.ListItemInfo.splice(index, 1);
        }
        else {
            $scope.ListItemInfoDelete.push({
                ItemName: null, Quantity: 0, UnitPrice: 0, price: 0, ModelState: 'Deleted'
            });
            $scope.ListItemInfo.splice(index, 1);
        }
    };

}]);




