// ==========================================================================
// Project:   Patients.PatientView
// ==========================================================================
/*globals Patients Forms */

/** @class

(Document Your View Here)

@extends SC.View
*/

SC.Animatable.defaultTimingFunction = SC.Animatable.TRANSITION_EASE_IN_OUT;

Patients.PatientView = SC.View.extend(
/** @scope Patients.PatientView.prototype */ {
	layout: {left:0, right:0},
	classNames: ["patient-view"],
	childViews: ["form"],
	backgroundColor: "white",
	contentBindingDefault: SC.Binding.single(),
	layoutDidChangeFor: function(what) {
		sc_super();
		if (this.get("form") && !this.get("form").isClass) this.adjust("minHeight", this.getPath("form.layout").minHeight + 40);
	},
	form: Forms.FormView.design({ //Forms.FormAnimation,
		editsByDefault: NO,
		layout: { left: 20, top: 20, right: 20, bottom: 20 },
		contentBinding: ".parentView.content",
		fields: "fullName company phone email address csz".w(),

		name: Forms.FormView.row({
			fields: 'firstName lastName'.w(),
			fieldLabel: NO,
			firstName: Forms.FormView.field(SC.TextFieldView, { stealsFocus: YES, hint: "First", classNames: ["name"], layout: { height: 35, width: 300 } }),
			lastName: Forms.FormView.field(SC.TextFieldView, { hint: "Last", classNames: ["name"], layout: { height: 35, width: 300 } }),

			autoHide: YES
		}),
		
		fullName: Forms.FormView.row(SC.TextFieldView, {
			hint: "fullName",
			fieldKey: "fullName",
			fieldLabel: "Name:",
			layout: { width: 300, height: 100 },

			autoHide: YES
		}),

		company: Forms.FormView.row(SC.TextFieldView, {
			hint: "company",
			fieldKey: "company",
			fieldLabel: "Company:",
			layout: { width: 300, height: 100 },

			autoHide: YES
		}),

		address: Forms.FormView.row(SC.TextFieldView, {
			fieldLabel: "Address:", 
			fieldKey: "address", 
			hint: "address",
			isTextArea: YES,
			layout: { width: 300, height: 100 },

			autoHide: YES
		}),

		csz: Forms.FormView.row({
			fields: 'city state zip'.w(),
			fieldLabel: "",

			city: Forms.FormView.field(SC.TextFieldView, { hint: "city", classNames: ["csz"], layout: { height: 35, width: 200 } }),
			state: Forms.FormView.field(SC.TextFieldView, { hint: "state", classNames: ["csz"], layout: { height: 35, width: 200 } }),
			zip: Forms.FormView.field(SC.TextFieldView, { hint: "zip", classNames: ["csz"], layout: { height: 35, width: 200 } }),

			autoHide: YES
		}),

		phone: Forms.FormView.row(SC.TextFieldView, {
			hint: "phone",
			fieldKey: "phone",
			fieldLabel: "Phone:",

			autoHide: YES
		}),

		email: Forms.FormView.row(SC.TextFieldView, {
			hint: "email",
			fieldKey: "email",
			fieldLabel: "Email:",
			layout: { width: 300, height: 100 },

			autoHide: YES
		}),

		index: 0
	})
});
