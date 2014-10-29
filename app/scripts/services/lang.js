'use strict';

function Lang($routeParams) {
  var langs = ['en', 'fr'];
  // var lang = $routeParams.lang;
  var defaultLang = "en";

  var langDict = {
  	en:{
  		
  		add:"Add",
  		add_class:"Add Class",
      add_student:"Add Student", 
      all_forms:"All Forms",
      all_terms:"All Terms",
      all_departments:"All Departments",
      all_groups:"All Groups",
  		cancel:"Cancel",
  		Class:"Class",
      class_name:"Class Name",
      clear_all:"Clear All", //wrong
  		code:"Code",
  		date_of_birth:"Date of Birth",
  		department_name:"Department Name",
  		edit_student:"Edit Student",
      exporting:"Exporting",
      export_file:"Export to File",
      export_statistics:"Export Statistics",
      fees:"Fees",
  		fee_group:"Fee Group",
      fee_name:"Fee Name",
      female:"Female",
      file:"File",
  		full_name:"Full Name",
      importing:"Importing",
      import_file:"Import File",
      language:"Language",
      logout:"Logout",
      male:"Male",
  		name:"Name",
  		parent_email:"Parent Email",
  		parent_name:"Parent Name",
  		parent_occupation:"Parent Occupation",
  		parent_phone:"Parent Phone",
  		place_of_birth:"Place of Birth",
      please_fill_in_all_fields:"Please fill in all fields highlighted in red and try again.",
      print:"Print",
      print_all_report_cards:"Print All Report Cards",
      print_current_report_card_only:"Print Current Report Card Only",
      pta_fee:"PTA Fee",
      quit:"Quit",
  		remove:"Remove",
  		residence:"Residence",
  		save_changes:"Save Changes",
  		scheduled_to_teach:"is scheduled to teach",
      school_fee:"School Fee",
      school_statistics:"School Statistics",
  		select_department:"Select Department",
  		select_group:"Select Group",
      select_sex:"Select Gender",
  		select_subject:"Select Subject",
  		select_fee:"Select Fee",
  		select_form:"Select Form",
      settings:"Settings", //wrong
  		sex:"Gender",
  		student:"Student",
  		student_id:"Student ID",
  		student_name:"Student Name",
      student_not_added:"Student Not Added.",
      term:"Term",
      total:"Total",
  	}, fr:{
  		
  		add:"Ajouter",
  		add_class:"Ajouter la Classe", //wrong??
      add_student:"Ajouter l'Etudiant",
      all_forms:"Tous les Forms", //wrong
      all_terms:"Tous les Termes", //??
      all_departments:"Tous les Départements", //??
      all_groups:"Tous les Groupes",
  		cancel:"Annuler",
  		Class:"Classe",
      class_name:"Nom de la Classe",
      clear_all:"Effacer Tous",
  		code:"Code",
  		date_of_birth:"Date de Naissance",
      department_name:"Nom du Département",
      edit_student:"Editer l’Etudiant",
      exporting:"Exporting", //wrong
      export_file:"Export to File",
      export_statistics:"Export Statistics",
      fees:"Les Ecolages",
  		fee_group:"Groupe d’Ecolage",
      fee_name:"Nom de l'Ecolage",
      female:"Féminin"
      file:"File",
  		full_name:"Nom Complet",
      importing:"Importing", //wrong
      import_file:"Import File",
      language:"Langue",
      logout:"Logout", //wrong
      male:"Masculin",
  		name:"Nom",
  		parent_email:"Email de Parents",
  		parent_name:"Nom de Parents",
  		parent_occupation:"Profession de Parents",
  		parent_phone:"Téléphone de Parents",
  		place_of_birth:"Place de Naissance", //wrong
      please_fill_in_all_fields:"Completer tous les sections en rouge et essayer encore.", //wrong
      print:"Imprimer", //??
      print_all_report_cards:"Imprimer Tous les Bulletins de Notes", //wrong
      print_current_report_card_only:"Imprimer Juste Un Bulletin de Notes", //wrong
      pta_fee:"PTA Fee", //wrong
      quit:"Quitter",
  		remove:"Enlever",
  		residence:"Résidence",
  		save_changes:"Enregistrer les Modifications",
  		scheduled_to_teach:" doit enseigner ",
      school_fee:"School Fee", //wrong
      school_statistics:"Statistiques de l'Ecole", //wrong
  		select_department:"Sélectionner le Départment",
  		select_group:"Sélectionner le Groupe",
  		select_subject:"Sélectionner la Matiére",
  		select_fee:"Sélectionner l’Ecolage",
  		select_form:"Sélectionner Form",  //wrong
      select_sex:"Sélectionner le Sexe", //??
      settings:"Settings", //wrong
  		sex: "Sexe",
  		student:"Étudiant",
  		student_id:"Student ID", //wrong
  		student_name:"Nom de l'Etudiant",
      student_not_added:"Student Not Added.", //wrong
      term:"Terme",
      total:"Total",
  	},
  }
  self.getDict = function(){
  	console.log("Language is", $routeParams.lang, langDict[$routeParams.lang]);
    if($routeParams.lang){
  	  return langDict[$routeParams.lang];
    } else {
      return langDict[defaultLang];
    }
  }

  return self;

}
Lang.$inject = ['$routeParams'];
angular.module('SchoolMan').service('Lang', Lang);