'use strict';

angular.module('SchoolMan')
  .constant('VERSION',{
    mode:"division",
    name:"Mezam Division"
  })
  //.constant('SCHOOLYEAR',{
  //  year:"2014/2015"
  //})
  .constant('TABS', [
  	{
  		label:"Users",
  	  page:"users",
  	  access:['region', 'division', 'inspectorate'],
      exclude:[],
      modes:["region", "division"],
  	 	icon:'glyphicon-lock'
    },
   //  {
   //    label:"Departments",
   //    page:"departments",
   //    access:['admin'],
   //    exclude:[],
   //    modes:["gths", "ghs"],
   //    icon:'glyphicon-bookmark'
   //  },
  	// {
  	// 	label:"Classes",
  	//  	page:"classes",
  	//  	access:['admin'],
   //    exclude:[],
   //    modes:["gths", "ghs"],
  	//  	icon:'glyphicon-calendar'
  	// },
   //  {
   //    label:"Subjects",
   //    page:"subjects",
   //    access:['admin'],
   //    exclude:[],
   //    modes:["gths", "ghs"],
   //    icon:'glyphicon-book'
   //  },
   //  {
   //    label:"Fee Settings",
   //    page:"fees",
   //    access:['registrar'],
   //    exclude:[],
   //    modes:["gths", "ghs"],
   //    icon:'glyphicon-cog'
   //  },
   //  {
   //    label:"Students",
   //    page:"students",
   //    access:['admin', 'registrar'],
   //    exclude:[],
   //    modes:["gths", "ghs"],
   //    icon:'glyphicon-list-alt'
   //  },
    // {
    //   label:"School Balance Sheet",
    //   page:"finance",
    //   access:['registrar', 'admin'],
    //   exclude:[],
    //   modes:["gths", "ghs"],
    //   icon:'glyphicon-envelope'
    // },
   //  {
   //    label:"Student Profile",
   //    page:"registrarProfile",
   //    access:['admin', 'registrar'],
   //    exclude:['registration', 'fees', 'students', 'finance', 'users', 'subjects', 'user', 'departments', 'classes', 'classcouncil'],
   //    modes:["gths", "ghs"],
   //    icon:'glyphicon-user'
   //  },
   //  {
   //    label:"Student Profile",
   //    page:"classmasterProfile",
   //    access:['classmaster'],
   //    exclude:['reportcardGTHS','mastersheet', 'classmasterMarksheet', 'classcouncil'],
   //    modes:["gths", "ghs"],
   //    icon:'glyphicon-user'
   //  },
   //  {
   //    label:"Registration",
   //    page:"registration",
   //    access:['registrar'],
   //    exclude:[],
   //    modes:["gths", "ghs"],
   //    icon:'glyphicon-calendar'
   //  },
   //  // {
   //  //   label:"Promotion",
   //  //   page:"promotion",
   //  //   access:['admin'],
   //  //   exclude:[],
   //  //   modes:["gths", "ghs"],
   //  //   icon:'glyphicon-thumbs-up'
   //  // },
  	// {
  	// 	label:"My Classes",
  	//  	page:"myclasses",
  	//  	access:['teacher'],
   //    exclude:[],
   //    modes:["gths", "ghs"],
  	//  	icon:'glyphicon-home'
  	// },
   //  {
   //    label:"Marksheet",
   //    page:"classmasterMarksheet",
   //    access:['classmaster'],
   //    exclude:[],
   //    modes:["gths", "ghs"],
   //    icon:'glyphicon-pencil'
   //  },
  	// {
  	// 	label:"Marksheet",
  	//  	page:"marksheet",
  	//  	access:['teacher'],
   //    exclude:['myclasses'],
   //    modes:["gths", "ghs"],
  	//  	icon:'glyphicon-pencil'
  	// },
  	// {
  	// 	label:"Mastersheet",
  	//  	page:"mastersheet",
  	//  	access:['classmaster'],
   //    exclude:[],
   //    modes:["gths", "ghs"],
  	//  	icon:'glyphicon-th-large'
  	// },
   //  {
   //    label:"Report Card",
   //    page:"reportcardGTHS",
   //    access:['classmaster'],
   //    exclude:[],
   //    modes:["gths","ghs"],
   //    icon:'glyphicon-list-alt'
   //  },
   //  {
   //    label:"Class Council",
   //    page:"classcouncil",
   //    access:['classmaster','admin'],
   //    exclude:[],
   //    modes:["gths", "ghs"],
   //    icon:'glyphicon-folder-open'
   //  },
   //  {
   //    label:"User Settings",
   //    page:"user",
   //    access:['classmaster','admin','teacher', 'registrar'],
   //    exclude:'all',
   //    modes:["gths", "ghs"],
   //    icon:'glyphicon-cog'
   //  },
    {
      label:"Add School",
      page:"addschool",
      access:['inspectorate'],
      exclude:[],
      modes:["division", "region"],
      icon:'glyphicon-pencil'
    },{
      label:"Schools",
      page:"schools",
      access:['inspectorate'],
      exclude:[],
      modes:["division", "region"],
      icon:'glyphicon-folder-open'
    },
    {
      label:"Fee Settings",
      page:"divfees",
      access:['division'],
      exclude:[],
      modes:["division", "region"],
      icon:'glyphicon-cog'
    },
    {
      label:"Fee Settings",
      page:"inspectoratefees",
      access:['inspectorate'],
      exclude:[],
      modes:["division", "region"],
      icon:'glyphicon-cog'
    },
    {
      label:"Fee Settings",
      page:"regfees",
      access:['region'],
      exclude:[],
      modes:["division", "region"],
      icon:'glyphicon-cog'
    },{
      label:"Balance Sheet",
      page:"divfinance",
      access:['division'],
      exclude:[],
      modes:["division", "region"],
      icon:'glyphicon-envelope'
    },
    {
      label:"Balance Sheet",
      page:"inspectoratefinance",
      access:['inspectorate'],
      exclude:[],
      modes:["division", "region"],
      icon:'glyphicon-envelope'
    },
    {
      label:"Balance Sheet",
      page:"regfinance",
      access:['region'],
      exclude:[],
      modes:["division", "region"],
      icon:'glyphicon-envelope'
    },
    {
      label:"School Profile",
      page:"schoolprofile",
      access:['inspectorate'],
      exclude:['schools', 'divfees', 'inspectoratefinance','addschool', 'divfinance', 'divisions', 'users', 'stats'],
      modes:["division", "region"],
      icon:'glyphicon-home'
    },
     {
      label:"Division Profile",
      page:"divisionprofile",
      access:['region'],
      exclude:['divfees', 'divfinance', 'divisions','regfinance','regfees', 'users', 'stats'],
      modes:["division", "region"],
      icon:'glyphicon-home'
    },
    {
      label:"Inspectorate Profile",
      page:"inspectorateprofile",
      access:['division'],
      exclude:['divfees', 'divfinance', 'divisions','regfinance','regfees', 'users', 'stats','inspectorates' ],
      modes:["division", "region"],
      icon:'glyphicon-home'
    },
    {
      label:"Divisions",
      page:"divisions",
      access:['region'],
      exclude:[],
      modes:["division", "region"],
      icon:'glyphicon-paperclip'
    },
    // {
    //   label:"Statistics",
    //   page:"stats",
    //   access:['division'],
    //   exclude:[],
    //   modes:["division", "region"],
    //   icon:'glyphicon-paperclip'
    // },
    {
      label:"Inspectorate",
      page:"inspectorates",
      access:['division'],
      exclude:[],
      modes:["inspectorate", "division", "region"],
      icon:'glyphicon-paperclip'
    }
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