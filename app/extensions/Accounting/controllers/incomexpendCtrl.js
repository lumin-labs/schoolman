'use strict';

function IncomexpendCtrl($scope, $routeParams, model, Itemid,Location, Items,  Lang) {

    // $scope.formIndex = $routeParams.formIndex;
    $scope.showValidaton = false;
    $scope.dict = Lang.getDict();
    

    var data = $scope.data = {
    	// forms:Forms.all(),
    	// departments:Departments.getAll(),
    	// groups:Groups.getAll(),
    	// salarys:Salarys.getAll(),
        itemid:null,
        
    };
    angular.forEach()

    Items.getAll().then(function(success){
        $scope.data.items = success;    
        console.log('items', $scope.data.items);
    })

    $scope.newItem = new model.Item();
    console.log("NewItem", $scope.newItem);
    Itemid.get().then(function(itemid){
        data.itemid = itemid;
        console.log("Got Itemid", itemid);
        $scope.newItem.itemId = itemid.value;
    })
    
    //update the marksheets once a student has been created -- otherwise mastersheet might
    //display incorrect totals
    // var updateMarksheets = function(staff){
    //     var params = {
    //         formIndex: staff.formIndex,
    //         deptId: staff.deptId,
    //         groupId: staff.groupId
    //     }
    //     Marksheets.query(params).then(function(marksheets){
    //         angular.forEach(marksheets, function(marksheet, marksheetId){
    //             marksheet.table[staff._id] = ["","","","","",""];
    //             marksheet.save().then(function(success){
    //             }).catch(function(error){
    //                 console.log("Error saving marksheet with new staff", error);
    //             })
    //         })
    //     }).catch(function(error){
    //         console.log("Failed to retreive marksheets", error);
    //     })
    // }

    $scope.add = function(item){
        item.save().then(function(success){
            Itemid.save(data.itemid);
            console.log("Save item: ", success);
            Location.open({page:"itemprofile", itemId:item._id});
            $scope.showValidaton = false;
            $scope.data.items[success.itemId] = success;
            // Items.set(item);
            // updateMarksheets(staff);
        }).catch(function(error){
            $scope.showValidation = true;
            console.log("Failed to save item: ", error);
        })
    }

    $scope.getTotalItems = function(){
    var total = 0;
    total = $scope.data.items.reduce(function(total, item){
      if(typeof item.amount === "string"){
       item.amount = $scope.stringToNumber(item.amount);
      }
      return item.amount + total;
    }, 0);
    return total;
  };



    $scope.clearItem = function(item){
        item.item = "";
        item.rubric="";
        item.income=0;
        item.expenditure=0;
        item.account_balance=0;
        // staff.sex = "";
        // staff.staffEmail = "";
        // staff.salary = 0;
        // staff.residence = "";
        // staff.matricalno="";
        // staff.maritalstatus="";
        // staff.birth = null;
        // staff.grade="";
        // staff.qualification="";
        // staff.subdivision="";
        // staff.division="";
        // staff.dateofentry=null;
        // staff.specialty = "";
        // staff.tribe = "";
        // staff.dateposted = "";
        // staff.dutypost="";
        // staff.region = "";
        // staff.phoneNo = "";

     }


    // var serviceLength = function(){
    //     $scope.data.serviceYears = $scope.date.getFullYear()-(new Date($scope.data.user.dateofentry)).getFullYear();
    //     $scope.data.serviceMonths = $scope.date.getMonth()-(new Date($scope.data.user.dateofentry)).getMonth();

    //     if($scope.data.serviceMonths < 0){
    //         $scope.data.serviceYears -= 1;
    //         $scope.data.serviceMonths = 12 + $scope.data.serviceMonths;
    //     }

    //     $scope.data.retire = new Date($scope.data.user.birth);
        
    //     $scope.data.retire.setYear($scope.data.retire.getFullYear() + 60);
    // }

    // serviceLength();




}
IncomexpendCtrl.$inject = ['$scope', '$routeParams', 'model', 'Itemid','Location', 'Items', 'Lang'];
angular.module('SchoolMan').controller('IncomexpendCtrl', IncomexpendCtrl);


