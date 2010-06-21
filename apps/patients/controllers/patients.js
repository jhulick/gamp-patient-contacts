// ==========================================================================
// Project:   Patients.patientsController
// ==========================================================================
/*globals Patients */

/** @class

  The controller for a list of patients.

  @extends SC.Object
*/
Patients.patientsController = SC.ArrayController.create(SC.CollectionViewDelegate,
/** @scope Patients.patientsController.prototype */ {
	contentBinding     : "Patients.patientsSortController.sortedContent",
	isSearchingBinding : "Patients.patientSearchController.isSearching",
	canAddContent      : YES,
	canReorderContent  : NO,
	canRemoveContent   : YES,
	isEditable         : YES,
	
	// deleting patients is handled by patientsController.
	// removing patients from providers is handled by the providerConttroller.
	inAll        : YES, // can be NO or YES. If YES, the parent controller is called to remove items.
	inAllBinding : "Patients.providersController.allIsSelected",
	
	resultDidChange : function() {
	  if (this.get("isSearching")) {
	    // select the first, or none at all
	    if (this.get("length") > 0) this.selectObject(this.objectAt(0));
	    else this.deselectObjects(this.get("selection"));
	  }
	}.observes("[]"),
	
	collectionViewDragDataTypes: function(view) {
		return [Patients.Patient];
	},
	
	collectionViewDragDataForType: function(view, drag, dataType) {
		var ret = null, sel;
		if (dataType == Patients.Patient) {
			sel = view.get("selection");
			ret = [];
			if (sel) sel.forEach(function(x){ ret.push(x); }, this);
		}
		return ret;
	},
	
	collectionViewComputeDragOperations: function(view, drag) {
		return SC.DRAG_COPY;
	},
	
	collectionViewDeleteContent: function(view, content, indexes) {
	  // get records first for safety :)
	  var records = indexes.map(function(idx) {
	    return this.objectAt(idx);
	  }, this);
	  
	  // we only handle deletion if in "All" category.
	  if (!this.get("inAll")) {
	    Patients.providersController.removePatients(records);
	    return;
	  }
	  
	  this._pendingOperation = { action: "deletePatients", records: records, indexes: indexes  };
	  
	  // calculate text
	  var text = "";
	  var name = "Patient";
	  var len = indexes.get("length");
	  if (len > 1) { 
	    name += "s";
	    text = "Are you sure you want to delete these " + len + " patients?";
    } else {
      text = "Are you sure you want to delete this patient?";
    }
    
    // show warning
	SC.AlertPane.warn(
	    "Be Careful!", 
	    text,
	    null,
	    "Keep " + name,
	    "Delete " + name,
	    null,
	    this
	  );
	},
	
	deletePatients: function(op)
	{
	  var records = op.records, indexes = op.indexes;
	  records.invoke('destroy');
	  
	  var selIndex = indexes.get('min') - 1;
	  if (selIndex < 0) selIndex = 0;
	  this.selectObject(this.objectAt(selIndex)); 
	  
		Patients.store.commitRecords();
	},
	
	alertPaneDidDismiss: function(pane, status) {
	  if (!this._pendingOperation) return;
	  switch (status) {
	    case SC.BUTTON2_STATUS:
	      this[this._pendingOperation.action].call(this, this._pendingOperation);
	      this._pendingOperation = null;
	      break;
	    case SC.BUTTON1_STATUS:
	      break;
	  }
	},
	
	addPatient: function() {
	  var patient;
	  patient = Patients.store.createRecord(Patients.Patient, { firstName: "", lastName: "" }); // no name.
	  
	  // add patient to current provider if needed
	  if (!this.get("inAll")) Patients.providersController.addNewPatient(patient);
	  
	  this.selectObject(patient);
	  this.invokeLater(function(){
	    Patients.patientController.beginEditing();
	  });
	  
	  patient.commitRecord();
	}
}) ;
