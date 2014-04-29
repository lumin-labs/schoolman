'use strict';

angular.module('SchoolMan')
  .constant('TABS', [
  	{
  		label:"Users",
  	 	page:"users",
  	 	access:['admin'],
      exclude:[],
  	 	icon:'glyphicon-lock'
  	},
  	{
  		label:"Course Catalog",
  	 	page:"catalog",
  	 	access:['admin'],
      exclude:[],
  	 	icon:'glyphicon-book'
  	},
  	{
  		label:"Students",
  	 	page:"students",
  	 	access:['admin'],
      exclude:[],
  	 	icon:'glyphicon-user'
  	},
  	{
  		label:"Classes",
  	 	page:"classes",
  	 	access:['admin'],
      exclude:[],
  	 	icon:'glyphicon-calendar'
  	},
    {
      label:"Promotion",
      page:"promotion",
      access:['admin'],
      exclude:[],
      icon:'glyphicon-thumbs-up'
    },
  	{
  		label:"My Classes",
  	 	page:"myclasses",
  	 	access:['teacher'],
      exclude:[],
  	 	icon:'glyphicon-home'
  	},
  	{
  		label:"Marksheet",
  	 	page:"marksheet",
  	 	access:['classmaster', 'teacher'],
      exclude:['myclasses'],
  	 	icon:'glyphicon-pencil'
  	},
  	{
  		label:"Mastersheet",
  	 	page:"mastersheet",
  	 	access:['classmaster'],
      exclude:[],
  	 	icon:'glyphicon-th-large'
  	},
  	{
  		label:"Report Card",
  	 	page:"reportcard",
  	 	access:['classmaster'],
      exclude:[],
  	 	icon:'glyphicon-list-alt'
  	},
 ]);


angular.module('SchoolMan')
  .constant('PROMOTE_OPTIONS', [
    {name: "automatic",
     icon: "fa fa-cog",
     style:""},
    {name: "promote",
     icon: "fa fa-pencil",
     style:"success"},
    {name: "repeat",
     icon: "fa fa-pencil",
     style:"warning"},
    {name: "withdrawal",
     icon: "fa fa-pencil",
     style:"default"},
    {name: "dismiss",
     icon: "fa fa-pencil",
     style:"danger"}
]);
