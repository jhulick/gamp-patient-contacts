// ==========================================================================
// Project:   Patients - mainPage
// ==========================================================================
/*globals Patients Animate */
require("views/patient");

// This page describes the main user interface for your application.  
Patients.mainPage = SC.Page.design({

	// The main pane is made visible on screen as soon as your app is loaded.
	// Add childViews to this pane for views to display immediately on page 
	// load.
	mainPane: SC.MainPane.design({
		layout: { left: 3, right: 3, top: 3, bottom: 3 },
		classNames: ["main-panel"],
		childViews: 'toolbar splitter'.w(),
		
		toolbar: SC.ToolbarView.design({
			classNames: ["hback", "toolbar"],
			layout: { left: 0, top: 0, right: 0, height: 32 },
			childViews: 'labelView patientsSearchField'.w(),
			anchorLocation: SC.ANCHOR_TOP,
			
			labelView: SC.LabelView.design({
			    layout: { centerY: 0, height: 24, left: 8, width: 200 },
		        controlSize: SC.LARGE_CONTROL_SIZE,
		        //fontWeight: SC.BOLD_WEIGHT,
				classNames: ["patients-logo"],
		        value: 'My Patients'
		    }),
		
			patientsSearchField: SC.TextFieldView.design(SCUI.ToolTip, {
		        layout: { centerY: -4, height: 24, top: 3, right: 5, width: 200 },
		        classNames: ['search-bar'],
				valueBinding: "Patients.patientSearchController.search"
				// leftAccessoryView: SC.View.create({
				// 					layout: {left:5, width:20, height:16, centerY: 0 },
				// 					childViews: 'icon'.w(),
				// 					icon: SC.ImageView.create({
				// 						layout: {left:0, top: 0, width:16, height: 16 },
				// 						value: "icons search-16 icon"
				// 					})
				// 				})
		    })
		
		    // patientsSearchCancelButton: SC.View.design({ // Tasks Search cancel button
		    // 		        layout: { centerY: -3, height: 12, right: 10, width: 12 },
		    // 		        isVisible: NO,
		    // 		        classNames: ['filter-cancel-icon'],
		    // 		        mouseDown: function() {
		    // 		          Tasks.assignmentsController.set('searchFilter', '');
		    // 		        },
		    // 		        isVisibleBinding: SC.Binding.oneWay('Tasks.assignmentsController.searchFilter').bool()
		    // 		    })
		    // 
		    // 			search: SC.TextFieldView.design({
		    // 				layout: { right: 800, width: 300, height: 20, centerY: 0 },
		    // 				classNames: ["searchBox"],
		    // 				hint: "Search...",
		    // 				valueBinding: "Patients.patientSearchController.search",
		    // 				leftAccessoryView: SC.View.create({
		    // 					layout: {left:5, width:20, height:16, centerY: 0 },
		    // 					childViews: 'icon'.w(),
		    // 					icon: SC.ImageView.create({
		    // 						layout: {left:0, top: 0, width:16, height: 16 },
		    // 						value: "icons search-16 icon"
		    // 					})
		    // 				})
		    // 			})
			
		}),
		
		// splitter between patient chooser and patient view.
		splitter: SC.SplitView.design({
			layout: { left: 0, top: 32, right: 0, bottom: 0 },
			defaultThickness: 200,
			dividerThickness: 1,
			
			// companies
			topLeftView: SC.View.design({
				childViews: "allProvider providerList toolbar".w(),
				classNames: "providers".w(),

				allProvider: SC.View.design({
				    childViews: "label separator".w(),
				    layout: { left: 0, right: 0, top: 0, height: 32 },

				    selectedBinding: "Patients.providersController.allIsSelected",
				    displayProperties: ["selected"],
				    render: function(context) {
				    	sc_super();
				    	if(this.get("selected")) context.addClass("hback list-big-selection selected");
				  	},

				  	click: function() {
				    	Patients.providersController.selectAllProvider();
				    	return YES;
				  	},

				  	label: SC.LabelView.design({
				    	layout: { height: 18, centerY: 0, left: 10, right: 10 },
				    	value: "All Patients",
				        fontWeight: SC.FONT_BOLD
				  	}),
				
				  	separator: SC.SeparatorView.design({
				    	layoutDirection: SC.LAYOUT_HORIZONTAL,
				    	layout: { bottom:0, left:0, right:0, height: 1}
				  	})
				}),

				providerList: SC.ScrollView.design({
					layout: { left:0, right:0, top: 32, bottom:32},
					borderStyle: SC.BORDER_NONE,
					hasHorizontalScroller: NO,
					
					contentView: SC.ListView.design({
						contentBinding: "Patients.providersController.arrangedObjects",
						selectionBinding: "Patients.providersController.selection",
						delegate: Patients.providerDropController,
						contentValueKey: "name",
						canEditContent: YES,
						canDeleteContent: YES,
						rowHeight: 24,
						
						exampleView: SC.View.design({
							childViews: "label".w(),
							
							label: SC.LabelView.design({
								layout: {left:10, right:10, height:18,centerY:0},
								contentBinding: ".parentView.content",
								contentValueKey: "name",
								isEditable: YES,
								fontWeight: SC.FONT_WEIGHT_BOLD,
								inlineEditorDidEndEditing: function(){
									sc_super();
									Patients.store.commitRecords();
								}
							}),

							beginEditing: function() { this.label.beginEditing(); },

							isDropTarget: YES,
							computeDragOperations: function(drag, evt) {
								return Patients.providersController.computeDragOperations(this.get("content"), drag);
							},

							performDragOperation: function(drag, evt) {
								return Patients.providersController.performDragOperations(this.get("content"), drag);
							},

							dragEntered: function() { this.$().addClass("drag-potential"); },

							dragExited: function(drag, evt) { this.$().removeClass("drag-potential"); },

							acceptDragOperation: function() { return YES; },

							isSelected: NO,
							isSelectedDidChange: function() {
								this.displayDidChange();
							}.observes("isSelected"),
							render: function(context) {
								sc_super();
								if (this.contentIndex % 2 === 0) context.addClass("even");
								else context.addClass("odd");
								if (this.get("isSelected")) context.addClass("hback").addClass("list-big-selection").addClass("selected");
							}
						})
					})
				}), // scroll view
				
				toolbar: SC.ToolbarView.design({
					classNames: "hback toolbar".w(),
					layout: { left: 0, bottom: 0, right: 0, height: 32 },
					childViews: "addProvider deleteProvider".w(),
					
					addProvider: SC.ButtonView.design({
						layout: { left: 0, top: 0, bottom: 0, width:32 },
						target: "Patients.providersController",
						action: "addProvider",
						icon: 'add-icon',
						titleMinWidth: 16
					}),
					
					deleteProvider: SC.ButtonView.design({
				        layout: { centerY: 0, left: 40, height: 30, width: 26 },
				        titleMinWidth: 0,
				        icon: 'delete-icon',
				        target: "Patients.providersController",
				        action: 'deleteProv',
						titleMinWidth: 16
				    })
				})
			}),
			
			// another splitter between companies and patients
			bottomRightView: SC.SplitView.design({
				defaultThickness: 200,
				dividerThickness: 1,
				
				topLeftView: SC.View.design({
					childViews: "toolbar patients".w(),
					
					toolbar: SC.ToolbarView.design({
						classNames: "hback toolbar".w(),
						layout: { left: 0, bottom: 0, right: 0, height: 32 },
						childViews: "addPatient deletePatient".w(),

						addPatient: SC.ButtonView.design({
							layout: { left: 0, top: 0, bottom: 0, width:32 },
							target: "Patients.patientsController",
							action: "addPatient",
							icon: 'add-icon',
							titleMinWidth: 16
						}),
						
						deletePatient: SC.ButtonView.design({
					        layout: { centerY: 0, left: 40, height: 30, width: 26 },
					        titleMinWidth: 0,
					        icon: 'delete-icon',
					        target: "Patients.patientsController",
					        action: 'deletePat',
							titleMinWidth: 16
					    })
					}),
					
					patients : SC.ScrollView.design({
						classNames: ["patients-list"],
						layout: { left:0, right:0, top:0, bottom:32},
						borderStyle: SC.BORDER_NONE,
						
						contentView: SC.ListView.design({
							contentBinding: "Patients.patientsController.arrangedObjects",
							selectionBinding: "Patients.patientsController.selection",
							contentValueKey: "searchFullName",

							delegate: Patients.patientController,
							canReorderContent: YES,
							isDropTarget: YES,
							canDeleteContent: YES,
							rowHeight: 22,
							
  							exampleView: SC.View.design({
  								childViews: "image label".w(),
  								isCompanyBinding: "*content.isCompany",
  								classNames: ["patient-item"],
  							
  								image: SC.ImageView.design({
  							  		layout: {left:5, width:16, height: 16, centerY:0},
  							  		value: ""
  								}),
  							
  								label: SC.LabelView.design({
  							  		escapeHTML: NO,
  									layout: {left:28, right:10, height:18,centerY:0},
  									contentBinding: ".parentView.content",
  									contentValueKey: "searchFullName",
  									inlineEditorDidEndEditing: function(){ 
  										sc_super();
  										Patients.store.commitRecords();
  									}
  								}),
  							
  								isSelected: NO,
  								isSelectedDidChange: function()
  								{
  									this.displayDidChange();
  								}.observes("isSelected"),
  								isCompanyDidChange: function() {
  									// is company (for the icon)
  									if (this.get("isCompany")) {
  								  		this.image.set("value", "icons company");
								  	} else {
								    	this.image.set("value", "icons person");
								  	}
  								}.observes("isCompany"),
  							
  							
  								render: function(context) {
  									sc_super();
  								
  									// even/odd
  									if (this.contentIndex % 2 === 0) context.addClass("even");
  									else context.addClass("odd");
  								
  									// is selected
  									if (this.get("isSelected")) context.addClass("list-selection").addClass("hback").addClass("selected");
  								}
  							})
						})
					})
				}),
				
			// patient view
			bottomRightView: SC.View.design({
				backgroundColor: "white",
				childViews: 'noPatientView patientView toolbar'.w(),
				
				patientView: SC.ScrollView.design(SC.Animatable, {
					style: {
					    opacity : 0,
					    display : "none"
					},
					transitions: { 
					    opacity : 0.15,
					    display : 0.5
					},
					  
					classNames  : ["patient-panel"],
					layout      : { left: 5, right: 5, bottom: 37, top: 5 },
					borderStyle : SC.BORDER_NONE,
					contentView : Patients.PatientView.design({
						contentBinding: "Patients.patientController"
					}),
					  
					shouldDisplayBinding   : "Patients.patientController.shouldDisplay",
					shouldDisplayDidChange : function(){
					    if (this.get("shouldDisplay")) this.adjust({"opacity": 1.0, display: "block"});
					    else this.adjust({"opacity": 0, display: "none"});
					}.observes("shouldDisplay")
				}),
					
				noPatientView: SC.LabelView.design({
					layout : { centerX: 0, centerY: 0, height: 18, width: 200 },
				    value  : "No Patient Selected"
				}),
					
				toolbar: SC.ToolbarView.design({
					layout     : { left:0, right:0, bottom:0, height:32 },
					classNames : "hback toolbar".w(),
					childViews : "edit save".w(),
					
					edit: SC.ButtonView.design(SC.Animatable, {
						transitions: {
							opacity: 0.25
						},
						title  : "Edit",
						layout : { left: 0, top: 0, bottom: 0, width: 90 },
						target : Patients.patientController,
						action : "beginEditing",
						style  : { opacity: 1 }
					}),
					
					save: SC.ButtonView.design(SC.Animatable, {
						transitions : { opacity: 0.25 },
						title       : "Save",
						layout      : { left: 0, top:0, bottom: 0, width: 90 },
						target      : Patients.patientController,
						action      : "endEditing",
						style : {
							opacity: 0, display: "none"
						}
					}),
						
					controllerIsEditing        : NO,
					controllerIsEditingBinding : "Patients.patientController.isEditing",
					
					controllerIsEditingDidChange: function() {
						var save = this.get("save");
						var edit = this.get("edit");
							
						if (save.isClass) return;
							
						if (this.get("controllerIsEditing")) {
							save.adjust({
								opacity: 1, display: "block"
							}).updateLayout();
							
							edit.adjust({
								opacity: 1, display: "none"
							}).updateLayout();
						} else {
							edit.adjust({
								opacity: 1, display: "block"
							}).updateLayout();
							
							save.adjust({
								opacity: 1, display: "none"
							}).updateLayout();
						}
					}.observes("controllerIsEditing")
					
				})
	
			})
		})
			
	})
})

});
