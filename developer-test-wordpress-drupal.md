# Wordpress/Drupal developer test

Goal: Create a basic page layout with 26 teasers using the provided data from this json file:

[JSON](https://gist.github.com/kieranjones/44d71c01636b004c1b8d5857f7bc0e24)

## Instructions
Using Wordpress or Drupal (you choose), create a responsive page with a header title page and 26 teasers. Commit all your work and push on a git repository including the database. At the end include the installation instructions of your site. If you have any questions, make assumpotions instead and document them.

### Migration
 Using the JSON source provided write a custom migration that consumes the data into Wordpress or Drupal. Git commits should reflect everytime you create or update an important functionality. Use the JSON provided to come up with the appropriate content type data structure. Post 2 more manual articles using the CMS to add to the 24 that are coming from the data source. The 2 new items should be the first two articles on top from the teaser listing.

- the header should have the title `Article Feed`.
- a teaser consists of an image, title and summary text.
- if you have any questions please don't hesitate to ask us.
- submit the test files via a git repository with complete commit history

**Code must be unit tested, adhere to sound software engineering principles and be self documenting code**

Layout description for viewports:

### Mobile
- header sticky
- single column
- teasers should be stacked vertically in a single full-width column

### Tablet
- header sticky
- 1st teaser should be 100% width
- remaining teasers should be layed out in a grid of 2 columns with summary and title text beside the image to the right.

### Desktop
- header sticky
- teasers should be layed out in a grid of 2 columns
- teasers should have image above with summary and title text below.

## Constraints
- Sass styling
- Bootstrap or Foundation as CSS framework
