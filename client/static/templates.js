this["nom"] = this["nom"] || {};
this["nom"]["templates"] = this["nom"]["templates"] || {};

this["nom"]["templates"]["Ingredient"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += " <small>(";
  if (helper = helpers.PreparationNotes) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.PreparationNotes); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ")</small>";
  return buffer;
  }

  buffer += "<div class=\"row-fluid\">\n    <div class=\"col-lg-12\">\n        <p class=\"text-ellipsis\"><strong>";
  if (helper = helpers.DisplayQuantity) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.DisplayQuantity); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " ";
  if (helper = helpers.Unit) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.Unit); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</strong> ";
  if (helper = helpers.Name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.Name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.PreparationNotes), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</p>\n    </div>\n</div>";
  return buffer;
  });

this["nom"]["templates"]["InstructionControl"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"row\">\n    <div class=\"col-lg-1 col-xs-1 list-number\">\n        <p>";
  if (helper = helpers.index) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.index); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ".</p>\n    </div>\n    <div class=\"col-lg-11 col-xs-11\">\n        <p>";
  if (helper = helpers.text) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.text); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</p>\n    </div>\n</div>";
  return buffer;
  });

this["nom"]["templates"]["InstructionResponsive"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div id=\"instruction_";
  if (helper = helpers.index) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.index); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" class=\"row\">\n    <div class=\"col-lg-1 col-xs-1 list-number\">\n        <p>";
  if (helper = helpers.index) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.index); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ".</p>\n    </div>\n    <div class=\"col-lg-11 col-xs-11\">\n        <p>";
  if (helper = helpers.text) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.text); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</p>\n    </div>\n</div>";
  return buffer;
  });

this["nom"]["templates"]["InstructionSBS"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"row\">\n    <div class=\"col-lg-12 col-xs-12\">\n        <p class=\"lead\">";
  if (helper = helpers.text) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.text); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</p>\n    </div>\n</div>";
  return buffer;
  });

this["nom"]["templates"]["Nasa"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div id=\"nasa\" class=\"row\">\n    <div class=\"col-lg-4\"></div>\n    <div class=\"col-lg-4\">\n        <div class=\"text-left\">\n            <h1>NASA Task Load Index</h1>\n            <!-- Survey content goes here -->\n            <i>\n            Hart and Staveland's NASA Task Load Index (TLX) method assesses work load on a scale ranging from 1 (very low) to 5 (very high). \n            </i>\n            <br>\n            <br>\n              Mental Demand: How mentally demanding was the task?\n            <form action=\"\">\n                <input type=\"RADIO\" name=\"mental\" value=\"1\"> Very Low\n                <input type=\"RADIO\" name=\"mental\" value=\"2\"> Low\n                <input type=\"RADIO\" name=\"mental\" value=\"3\"> Moderate\n                <input type=\"RADIO\" name=\"mental\" value=\"4\"> High\n                <input type=\"RADIO\" name=\"mental\" value=\"5\"> Very High\n              </form>\n              <br>\n              Physical Demand: How physically demanding was the task?\n            <form action=\"\">\n                <input type=\"RADIO\" name=\"physical\" value=\"1\"> Very Low\n                <input type=\"RADIO\" name=\"physical\" value=\"2\"> Low\n                <input type=\"RADIO\" name=\"physical\" value=\"3\"> Moderate\n                <input type=\"RADIO\" name=\"physical\" value=\"4\"> High\n                <input type=\"RADIO\" name=\"physical\" value=\"5\"> Very High\n                  </form>\n              <br>\n              Temporal Demand: How hurried or rushed was the pace of the task?\n            <form action=\"\">\n                <input type=\"RADIO\" name=\"temporal\" value=\"1\"> Very Low\n                <input type=\"RADIO\" name=\"temporal\" value=\"2\"> Low\n                <input type=\"RADIO\" name=\"temporal\" value=\"3\"> Moderate\n                <input type=\"RADIO\" name=\"temporal\" value=\"4\"> High\n                <input type=\"RADIO\" name=\"temporal\" value=\"5\"> Very High\n                  </form>\n              <br>\n              Performance: How successful were you in accomplishing what you were asked to do?\n            <form action=\"\">\n                <input type=\"RADIO\" name=\"performance\" value=\"1\"> Very Low\n                <input type=\"RADIO\" name=\"performance\" value=\"2\"> Low\n                <input type=\"RADIO\" name=\"performance\" value=\"3\"> Moderate\n                <input type=\"RADIO\" name=\"performance\" value=\"4\"> High\n                <input type=\"RADIO\" name=\"performance\" value=\"5\"> Very High\n                </form>\n              <br>\n              Effort: How hard did you have to work to accomplish your level of performance?\n            <form action=\"\">\n                <input type=\"RADIO\" name=\"effort\" value=\"1\"> Very Low\n                <input type=\"RADIO\" name=\"effort\" value=\"2\"> Low\n                <input type=\"RADIO\" name=\"effort\" value=\"3\"> Moderate\n                <input type=\"RADIO\" name=\"effort\" value=\"4\"> High\n                <input type=\"RADIO\" name=\"effort\" value=\"5\"> Very High\n                </form>\n              <br>\n              Frustration: How insecure, discouraged, irritated, stressed, and annoyed were you?\n            <form action=\"\">\n                <input type=\"RADIO\" name=\"frustration\" value=\"1\"> Very Low\n                <input type=\"RADIO\" name=\"frustration\" value=\"2\"> Low\n                <input type=\"RADIO\" name=\"frustration\" value=\"3\"> Moderate\n                <input type=\"RADIO\" name=\"frustration\" value=\"4\"> High\n                <input type=\"RADIO\" name=\"frustration\" value=\"5\"> Very High\n                </form>\n        </div>\n        <div class=\"text-right\">\n            <button id=\"next\" type=\"button\" class=\"btn btn-default\" disabled>Next</button>\n        </div>\n    </div>\n    <div class=\"col-lg-4\"></div>\n</div>\n";
  });

