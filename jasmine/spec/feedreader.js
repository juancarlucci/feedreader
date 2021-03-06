/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
/*
Resources:
shortcuts: https://daveceddia.com/freebies/jasmine-2-cheat-sheet.html
source: https://github.com/jasmine/jasmine/tree/master/src/core
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
		it('allFeeds are defined', function() {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});
		/* TODO: Write a test that loops through each feed
		 * in the allFeeds object and ensures it has a URL defined
		 * and that the URL is not empty.
		 */
		it('all feeds have a URL defined, and the URL is not empty', function() {
			allFeeds.forEach(function(feed) {
				expect(feed.url).toBeDefined();
				expect(feed.url.length).not.toBe(0);
			});
		});
		/* TODO: Write a test that loops through each feed
		 * in the allFeeds object and ensures it has a name defined
		 * and that the name is not empty.
		 */
		it('Name is defined', function() {
			/*Loops throught allfeeds. Makes sure each feed.name is defined and not empty*/
			allFeeds.forEach(function(feed) {
				expect(feed.name).toBeDefined();
				expect(feed.name.length).not.toBe(0);
			});
		});
	}); //end describe RSS Feeds
	/* TODO: Write a new test suite named "The menu" */
	describe('The Menu', function() {
		/* TODO: Write a test that ensures the menu element is
		 * hidden by default. You'll have to analyze the HTML and
		 * the CSS to determine how we're performing the
		 * hiding/showing of the menu element.
		 */
		it('Menu element hidden by default', function() {
			//https://learn.jquery.com/using-jquery-core/faq/how-do-i-test-whether-an-element-has-a-particular-class/
			//Cannot use .hasClass as per this discussion https://discussions.udacity.com/t/menu-visibility-test/187928/6
			//Need to add classList then use toContain.
			expect(document.body.classList).toContain('menu-hidden');
		});
		/* TODO: Write a test that ensures the menu changes
		 * visibility when the menu icon is clicked. This test
		 * should have two expectations: does the menu display when
		 * clicked and does it hide when clicked again.
		 */
		it('Menu visibility toggled on icon click', function() {
			var icon = $('.menu-icon-link');
			icon.click();
			expect(document.body.classList).not.toContain('menu-hidden');
			icon.click();
			expect(document.body.classList).toContain('menu-hidden');
		});
	}); //end describe The menu
	/* TODO: Write a new test suite named "Initial Entries" */
	describe('Initial Entries', function() {
		//     /* TODO: Write a test that ensures when the loadFeed
		//      * function is called and completes its work, there is at least
		//      * a single .entry element within the .feed container.
		//      * Remember, loadFeed() is asynchronous so this test will require
		//      * the use of Jasmine's beforeEach and asynchronous done() function.
		//      * Resources for this section:
		//      * https://volaresystems.com/blog/post/2014/12/09/Testing-async-calls-with-Jasmine
		//      * https://discussions.udacity.com/t/step-13-help-initial-entries/14839/13 
		//      * Make an async call, passing the special done callback. */
		beforeEach(function(done) { //loadFeed() is asynchronous, so have to use a beforeEach
			loadFeed(0, done);
		});
		it('loadFeed function loads at least one feed', function(done) {
			// Resource: https://daveceddia.com/freebies/jasmine-2-cheat-sheet.html
			expect($('.feed .entry').length).not.toBe(0);
			done();
		});
	}); //end describe Initial Entries
	/* TODO: Write a new test suite named "New Feed Selection"*/
	describe('New Feed Selection', function() {
		/* TODO: Write a test that ensures when a new feed is loaded
		 * by the loadFeed function that the content actually changes.
		 * Remember, loadFeed() is asynchronous.*/
		var oldFeed;
		beforeEach(function(done) {
			loadFeed(1, function() {
				oldFeed = $('.feed').html();
				// console.log(oldFeed);
				done();
			});
		});
		// Adapted from https://discussions.udacity.com/t/p6-new-feed-selection-test-question-problem/15562/15
		//mcs helped point out the need to put the expect inside the loadFeed function, just before done()
		it('loadFeed loads different feed', function(done) {
			loadFeed(2, function() {
				expect(oldFeed).not.toEqual($('.feed').html());
				done();
			});
		});
	}); //end describe New Feed Selection
}());
