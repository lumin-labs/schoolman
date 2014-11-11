'use strict';

angular.module('SchoolMan')
  .constant('VERSION',{
    mode:"gths"
  })
  //.constant('SCHOOLYEAR',{
  //  year:"2014/2015"
  //})
  .constant('TABS', [
  	{
  		labelEn:"Users",
      labelFr:"Utilisateurs",
  	 	page:"users",
  	 	access:['admin'],
      exclude:[],
      modes:["gths", "ghs"],
  	 	icon:'glyphicon-lock'
  	},
    {
      labelEn:"Departments",
      labelFr:"Départements",
      page:"departments",
      access:['admin'],
      exclude:[],
      modes:["gths", "ghs"],
      icon:'glyphicon-bookmark'
    },
  	{
  		labelEn:"Classes",
      labelFr:"Classes",
  	 	page:"classes",
  	 	access:['admin'],
      exclude:[],
      modes:["gths", "ghs"],
  	 	icon:'glyphicon-calendar'
  	},
    {
      labelEn:"Subjects",
      labelFr:"Sujets",
      page:"subjects",
      access:['admin'],
      exclude:[],
      modes:["gths", "ghs"],
      icon:'glyphicon-book'
    },
    //  {
    //   labelEn:"Staff list",
    //   labelFr:"Personnel",
    //   page:"stafflist",
    //   access:['admin','registrar'],
    //   exclude:[],
    //   modes:["gths", "ghs"],
    //   icon:'glyphicon-book'
    // },
    {
      labelEn:"Fee Settings",
      labelFr:"Écolages",
      page:"fees",
      access:['registrar'],
      exclude:[],
      modes:["gths", "ghs"],
      icon:'glyphicon-cog'
    },
    // {
    //   labelEn:"Salary Settings",
    //   labelFr:"Salaires",
    //   page:"salarys",
    //   access:['registrar'],
    //   exclude:[],
    //   modes:["gths", "ghs"],
    //   icon:'glyphicon-cog'
    // },
    {
      labelEn:"Students",
      labelFr:"Étudiants",
      page:"students",
      access:['admin', 'registrar'],
      exclude:[],
      modes:["gths", "ghs"],
      icon:'glyphicon-list-alt'
    },
    // {
    //   labelEn:"Staff",
    //   labelFr:"Personnel",
    //   page:"staffs",
    //   access:['admin', 'registrar'],
    //   exclude:[],
    //   modes:["gths", "ghs"],
    //   icon:'glyphicon-list-alt'
    // },
    {
      labelEn:"Balance Sheet",
      labelFr:"Fiche de Contrôle",
      page:"finance",
      access:['registrar', 'admin'],
      exclude:[],
      modes:["gths", "ghs"],
      icon:'glyphicon-envelope'
    },
    {
      labelEn:"Student Profile",
      labelFr:"Profil de l'Étudiant",
      page:"registrarProfile",
      access:['admin', 'registrar'],
      exclude:['registration', 'fees', 'students', 'idcards', 'finance', 'users', 'subjects', 'user', 'departments', 'classes', 'classcouncil', 'adminStats', 'annualreport', 'enrollmentreport'],
      modes:["gths", "ghs"],
      icon:'glyphicon-user'
    },
    // {
    //   labelEn:"Staff Profile",
    //   labelFr:"Profil du Personnel",
    //   page:"staffProfile",
    //   access:['admin', 'registrar'],
    //   exclude:['registration', 'fees', 'students', 'idcards', 'finance', 'users', 'subjects', 'user', 'departments', 'classes', 'classcouncil', 'adminStats', 'annualreport', 'enrollmentreport'],
    //   modes:["gths", "ghs"],
    //   icon:'glyphicon-user'
    // },
    {
      labelEn:"Staff Profile",
      labelFr:"Staff Profile",
      page:"staffprofile",
      access:['admin', 'registrar'],
      exclude:['registration', 'salarys', 'staffs', 'idcards', 'finance', 'users', 'subjects', 'user', 'departments', 'classes', 'classcouncil', 'adminStats', 'annualreport', 'enrollmentreport'],
      modes:["gths", "ghs"],
      icon:'glyphicon-user'
    },
    {
      labelEn:"Student Profile",
      labelFr:"Profil de l'Étudiant",
      page:"classmasterProfile",
      access:['classmaster'],
      exclude:['reportcardGTHS','mastersheet', 'classmasterMarksheet', 'classcouncil', 'classmasterStats'],
      modes:["gths", "ghs"],
      icon:'glyphicon-user'
    },
    
    // {
    //   labelEn:"Staff Registration",
    //   labelFr:"Inscription du Personnel",
    //   page:"staffregistration",
    //   access:['registrar'],
    //   exclude:[],
    //   modes:["gths", "ghs"],
    //   icon:'glyphicon-calendar'
    // },
    {
      labelEn:"Registration",
      labelFr:"Inscription",
      page:"registration",
      access:['registrar'],
      exclude:[],
      modes:["gths", "ghs"],
      icon:'glyphicon-calendar'
    },
  	{
  		labelEn:"My Classes",
      labelFr:"Mes Classes",
  	 	page:"myclasses",
  	 	access:['teacher'],
      exclude:[],
      modes:["gths", "ghs"],
  	 	icon:'glyphicon-home'
  	},
    {
      labelEn:"Marksheet",
      labelFr:"Relevé de Notes",
      page:"classmasterMarksheet",
      access:['classmaster'],
      exclude:[],
      modes:["gths", "ghs"],
      icon:'glyphicon-pencil'
    },
  	{
  		labelEn:"Marksheet",
      labelFr:"Relevé de Notes",
  	 	page:"marksheet",
  	 	access:['teacher'],
      exclude:['myclasses'],
      modes:["gths", "ghs"],
  	 	icon:'glyphicon-pencil'
  	},
  	{
  		labelEn:"Mastersheet",
      labelFr:"Carnet de Notes",
  	 	page:"mastersheet",
  	 	access:['classmaster'],
      exclude:[],
      modes:["gths", "ghs"],
  	 	icon:'glyphicon-th-large'
  	},
    {
      labelEn:"Report Card",
      labelFr:"Bulletin de Notes",
      page:"reportcardGTHS",
      access:['classmaster'],
      exclude:[],
      modes:["gths","ghs"],
      icon:'glyphicon-list-alt'
    },
    {
      labelEn:"Class Council",
      labelFr:"Conseil de Classe",
      page:"classcouncil",
      access:['classmaster','admin'],
      exclude:[],
      modes:["gths", "ghs"],
      icon:'glyphicon-folder-open'
    },
    {
      labelEn:"Transcript",
      labelFr:"Transcription",
      page:"transcript",
      access:['admin'],
      exclude:[],
      modes:["gths","ghs"],
      icon:'glyphicon-list-alt'
    },
    {
      labelEn:"User Settings",
      labelFr:"Réglages d'Utilisateurs",
      page:"user",
      access:['classmaster','admin','teacher', 'registrar'],
      exclude:'all',
      modes:["gths", "ghs"],
      icon:'glyphicon-cog'
    },
    {
      labelEn:"Statistics",
      labelFr:"Statistiques",
      page:"classmasterStats",
      access:['classmaster'],
      exclude:[],
      modes:["gths", "ghs"],
      icon:'glyphicon-stats'
    },
    {
      labelEn:"Statistics",
      labelFr:"Statistiques",
      page:"adminStats",
      access:['admin'],
      exclude:[],
      modes:["gths", "ghs"],
      icon:'glyphicon-stats'
    },
    {
      labelEn:"Annual Report",
      labelFr:"Rapport Annuel",
      page:"annualreport",
      access:['admin'],
      exclude:[],
      modes:["gths", "ghs"],
      icon:'glyphicon-stats'
    },
    {
      labelEn:"Enrollment Report",
      labelFr:"Rapport d'Inscription",
      page:"enrollmentreport",
      access:['admin'],
      exclude:[],
      modes:["gths", "ghs"],
      icon:'glyphicon-stats'
    },
    {
      labelEn:"ID Cards",
      labelFr:"Cartes d'Identité",
      page:"idcards",
      access:['registrar'],
      exclude:[],
      modes:["gths", "ghs"],
      icon:'glyphicon-print'
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