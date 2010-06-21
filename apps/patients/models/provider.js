// ==========================================================================
// Project:   Patients.Provider
// ==========================================================================
/*globals Patients */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Patients.Provider = SC.Record.extend(
/** @scope Patients.Provider.prototype */ {
	patients: SC.Record.toMany("Patients.Patient", {
	  inverse : "providers"
	}),
	
	name: SC.Record.attr(String)
}) ;
