var app=angular.module('app',['ui.router','ui.bootstrap',require('angular-sqlite')]);
//var sqlite3=require('sqlite3').verbose();
//var db=new sqlite3.Database('UserDB.db');
/*app.factory("myDb",function(){
	var myDb={};
	myDb.get=function(){
		var sqlite3=require('sqlite3').verbose();
		var db=new sqlite3.Database('UserDB.db');
		return db;
};
return myDb;
});*/

app.config(function($stateProvider, $urlRouterProvider)
{
	//var users=[];
	/*$indexedDBProvider
	.connection('userDB')
	.upgradeDatabase(1,function(event,db,tx)
	{
		var objectStore=db.createObjectStore('user',{ keyPath: "id", autoIncrement: true });
		objectStore.createIndex('emailx','email',{unique:true});
		objectStore.createIndex('passwordx','password',{unique:false});
		var keyRange = IDBKeyRange.lowerBound(0);
		var objectStore1=db.createObjectStore('profileData',{keyPath:"id",autoIncrement: false});
		var keyRange=IDBKeyRange.lowerBound(0);	
	});*/
	$stateProvider
	.state('login1',{
		url:'/',
		templateUrl:'login.html',
		controller:'mylogincntrl'
	})
	.state('registration',{
		url:'/registration',
		templateUrl:'registrationform.html',
		controller:'registrationcntrl'
		//controllerAs:'main'	
	})
	.state('reset',{
		url:'/reset',
		templateUrl:'resetpassword.html',
		controller:'resetpasswordcntrl'
		//controllerAs:'main'	
	})
	.state('dashboard',{
		url:'/dashboard',
		templateUrl:'Dashboard.html',
		controller:'dashboardcntrl'
		//controllerAs:'main'
	})
	.state('profile',{
		url:"/profile",
		templateUrl:'profile.html',
		controller:'profilecntrl'
	})
	.state('customer',{
		url:'/customer',
		templateUrl:'customer.html',
		controller:'customercntrl'
		//controllerAs:'main'
	})
	.state('newcustomer',{
		url:'/newcustomer',
		templateUrl:'newcustomer.html',
		controller:'newcustomercntrl'
		//controllerAs:'main'
	})
	.state('edit',{
		url:'/editcustomer/:id',
		templateUrl:'editcustomer.html',
		controller:'editcustomercntrl'
		//controllerAs:'main'
	})
	.state('todo',{
		url:'/todo',
		templateUrl:'todolist.html',
		controller:'todocontroller'
	})
	$urlRouterProvider.otherwise("/");
});//closing of config
app.run(function ($SQLite) {
        $SQLite.dbConfig({
            name: 'usersDB',
            description: 'Test DB',
            version: '1.0'
        });
    })
app.constant('DB_CONFIG', {
        registration: {
            fname: { type: 'text'},
            lname: { type: 'text'},
            email: { type: 'text' },
            password:{ type : 'text'},
            phno:{ type: 'INTEGER' },
            gender:{ type: 'text'}
            },
         profile:{
         	fname: { type: 'text'},
            lname: { type: 'text'},
            email: { type: 'text' },
            password:{ type : 'text'},
            phno:{ type: 'INTEGER' },
            gender:{ type: 'text'}
         }
        
    })
app.run(function ($SQLite, DB_CONFIG) {
        $SQLite.init(function (init) {
            angular.forEach(DB_CONFIG, function (config, name) {
                init.step();
                $SQLite.createTable(name, config).then(init.done);
            });
            init.finish();
        });
    });
//registration controller
app.controller('registrationcntrl',function($SQLite,$scope,$location)
{
	//$scope.users=[];
	
	$scope.save=function(user){
		console.log(user);
		$SQLite.ready(function () {
        this.insert('registration', user) // this.replace 

        //.then(onResult, onError) 
   		});
   		$location.path('/');
		
		/*var db=myDb.get();
		db.serialize(function(){
			//db.run("create table registration (fname text,lname text,email varchar,password varchar,phonenumber varchar,gender text)");
			var stmt=db.prepare("insert into registration values (?,?,?,?,?,?)");
			stmt.run(user.fname,user.lname,user.email,user.password,user.phno,user.gender);
			db.each("select * from registration",function(err,row){
				console.log(err,row);
			});
			stmt.finalize();
		})
		$location.path("/");*/
	}
	
});
//mylogincontroller
app.controller('mylogincntrl',function($location,$scope,$SQLite)
{
		
	$scope.check=function(login)
		{
			console.log(login);
			$SQLite.ready(function () { // The DB is created and prepared async. 
        this
            .selectAll('SELECT * FROM registration')
            .then(
        function () { console.log('Empty Result!'); },
        function () { console.err('Error!'); },
        function (data) {
  				console.log(data);
  				for(var i=0;i<data.rows.length;i++){
  					if(login.email==data.rows[i].email && login.password==data.rows[i].password){
  						$SQLite.insert('profile',data.rows[i])
  						$location.path('/dashboard');
  						
  					}

  				}
  			}
      );
    });
	}
});
//Dashboard controller
app.controller('dashboardcntrl',function($SQLite,$scope,$location)
{

	
	$scope.logout=function()
	{
		$SQLite.execute('delete from profile where email="kosaraju@gmail.com"');
		$location.path("/");
	}
});
    //profile controller
app.controller('profilecntrl',function($SQLite,$scope,$location)
{
	$SQLite.ready(function ()
	 { // The DB is created and prepared async. 
        		this
            .selectAll('SELECT * FROM profile')
            .then(
    	    function () { console.log('Empty Result!'); },
        	function () { console.err('Error!'); },
        	function (data) 
        	{
  				console.log(data);
  				for(var i=0;i<data.rows.length;i++)
  				{
  					console.log(data.rows[i]);
  					$scope.profile=data.rows[i];			
  				}
			}
		);
    });
    $scope.edit=function(profile)
    {
    	$SQLite.execute('update registration SET fname=?,lname=?,email=?,password=?,phno=?,gender=? where email=?',[profile.fname,profile.lname,profile.email,profile.password,profile.phno,profile.gender,profile.email]);
    	$location.path('/dashboard');
    }
	
});


//resetpassword controller	
app.controller('resetpasswordcntrl',function($scope,$location)
{
	$scope.reset=function()
	{
		$location.path("/");
	}
});