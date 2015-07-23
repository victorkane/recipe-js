describe('RecipeJS Test', function() {

  it('should show recipes on the first page', function() {
    // Open the list of recipes page
    browser.get('/');

    // Check if there are 3 rows in the main content recipe area
    var rows = element.all(
        by.repeater('recipe in recipevm.list()'));
    expect(rows.count()).toEqual(3);
    // Check the first row title
    var firstRowTitle = element(
      by.repeater('recipe in recipevm.list()')
        .row(0).column('recipe.title'));
    expect(firstRowTitle.getText()).toEqual('Baked Beans on Toast');

    // Check the last row title
    var lastRowTitle = element(
      by.repeater('recipe in recipevm.list()')
        .row(2).column('recipe.title'));
    expect(lastRowTitle.getText()).toEqual('Rocky Mountain Egg');
  });

  it('should process signin', function() {
    var username = element(
      by.css('.username'));
    var usermail = element(
      by.css('.usermail'));
    var userpassword = element(
      by.css('.userpassword'));

    username.sendKeys('Victor Kane');
    usermail.sendKeys('victorkane@example.com');
    userpassword.sendKeys('123456');

    element(by.css('.signin')).click();

    var msg = element(by.css('p.header-message'));
    expect(msg.getText()).toEqual("We'd love you to share your best recipes with us, Victor Kane!");
  })
});
