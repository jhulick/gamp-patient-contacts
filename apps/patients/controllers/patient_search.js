// ==========================================================================
// Project:   Patients.patientSearchController
// ==========================================================================
/*globals Patients */

/** @class

  @extends SC.Object
*/
Patients.patientSearchController = SC.ArrayController.create(
/** @scope Patients.patientSearchController.prototype */ {
  content: null,
  contentBinding: "Patients.providersController.effectiveSelection",
  search: "",
  isSearching: NO,
  searchContent: null,
  
  _match_start: function(full, part) {
    if (!full || full.trim().length === 0 || !part || part.trim().length === 0) return false;
    
    if (full.toLowerCase().substr(0, part.length) == part.toLowerCase()) {
      return "<strong>" + full.substr(0, part.length) + "</strong>" + full.substr(part.length);
    }
    
    return false;
  },
  
  _match_partial: function(full, part) {
    if (!full || full.trim().length === 0 || !part || part.trim().length === 0) return false;
    
    if (full.toLowerCase().indexOf(part.toLowerCase()) >= 0) {
      return full.substr(0, full.toLowerCase().indexOf(part.toLowerCase())) + "<strong>" + 
      full.substr(full.toLowerCase().indexOf(part.toLowerCase()), part.length) + "</strong>" + 
      full.substr(full.toLowerCase().indexOf(part.toLowerCase()) + part.length);
    }
    
    return false;
  },
  
  _search: function(){
    // we go through each time just to ensure we clear sortRelevance if needed.
    var result = [];
    result.length = 0;
    var search = this.get("search").trim();
    var terms = search.split(" "), tl = terms.length, ti = 0;
    
    var c = this, l = c.get("length"), o;
    for (var i = 0; i < l; i++) {
      o = c.objectAt(i);
      
      var efull = SC.RenderContext.escapeHTML(o.get("fullName"));
      
      var relevance = 0;
      var r_full_name = efull;
      if (search && search.trim() !== "" && terms.length > 0) {
        var first = SC.RenderContext.escapeHTML(o.get("firstName"));
        var last = SC.RenderContext.escapeHTML(o.get("lastName"));
        var company = SC.RenderContext.escapeHTML(o.get("company"));
        
        // first name starts, +7
        // last name starts, +6
        // company starts +5
        // first name contains, +4
        // last name contains, +3
        // company contains, +2

        // and we do this for each term.
        for (ti = 0; ti < tl; ti++) {
          var term = terms[ti];
          
          var tfirst = this._match_start(first, term);
          if (tfirst) relevance += 7;
          else tfirst = this._match_partial(first, term);
          if (tfirst) relevance += 4;
          
          var tlast = this._match_start(last, term);
          if (tlast) relevance += 6;
          else tlast = this._match_partial(last, term);
          if (tlast) relevance += 3;
          
          var tcompany = this._match_start(company, term);
          if (tcompany) relevance += 5;
          else tcompany = this._match_partial(company, term);
          if (tcompany) relevance += 2;
          
          // which mode: company or name?
          if (first || last) {
            tfirst = tfirst || first; // make sure we actually get both, even if it isn't a match
            tlast = tlast || last;
            
            r_full_name = (tcompany ? "<em>(" + tcompany + ")</em> " : "") + tfirst + " " + tlast; // and tada.
          } else {
            tcompany = tcompany || company;
            r_full_name = tcompany;
          }
        }

      }

      o.set("searchFullName", r_full_name);
      o.set("searchRelevance", relevance);
      if (relevance > 0 || search.trim() === "" || terms.length === 0) result.push(o)
    }
    
    this.set("searchContent", result);
    this.set("isSearching", !(this.get("search").trim() === ""));
  },
  
  contentDidChange: function(){
    this._search();
  }.observes("[]"),
  
  searchDidChange: function(){
    this._search();    
  }.observes("search")
}) ;
