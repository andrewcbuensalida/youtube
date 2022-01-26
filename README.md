todo:
save order to db
size drop down filter should be dependent on available product sizes, not hard-coded. also for colors filter.
not sure if sort products working because only 1 item per category.
search bar
non english mode
mobile friendly

==============================================
stripe says stripe.charges api is the old method.
stripe.paymentIntents is the unifying method.

had to put
<script src="https://js.stripe.com/v2/"></script>
in html to remove cors

styled components bad because doesn't highlight when selecting similar names. also have to scroll far up just to see imports. and no auto complete. just put css in a different file.

redux bad because cant console.log. just use context.

react stripe checkout is hard to customize.


================================================
heroku stuff
created an account on their website
downloaded heroku cli
added path to env variables

already had github repo, in api folder, so had to
heroku create
it will create a heroku name and heroku git
when trying to git push heroku mern-ecommerce-app-1
it says heroku does not apear to be a git repository
git remote -v doesnt have heroku
heroku git:remote -a immense-brook-98755
this set the remote
then do git push heroku mern-ecommerce-app-1
now when i do git remote -v, it shows heroku
not working though. seems like there are a lot of ways to deploy. either connecting to github, or serving react from node, or 

testing github heroku integration
No default language could be detected for this app. 
maybe because package.json of node is not in the root.
now it is working, just push to github, it will auto deploy to heroku, auto build. had to put env variables in heroku.

workflow is during development, inside client, npm run start. in root where index.js (server) is, npm run start. this will live reload. dont need cors anymore since node server is serving the front end. no need to build locally. when ready to deploy, just git push or through vs code sync, it will upload to github, which will upload to heroku, which will build and deploy. 