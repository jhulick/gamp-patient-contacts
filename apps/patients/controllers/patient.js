// ==========================================================================
// Project:   Patients.patientController
// ==========================================================================
/*globals Patients */

/** @classpatients

  The controller for a single patient.

  @extends SC.Object
*/
Patients.patientController = SC.ObjectController.create(
/** @scope Patients.patientController.prototype */ {
	contentBinding: "Patients.patientsController.selection",
	contentBindingDefault: SC.Binding.single(),
	
	isEditing: NO,
	
	contentDidChange: function() {
	  if (this.get("content")) this.set("shouldDisplay", YES);
	  else this.set("shouldDisplay", NO);
	}.observes("content"),
	
	beginEditing: function()
	{
		this.set("isEditing", YES);
		Patients.mainPage.getPath("mainPane.splitter.bottomRightView.bottomRightView.patientView.contentView.form").beginEditing();
	},
	
	endEditing: function()
	{
		this.set("isEditing", NO);
		Patients.mainPage.getPath("mainPane.splitter.bottomRightView.bottomRightView.patientView.contentView.form").commitEditing();
		Patients.store.commitRecords();
	}
}) ;
