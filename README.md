This is a simple module for drupal 10 that creates a paragraph and a block for react components.

The paragraph and block have a field that allows you to select the component. If more fields are needed the patterns are easy to follow. It probably does require a bit of drupal/react knowlege to be easily used. If react is needed on the admin side, using a hook_form_alter plus a similiar strategy of attaching the library would probably work.

There are 2 components, "hello world" and "sample component" feel free to replace them with whatever you need. The way they are added should be easy to figure out in index.js

The react app lives inside js/react-app, I used node version 22, doing `npm install` and `npm run watch` from there should be enough to get developing more advanced react components!

Yeah sorry the docs aren't more robust! Doing this for a personal project, but thought it'd be useful enough to commit on it's own in case I wanted to do more with it.

Note: if adding a new react component is breaking the javascript try uncommenting the commented out lines at the end of ReactBlock.php, aggressively clearing every last block cache seems to help (drush cr doesn't seem to be quite enough)
