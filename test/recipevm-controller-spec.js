describe('Controller: RecipeVM', function() {

  // Instantiate a new instance of the application module
  // before each unit test
  beforeEach(module('recipeJSApp'));

  var ctrl;

  // Instantiate a new instance of the controller
  // before each unit test

  beforeEach(inject(function($controller) {
    ctrl = $controller('RecipeVM');
  }));

  it('should have message available on load', function() {
    expect(ctrl.message).toBeTruthy();
  });

  it('should have recipe list available on load', function() {
    expect(ctrl.recipes).toEqual([
      {title: "Baked Beans on Toast", new: true},
      {title: "French Toast", new: false},
      {title: "Rocky Mountain Egg", new: false},
    ]);
  });

  it("should have no user model defined upon initial load", function() {
     expect(ctrl.user).toBeFalsy();
  });

  it("should have an email format defined for email validation upon initial load", function() {
     expect(ctrl.emailFormat).not.toBeNull();
  });
});
