'use strict';

function Lang($routeParams, SchoolInfos) {
var langs = ['en', 'fr'];
// var lang = $routeParams.lang;
var self = {};
// var defaultLang = "en";
// SchoolInfos.get().then(function(info){
  // var defaultLang = "en";


  self.getDict = function(lang){
    if(lang !== undefined){
      $routeParams.lang = lang;
      return langDict[lang];
    }else if($routeParams.lang){
  	  return langDict[$routeParams.lang];
    } else {
      // $routeParams.lang = defaultLang;
      return langDict["en"];
    }
  }
// })

var langDict = {
  en:{
    academic:"Academic",
    academic_year:"Academic Year",
    access_denied:"Access Denied",
    add:"Add",
    add_class:"Add Class",
    add_comment:"Add Comment",
    add_correction:"Add Correction",
    add_student:"Add Student",
    add_payment:"Add Payment",
    add_user:"Add User", 
    add_rubric:"Add Rubric",
    all:"All",
    all_forms:"All Forms",
    all_terms:"All Terms",
    all_departments:"All Departments",
    all_fees:"All Fees",
    all_groups:"All Groups",
    amount_per_student:"Amount Per Student",
    annual_average:"Annual Average",
    annual_results:"Annual Results",
    annual_report:"Annual Report",
    are_you_sure_you_want_to_delete_student:"Are you sure you want to delete this student and all records associated with it?",
    at: "at",
    attended_disciplinary_council:"Attended Disciplinary Council",
    average:"Average",
    AxC:"A*C",
    back:"Back",
    balance:"Account Balance",
    balance_sheet:"Balance Sheet",
    beginning_of_year:"Beginning of Year",
    below_average:"Below Average",
    best_performances:"Best Performances",
    born_on:"Born on",
    cancel:"Cancel",
    caps_lock_is_on:"Caps Lock is on",
    cfa:"CFA",
    change_password:"Change Password",
    Class:"Class",
    classmaster:"Class Master/Mistress",
    Classes:"Classes",
    classes_for:"Classes for",
    class_average:"Class Average",
    class_name:"Class Name",
    class_range:"Class Range",
    class_rank:"Class Rank",
    clear_all:"Clear All",
    code:"Code",
    coeff:"Coeff",
    comments:"Comments",
    conduct:"Conduct",
    contact:"Contact",
    current_password:"Current Password",
    date:"Date",
    date_of_birth:"Date of Birth",
    date_of_retirement:"Date of Retirement",
    date_posted: "Date posted",
    daughter_of:"Daughter of",
    department:"Department",
    departments:"Departments",
    department_name:"Department Name",
    dept:"Dept",
    delete_student:"Delete Student",
    description:"Description",
    disciplinary_record:"Disciplinary Record",
    dismissed:"Dismissed",
    divisional_del_amount:"Divisional Delegation Amount",
    divisional_del_percentage:"Divisional Delegation Percentage",
    division_of_origin:"Division of Origin",
    duplicate_codes_are_not_allowed:"Duplicate codes are not allowed",
    duplicate_names_are_not_allowed:"Duplicate names are not allowed",
    duty_post:"Duty Post",
    edit_student:"Edit Student",
    edit_user:"Edit User",
    edit_staff_member:"Edit Staff Member",
    end_of_year:"End of Year",
    english:"English",
    enrolled:"Enrolled",
    enrollment:"Enrollment",
    enrollment_statistics:"Enrollment Statistics",
    enter_name:"Enter name",
    entry_into_service:"Entry Into Service",
    excellent:"Excellent",
    exporting:"Exporting",
    export_file:"Export to File",
    export_statistics:"Export Statistics",
    expenditure:"Expenditure",
    fail:"Repeat",
    fair:"Fair",
    fee:"Fee",
    fees:"Fees",
    fee_due:"Fee Due",
    fee_amount:"Fee Amount",
    fee_group:"Fee Group",
    fee_name:"Fee Name",
    Female:"Female",
    female:"Female",
    file:"File",
    filter:"Filter",
    form:"Form",
    french:"French",
    from_the_menu_above_then_click:"from the menu above then click",
    front:"Front",
    full_name:"Full Name",
    good:"Good",
    grade:"Grade",
    group:"Group",
    head_of_department:"Head of Department",
    hereby_certify_that:"hereby certify that",
    high:"High",
    highest_qualification:"Highest Qualification",
    hours_of_absence:"Hours of Absence",
    importing:"Importing",
    import_file:"Import File",
    incorrect_password:"Incorrect Password",
    is_a_student_in_my_institution: "is a student in my institution",
    i: "I",
    income:"Income",
    incomexpenditure:"incomexpenditure",
    language:"Language",
    length_of_service:"Length of Service",
    loading:"Loading",
    logout:"Logout",
    longevity:"Longevity",
    low:"Low",
    Male:"Male",
    male:"Male",
    marital_status:"Marital Status",
    marksheet:"Marksheet",
    marksheets:"Marksheets",
    mastersheet:"Mastersheet",
    matrical_number:"Matrical Number",
    minimum_number_of_teaching_:"Minimum number of teaching hours per week per subject is 5 hours",
    ministry_amount: "Ministry Amount",
    ministry_percentage: "Ministry Percentage",
    MINISTRY_OF_SECONDARY_EDUCATION: "MINISTRY OF SECONDARY EDUCATION",
    months:"Months",
    move:"Move",
    name:"Name",
    name_and_signature:"Name and Signature",
    new_correction:"New Correction",
    new_password:"New Password",
    new_payment:"New Payment",
    no:"No.",
    not_added:"Not Added",
    NOTES:"NOTES",
    no_remark:"No Remark",
    no_alteration_mutilation_or_:"No alteration, mutilation or cancellation is allowed on this document",
    number:"Number",
    number_enrolled:"Number Enrolled",
    number_present:"Number Present",
    number_with:"Number with",
    num_students:"No. Students",
    occupation:"Occupation",
    paid:"Paid",
    parent_contact:"Parent Contact",
    parent_email:"Parent Email",
    parent_name:"Parent Name",
    parent_occupation:"Parent Occupation",
    parent_phone:"Parent Phone",
    pass:"Promoted",
    passing_score:"Passing Score",
    password:"Password",
    payment_cant_be_greater_than_remaining_due: "Payment can't be greater than remaining due",
    payments:"Payments",
    PeaceWorkFatherland:"Peace-Work-Fatherland",
    percent_failing:"Percentage Fail",
    percent_passing:"Percentage Pass",
    performance_by_subject:"Performance by Subject",
    place_of_birth:"Place of Birth",
    please_contact:"Please contact",
    please_fill_in_all_fields:"Please fill in all fields highlighted in red and try again",
    poor:"Poor",
    possible_factors:"Possible Factors",
    present:"Present",
    principal:"Principal",
    principals_signature:"Principal's Signature",
    print:"Print",
    print_all_report_cards:"Print All Report Cards",
    print_current_report_card_only:"Print Current Report Card Only",
    promote:"Promote",
    promotion:"Promotion",
    promotion_status:"Promotion Status",
    pta_fee:"PTA Fee",
    pta_fees:"PTA Fees",
    quit:"Quit",
    rank:"Rank",
    rankings:"Rankings",
    regional_del_amount:"Regional Delelegation Amount",
    regional_del_percentage:"Regional Delegation Percentage",
    registration: "Registration",
    remaining_due:"Remaining Due",
    remark:"Remark",
    remove:"Remove",
    renewals:"Renewals",
    repeat:"Repeat",
    REGIONAL_DELEGATION_FOR_THE: "REGIONAL DELEGATION FOR THE",
    REPUBLIC_OF_CAMEROON:"REPUBLIC OF CAMEROON",
    region_of_origin: "Region of Origin",
    residence:"Residence",
    rubric:"Rubric",
    rubric_description:"Rubric Description",
    rubric_total:"Rubric Total",
    salary:"Salary",
    saved:"Saved",
    save_changes:"Save Changes",
    scheduled_to_teach:"is scheduled to teach",
    school_amount:"School Amount",
    school_fee:"School Fee",
    school_fees:"School Fees",
    school_statistics:"School Statistics",
    school_summary:"School Summary",
    score:"Score",
    select_the:"Select the",
    select_department:"Select Department",
    select_group:"Select Group",
    select_sex:"Select Gender",
    select_subject:"Select Subject",
    select_fee:"Select Fee",
    select_form:"Select Form",
    select_remark:"Select Remark",
    settings:"Settings", //wrong
    sex:"Gender",
    signature:"Signature",
    son_of:"Son of",
    sponsor:"Sponsor",
    statistics:"Statistics",
    student:"Student",
    students_signature:"Student's Signature",
    student_id:"Student ID",
    student_name:"Student Name",
    student_not_added:"Student Not Added",
    student_not_saved:"Student Not Saved",
    student_performance:"Student Performance",
    student_profile:"Student Profile",
    staff_email:"Staff Email",
    staff_phone:"Staff Phone",
    submit:"Submit",
    subdivision_of_origin:"Subdivision of Origin",
    subject:"Subject",
    subjects:"Subjects",
    subject_discipline:"Subject Discipline",
    subject_name:"Subject Name",
    subtotal:"Subtotal",
    summary:"Summary",
    suspended:"Suspended",
    specialty:"Specialty",
    teacher:"Teacher",
    term:"Term",
    term_average:"Term Average",
    the_undersigned_principal_of:"the Undersigned Principal of",
    this_grading_system_is_compatible_:"This grading system is compatible with that used in the University of London GCE Examination and Cameroon GCE Examination Board",
    tribe: "Tribe",
    to:"to",
    total:"Total",
    total_coeff:"Total Coeff",
    total_fees:"Total Fees",
    total_mark:"Total Mark",
    total_paid:"Total Paid",
    type:"Type",
    type_it_again:"Type it Again",
    user:"User",
    username:"Username",
    users:"Users",
    user_already_exists:"User already exists",
    user_not_found:"User Not Found",
    user_profile:"User Profile",
    very_good:"Very Good",
    very_poor:"Very Poor",
    warned:"Warned",
    warning:"Warning",
    weakest_performances:"Weakest Performances",
    welcome_to_the:"Welcome to the",
    withdrawn:"Withdrawn",
    years:"Years",
    years_attended:"Years Attended",
    your_password:"Your Passoword",
    _page:"page",
  }, fr:{
    academic:"Scolaire",
    academic_year:"Année Scolaire",
    access_denied:"Accès Refusé",
    add:"Ajouter",
    add_class:"Ajouter la Classe", 
    add_comment:"Ajouter le Commentaire",
    add_correction:"Ajouter la Correction",
    add_student:"Ajouter l'Étudiant",
    add_payment:"Ajouter le Paiement",
    add_rubric:"Elément en plus",
    add_user:"Ajouter l'Utilisateur",
    all:"Tous", 
    all_forms:"Tous les Forms", //wrong
    all_terms:"Tous les Termes", 
    all_departments:"Tous les Départements", 
    all_fees:"Tous les Écolages",
    all_groups:"Tous les Groupes",
    amount_per_student:"Montant par étudiant",
    annual_average:"Moyenne Annuelle",
    annual_results:"Résultats Annuels",
    annual_report:"Rapport Annuel",
    are_you_sure_you_want_to_delete_student:"Êtes-vous sûr de vouloir supprimer cet étudiant et tous les dossiers qui lui sont associés?",
    at: "à",
    attended_disciplinary_council:"Traduit au Connseil de Discipline",
    average:"Moyenne",
    AxC:"M*C",
    back:"Derrière",
    balance:"Compte",
    balance_sheet:"Fiche de Contrôle",
    beginning_of_year:"Début de l'Année",
    below_average:"Faible",
    best_performances:"Meilleures Performances",
    born_on:"Né le",
    cancel:"Annuler",
    caps_lock_is_on:"Verr Maj est allumé",
    cfa:"CFA",
    change_password:"Changer le Mot de Passe",
    Class:"Classe",
    classmaster:"Professeur Titulaire",
    Classes:"Classes",
    classes_for:"Les Classes de",
    class_average:"Moyenne de Classe",
    class_name:"Nom de la Classe",
    class_range:"Gamme de Classe",
    class_rank:"Rang en Classe",
    clear_all:"Effacer Tous",
    code:"Code",
    coeff:"Coeff",
    comments:"Commentaires",
    conduct:"Comportement",
    contact:"Contact",
    correction_cant_be_greater_than_total_payments: "Correction can't be greater than total payments",
    current_password:"Mot de Passe Actuel",
    date:"Date",
    date_of_birth:"Date de Naissance",
    date_of_retirement:"Date de la Retraite",
    date_posted:"Date d'affectation",
    daughter_of:"Fille de",
    department:"Département",
    departments:"Départements",
    department_name:"Nom du Département",
    dept:"Dept", 
    disciplinary_record:"Rapport Disciplinaire",
    dismissed:"Esclu",
    divisional_del_amount:"Montant de délégation départementale",
    divisional_del_percentage:"Pourcentage de délégation départementale",
    division_of_origin:"Division d'Origine",
    duplicate_codes_are_not_allowed:"Codes en double ne sont pas autorisés",
    duplicate_names_are_not_allowed:"Noms en double ne sont pas autorisés",
    duty_post:"Poste",
    delete_student:"Effacer l’Étudiant",
    description:"déscription",
    edit_student:"Editer l’Étudiant",
    edit_user:"Editer l'Utilisateur",
    edit_staff_member:"Editer personel",
    end_of_year:"Fin de l'Année", 
    english:"Anglais",
    enrolled:"Inscrits",
    enrollment:"Inscription",
    enrollment_statistics:"Statistiques d'Inscription",
    enter_name:"Entrez nom",
    entry_into_service:"Date d'entrée en fonctions",
    excellent:"Excellent",
    exporting:"Exportation", 
    export_file:"Exporter Vers un Fichier", 
    export_statistics:"Exporter les Statistiques",
    expenditure:"Dépenses", 
    fail:"Redouble",
    fair:"Passable",
    fee:"Fee",
    fees:"Écolages",
    fee_due:"Écolage",
    fee_amount:"Montant de l’Écolage",
    fee_group:"Groupe d’Écolage",
    fee_name:"Nom de l'Écolage",
    Female:"Féminin",
    female:"Féminin",
    file:"Fichier",
    filter:"Filtre",
    form:"Form", 
    french:"Francais",
    from_the_menu_above_then_click:"dans le menu ci-dessus puis cliquez sur",
    front:"Face",
    full_name:"Nom Complet",
    good:"Bien",
    grade:"Grade",
    group:"Groupe",
    head_of_department:"Chef du Département",
    hereby_certify_that:"certifie par la présente que",
    high:"Elevé",
    highest_qualification:"Diplôme le Plus Élevé", 
    hours_of_absence:"Heures d’Absences",
    importing:"Importation", 
    import_file:"Importer Fichier",
    incorrect_password:"Mot de Passe Incorrect",
    is_a_student_in_my_institution: "est un étudiant de mon établissement",
    i: "Je",
    income:"Revenu",
    incomexpenditure:"Incomexpendituré",
    language:"Langue",
    length_of_service:"Durée du Service",
    loading:"Chargement", 
    logout:"Déconnecter",
    longevity:"Longevité",
    low:"Faible", 
    Male:"Masculin",
    male:"Masculin",
    marital_status:"Status Marital",
    marksheet:"Relevé de Notes",
    marksheets:"Relevés de Notes",
    mastersheet:"Carnet de Notes",
    matrical_number:"Numéro Matriciele",
    minimum_number_of_teaching_:"Nombre minimum d'heures d'enseignement par semaine et par objet est de 5 heures",
    ministry_amount: "Montant du ministère",
    ministry_percentage: "Pourcentage du ministère",
    MINISTRY_OF_SECONDARY_EDUCATION: "MINISTERE DES ENSEIGNEMENTS SECONDAIRES",
    months:"Mois",
    move:"Déplacer", 
    my_classes:"Mes Classes",
    name:"Nom",
    name_and_signature:"Nom et Signature",
    new_correction:"Nouvelle Correction",
    new_password:"Nouveau Mot de Passe",
    new_payment:"Nouvelle Paiement",
    no:"No.",
    NOTES:"LES NOTES",
    not_added:"Ne Ajouté",
    no_alteration_mutilation_or_:"Aucune modification, mutilation ou l'annulation est autorisée sur ce document",
    no_remark:"Aucune Remarque",
    number:"Nombre",
    number_enrolled:"Nombre d'Inscrits", 
    number_present: "Nombre Actuel",
    number_with:"Nombre ayant",
    num_students:"No. Étudiants",
    occupation:"Profession",
    paid:"Payé",
    parent_contact:"Contact de Parents",
    parent_email:"Email de Parents",
    parent_name:"Nom de Parents",
    parent_occupation:"Profession de Parents",
    parent_phone:"Téléphone de Parents",
    pass:"Admit",
    passing_score:"Note de Passage",
    password:"Mot de Passe",
    payments:"Paiements",
    payment_cant_be_greater_than_remaining_due: "Paiement ne peut pas être supérieure à restant dû",
    PeaceWorkFatherland:"Paix-Travail-Patrie",
    percent_failing:"Pourcentage Échec",
    percent_passing:"Pourcentage Réussir",
    performance_by_subject:"Performances par Sujet",
    place_of_birth:"Place de Naissance", 
    please_contact:"S'il vous plaît contacter",
    please_fill_in_all_fields:"Completer tous les sections en rouge et essayer encore", 
    poor:"Faible",
    possible_factors:"Les Raisons Possibles",
    present:"Actuel",
    principal:"Principal",
    principals_signature:"Signature du Principal",
    print:"Imprimer",
    print_all_report_cards:"Imprimer Tous les Bulletins de Notes", 
    print_current_report_card_only:"Imprimer Juste Un Bulletin de Notes", 
    promote:"Admit",
    promotion:"Promotion",
    promotion_status:"Statut de Promotion",
    pta_fee:"Écolage de PTA", 
    pta_fees:"Écolages de PTA", 
    quit:"Quitter",
    rank:"Rang",
    rankings:"Classement",
    registration: "Inscription",
    remaining_due:"Reste d'Avoirs",
    remark:"Remarque",
    remove:"Enlever",
    renewals:"Renouvellements",
    repeat:"Redouble",
    rubric:"Elément",
    rubric_description:"Description de l'elément",
    rubric_total:"Totale Elément",
    REGIONAL_DELEGATION_FOR_THE: "DELEGATION REGIONALE DU",
    regional_del_amount:"Montant de la délégation régionale",
    regional_del_percentage:"Pourcentage de la délégation régionale",
    REPUBLIC_OF_CAMEROON:"REPUBLIQUE DU CAMEROON",
    region_of_origin:"Region de Origin",
    residence:"Résidence",
    salary:"salaire",
    saved:"Enregistré",
    save_changes:"Enregistrer les Modifications",
    scheduled_to_teach:" doit enseigner ",
    school_fee:"Écolage d'École", 
    school_amount:"Montant de l'École",
    school_fees:"Écolages d'École",
    school_statistics:"Statistiques de l'École", 
    school_summary:"Resume de l'École",
    score:"Note",
    select_the:"Selectionner le",
    select_department:"Sélectionner le Départment",
    select_group:"Sélectionner le Groupe",
    select_subject:"Sélectionner la Matiére",
    select_fee:"Sélectionner l’Écolage",
    select_form:"Sélectionner Form",  //wrong
    select_sex:"Sélectionner Sexe", 
    settings:"Réglages", 
    sex: "Sexe",
    specialty:"specialité",
    signature:"Signature",
    son_of:"Fils de",
    sponsor:"Sponsor",
    statistics:"Statistiques",
    student:"Étudiant",
    students_signature:"Signature de l'Étudiant",
    student_id:"Numéro de l'Étudiant",
    student_name:"Nom de l'Étudiant",
    student_not_added:"Étudiant Pas Ajouté",
    student_not_saved:"Étudiant Pas Enregistré",
    student_profile:"Profil de l'Étudiant",
    submit:"Soumettre",
    subdivision_of_origin:"Arrondissement d'Origine",
    subject:"Sujet",
    staff_email:"Email du personel",
    staff_phone:"Numéro portabe de personel",
    subjects:"Les Sujets",
    subject_discipline:"Sujet Discipline",
    subject_name:"Nom du Sujet",
    subtotal:"Sous-Total",
    summary:"Résumé",
    suspended:"Exclu pour Quelques Jours",
    teacher:"Enseignant",
    term:"Terme",
    term_average:"Moyenne de Terme",
    the_undersigned_principal_of:"le Soussigné Principal de",
    this_grading_system_is_compatible_:"Ce système de classification est compatible avec celle utilisée à l'Université de Londres GCE examen et jury d'examen GCE Cameroun",
    tribe:"Ethie",
    to:"à",
    total:"Total",
    total_coeff:"Total des Coeffs",
    total_fees:"Écolages Totals",
    total_mark:"Total des Notes",
    total_paid:"Total Payé",
    to_activate_this_feature:"pour activer cette fonction",
    type:"Type",
    type_it_again:"Taper à Nouveau",
    user:"Utilisateur",
    username:"Nom d'Utilisateur",
    users:"Utilisateurs",
    user_already_exists:"Utilisateurs existe déjà",
    user_not_found:"Utilisateur Introuvable",
    user_profile:"Profil de l'Utilisateur",
    very_good:"Très bien",
    very_poor:"Très faible",
    warned:"Averti",
    warning:"Avertissement",
    weakest_performances:"Dernier Performances",
    welcome_to_the:"Bienvenue à la page",
    withdrawn:"Retiré",
    years:"Années",
    years_attended:"Ans Ont Participé",
    your_password:"Votre Mot de Passe",
    _page:"",
  },

}

return self;

}
Lang.$inject = ['$routeParams', 'SchoolInfos'];
angular.module('SchoolMan').service('Lang', Lang);