this["nom"]["templates"]["RecipeControl"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"row\">\n\n    <div id=\"left\" class=\"col-lg-2\">\n        <div class=\"thumbnail shadow\">\n            <img id=\"recipeImage\" class=\"unselectable img-responsive img-rounded\" src=\"";
  if (helper = helpers.ImageURL) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.ImageURL); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" >\n            <div class=\"caption text-center\">\n                <h4 class=\"title\">";
  if (helper = helpers.Title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.Title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h4>\n                <p class=\"small stats\">";
  if (helper = helpers.TotalMinutes) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.TotalMinutes); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " Min | ";
  if (helper = helpers.YieldNumber) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.YieldNumber); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " ";
  if (helper = helpers.YieldUnit) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.YieldUnit); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</p>\n                <!--\n                <ul>\n                    <li>";
  if (helper = helpers.YieldNumber) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.YieldNumber); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " ";
  if (helper = helpers.YieldUnit) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.YieldUnit); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</li>\n                    <li>";
  if (helper = helpers.ActiveMinutes) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.ActiveMinutes); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "<small>m</small> Active</li>\n                    <li>";
  if (helper = helpers.TotalMinutes) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.TotalMinutes); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "<small>m</small> Total</li>\n                </ul>\n                -->\n                <!--\n                <p class=\"small\">";
  if (helper = helpers.YieldNumber) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.YieldNumber); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " ";
  if (helper = helpers.YieldUnit) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.YieldUnit); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " | ";
  if (helper = helpers.TotalMinutes) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.TotalMinutes); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " min.</p>\n                -->\n                <!-- <p class=\"small\">";
  if (helper = helpers.Description) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.Description); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</p> -->\n            </div>\n        </div>\n    </div>\n\n    <div id=\"mid\" class=\"col-lg-4\">\n        <div class=\"panel shadow\">\n            <div class=\"panel-heading\">Ingredients</div>\n            <div id=\"ingredients-container\" class=\"panel-body\">\n\n            </div>\n        </div>\n    </div>\n\n    <div id=\"right\" class=\"col-lg-6\">\n        <div class=\"panel shadow\">\n            <div class=\"panel-heading\">Instructions</div>\n            <div id=\"instruction-container\" class=\"panel-body\">\n            </div>\n        </div>\n    </div>\n</div>\n";
  return buffer;
  });

