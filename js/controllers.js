angular.module('starter.controllers', [])
.controller('loginCtrl', function($scope,$location,$ionicTabsDelegate) {
	$scope.goForward = function () {
        var selected = $ionicTabsDelegate.selectedIndex();
        if (selected != -1) {
            $ionicTabsDelegate.select(selected + 1);
        }
    }
 
    $scope.logIn = function (loginData) {
		window.location.href = 'index.html#/hsa';
    }
})
.controller('DashCtrl', function($scope,$location, $ionicTabsDelegate) {
	$scope.goForward = function () {
        var selected = $ionicTabsDelegate.selectedIndex();
        if (selected != -1) {
            $ionicTabsDelegate.select(selected + 1);
        }
    }
 
	$scope.backcontrol=function()
	{
		$location.path("hsa");
	}
    $scope.goBack = function () {
        var selected = $ionicTabsDelegate.selectedIndex();
        if (selected != -1 && selected != 0) {
            $ionicTabsDelegate.select(selected - 1);
        }
    }
})


.controller('FsaCtrl', function($scope,$rootScope,$ionicPlatform,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork) {
	//$rootScope.hidecontent=false;
	localStorage.setItem("backCount","2");
	
	
	
})
.controller('HsaCtrl', function($scope,$rootScope,$ionicPlatform,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork,$ionicHistory) {
	
	localStorage.setItem("backCount","2");
	//$ionicHistory.clearHistory();
	//$rootScope.hidecontent=false;
	
	
	
	
	
})

.controller('heading', function($scope,$location,$rootScope,$stateParams, $cordovaDialogs, Chats) {
	
  var i=0;
  $rootScope.hidecontent=false;
  $scope.selectColor="#496E9B";
  $scope.hsa="#496E9B";
  $scope.deselectColor="#6CA0DA";
  $scope.fsa="#6CA0DA";
  $scope.showingMenu=false;
  
  $scope.openNav=function()
  {
	  document.getElementById("mySidenav").style.width = "250px";
  }
  
  $scope.closeNav=function() {
		document.getElementById("mySidenav").style.width = "0";
	}

  $scope.changecolor1=function()
  {
		$scope.hsa=$scope.selectColor;
		$scope.fsa=$scope.deselectColor;
		$location.path("/hsa");
  }
  $scope.changecolor2=function()
  {
		$scope.hsa=$scope.deselectColor;
		$scope.fsa=$scope.selectColor;
		$location.path("/fsa");
  }
  
  $scope.menushowhide=function()
  {
		if(i==0)
		{
			i=1;
			$scope.showingMenu=true;
		}
		else
		{
			i=0;
			$scope.showingMenu=false;
		}
  }
  
  $scope.contctUs=function()
  {
	  alert("are you want to logout")
  }
  
  $scope.logOut=function()
  {
	   $cordovaDialogs.confirm('Do you want to Logout', 'Are you sure', ['Yes','No'])
		.then(function(buttonIndex) {
		  if(buttonIndex=="1")
		  {
			   window.location='login.html#/login';
		  }
		  
		});
	  
  }

})
.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})



