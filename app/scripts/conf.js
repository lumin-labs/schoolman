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
      icon:'glyphicon-user'
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
