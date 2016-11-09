#User Management
This is an example of a user management app built using Node.js and [Cosmic JS](https://cosmicjs.com).  User information is stored in the [Cosmic JS CMS API](https://cosmicjs.com).  It allows for easy user information adding, removing and extending.
##Demo
[Click here to view a demo](http://user-management.cosmicapp.co)

##Features
- Fully manage user data using Cosmic JS.  Easily add, remove and extend user data.
- Form validation, server validation
- Gravatar support

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