.controller('PortfolioCtrl', function($rootScope,$scope,$ionicPlatform,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork) {
	localStorage.setItem("backCount","1");
	$scope.username = localStorage.getItem('username');
	$scope.access_token = localStorage.getItem('access_token');
	
	 $http.get('http://app.sterlinghsa.com/api/v1/accounts/portfolio',{headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} })
	.success(function(data){
		
		localStorage.setItem('account_types',data.account_types.HSA);
		localStorage.setItem('account_types',data.account_types.FSA);
		
		$scope.account_type=data.account_types.HSA;
		$scope.account_types=data.account_types.FSA;
		$rootScope.hsaaccno=data.account_types.HSA.ACCT_NUM;
		$rootScope.fsaaccno=data.account_types.FSA.ACCT_NUM;
		$rootScope.hsaaccId=data.account_types.HSA.ACCT_ID;
		$rootScope.fsaaccId=data.account_types.FSA.ACCT_ID;
		}).error(function(err){
		// alert(JSON.stringify(err));
	});
	
	
	$scope.goback=function()
	{
		$rootScope.hidecontent=false;
		window.history.back();
		//$location.path("/hsa")
	}
	
})
.controller('AvailablebalanceCtrl', function($scope,$ionicPlatform,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork,$rootScope) {
	$rootScope.hidecontent=true;
	localStorage.setItem("backCount","3");
	$scope.access_token = localStorage.getItem('access_token');
	
	$http.get("http://app.sterlinghsa.com/api/v1/accounts/bankdetails",{params:{'type':'fsa', 'acc_num':'FSA021223'},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	 .success(function(data){
		 // alert( JSON.stringify(data)); 
			
	 }, function(err){
	  //alert("ERROR: " + JSON.stringify(err));
	 })	   
 
	$scope.goback=function()
	{
		$rootScope.hidecontent=false;
		window.history.back();
		//$location.path("/hsa")
	}
})
.controller('InformationCtrl', function($scope,$ionicPlatform,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork,$rootScope) {
	$rootScope.hidecontent=true;
	localStorage.setItem("backCount","3");
	$scope.username = localStorage.getItem('username');
	$scope.access_token = localStorage.getItem('access_token');
	 $scope.acc=$rootScope.fsaaccno;		
	$http.get("http://app.sterlinghsa.com/api/v1/accounts/accountinfo",{params:{'type':'fsa','acc_num':$scope.acc},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	 .success(function(data){ 
				$scope.accnumber=data.account_information;
	 }, function(err){
	  //alert("ERROR: " + JSON.stringify(err));
	 })	 
	 
	$scope.goback=function()
	{
		$rootScope.hidecontent=false;
		window.history.back();
	}

})


.controller('FlexibleCtrl', function($scope,$ionicPlatform,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork,$cordovaSQLite,$rootScope) {
	$rootScope.hidecontent=true;
	localStorage.setItem("backCount","2");

	$scope.goback=function()
	{
		$rootScope.hidecontent=false;
		window.history.back();
		//$location.path("/hsa")
	}
	
	
	
})



.controller('contactCtrl', function($scope,$rootScope,$ionicPlatform,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork) {
	
	$rootScope.hidecontent=true;
	localStorage.setItem("backCount","2");
	$scope.goback=function()
	{
		
		$rootScope.hidecontent=false;
		window.history.back();
		//$location.path("/hsa")
	}
})

.controller('NewCtrl', function($scope,$ionicPlatform,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork,$rootScope) {
	$rootScope.hidecontent=true;
	localStorage.setItem("backCount","2");
	$scope.getClaim = function(claim) {
		
		if(claim =='Bicycle'){
			
			$location.path("newclaim");
		}else if(claim =='Transit'){
			$location.path("newclaimbicycle");
		}   
	}
	$scope.goback=function()
	{
		$rootScope.hidecontent=false;
		window.history.back();
		//$location.path("/hsa")
	}
})

.controller('MakeCtrl', function($scope,$ionicPlatform,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork,$rootScope) {
	//alert();
	$rootScope.hidecontent=true;
	localStorage.setItem("backCount","3");
	$scope.goback=function()
	{
		$rootScope.hidecontent=false;
		window.history.back();
		//$location.path("/hsa")
	}
	
})

.controller('ActivityCtrl', function($scope,$ionicPlatform,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork,$rootScope) {
	$rootScope.hidecontent=true;
	localStorage.setItem("backCount","3");
	
	$scope.username = localStorage.getItem('username');
	$scope.access_token = localStorage.getItem('access_token');
	
	 $http.get('  http://app.sterlinghsa.com/api/v1/accounts/categories',{headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} })
	.success(function(data){
		//alert(JSON.stringify(data));
		}).error(function(err){
		 
	});
	
	$scope.goback=function()
	{
		$rootScope.hidecontent=false;
		window.history.back();
		//$location.path("/hsa")
	}
	
})

.controller('activityContributionyCtrl', function($scope,$ionicPlatform,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork,$rootScope) {
	$rootScope.hidecontent=true;
	localStorage.setItem("backCount","3");
	
	$scope.username = localStorage.getItem('username');
	$scope.access_token = localStorage.getItem('access_token');
	
	 
	$scope.goback=function()
	{
		//$rootScope.hidecontent=false;
		window.history.back();
		//$location.path("/hsa")
	}
	
})
.controller('HealthCtrl', function($scope,$ionicPlatform,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork,$rootScope) {
	$rootScope.hidecontent=true;
	localStorage.setItem("backCount","3");
	
	$scope.goback=function()
	{
		$rootScope.hidecontent=false;
		window.history.back();
		//$location.path("/hsa")
	}
})


.controller('AccountCtrl', function($rootScope,$scope,$ionicPlatform,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork,$ionicHistory) {
	localStorage.setItem("backCount","3");
	
	$rootScope.hidecontent=true;
	
	//$ionicHistory.clearHistory();
	$scope.username = localStorage.getItem('username');
	$scope.access_token = localStorage.getItem('access_token');
	 $scope.acc_num=$rootScope.hsaaccno;

	 $http.get(' http://app.sterlinghsa.com/api/v1/accounts/accountinfo',{params:{'type':'hsa','acc_num': $scope.acc_num},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} })
	.success(function(data){
		//alert(JSON.stringify(data));
		localStorage.setItem('account_information',data.account_information);
		localStorage.setItem('total_contributions',data.total_contributions);
		$scope.account_information=data.account_information;
		//$scope.total_contributions = localStorage.getItem('total_contributions');
		$scope.total_contributions = data.total_contributions;
		//alert(JSON.stringify(data.account_information));
		}).error(function(err){
		 
	});
	
	
	$scope.goback=function()
	{
		$rootScope.hidecontent=false;
		window.history.back();
		//$location.path("/hsa")
	}
})



.controller('newclaimCtrl', function($scope,$ionicPlatform,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork,$ionicScrollDelegate,$rootScope) {
		$rootScope.hidecontent=true;
	 localStorage.setItem("backCount","3");
	 $ionicScrollDelegate.scrollBottom(true);
	 $scope.goback=function()
	{
		//$rootScope.hidecontent=false;
		window.history.back();
		//$location.path("/hsa")
	}
	$scope.upload = function(){
	         fileChooser.open(function(uri) {
				 alert(uri);
			     var options = {
                     fileKey: "file",
                      //fileName: "tesat.pdf",
			         fileName: uri.substr(uri.lastIndexOf('/') + 1),
                     chunkedMode: false,
                     mimeType: "text/plain"
			};
		 	  
			  $cordovaFileTransfer.upload( "http://applogic.in/Android/FileUpload/index.php",uri,options).then(function(result) {
		
		           //alert("SUCCESS: " + result.response);
              }, function(err) {
                  //alert("ERROR: " + JSON.stringify(err));
              }, function (progress) {
                 // constant progress updates
            })
			
	  }); 	   
	   
   }
})
.controller('NewclaimbicycleCtrl', function($scope,$ionicPlatform,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork,$rootScope) {
		$rootScope.hidecontent=true;
	 localStorage.setItem("backCount","3");
	 $scope.goback=function()
	{
		//$rootScope.hidecontent=false;
		window.history.back();
		//$location.path("/hsa")
	}
	$scope.upload = function(){
	         fileChooser.open(function(uri) {
				 alert(uri);
			     var options = {
                     fileKey: "file",
                      //fileName: "tesat.pdf",
			         fileName: uri.substr(uri.lastIndexOf('/') + 1),
                     chunkedMode: false,
                     mimeType: "text/plain"
			};
		 	  
			  $cordovaFileTransfer.upload( "http://applogic.in/Android/FileUpload/index.php",uri,options).then(function(result) {
		
		           //alert("SUCCESS: " + result.response);
              }, function(err) {
                  //alert("ERROR: " + JSON.stringify(err));
              }, function (progress) {
                 // constant progress updates
            })
			
	  }); 	   
	   
   }
})

.controller('FlexibleactivityCtrl', function($scope,$ionicPlatform,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork,	$rootScope) {
	$rootScope.hidecontent=true;
	localStorage.setItem("backCount","3");
	$scope.goback=function()
	{
		$rootScope.hidecontent=false;
		window.history.back();
		//$location.path("/hsa")
	}
})

.controller('RecentdisCtrl', function($scope,$ionicPlatform,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork,$rootScope) {
	$rootScope.hidecontent=true;
	localStorage.setItem("backCount","4");
	
	$scope.goback=function()
	{
		$rootScope.hidecontent=false;
		window.history.back();
		//$location.path("/hsa")
	}
})

.controller('RecentcontributeCtrl', function($scope,$ionicPlatform,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork,$rootScope) {
	$rootScope.hidecontent=true;
	
 localStorage.setItem("backCount","4");
 $scope.username = localStorage.getItem('username');
	$scope.access_token = localStorage.getItem('access_token');
 // $http.get(" http://app.sterlinghsa.com/api/v1/accounts/recent-activity",{params:{'plan_type':'fsa','acct_id':'82953','trans_type':'c'},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
  // .success(function(data){ 
    // alert("Data: " + JSON.stringify(data.transcation_list.FEE_DATE[0]));
    // $scope.recentcontribute=data.transcation_list;
  // }, function(err){
   // alert("ERROR: " + JSON.stringify(err));
  // })
  
  
	$scope.goback=function()
	{
		$rootScope.hidecontent=false;
		window.history.back();
		//$location.path("/hsa")
	}
})

.controller('TaxyearCtrl', function($scope,$ionicPlatform,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork,	$rootScope) {
	$rootScope.hidecontent=true;
	localStorage.setItem("backCount","4");
	
	// $scope.username = localStorage.getItem('username');
	// $scope.access_token = localStorage.getItem('access_token');
 // $http.get(" http://app.sterlinghsa.com/api/v1/accounts/taxstatement",{params:{'acct_id':'82953'},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
  // .success(function(data){
    // alert("Data: " + JSON.stringify(data));
    
  // }, function(err){
   // alert("ERROR: " + JSON.stringify(err));
  // })
  
	$scope.goback=function()
	{
		//$rootScope.hidecontent=false;
		window.history.back();
		//$location.path("/hsa")
	}
})
.controller('ContributionCtrl', function($scope,$ionicPlatform,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork,$rootScope) {
		$rootScope.hidecontent=true;
		$scope.back=function(){
			
			window.history.back();
            window.history.reload();
		}
	localStorage.setItem("backCount","4");
	
	$scope.goback=function()
	{
		$rootScope.hidecontent=false;
		window.history.back();
		//$location.path("/hsa")
	}
})
.controller('HsastatementCtrl', function($scope,$ionicPlatform,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork,$rootScope) {
	$rootScope.hidecontent=true;
	localStorage.setItem("backCount","4");
	  $scope.date=$scope.activity;
	  
	$scope.goback=function()
	{
		$rootScope.hidecontent=false;
		window.history.back();
		//$location.path("/hsa")
	}
	
})
.controller('statementCtrl', function($scope,$ionicPlatform,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork,$rootScope) {
	$rootScope.hidecontent=true;
	localStorage.setItem("backCount","4");
	  $scope.date=$scope.activity;
	
	$scope.goback=function()
	{
		$rootScope.hidecontent=false;
		window.history.back();
		//$location.path("/hsa")
	}
})

.controller('ActivitystmntCtrl', function($scope,$ionicPlatform,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork,$rootScope) {
	$rootScope.hidecontent=true;
	localStorage.setItem("backCount","4");
	$rootScope.activity={startDate:'',EndtDate:''};
	
	$scope.getStartDate=function(){
		
		 var options = {
				date: new Date(),
				mode: 'date', // or 'time'
				minDate: new Date(),
				
			}
		   
			$ionicPlatform.ready(function(){
				$cordovaDatePicker.show(options).then(function(date){
					
					var date1=date.toString();
					var dataas=date1.split(" ");
					var Month = ["App","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
					//var mon = Month.indexOf(dataas[1]); 
					var mon=""; 
					if(Month.indexOf(dataas[1]).toString().length==1)
					{
						mon="0"+Month.indexOf(dataas[1]);

					}
					else
					{
						mon = Month.indexOf(dataas[1]);
					}
					//var selectedDate=dataas[3]+'/'+mon+'/'+dataas[2];
				
					var selectedDate=mon+'/'+dataas[2]+'/'+dataas[3];
					$scope.activity.startDate=selectedDate;
					// alert($scope.activity.startDate);
				});
			})
		
	};
	$scope.getEndDate=function(){
		
		 var options = {
				date: new Date(),
				mode: 'date', // or 'time'
				minDate: new Date(),
				
			}
		   
			$ionicPlatform.ready(function(){
				$cordovaDatePicker.show(options).then(function(date){
					
					var date1=date.toString();
					var dataas=date1.split(" ");
					var Month = ["App","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
					//var mon = Month.indexOf(dataas[1]); 
					var mon=""; 
					if(Month.indexOf(dataas[1]).toString().length==1)
					{
						mon="0"+Month.indexOf(dataas[1]);

					}
					else
					{
						mon = Month.indexOf(dataas[1]);
					}
					//var selectedDate=dataas[3]+'/'+mon+'/'+dataas[2];
				
					var selectedDate=mon+'/'+dataas[2]+'/'+dataas[3];
					$scope.activity.EndtDate=selectedDate;
				});
			})
		
	};
	$scope.pick=function(){
		// var data=$scope.activity;
		if($scope.activity.EndtDate==""|| $scope.activity.startDate==""){
			alert('Please select date');
		}else{
			//$location.path("hsastatement");
		}
		
		
	};
	
	$scope.goback=function()
	{
		//$rootScope.hidecontent=false;
		window.history.back();
		//$location.path("/hsa")
	}
})

.controller('PaymeCtrl', function($scope,$rootScope,$ionicPlatform,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork) {
	$rootScope.hidecontent=true;
	localStorage.setItem("backCount","4");
	
	$scope.upload = function(){
	         fileChooser.open(function(uri) {
				 alert(uri);
			     var options = {
                     fileKey: "file",
                      //fileName: "tesat.pdf",
			         fileName: uri.substr(uri.lastIndexOf('/') + 1),
                     chunkedMode: false,
                     mimeType: "text/plain"
			};
		 	  
			  $cordovaFileTransfer.upload( "http://applogic.in/Android/FileUpload/index.php",uri,options).then(function(result) {
		
		           //alert("SUCCESS: " + result.response);
              }, function(err) {
                  //alert("ERROR: " + JSON.stringify(err));
              }, function (progress) {
                 // constant progress updates
            })
			
	  }); 	   
	   
   }
	$scope.TransDate="";
	
	$scope.getTransDate=function(){
		 var options = {
				date: new Date(),
				mode: 'date', // or 'time'
				minDate: new Date(),
				
			}
		   
			$ionicPlatform.ready(function(){
				$cordovaDatePicker.show(options).then(function(date){
					
					var date1=date.toString();
					var dataas=date1.split(" ");
					var Month = ["App","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
					//var mon = Month.indexOf(dataas[1]); 
					var mon=""; 
					if(Month.indexOf(dataas[1]).toString().length==1)
					{
						mon="0"+Month.indexOf(dataas[1]);

					}
					else
					{
						mon = Month.indexOf(dataas[1]);
					}
					//var selectedDate=dataas[3]+'/'+mon+'/'+dataas[2];
				
					var selectedDate=mon+'/'+dataas[2]+'/'+dataas[3];
					$scope.TransDate=selectedDate;
				});
			})
		
	};
	
	$scope.access_token = localStorage.getItem('access_token');
	$scope.hsaaccno=$rootScope.hsaaccno
	$http.get("http://app.sterlinghsa.com/api/v1/accounts/bankdetails",{params:{'type':'hsa', 'acc_num':$scope.hsaaccno},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	.success(function(data){
		//alert( JSON.stringify(data));
		$scope.bank_details=data.bank_details;
	}, function(err){
		//alert("ERROR: " + JSON.stringify(err));
	});
	
	$http.get('  http://app.sterlinghsa.com/api/v1/accounts/categories',{headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} })
	.success(function(data){
		//alert(JSON.stringify(data));
		$scope.categories=data.categories;
	}).error(function(err){
		//alert("Err-"+JSON.stringify(data));
	});
	
	$http.get(" http://app.sterlinghsa.com/api/v1/accounts/balances",{params:{'type':'hsa'},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	.success(function(data){
		//alert( JSON.stringify(data));
		$scope.Availablebalance=data.balances.BALANCE;
	}, function(err){
		//alert("ERROR: " + JSON.stringify(err));
	});
	
	
	
	$scope.goback=function()
	{
		//$rootScope.hidecontent=false;
		window.history.back();
		//$location.path("/hsa")
	}
	
	
})

.controller('PayproviderCtrl', function($scope,$rootScope,$ionicPlatform,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork) {
	$rootScope.hidecontent=true;
	localStorage.setItem("backCount","4");
	$scope.TransDate="";
	$scope.upload = function(){
	         fileChooser.open(function(uri) {
				 alert(uri);
			     var options = {
                     fileKey: "file",
                      //fileName: "tesat.pdf",
			         fileName: uri.substr(uri.lastIndexOf('/') + 1),
                     chunkedMode: false,
                     mimeType: "text/plain"
			};
		 	  
			  $cordovaFileTransfer.upload( "http://applogic.in/Android/FileUpload/index.php",uri,options).then(function(result) {
		
		           //alert("SUCCESS: " + result.response);
              }, function(err) {
                  //alert("ERROR: " + JSON.stringify(err));
              }, function (progress) {
                 // constant progress updates
            })
			
	  }); 	   
	   
   }
	$scope.getTransDate=function(){
		
		 var options = {
				date: new Date(),
				mode: 'date', // or 'time'
				minDate: new Date(),
				
			}
		   
			$ionicPlatform.ready(function(){
				$cordovaDatePicker.show(options).then(function(date){
					
					var date1=date.toString();
					var dataas=date1.split(" ");
					var Month = ["App","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
					//var mon = Month.indexOf(dataas[1]); 
					var mon=""; 
					if(Month.indexOf(dataas[1]).toString().length==1)
					{
						mon="0"+Month.indexOf(dataas[1]);

					}
					else
					{
						mon = Month.indexOf(dataas[1]);
					}
					//var selectedDate=dataas[3]+'/'+mon+'/'+dataas[2];
				
					var selectedDate=mon+'/'+dataas[2]+'/'+dataas[3];
					$scope.TransDate=selectedDate;
				});
			})
		
	};
	
	$scope.access_token = localStorage.getItem('access_token');
	$scope.hsaaccno=$rootScope.hsaaccno
	$http.get("http://app.sterlinghsa.com/api/v1/accounts/bankdetails",{params:{'type':'hsa', 'acc_num':$scope.hsaaccno},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	.success(function(data){
		//alert( JSON.stringify(data));
		$scope.bank_details=data.bank_details;
	}, function(err){
		//alert("ERROR: " + JSON.stringify(err));
	});
	
	$http.get('  http://app.sterlinghsa.com/api/v1/accounts/categories',{headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} })
	.success(function(data){
		//alert(JSON.stringify(data));
		$scope.categories=data.categories;
	}).error(function(err){
		//alert("Err-"+JSON.stringify(data));
	});
	
	$http.get(" http://app.sterlinghsa.com/api/v1/accounts/balances",{params:{'type':'hsa'},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	.success(function(data){
		//alert( JSON.stringify(data));
		$scope.Availablebalance=data.balances.BALANCE;
	}, function(err){
		//alert("ERROR: " + JSON.stringify(err));
	});
	
	$scope.goback=function()
	{
		//$rootScope.hidecontent=false;
		window.history.back();
		//$location.path("/hsa")
	}
	
})



.controller('DisbursementCtrl', function($rootScope,$scope,$ionicPlatform,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork) {
	$rootScope.hidecontent=true;
	localStorage.setItem("backCount","4");
	//alert("DisbursementCtrl");
	
	
	$scope.goback=function()
	{
		//$rootScope.hidecontent=false;
		window.history.back();
		//$location.path("/hsa")
	}
	
	
})


.controller('ScheduledcontributeCtrl', function($scope,$rootScope,$ionicPlatform,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork) {
	$rootScope.hidecontent=true;
	localStorage.setItem("backCount","5");
	$scope.username = localStorage.getItem('username');
	$scope.access_token = localStorage.getItem('access_token');
	$scope.hsaaccId=$rootScope.hsaaccId;
	$http.get(" http://app.sterlinghsa.com/api/v1/accounts/schedule",{params:{'acct_id':$scope.hsaaccId,'trans_type':'c'},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	.success(function(data){ 
		//alert("Data: " + JSON.stringify(data));
		$scope.schedule_list=data.schedule_list;
		//alert($scope.data);
	}, function(err){
		alert("ERROR: " + JSON.stringify(err));
	});
	
	$scope.goback=function()
	{
		//$rootScope.hidecontent=false;
		window.history.back();
		//$location.path("/hsa")
	}
})

.controller('ScheduledDisbursementCtrl', function($scope,$rootScope,$ionicPlatform,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork) {
	$rootScope.hidecontent=true;
	localStorage.setItem("backCount","5");
	$scope.username = localStorage.getItem('username');
	$scope.access_token = localStorage.getItem('access_token');
	$scope.hsaaccId=$rootScope.hsaaccId;
	$http.get(" http://app.sterlinghsa.com/api/v1/accounts/schedule",{params:{'acct_id':$scope.hsaaccId,'trans_type':'d'},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	.success(function(data){ 
		//alert("Data: " + JSON.stringify(data));
		$scope.schedule_list=data.schedule_list;
		//alert($scope.data);
	}, function(err){
		alert("ERROR: " + JSON.stringify(err));
	});
	
	$scope.goback=function()
	{
		//$rootScope.hidecontent=false;
		window.history.back();
		//$location.path("/hsa")
	}
})
	
.controller('RecentCtrl', function($scope,$rootScope,$ionicPlatform,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork) {
	$rootScope.hidecontent=true;
	localStorage.setItem("backCount","5");
	$scope.username = localStorage.getItem('username');
	$scope.access_token = localStorage.getItem('access_token');
	$scope.hsaaccId=$rootScope.hsaaccId;
	$http.get(" http://app.sterlinghsa.com/api/v1/accounts/recent-activity",{params:{'acct_id':$scope.hsaaccId,'trans_type':'c','plan_type':'hsa'},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	.success(function(data){
		//alert("Data: " + JSON.stringify(data));
		$scope.transcation_list=data.transcation_list;
		//alert($scope.data);
	}, function(err){
		alert("ERROR: " + JSON.stringify(err));
	});
	
	$scope.goback=function()
	{
		//$rootScope.hidecontent=false;
		window.history.back();
		//$location.path("/hsa")
	}
	
})

.controller('recentFSACtrl', function($scope,$rootScope,$ionicPlatform,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork) {
	$rootScope.hidecontent=true;
	localStorage.setItem("backCount","5");
	$scope.username = localStorage.getItem('username');
	$scope.access_token = localStorage.getItem('access_token');
	$scope.hsaaccId=$rootScope.hsaaccId;
	$http.get(" http://app.sterlinghsa.com/api/v1/accounts/recent-activity",{params:{'acct_id':$scope.hsaaccId,'trans_type':'c','plan_type':'hsa'},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	.success(function(data){
		//alert("Data: " + JSON.stringify(data));
		$scope.transcation_list=data.transcation_list;
		//alert($scope.data);
	}, function(err){
		alert("ERROR: " + JSON.stringify(err));
	});
	
	$scope.goback=function()
	{
		$rootScope.hidecontent=false;
		window.history.back();
		//$location.path("/hsa")
	}
	
})

.controller('RecentdisburseCtrl', function($scope,$rootScope,$ionicPlatform,$cordovaDatePicker,$http,$location,$ionicModal,$cordovaDialogs,$ionicLoading,$cordovaNetwork) {
	$rootScope.hidecontent=true;
	localStorage.setItem("backCount","5");
	//alert('RecentdisburseCtrl');
	$scope.username = localStorage.getItem('username');
	$scope.access_token = localStorage.getItem('access_token');
	$scope.hsaaccId=$rootScope.hsaaccId;
	$http.get(" http://app.sterlinghsa.com/api/v1/accounts/recent-activity",{params:{'acct_id':$scope.hsaaccId,'trans_type':'d','plan_type':'hsa'},headers: {'Content-Type':'application/json; charset=utf-8','Authorization':$scope.access_token} } )
	.success(function(data){
		//alert("Data: " + JSON.stringify(data));
		$scope.transcation_list=data.transcation_list;
		//alert($scope.data);
	}, function(err){
		alert("ERROR: " + JSON.stringify(err));
	});
	
	$scope.goback=function()
	{
		//$rootScope.hidecontent=false;
		window.history.back();
		//$location.path("/hsa")
	}
	
	
})





.controller('AppCtrl', function($scope,$ionicPopup, $timeout ,$ionicModal,$location) {
 $scope.exiqt = function() {
     var confirmPopup = $ionicPopup.confirm({
       title: 'Do you want to close',
      
       template: 'Are you sure',
        buttons : [{
    text : 'yes',
    type : 'button-positive button-outline',
   }, {
    text : 'No',
    type : 'button-positive button-outline',
    
   }]
     });
       
     confirmPopup.then(function(res) {
       if(res) {
         console.log('You are sure');
       } else {
          console.log('You are not sure');
       }
     });
   };
  
$scope.exit=function()
{
	$location.path("/login");	
}
  
$scope.toggleSomething = function(){
  $scope.isVisible = !$scope.isVisible;
  console.log('make sure toggleSomething() is firing*');
}
$scope.toggleSomething1 = function(){
  $scope.isVisible1 = !$scope.isVisible1;
  console.log('make sure toggleSomething() is firing*');
}

$scope.Logout = function() {
		$cordovaDialogs.confirm('Are You Sure', 'Do you Want to Logout', ['Yes','No'])
		.then(function(buttonIndex) {
			if (buttonIndex=='1') {
				localStorage.clear();
				$location.path("/login");
			}
		});
	}; 
	
	
	$scope.goback=function()
	{
		$rootScope.hidecontent=false;
		window.history.back();
		//$location.path("/hsa")
	}

})

.controller('HeaderCtrl', function($scope,$ionicPopup, $timeout ,$ionicModal,$location, $ionicHistory, $cordovaDialogs) {
	$scope.Logout = function() {
		$cordovaDialogs.confirm('Are You Sure', 'Do you Want to Logout', ['Yes','No'])
		.then(function(buttonIndex) {
			if (buttonIndex=='1') {
				localStorage.clear();
				$location.path("/login");
			}
		});
	};
	
	$scope.goBack = function() {
		//alert(localStorage.getItem("backCount"));
		if (localStorage.getItem("backCount")==1) {
			//code
			//alert('1');
			localStorage.setItem("backCount","0")
			//$location.path("/first");
			$cordovaDialogs.confirm('Are You Sure', 'Do you Want to Close ', ['Yes','No'])
			.then(function(buttonIndex) {
				if (buttonIndex=='1') {
					ionic.Platform.exitApp();
				}
			});
		}else if(localStorage.getItem("backCount")==0){
			$cordovaDialogs.confirm('Are You Sure', 'Do you Want to Close ', ['Yes','No'])
			.then(function(buttonIndex) {
				if (buttonIndex=='1') {
					ionic.Platform.exitApp();
				}
			});
		}
		else if (localStorage.getItem("backCount")>1) 
		{
			//alert('2');
			var backcount=parseInt(localStorage.getItem("backCount"));
			var backcount=backcount-1;
			localStorage.setItem("backCount",backcount);
			
			window.history.back();
		}
	};
})

.controller('FooterCtrl', function($scope,$ionicPopup, $timeout ,$ionicModal,$location, $ionicHistory,$ionicSideMenuDelegate, $cordovaDialogs) {
	$scope.homePage = function() {
		$location.path("/app/portfolio");
	};
})

.controller('contactCtrl', function($scope,$location,$rootScope, $stateParams, $http) {
	localStorage.setItem("backCount","2");
	$rootScope.hidecontent=true;
	
	$scope.backcontrol=function()
	{
		$location.path("/hsa")
	}
	// $http.post('http://www.test.sedarspine.com/en/spineLogisticsApp/getBuildTypeLocal',{headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'} })     
    // .success(function(data) {      
        // //alert("success");
		// alert(JSON.stringify(data));
    // }).error(function(){         
      // alert("Error")
	// });
	
	// $http.get("http://applogic.in/Android/AjaxData/GetData.php")
	// .then(function(resp){
		// alert('Success->'+resp.data.length);
		// for(var i=0;i<resp.data.length;i++){
			// alert(resp.data[i].user_fullname);
		// }
		// prompt("",JSON.stringify(resp));		// JSON object
	// }, function(err){
		// alert('ERR->'+err);
	// });
	
	
	$scope.goback=function()
	{
		$rootScope.hidecontent=false;
		window.history.back();
		//$location.path("/hsa")
	}
	
	
});

