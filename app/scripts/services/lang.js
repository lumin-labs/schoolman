'use strict';

function Lang($routeParams) {
  var langs = ['en', 'fr'];
  // var lang = $routeParams.lang;

  var langDict = {
  	en:{
  		
  		add:"Add",
  		add_class:"Add Class",
  		cancel:"Cancel",
  		class:"Class",
  		code:"Code",
  		date_of_birth:"Date of Birth",
  		department_name:"Department Name",
  		edit_student:"Edit Student",
  		fee_group:"Fee Group",
  		full_name:"Full Name",
  		name:"Name",
  		parent_email:"Parent Email",
  		parent_name:"Parent Name",
  		parent_occupation:"Parent Occupation",
  		parent_phone:"Parent Phone",
  		place_of_birth:"Place of Birth",
  		remove:"Remove",
  		residence:"Residence",
  		save_changes:"Save Changes",
  		scheduled_to_teach:"is scheduled to teach",
  		select_department:"Select Department",
  		select_group:"Select Group",
  		select_subject:"Select Subject",
  		select_fee:"Select Fee",
  		select_form:"Select Form",
  		sex:"Gender",
  		student:"Etudiant",
  		student_id:"Student ID",
  		student_name:"Student Name",
  	}, fr:{
  		
  		add:"Ajouter",
  		add_class:"Ajouter la Classe", //wrong??
  		cancel:"Annuler",
  		class:"Classe",
  		code:"Code",
  		date_of_birth:"Date de Naissance",
  		fee_group:"Groupe d’Ecolage",
  		full_name:"Nom Complet",
  		department_name:"Nom du Départment",
  		edit_student:"Editer l’Etudiant",
  		name:"Nom",
  		parent_email:"Email de Parents",
  		parent_name:"Nom de Parents",
  		parent_occupation:"Profession de Parents",
  		parent_phone:"Téléphone de Parents",
  		place_of_birth:"Place de Naissance", //wrong
  		remove:"Enlever",
  		residence:"Résidence",
  		save_changes:"Enregistrer les Modifications",
  		scheduled_to_teach:" doit enseigner ",
  		select_department:"Sélectionner le Départment",
  		select_group:"Sélectionner le Groupe",
  		select_subject:"Sélectionner la Matiére",
  		select_fee:"Sélectionner l’Ecolage",
  		select_form:"Sélectionner Form",  //wrong
  		sex: "Sexe",
  		student:"Étudiant",
  		student_id:"Student ID", //wrong
  		student_name:"Nom de l'Etudiant",
  	},
  }
  self.getDict = function(){
  	console.log("Language is", $routeParams.lang, langDict[$routeParams.lang]);
  	return langDict[$routeParams.lang];
  }

  return self;

}
Lang.$inject = ['$routeParams'];
angular.module('SchoolMan').service('Lang', Lang);