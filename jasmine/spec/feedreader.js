/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

$(function() {

  /* This is our first test suite - a test suite just contains
  * a related set of tests. This suite is all about the RSS
  * feeds definitions, the allFeeds variable in our application.
  */
  describe('RSS Feeds', function() {

    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    /* Checks if the attribute url of the objects within allFeeds are
     * defined and not empty
     */
    it('has an URL defined and not empty', function() {
      allFeeds.forEach(function(obj) {
        expect(obj.url).toBeDefined();
        expect(obj.url).not.toBe('');
      });
    });

    /* Checks if the attribute name of the objects within allFeeds are
     * defined and not empty
     */
    it('has a name defined and not empty', function() {
      allFeeds.forEach(function(obj) {
        expect(obj.name).toBeDefined();
        expect(obj.name).not.toBe('');
      });
    });
  });

  /* This suite checks the menu functionality */

  describe('The menu', function() {

    /* Checks if the menu is hidden by default. The CSS class .menu-hidden then
     * must be present in the <body>
     */
    it('is hidden by default', function() {
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });

    /* Checks if the menu toggles on-off if clicked, by simulating a click with
     * the .click() method from HTMLElement Web API
    */
    it('toggles when clicked', function() {
      let trigger = document.querySelector('.menu-icon-link');
      let bdy = document.querySelector('body');
      trigger.click();
      let clss = bdy.getAttribute('class');
      expect(clss).not.toEqual('menu-hidden');
      trigger.click();
      clss = bdy.getAttribute('class');
      expect(clss).toEqual('menu-hidden');
    });
  });

  /* This test suite checks the feeds list.
  */
  describe('Initial Entries', function() {
    beforeEach(function(done) { // beforeEach is launched before any test
      loadFeed(0, done); // we need to load the first feed (index 0)
    });

  /* Checks if there is at least one feed
   * .entry CSS class is present
   */
    it('have at least one entry element', function(done) {
      let article = document.querySelector('article');
      let clss = article.getAttribute('class');
      expect(clss).toEqual('entry');
      done();
    });
  });

  /* Checks the feed content.
  */
  describe('New Feed Selection', function() {
    let html1;
    let html2;
    beforeEach(function(done) {
      loadFeed(0, function() {
        html1 = document.querySelector('.feed').innerHTML;
        loadFeed(1, done);
      });
    });

    /* Checks if the content of the feed changes by actually checking if the
     * innerHTML string changes
     */
    it('has its content that actually changes', function(done) {
      html2 = document.querySelector('.feed').innerHTML;
      expect(html1).not.toBe(html2);
      done();
    });
  });
});
