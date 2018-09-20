/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

$(() => {

  /* This is our first test suite - a test suite just contains
  * a related set of tests. This suite is all about the RSS
  * feeds definitions, the allFeeds variable in our application.
  */
  describe('RSS Feeds', () => {

    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */
    it('are defined', () => {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    /* Checks if the attribute url of the objects within allFeeds are
     * defined and not empty
     */
    it('has an URL defined and not empty', () => {
      allFeeds.forEach((feeds) => {
        expect(feeds.url).toBeDefined();
        expect(feeds.url).not.toBe('');
      });
    });

    /* Checks if the attribute name of the objects within allFeeds are
     * defined and not empty
     */
    it('has a name defined and not empty', () => {
      allFeeds.forEach((feeds) => {
        expect(feeds.name).toBeDefined();
        expect(feeds.name).not.toBe('');
      });
    });
  });

  /* This suite checks the menu functionality */

  describe('The menu', () => {

    /* Checks if the menu is hidden by default. The CSS class .menu-hidden then
     * must be present in the <body>
     */
    it('is hidden by default', () => {
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });

    /* Checks if the menu toggles on-off if clicked, by simulating a click with
     * the .click() method from HTMLElement Web API
    */
    it('toggles when clicked', () => {
      let trigger = document.querySelector('.menu-icon-link');
      trigger.click();
      expect($('body').hasClass('menu-hidden')).toBe(false);
      trigger.click();
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });
  });

  /* This test suite checks the feeds list.
  */
  describe('Initial Entries', () => {
    beforeEach((done) => { // beforeEach is launched before any test
      loadFeed(0, done); // we need to load the first feed (index 0)
    });

  /* Checks if at least one feed .entry CSS class is present
   */
    it('have at least one entry element', (done) => {
      let feed = document.querySelectorAll('.feed .entry');
      expect(feed.length).toBeGreaterThan(0);
      done();
    });
  });

  /* Checks the feed content.
  */
  describe('New Feed Selection', () => {
    let html1;
    let html2;
    beforeEach((done) => {
      loadFeed(0, () => {
        html1 = document.querySelector('.feed').innerHTML;
        loadFeed(1, done);
      });
    });

    /* Checks if the content of the feed changes by actually checking if the
     * innerHTML string changes
     */
    it('has its content that actually changes', (done) => {
      html2 = document.querySelector('.feed').innerHTML;
      expect(html1).not.toBe(html2);
      done();
    });
  });
});
