'use strict';

this.moduleList = [{
      moduleName:"Main",
      labelEn:"Registration",
      labelFr:"Inscription",
      access:['admin', 'registrar'],
      dependencies:[],
      location:"",
      icon:"glyphicon-cog",
      tabs: [
        {
          en:"Users",
          fr:"Utilisateurs",
          page:"users",
          access:['admin'],
          exclude:[]
        },
        {
          en:"User Settings",
          fr:"Réglages d'Utilisateurs",
          page:"user",
          access:['classmaster','admin','teacher', 'registrar'],
          exclude:'all'
        },
        {
          en:"Departments",
          fr:"Départements",
          page:"departments",
          access:['admin'],
          exclude:[]
        },
        {
          en:"Classes",
          fr:"Classes",
          page:"classes",
          access:['admin'],
          exclude:[]
        },
        {
          en:"Subjects",
          fr:"Sujets",
          page:"subjects",
          access:['admin'],
          exclude:[]
        },
        {
          en:"Students",
          fr:"Étudiants",
          page:"students",
          access:['admin', 'registrar'],
          exclude:[]
        },
        
        {
          en:"Student Profile",
          fr:"Profil de l'Étudiant",
          page:"profile",
          access:['admin', 'registrar'],
          exclude:"all"
        },
        {
          en:"Registration",
          fr:"Inscription",
          page:"registration",
          access:['registrar'],
          exclude:[]
        }
      ]
    },{
      moduleName:"Finance",
      labelEn:"Finance",
      labelFr:"Finance",
      access:['admin', 'registrar'],
      dependencies:["Main"],
      icon:"glyphicon-envelope",
      scripts:[
        "ReportCard/controllers/reportcardCtrl",
        "ReportCard/controllers/classmasterprofileCtrl",
        "ReportCard/controllers/mastersheetCtrl",
        "ReportCard/controllers/marksheetCtrl",
        "ReportCard/controllers/myclassesCtrl",
        "ReportCard/controllers/classcouncilCtrl",
        "ReportCard/controllers/statsCtrl",
        "ReportCard/services/dcards"
      ]
      tabs: [
        {
          en:"Fee Settings",
          fr:"Écolages",
          page:"fees",
          access:['registrar'],
          exclude:[]
        },
        {
          en:"Balance Sheet",
          fr:"Fiche de Contrôle",
          page:"balancesheet",
          access:['registrar', 'admin'],
          exclude:[]
        },
        
      ]
    },{
      moduleName:"ReportCard",
      labelEn:"Marks",
      labelFr:"Les Notes",
      access:['admin', 'classmaster', 'teacher'],
      dependencies:["Main"],
      location:"/extensions/ReportCard",
      icon:"glyphicon-pencil",
      scripts:[
        "Finance/controllers/registrarprofileCtrl",
        "Finance/controllers/feesCtrl",
        "Finance/controllers/balancesheetCtrl"
      ]      
      tabs: [
        {
          en:"My Classes",
          fr:"Mes Classes",
          page:"myclasses",
          access:['teacher'],
          exclude:[]
        },
        {
          en:"Marksheet",
          fr:"Relevé de Notes",
          page:"classmasterMarksheet",
          access:['classmaster'],
          exclude:[]
        },
        {
          en:"Marksheet",
          fr:"Relevé de Notes",
          page:"teacherMarksheet",
          access:['teacher'],
          exclude:['myclasses']
        },
        {
          en:"Mastersheet",
          fr:"Carnet de Notes",
          page:"mastersheet",
          access:['classmaster'],
          exclude:[]
        },
        {
          en:"Report Card",
          fr:"Bulletin de Notes",
          page:"reportcard",
          access:['classmaster'],
          exclude:[]
        },
        {
          en:"Class Council",
          fr:"Conseil de Classe",
          page:"classcouncil",
          access:['classmaster','admin'],
          exclude:[]
        },
        {
          en:"Statistics",
          fr:"Statistiques",
          page:"classmasterStats",
          access:['classmaster'],
          exclude:[]
        },
        {
          en:"Statistics",
          fr:"Statistiques",
          page:"adminStats",
          access:['admin'],
          exclude:[]
        },
      ]
    },{
      moduleName:"IDCard",
      labelEn:"ID Cards",
      labelFr:"Cartes d'Identité",
      access:['registrar'],
      dependencies:["Main"],
      location:"/extension/IDCard",
      icon:"glyphicon-print",
      scripts:[
        "IDCard/controllers/idcardCtrl"
      ]
      tabs: [
        {
          en:"ID Cards",
          fr:"Cartes d'Identité",
          page:"idcards",
          access:['registrar'],
          exclude:[]
        }
      ]
    },{
      moduleName:"Reports",
      labelEn:"Reports",
      labelFr:"Rapports",
      access:['admin'],
      dependencies:["Main", "ReportCard"],
      location:"/extension/Reports",
      icon:"glyphicon-stats",
      scripts: [
        "Reports/controllers/annualreportCtrl",
        "Reports/controllers/enrollmentCtrl"
      ]
      tabs: [
        {
          en:"Annual Report",
          fr:"Rapport Annuel",
          page:"annualreport",
          access:['admin'],
          exclude:[]
        },
        {
          en:"Enrollment Report",
          fr:"Rapport d'Inscription",
          page:"enrollmentreport",
          access:['admin'],
          exclude:[]
        }
      ]
    },{
      moduleName:"Staffing",
      labelEn:"Staffing",
      labelFr:"Personnel",
      access:['admin', 'registrar'],
      dependencies:["Main"],
      location:"/extension/Staffing",
      icon:"glyphicon-book",
      scripts:[
        "Staffing/services/salarys",
        "Staffing/services/staffs",
        "Staffing/models/Salary",
        "Staffing/controllers/salaryCtrl",
        "Staffing/controllers/staffregistrationCtrl"
      ]
      tabs: [
        //  {
        //   en:"Staff list",
        //   fr:"Personnel",
        //   page:"stafflist",
        //   access:['admin','registrar'],
        //   exclude:[]
        // },
        // {
        //   en:"Salary Settings",
        //   fr:"Salaires",
        //   page:"salarys",
        //   access:['registrar'],
        //   exclude:[]
        // },
        // {
        //   en:"Staff",
        //   fr:"Personnel",
        //   page:"staffs",
        //   access:['admin', 'registrar'],
        //   exclude:[]
        // },
        // {
        //   en:"Staff Profile",
        //   fr:"Profil du Personnel",
        //   page:"staffProfile",
        //   access:['admin', 'registrar'],
        //   exclude:['registration', 'fees', 'students', 'idcards', 'balancesheet', 'users', 'subjects', 'user', 'departments', 'classes', 'classcouncil', 'adminStats', 'annualreport', 'enrollmentreport']
        // },
        // {
        //   en:"Staff Registration",
        //   fr:"Inscription du Personnel",
        //   page:"staffregistration",
        //   access:['registrar'],
        //   exclude:[]
        // },
      ]
    },{
      moduleName:"Transcript",
      labelEn:"Transcript",
      labelFr:"Transcription",
      access:['admin'],
      dependencies:["Main"],
      location:"/extension/Transcript",
      icon:"glyphicon-list-alt",
      scripts:[
        "Transcript/models/Transcript", 
        "Transcript/services/transcripts",
        "Transcript/controllers/transcriptCtrl"
      ]
      tabs: [
        {
          en:"Transcript",
          fr:"Transcription",
          page:"transcript",
          access:['admin'],
          exclude:[]
        }
      ]
    },{
      moduleName:"TimeTable",
      labelEn:"Time Table",
      labelFr:"Programme",
      access:['admin'],
      dependencies:["Main", "ReportCard"],
      location:"/extension/TimeTable",
      icon:"glyphicon-calendar",
      scripts: [

      ]
      tabs: [
        
      ]
    }
  ]

