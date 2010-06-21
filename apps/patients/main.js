// ==========================================================================
// Project:   Patients
// ==========================================================================
/*globals Patients */

// This is the function that will start your app running.  The default
// implementation will load any fixtures you have created then instantiate
// your controllers and awake the elements on your page.
//
// As you develop your application you will probably want to override this.
// See comments for some pointers on what to do next.
//
Patients.main = function main() {
	Patients.getPath('mainPage.mainPane').append() ;
	var providers = Patients.store.find(Patients.Provider);
	var patients = Patients.store.find(Patients.Patient);
	Patients.providersController.set("all", patients);
	Patients.providersController.set('content', providers);
} ;

function main() { Patients.main(); }
