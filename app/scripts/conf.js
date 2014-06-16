'use strict';

angular.module('SchoolMan')
  .constant('VERSION',{
    mode:"gths"
  })
  .constant('SCHOOLYEAR',{
    year:"2014/2015"
  })
  .constant('TABS', [
  	{
  		label:"Users",
  	 	page:"users",
  	 	access:['admin'],
      exclude:[],
      modes:["gths", "ghs"],
  	 	icon:'glyphicon-lock'
  	},
    {
      label:"Departments",
      page:"departments",
      access:['admin'],
      exclude:[],
      modes:["gths", "ghs"],
      icon:'glyphicon-bookmark'
    },
  	{
  		label:"Classes",
  	 	page:"classes",
  	 	access:['admin'],
      exclude:[],
      modes:["gths", "ghs"],
  	 	icon:'glyphicon-calendar'
  	},
    {
      label:"Subjects",
      page:"subjects",
      access:['admin'],
      exclude:[],
      modes:["gths", "ghs"],
      icon:'glyphicon-book'
    },
    {
      label:"Fee Settings",
      page:"fees",
      access:['registrar'],
      exclude:[],
      modes:["gths", "ghs"],
      icon:'glyphicon-cog'
    },
    {
      label:"Students",
      page:"students",
      access:['admin', 'registrar'],
      exclude:[],
      modes:["gths", "ghs"],
      icon:'glyphicon-list-alt'
    },
    {
      label:"Balance Sheet",
      page:"finance",
      access:['registrar', 'admin'],
      exclude:[],
      modes:["gths", "ghs"],
      icon:'glyphicon-envelope'
    },
    {
      label:"Student Profile",
      page:"registrarProfile",
      access:['admin', 'registrar'],
      exclude:['registration', 'fees', 'students', "finance", "users", "subjects", "user", "departments", "classes"],
      modes:["gths", "ghs"],
      icon:'glyphicon-user'
    },
    {
      label:"Student Profile",
      page:"classmasterProfile",
      access:['classmaster'],
      exclude:['reportcardGTHS','mastersheet', 'classmasterMarksheet'],
      modes:["gths", "ghs"],
      icon:'glyphicon-user'
    },
    {
      label:"Registration",
      page:"registration",
      access:['registrar'],
      exclude:[],
      modes:["gths", "ghs"],
      icon:'glyphicon-calendar'
    },
    // {
    //   label:"Promotion",
    //   page:"promotion",
    //   access:['admin'],
    //   exclude:[],
    //   modes:["gths", "ghs"],
    //   icon:'glyphicon-thumbs-up'
    // },
  	{
  		label:"My Classes",
  	 	page:"myclasses",
  	 	access:['teacher'],
      exclude:[],
      modes:["gths", "ghs"],
  	 	icon:'glyphicon-home'
  	},
    {
      label:"Marksheet",
      page:"classmasterMarksheet",
      access:['classmaster'],
      exclude:[],
      modes:["gths", "ghs"],
      icon:'glyphicon-pencil'
    },
  	{
  		label:"Marksheet",
  	 	page:"marksheet",
  	 	access:['teacher'],
      exclude:['myclasses'],
      modes:["gths", "ghs"],
  	 	icon:'glyphicon-pencil'
  	},
  	{
  		label:"Mastersheet",
  	 	page:"mastersheet",
  	 	access:['classmaster'],
      exclude:[],
      modes:["gths", "ghs"],
  	 	icon:'glyphicon-th-large'
  	},
  	{
  		label:"Report Card",
  	 	page:"reportcard",
  	 	access:['classmaster'],
      exclude:[],
      modes:["ghs"],
  	 	icon:'glyphicon-list-alt'
  	},
    {
      label:"Report Card",
      page:"reportcardGTHS",
      access:['classmaster'],
      exclude:[],
      modes:["gths"],
      icon:'glyphicon-list-alt'
    },
    {
      label:"Class Council",
      page:"classcouncil",
      access:['classmaster','admin'],
      exclude:[],
      modes:["gths", "ghs"],
      icon:'glyphicon-folder-open'
    },
    {
      label:"User Settings",
      page:"user",
      access:['classmaster','admin','teacher', 'registrar'],
      exclude:'all',
      modes:["gths", "ghs"],
      icon:'glyphicon-cog'
    },
    {
      label:"Customer Settings",
      page:"customerSettings",
      access:['sales'],
      exclude:[],
      modes:["gths", "ghs"],
      icon:'glyphicon-cog'
    },
 ]);


angular.module('SchoolMan')
  .constant('PROMOTE_OPTIONS', [
    {name: "automatic",
     icon: "glyphicon glyphicon-cog",
     style:""},
    {name: "promote",
     icon: "glyphicon glyphicon-pencil",
     style:"success"},
    {name: "repeat",
     icon: "glyphicon glyphicon-pencil",
     style:"warning"},
    {name: "withdrawal",
     icon: "glyphicon glyphicon-pencil",
     style:"default"},
    {name: "dismiss",
     icon: "glyphicon glyphicon-pencil",
     style:"danger"}
]);