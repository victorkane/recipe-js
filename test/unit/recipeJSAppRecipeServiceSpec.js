describe('Service: RecipeService', function() {
  beforeEach(module('recipeJSApp'));

  var service, mockRestfulAPI;

  beforeEach(inject(function(RecipeService, $httpBackend) {
    mockRestfulAPI = $httpBackend;
    mockRestfulAPI.expectGET('/api/recipes')
      .respond([{id: '"f588d038-0cfd-4e4b-add7-959c332081bq"', title: 'Baked Beans', new: true}])
    service = RecipeService;
  }));

  it('should grab recipes from backend when asked', function() {
    var r1 = service.listRecipes();
    expect(r1).toEqual([]);
    service.getRecipes();
    mockRestfulAPI.flush();
    var r2 = service.listRecipes();
    expect(r2).toEqual([{id: '"f588d038-0cfd-4e4b-add7-959c332081bq"', title: 'Baked Beans', new: true}]);
  });
});
