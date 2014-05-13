'use strict';

angular.module('SchoolMan')
  .constant('VERSION',{
    mode:"gths"
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
  		label:"Subjects",
  	 	page:"subjects",
  	 	access:['admin'],
      exclude:[],
      modes:["gths", "ghs"],
  	 	icon:'glyphicon-book'
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
      label:"Balance Sheet",
      page:"finance",
      access:['registrar'],
      exclude:[],
      modes:["gths", "ghs"],
      icon:'glyphicon-envelope'
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
      label:"Student Profile",
      page:"registrarProfile",
      access:['admin', 'registrar'],
      exclude:['registration', 'fees', 'students', "finance", "users", "subjects", "departments", "promotion", "classes"],
      modes:["gths", "ghs"],
      icon:'glyphicon-user'
    },
    {
      label:"Student Profile",
      page:"classmasterProfile",
      access:['classmaster'],
      exclude:['registration', 'fees', 'students', "finance", "users", "subjects", "departments", "promotion", "classes"],
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
  	{
  		label:"Classes",
  	 	page:"classes",
  	 	access:['admin'],
      exclude:[],
      modes:["gths", "ghs"],
  	 	icon:'glyphicon-calendar'
  	},
    {
      label:"Promotion",
      page:"promotion",
      access:['admin'],
      exclude:[],
      modes:["gths", "ghs"],
      icon:'glyphicon-thumbs-up'
    },
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
