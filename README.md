#User Management
This is an example of a flexible user management app built using Node.js and Cosmic JS.  User information is stored in the Cosmic JS CMS API.
##Demo
[Click here to view a demo website](http://user-management.cosmicapp.co)

##Get started
```
git clone https://github.com/cosmicjs/user-management
cd user-management
npm install
```

###Run in production
```
COSMIC_BUCKET=your-bucket-slug npm start
```
Go to [http://localhost:3000](http://localhost:3000).
###Run in development
Create a `config/development.js` file and match it to `config/production.js` with your values.
```
npm run development
```
Go to [http://localhost:5000](http://localhost:5000).