this["nom"]["templates"]["RecipeResponsive"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"row\">\n\n    <div id=\"left\" class=\"col-lg-2\">\n        <div class=\"thumbnail shadow\">\n            <img id=\"recipeImage\" class=\"unselectable img-responsive img-rounded\" src=\"";
  if (helper = helpers.ImageURL) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.ImageURL); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" >\n            <div class=\"caption text-center\">\n                <h4 class=\"title\">";
  if (helper = helpers.Title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.Title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h4>\n                <p class=\"small stats\">";
  if (helper = helpers.TotalMinutes) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.TotalMinutes); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " Min | ";
  if (helper = helpers.YieldNumber) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.YieldNumber); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " ";
  if (helper = helpers.YieldUnit) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.YieldUnit); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</p>\n            </div>\n        </div>\n    </div>\n\n    <div id=\"mid\" class=\"col-lg-4\">\n        <div class=\"panel shadow\">\n            <div class=\"panel-heading\">Ingredients</div>\n            <div id=\"ingredients-container\" class=\"panel-body\">\n\n            </div>\n        </div>\n    </div>\n\n    <div id=\"right\" class=\"col-lg-6\">\n        <div class=\"panel shadow\">\n            <div class=\"panel-heading\">Instructions</div>\n            <div id=\"instruction-container\" class=\"panel-body\">\n            </div>\n            <div class=\"panel-footer\">\n                <div class=\"row\">\n                    <div class=\"col-lg-2 pull-left\">\n                        <button id=\"prev\" type=\"button\" class=\"btn btn-lg\">Previous</button>\n                    </div>\n                    <div class=\"col-lg-2 pull-right\">\n                        <button id=\"next\" type=\"button\" class=\"btn btn-lg\">Next</button>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n";
  return buffer;
  });

this["nom"]["templates"]["RecipeSBS"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"row full-vertical\">\n\n    <div id=\"left\" class=\"col-lg-2\">\n        <div class=\"thumbnail shadow\">\n            <img id=\"recipeImage\" class=\"unselectable img-responsive img-rounded\" src=\"";
  if (helper = helpers.ImageURL) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.ImageURL); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" >\n            <div class=\"caption text-center\">\n                <h4 class=\"title\">";
  if (helper = helpers.Title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.Title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h4>\n                <p class=\"small stats\">";
  if (helper = helpers.TotalMinutes) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.TotalMinutes); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " Min | ";
  if (helper = helpers.YieldNumber) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.YieldNumber); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " ";
  if (helper = helpers.YieldUnit) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.YieldUnit); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</p>\n            </div>\n        </div>\n    </div>\n\n    <div id=\"mid\" class=\"col-lg-4\">\n        <div class=\"panel shadow\">\n            <div class=\"panel-heading\">Ingredients</div>\n            <div id=\"ingredients-container\" class=\"panel-body\">\n\n            </div>\n        </div>\n    </div>\n\n    <div id=\"right\" class=\"col-lg-6 full-vertical\">\n        <div class=\"panel shadow full-vertical\">\n            <div id=\"instruction-title\" class=\"panel-heading\">Instructions</div>\n            <div id=\"instruction-container\" class=\"panel-body sbs-panel-body-vertical\">\n            </div>\n            <div class=\"panel-footer\">\n                <div class=\"row\">\n                    <div class=\"col-lg-2 pull-left\">\n                        <button id=\"prev\" type=\"button\" class=\"btn btn-lg\">Previous</button>\n                    </div>\n                    <div class=\"col-lg-2 pull-right\">\n                        <button id=\"next\" type=\"button\" class=\"btn btn-lg\">Next</button>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n";
  return buffer;
  });

