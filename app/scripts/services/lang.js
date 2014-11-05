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
      add_user:"Add_user", 
      all:"All",
      all_forms:"All Forms",
      all_terms:"All Terms",
      all_departments:"All Departments",
      all_fees:"All Fees",
      all_groups:"All Groups",
  		cancel:"Cancel",
  		Class:"Class",
      class_name:"Class Name",
      clear_all:"Clear All", //wrong
  		code:"Code",
      coeff:"Coeff",
  		date_of_birth:"Date of Birth",
  		department_name:"Department Name",
      dept:"Dept",
  		edit_student:"Edit Student",
      english:"English",
      exporting:"Exporting",
      export_file:"Export to File",
      export_statistics:"Export Statistics",
      fee:"Fee",
      fees:"Fees",
      fee_due:"Fee Due",
  		fee_group:"Fee Group",
      fee_name:"Fee Name",
      female:"Female",
      file:"File",
      filter:"Filter",
      form:"Form",
      french:"French",
  		full_name:"Full Name",
      group:"Group",
      importing:"Importing",
      import_file:"Import File",
      language:"Language",
      logout:"Logout",
      male:"Male",
      marksheet:"Classmaster Marksheet",
      mastersheet:"Mastersheet",
      move:"Move",
  		name:"Name",
      number:"Number",
      number_enrolled:"Number Enrolled",
      number_present:"Number Present",
  		parent_email:"Parent Email",
  		parent_name:"Parent Name",
  		parent_occupation:"Parent Occupation",
  		parent_phone:"Parent Phone",
      percent_failing:"Percent Failing",
      percent_passing:"Percent Passing",
  		place_of_birth:"Place of Birth",
      please_fill_in_all_fields:"Please fill in all fields highlighted in red and try again.",
      print:"Print",
      print_all_report_cards:"Print All Report Cards",
      print_current_report_card_only:"Print Current Report Card Only",
      promotion:"Promotion",
      promotion_status:"Promotion Status",
      pta_fee:"PTA Fee",
      quit:"Quit",
  		remove:"Remove",
  		residence:"Residence",
      rankings:"Rankings",
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
      subject:"Subject",
      subjects:"Subjects",
      subject_name:"Subject Name",
      term:"Term",
      total:"Total",
      type:"Type",
      users:"Users",
  	}, fr:{
  		
  		add:"Ajouter",
  		add_class:"Ajouter la Classe", //wrong??
      add_student:"Ajouter l'Etudiant",
      add_user:"Ajouter l'Utilisateur",
      all:"Tous", //wrong
      all_forms:"Tous les Forms", //wrong
      all_terms:"Tous les Termes", //??
      all_departments:"Tous les Départements", //??
      all_fees:"Tous les Ecolages", //??
      all_groups:"Tous les Groupes",
  		cancel:"Annuler",
  		Class:"Classe",
      class_name:"Nom de la Classe",
      clear_all:"Effacer Tous",
  		code:"Code",
      coeff:"Coeff",
  		date_of_birth:"Date de Naissance",
      department_name:"Nom du Département",
      dept:"Dept", //??
      edit_student:"Editer l’Etudiant",
      english:"Anglais",
      exporting:"Exporting", //wrong
      export_file:"Export to File",
      export_statistics:"Export Statistics",
      fee:"Fee",
      fees:"Les Ecolages",
      fee_due:"Écolage",
  		fee_group:"Groupe d’Ecolage",
      fee_name:"Nom de l'Ecolage",
      female:"Féminin",
      file:"File",
      filter:"Filtre",
      form:"Form", //wrong
      french:"Francais",
  		full_name:"Nom Complet",
      group:"Groupe",
      importing:"Importing", //wrong
      import_file:"Import File",
      language:"Langue",
      logout:"Logout", //wrong
      male:"Masculin",
      marksheet:"Relevé de notes",
      mastersheet:"Carnet de note",
      move:"Move", //wrong
  		name:"Nom",
      number:"Nombre",
      number_enrolled:"Nombre de Enrollment", //wrong
      number_present: "Nombre de Present",
  		parent_email:"Email de Parents",
  		parent_name:"Nom de Parents",
  		parent_occupation:"Profession de Parents",
  		parent_phone:"Téléphone de Parents",
      percent_failing:"Porcentage Fail", //wrong
      percent_passing:"Porcentage Pass", //wrong
  		place_of_birth:"Place de Naissance", //wrong
      please_fill_in_all_fields:"Completer tous les sections en rouge et essayer encore.", //wrong
      print:"Imprimer", //??
      print_all_report_cards:"Imprimer Tous les Bulletins de Notes", //wrong
      print_current_report_card_only:"Imprimer Juste Un Bulletin de Notes", //wrong
      promotion:"Promotion",
      promotion_status:"Admit",
      pta_fee:"PTA Fee", //wrong
      quit:"Quitter",
  		remove:"Enlever",
  		residence:"Résidence",
      rankings:"Classement",
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
      student_profile:"Student Profile",
      subject:"Sujet",
      subjects:"Les Sujets",
      subject_name:"Nom de le Sujet", //??
      term:"Terme",
      total:"Total",
      type:"Type",
      users:"Utilisateurs",
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