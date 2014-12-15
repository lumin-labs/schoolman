'use strict';

var modelsMain = [
    "../scripts/models/User",
    "../scripts/models/Student",
    "../scripts/models/Subject",
    "../scripts/models/Department",
    "../scripts/models/Group",
    "../scripts/models/Form",
    "../scripts/models/Settings",
    "../scripts/models/SchoolInfo",
    "ReportCard/models/ClassCouncil",
    "ReportCard/models/Marksheet",
    "ReportCard/models/Comment",
    "ReportCard/models/Dcard",
    "Finance/models/Fee",
    "Finance/models/Payment",
    "Transcript/models/Transcript",
]

var servicesMain = {
    "$model": "../scripts/services/$model",
    "TimeTable": "../scripts/services/timetable",
    "ClassMaster": "../scripts/services/classmaster",
    "Path": "../scripts/services/path",
    "MockData": "../scripts/services/mockdata2",
    "Location": "../scripts/services/location",
    "Cache": "../scripts/services/cache",
    "modelTransformer": "../scripts/services/modeltransformer",
    "Uid": "../scripts/services/uid",
    "Departments": "../scripts/services/departments",
    "Groups": "../scripts/services/groups",
    "SchoolInfos": "../scripts/services/schoolinfos",
    "Forms": "../scripts/services/forms",
    "SubjectTypes": "../scripts/services/subjecttypes",
    "profile": "../scripts/services/profile",
    "Students": "../scripts/services/students",
    "Subjects": "../scripts/services/subjects",
    "Users": "../scripts/services/users",
    "Terms": "../scripts/services/terms",
    "settings": "../scripts/services/settings",
    "File": "../scripts/services/file",
    "Lang": "../scripts/services/lang",
    "ScriptManager": "../scripts/services/scriptmanager",
    "InsertionError": "../scripts/models/InsertionError",
    "Marksheets": "ReportCard/services/marksheets",
    "ClassCouncils": "ReportCard/services/classcouncils",
    "Fees": "Finance/services/fees",
    "Payments":"Finance/services/payments",
    // "Salarys": "Staffing/services/salarys",
    "Staffs": "Staffing/services/staffs",
    "Transcripts": "Transcript/services/transcripts",
    "ExtensionLoader": "../scripts/services/extensionloader",
}

var controllersMain = [
  // "../scripts/services/settings",
    "../scripts/controllers/loading3Ctrl",
    "../scripts/controllers/menuCtrl",
    "../scripts/controllers/loginCtrl",
    "../scripts/controllers/usersCtrl",
    "../scripts/controllers/subjectsCtrl",
    "../scripts/controllers/studentsCtrl",
    "../scripts/controllers/navtabsCtrl",
    "../scripts/controllers/classmenuCtrl",
    "../scripts/controllers/departmentsCtrl",
    "../scripts/controllers/profileCtrl",
    "../scripts/controllers/groupsCtrl",
    "../scripts/controllers/registrationCtrl",
    "../scripts/controllers/userCtrl",
    // "../scripts/services/moduleloader",
    "ReportCard/models/ClassCouncil",
    "ReportCard/models/Marksheet",
    "ReportCard/models/Comment",
    "ReportCard/models/Dcard",
    "Finance/models/Fee",
    "Finance/models/Payment",
        // "Staffing/models/Staffpayment",
        // "Staffing/models/Salary",
        "Staffing/models/Staff",
    
]

var modularScripts={
    'ReportCard':[
        "ReportCard/controllers/reportcardCtrl",
        "ReportCard/controllers/classmasterprofileCtrl",
        "ReportCard/controllers/mastersheetCtrl",
        "ReportCard/controllers/marksheetCtrl",
        "ReportCard/controllers/myclassesCtrl",
        "ReportCard/controllers/classcouncilCtrl",
        "ReportCard/controllers/statsCtrl",
        "ReportCard/services/dcards",
    ],
    'Finance':[
        "Finance/controllers/registrarprofileCtrl",
        "Finance/controllers/feesCtrl",
        "Finance/controllers/balancesheetCtrl",
    ],
    'Staffing':[
        // "Staffing/services/staff-registrar",
        "Staffing/services/staffid",
        // "Staffing/services/staffsprofile",
        // "Staffing/controllers/salaryCtrl",
        "Staffing/controllers/staffregistrationCtrl",
        "Staffing/controllers/StafflistCtrl",
        // "Staffing/controllers/staffregistrationCtrl",
        // "Staffing/controllers/staffsCtrl",
        // "Staffing/controllers/staffsfinanceCtrl",
        "Staffing/controllers/staffsprofileCtrl",
    ],
    'Reports':[
        "Reports/controllers/annualreportCtrl",
        "Reports/controllers/enrollmentCtrl"
    ],
    'Transcript':[
        "Transcript/models/Transcript", 
        "Transcript/services/transcripts",
        "Transcript/controllers/transcriptCtrl"
    ],
    'IDCard':[
        "IDCard/controllers/idcardCtrl"
    ]

}

window.name = "NG_DEFER_BOOTSTRAP!";

require.config({
    baseUrl: 'extensions',
    paths: servicesMain
});

var scripts = modelsMain.concat(controllersMain);

require(scripts, function(){

    angular.bootstrap(document, ["SchoolMan"]);

    angular.element().ready(function() {
      console.log("inside of ready");
        angular.resumeBootstrap([
            'SchoolMan.ReportCard', 
            'SchoolMan.Finance',
            'SchoolMan.IDCard',
            'SchoolMan.Reports',
            'SchoolMan.Staffing',
            'SchoolMan.TimeTable',
            'SchoolMan.Transcript'])
        // })
        var settings = require('settings');

        // define(['settings'], function(settings){
        console.log("Working?", require('settings'));
})


});
