describe('Service: RecipeService', function() {
  beforeEach(module('recipeJSApp'));

  var service;

  beforeEach(inject(function(RecipeService) {
    service = RecipeService;
  }));

  it('should return recipe database', function() {
    expect(service.list()).toEqual([
      {title: "Baked Beans on Toast", new: true},
      {title: "French Toast", new: false},
      {title: "Rocky Mountain Egg", new: false}
    ]);
  });

  it('should add items', function() {
    var newRecipe = {title: "Grilled Cheese Sandwich", new: true};
    service.add(newRecipe);
    var recipes = service.list();
    expect(recipes[3]).toEqual(newRecipe);
  });
});