this["nom"]["templates"]["RecipeSummary"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"col-lg-6 col-lg-offset-3 text-center\">\n    <div class=\"panel shadow\" id=\"panel-start\">\n        <!--div class=\"subtitle\">";
  if (helper = helpers.Category) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.Category); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " > ";
  if (helper = helpers.Subcategory) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.Subcategory); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div-->\n        <h1 class=\"title\">";
  if (helper = helpers.Title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.Title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h1>\n        <h4 class=\"description\">";
  if (helper = helpers.Description) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.Description); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h4>\n        <div class=\"stats\">\n            ";
  if (helper = helpers.TotalMinutes) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.TotalMinutes); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " Min | ";
  if (helper = helpers.YieldNumber) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.YieldNumber); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " ";
  if (helper = helpers.YieldUnit) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.YieldUnit); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\n        </div>\n        <div class=\"header-image\">\n            <img id=\"recipeImage\" class=\"center-block unselectable img-responsive img-rounded\" src=\"";
  if (helper = helpers.ImageURL) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.ImageURL); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\n        </div>\n        <p><a id=\"continue\" class=\"btn btn-lg\" href=\"javascript:\" role=\"button\">Continue</a></p>\n        <!-- <button id=\"continue\" type=\"button\" class=\"btn btn-default pull-right\">Continue</button> -->\n    </div>\n</div>\n\n<!--\n<div id=\"left\" class=\"col-lg-5\">\n    <img id=\"recipeImage\" class=\"unselectable img-responsive\" src=\"";
  if (helper = helpers.ImageURL) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.ImageURL); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\n</div>\n\n<div id=\"right\" class=\"col-lg-7\">\n\n    <div class=\"row\">\n        <h1>";
  if (helper = helpers.Title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.Title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h1>\n        <p>";
  if (helper = helpers.Description) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.Description); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</p>\n    </div>\n\n    <div class=\"row\">\n        <button id=\"continue\" type=\"button\" class=\"btn btn-default pull-right\">Begin</button>\n    </div>\n\n</div>\n-->";
  return buffer;
  });

this["nom"]["templates"]["Start"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this;

function program1(depth0,data) {
  
  
  return "\n            <h2>Thank you</h2>\n            <p>You have already contributed to this study. The study only requires\n            participants to complete the test once. Due to the nature of the study,\n            if you started (by pressing the start button)\n            and abandoned the test, then you are no longer eligible to take the test.</p>\n        ";
  }

function program3(depth0,data) {
  
  
  return "\n            <div class=\"alert alert-warning\" role=\"alert\">\n                <b>Notice</b> Once you click start, you <b>must</b> complete the study without interruption.\n                If you close this window <b>after</b> pressing start, then you will be unable to take the test again.\n                Please carefully read the instructions below.</p>\n            </div>\n            <h2>Instructions</h2>\n            <p> Welcome to {legit name}! We thank you for participating in this study\n                to improve recipe instruction for cooks!\n                This study will not properly operate for any version of IE.\n                If you are using IE, please open this url in a browser other than IE.\n                Please maximize your window.\n                You will be given further instructions upon clicking the start button below.</p>\n            <button id=\"next\" type=\"button\" class=\"btn btn-lg\">Start</button>\n        ";
  }

  buffer += "<div class=\"row\">\n    <div class=\"col-lg-4\"></div>\n    <div class=\"col-lg-4\">\n        <div class=\"text-center\">\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.started), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n    </div>\n    <div class=\"col-lg-4\"></div>\n</div>";
  return buffer;
  });

this["nom"]["templates"]["Survey"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div id=\"survey\" class=\"row\">\n    <div class=\"col-lg-4\"></div>\n    <div class=\"col-lg-4\">\n        <div class=\"text-center\">\n            <h1>Interface Preference</h1>\n            Which interface do you prefer?\n                <div class=\"row\">\n                    <div class=\"col-xs-6 col-lg-6 addPadding\">\n                        <input type=\"RADIO\" name=\"preference\" value=\"Control\"> Control\n                    </div>\n                    <div class=\"col-xs-6 col-lg-6 addPadding\">\n                        <input type=\"RADIO\" name=\"preference\" value=\"MagView\"> MagView\n                    </div>\n                </div>\n        </div>\n        <div class=\"text-right\">\n            <button id=\"next\" type=\"button\" class=\"btn btn-default\" disabled>Submit</button>\n        </div>\n    </div>\n    <div class=\"col-lg-4\"></div>\n</div>";
  });

this["nom"]["templates"]["ThankYou"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<row id=\"thankyou\">\n    <div class=\"col-lg-12\">\n        <div class=\"text-center\">\n            <div class=\"row\">\n                <h1>Thank You!</h1>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-xs-4\"></div>\n                    <div class=\"col-xs-4\">\n                        <div class=\" addPadding\">\n                            <div class=\"panel panel-success\">\n                            <div id=\"commandDescription\" class=\"panel-heading text-center\">Survey Completion Code</div>\n                            <div class=\"panel-body text-center\">\n                                <b>";
  if (helper = helpers.session) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.session); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</b>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"col-xs-4\"></div>\n            </div>\n\n        </div>\n    </div>\n</row>";
  return buffer;
  });