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
    "Transcripts": "Transcript/services/transcripts",
    "ExtensionLoader": "../scripts/services/extensionloader",
}

var controllersMain = [
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
    
]

require.config({
    baseUrl: 'extensions',
    paths: servicesMain
});

var scripts = modelsMain.concat(controllersMain);

require(scripts, function(){
    angular.bootstrap(document, ["SchoolMan"]);
});

