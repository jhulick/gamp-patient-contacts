// ==========================================================================
// Project:   Patients.Patient
// ==========================================================================
/*globals Patients */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Patients.Patient = SC.Record.extend(
/** @scope Patients.Patient.prototype */ {
	firstName : SC.Record.attr(String),
	lastName  : SC.Record.attr(String),
	
	// full name
	fullName: function()
	{
		var val = (this.get("firstName") || "") + " " + (this.get("lastName") || "");
		if (val.trim() === "") val = this.get("company") || "";
		return val;
	}.property('firstName', 'lastName', 'company').cacheable(),
	
	isCompany: function(){
	  var val = (this.get("firstName") || "") + " " + (this.get("lastName") || "");
		if (val.trim() === "") return YES;
		return NO;
	}.property('firstName', 'lastName', 'company').cacheable(),
	
	// it is a company? Yes no.
	company : SC.Record.attr(String),
	
	address : SC.Record.attr(String),
	city    : SC.Record.attr(String),
	state   : SC.Record.attr(String),
	zip     : SC.Record.attr(String),
	
	phone   : SC.Record.attr(String),
	email   : SC.Record.attr(String),
	
	providers: SC.Record.toMany("Patients.Provider", {
		inverse: "patients"
	}),
	
	searchRelevance : 0, // a property that others may use
	searchFullName  : "", // has things like <strong>The</strong> Search Term.
	
	/* Sync stuff */
	destroy: function() {
	  this.get("providers").forEach(function(provider){
	    provider.get("patients").removeObject(this);
	    provider.commitRecord();
	  }, this);
	  sc_super();
	},
	
	pendingProviders : [],
	storeDidChangeProperties: function() {
	  sc_super();
	  if (this.get("guid")) {
	    if (this.get("pendingProviders") && this.get("pendingProviders").get("length") > 0) {
	      this.get("pendingProviders").forEach(function(item){
	        item.get("patients").pushObject(this);
	      }, this);
	      this.set("pendingProviders", []);
	      Patients.store.commitRecords();
	    }
	  }
	}
}) ;
