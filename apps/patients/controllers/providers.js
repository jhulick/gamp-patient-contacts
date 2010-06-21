// ==========================================================================
// Project:   Patients.providersController
// ==========================================================================
/*globals Patients */

/** @class

  The controller for a list of providers.

  @extends SC.ArrayController
*/
Patients.providersController = SC.ArrayController.create(SC.CollectionViewDelegate,
/** @scope Patients.providersController.prototype */ {
	allowMultipleSelection : YES,
	all                    : null,
	selection              : null,
	_observingProviders       : [],
	allDidChange           : function(){
	  if (!this.get("selection")) {
	    this.set("effectiveSelection", this.get("all"));
	    this.set("allIsSelected", YES);
      } else {
        this.recalculateFromProviders();
      }
	}.observes("all", "[]"),
	
	selectAllProvider : function(){
	  this.set("selection", null);
	  this.set("effectiveSelection", this.get("all"));
	  this.set("allIsSelected", YES);
	},
	
	selectionDidChange : function() {
	  this.recalculateFromProviders();
	}.observes("selection"),
	
	recalculateFromProviders : function() {
	  if (this.get("selection") && this.get("selection").get("length") > 0) {
	    var result = SC.Set.create();
	    this.get("selection").forEach(function(provider){
	      result.addEach(provider.get("patients"));
	    });
	    
	    this.set("effectiveSelection", result.toArray());
	    this.set("allIsSelected", NO);
      }
	},

	computeDragOperations: function(provider, drag){
		var data = drag.dataForType(Patients.Patient);
		if (data) {
			return SC.DRAG_COPY;
		}
	},
	
	performDragOperations: function(provider, drag){
		var data = drag.dataForType(Patients.Patient);
		provider.get("patients").pushObjects(data);
		Patients.store.commitRecords();
	},
	
	collectionViewDeleteContent: function(view, content, indexes) {
	  this._pendingOperation = { action: "deleteProviders", indexes: indexes  };
	  SC.AlertPane.warn(
	    "Be Careful!", 
	    "Are you sure you want to delete these " + indexes.get("length") + " providers?",
	    null,
	    "Keep Providers",
	    "Delete Providers",
	    null,
	    this
	  );
	},
	
	deleteProviders: function(op)
	{
	  var indexes = op.indexes;
	  var records = indexes.map(function(idx) {
	    return this.objectAt(idx);
	  }, this);
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
	
	addProvider: function() {
	  var provider;
	  provider = Patients.store.createRecord(Patients.Provider, { "name": "New Provider" });
	  this.selectObject(provider);
	  this.invokeLater(function(){
	    var contentIndex = this.indexOf(provider);
	    var list = Patients.mainPage.getPath("mainPane.splitter.topLeftView.providerList.contentView");
	    var listItem = list.itemViewForContentIndex(contentIndex);
	    listItem.beginEditing();
	  });
	},
	
	removePatients: function(patients) {
	  var sel = this.get("selection");
	  if (!sel) return;
	  
	  sel.forEach(function(item) {
	    item.get("patients").removeObjects(patients);
	  });
	  Patients.store.commitRecords();
	},
	
	addNewPatient: function(patient) {
	  var sel = this.get("selection");
	  if (!sel) return;
	  var pg = [];
	  sel.forEach(function(item) {
	    pg.push(item);
	  });
	  patient.set("pendingProviders", pg);
	}
}) ;
