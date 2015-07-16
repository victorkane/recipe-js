describe('Controller: ControllerRecipe with mocked service: RecipeService', function() {
  beforeEach(module('recipeJSApp'));

  var ctrl, mockRecipeService;

  beforeEach(module(function($provide) {
    mockRecipeService = {
      list: function() {
        return [{title: "Mock Recipe", new: false}];
      }
    };
    $provide.value('RecipeService', mockRecipeService)
  }));

  beforeEach(inject(function($controller) {
    ctrl = $controller('ControllerRecipe');
  }));

  it('should load mocked out recipe', function() {
    var r = ctrl.list();
    expect(r).toEqual([{title: "Mock Recipe", new: false}]);
  });

});
