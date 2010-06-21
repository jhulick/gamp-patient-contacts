// ==========================================================================
// Project:   Patients.providerController
// ==========================================================================
/*globals Patients */

/** @class
* 
  The controller which IS NOT USED AT THE MOMENT!!!
  @extends SC.Object
*/
Patients.providerController = SC.Object.create(
/** @scope Patients.patientsController.prototype */ {
	contentBinding        : "Patients.providersController.selection",
	contentBindingDefault : SC.Binding.single()
}) ;
