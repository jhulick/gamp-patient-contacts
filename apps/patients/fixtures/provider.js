// ==========================================================================
// Project:   Patients.Provider Fixtures
// ==========================================================================
/*globals Patients */

sc_require('models/provider');

Patients.Provider.FIXTURES = [
	{
		"guid": 1,
		"name": "Michael Richey, MD",
		"patients": [1, 2, 3, 5]
	},
	{
		"guid": 3,
		"name": "Jonathan Orchin, MD",
		"patients": [6, 7]
	},
	{
		"guid": 4,
		"name": "Marcie Bern, MD",
		"patients": [8, 4, 9, 10]
	}
];