// this.module

angular.module('SchoolMan')
  .constant('VERSION',{
    mode:"gths"
  })
  .constant('MODULES', this.moduleList)
 //  .constant('TABS', [
 //    {
 //  		labelEn:"Users",
 //      labelFr:"Utilisateurs",
 //  	 	page:"users",
 //  	 	access:['admin'],
 //      exclude:[],
 //      modes:["gths", "ghs"],
 //  	 	icon:'glyphicon-lock'
 //  	},
 //    {
 //      labelEn:"Departments",
 //      labelFr:"Départements",
 //      page:"departments",
 //      access:['admin'],
 //      exclude:[],
 //      modes:["gths", "ghs"],
 //      icon:'glyphicon-bookmark'
 //    },
 //  	{
 //  		labelEn:"Classes",
 //      labelFr:"Classes",
 //  	 	page:"classes",
 //  	 	access:['admin'],
 //      exclude:[],
 //      modes:["gths", "ghs"],
 //  	 	icon:'glyphicon-calendar'
 //  	},
 //    {
 //      labelEn:"Subjects",
 //      labelFr:"Sujets",
 //      page:"subjects",
 //      access:['admin'],
 //      exclude:[],
 //      modes:["gths", "ghs"],
 //      icon:'glyphicon-book'
 //    },
 //    //  {
 //    //   labelEn:"Staff list",
 //    //   labelFr:"Personnel",
 //    //   page:"stafflist",
 //    //   access:['admin','registrar'],
 //    //   exclude:[],
 //    //   modes:["gths", "ghs"],
 //    //   icon:'glyphicon-book'
 //    // },
 //    {
 //      labelEn:"Fee Settings",
 //      labelFr:"Écolages",
 //      page:"fees",
 //      access:['registrar'],
 //      exclude:[],
 //      modes:["gths", "ghs"],
 //      icon:'glyphicon-cog'
 //    },
 //    // {
 //    //   labelEn:"Salary Settings",
 //    //   labelFr:"Salaires",
 //    //   page:"salarys",
 //    //   access:['registrar'],
 //    //   exclude:[],
 //    //   modes:["gths", "ghs"],
 //    //   icon:'glyphicon-cog'
 //    // },
 //    {
 //      labelEn:"Students",
 //      labelFr:"Étudiants",
 //      page:"students",
 //      access:['admin', 'registrar'],
 //      exclude:[],
 //      modes:["gths", "ghs"],
 //      icon:'glyphicon-list-alt'
 //    },
 //    // {
 //    //   labelEn:"Staff",
 //    //   labelFr:"Personnel",
 //    //   page:"staffs",
 //    //   access:['admin', 'registrar'],
 //    //   exclude:[],
 //    //   modes:["gths", "ghs"],
 //    //   icon:'glyphicon-list-alt'
 //    // },
 //    {
 //      labelEn:"Balance Sheet",
 //      labelFr:"Fiche de Contrôle",
 //      page:"balancesheet",
 //      access:['registrar', 'admin'],
 //      exclude:[],
 //      modes:["gths", "ghs"],
 //      icon:'glyphicon-envelope'
 //    },
 //    {
 //      labelEn:"Student Profile",
 //      labelFr:"Profil de l'Étudiant",
 //      page:"registrarProfile",
 //      access:['admin', 'registrar'],
 //      exclude:['registration', 'fees', 'students', 'idcards', 'balancesheet', 'users', 'subjects', 'user', 'departments', 'classes', 'classcouncil', 'adminStats', 'annualreport', 'enrollmentreport'],
 //      modes:["gths", "ghs"],
 //      icon:'glyphicon-user'
 //    },
 //    // {
 //    //   labelEn:"Staff Profile",
 //    //   labelFr:"Profil du Personnel",
 //    //   page:"staffProfile",
 //    //   access:['admin', 'registrar'],
 //    //   exclude:['registration', 'fees', 'students', 'idcards', 'balancesheet', 'users', 'subjects', 'user', 'departments', 'classes', 'classcouncil', 'adminStats', 'annualreport', 'enrollmentreport'],
 //    //   modes:["gths", "ghs"],
 //    //   icon:'glyphicon-user'
 //    // },
 //    {
 //      labelEn:"Student Profile",
 //      labelFr:"Profil de l'Étudiant",
 //      page:"classmasterProfile",
 //      access:['classmaster'],
 //      exclude:['reportcard','mastersheet', 'classmasterMarksheet', 'classcouncil', 'classmasterStats'],
 //      modes:["gths", "ghs"],
 //      icon:'glyphicon-user'
 //    },
    
 //    // {
 //    //   labelEn:"Staff Registration",
 //    //   labelFr:"Inscription du Personnel",
 //    //   page:"staffregistration",
 //    //   access:['registrar'],
 //    //   exclude:[],
 //    //   modes:["gths", "ghs"],
 //    //   icon:'glyphicon-calendar'
 //    // },
 //    {
 //      labelEn:"Registration",
 //      labelFr:"Inscription",
 //      page:"registration",
 //      access:['registrar'],
 //      exclude:[],
 //      modes:["gths", "ghs"],
 //      icon:'glyphicon-calendar'
 //    },
 //  	{
 //  		labelEn:"My Classes",
 //      labelFr:"Mes Classes",
 //  	 	page:"myclasses",
 //  	 	access:['teacher'],
 //      exclude:[],
 //      modes:["gths", "ghs"],
 //  	 	icon:'glyphicon-home'
 //  	},
 //    {
 //      labelEn:"Marksheet",
 //      labelFr:"Relevé de Notes",
 //      page:"classmasterMarksheet",
 //      access:['classmaster'],
 //      exclude:[],
 //      modes:["gths", "ghs"],
 //      icon:'glyphicon-pencil'
 //    },
 //  	{
 //  		labelEn:"Marksheet",
 //      labelFr:"Relevé de Notes",
 //  	 	page:"teacherMarksheet",
 //  	 	access:['teacher'],
 //      exclude:['myclasses'],
 //      modes:["gths", "ghs"],
 //  	 	icon:'glyphicon-pencil'
 //  	},
 //  	{
 //  		labelEn:"Mastersheet",
 //      labelFr:"Carnet de Notes",
 //  	 	page:"mastersheet",
 //  	 	access:['classmaster'],
 //      exclude:[],
 //      modes:["gths", "ghs"],
 //  	 	icon:'glyphicon-th-large'
 //  	},
 //    {
 //      labelEn:"Report Card",
 //      labelFr:"Bulletin de Notes",
 //      page:"reportcard",
 //      access:['classmaster'],
 //      exclude:[],
 //      modes:["gths","ghs"],
 //      icon:'glyphicon-list-alt'
 //    },
 //    {
 //      labelEn:"Class Council",
 //      labelFr:"Conseil de Classe",
 //      page:"classcouncil",
 //      access:['classmaster','admin'],
 //      exclude:[],
 //      modes:["gths", "ghs"],
 //      icon:'glyphicon-folder-open'
 //    },
 //    {
 //      labelEn:"Transcript",
 //      labelFr:"Transcription",
 //      page:"transcript",
 //      access:['admin'],
 //      exclude:[],
 //      modes:["gths","ghs"],
 //      icon:'glyphicon-list-alt'
 //    },
 //    {
 //      labelEn:"User Settings",
 //      labelFr:"Réglages d'Utilisateurs",
 //      page:"user",
 //      access:['classmaster','admin','teacher', 'registrar'],
 //      exclude:'all',
 //      modes:["gths", "ghs"],
 //      icon:'glyphicon-cog'
 //    },
 //    {
 //      labelEn:"Statistics",
 //      labelFr:"Statistiques",
 //      page:"classmasterStats",
 //      access:['classmaster'],
 //      exclude:[],
 //      modes:["gths", "ghs"],
 //      icon:'glyphicon-stats'
 //    },
 //    {
 //      labelEn:"Statistics",
 //      labelFr:"Statistiques",
 //      page:"adminStats",
 //      access:['admin'],
 //      exclude:[],
 //      modes:["gths", "ghs"],
 //      icon:'glyphicon-stats'
 //    },
 //    {
 //      labelEn:"Annual Report",
 //      labelFr:"Rapport Annuel",
 //      page:"annualreport",
 //      access:['admin'],
 //      exclude:[],
 //      modes:["gths", "ghs"],
 //      icon:'glyphicon-stats'
 //    },
 //    {
 //      labelEn:"Enrollment Report",
 //      labelFr:"Rapport d'Inscription",
 //      page:"enrollmentreport",
 //      access:['admin'],
 //      exclude:[],
 //      modes:["gths", "ghs"],
 //      icon:'glyphicon-stats'
 //    },
 //    {
 //      labelEn:"ID Cards",
 //      labelFr:"Cartes d'Identité",
 //      page:"idcards",
 //      access:['registrar'],
 //      exclude:[],
 //      modes:["gths", "ghs"],
 //      icon:'glyphicon-print'
 //    }
 // ]);


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