# User Management
This is an example of a user management app built using Node.js and [Cosmic JS](https://cosmicjs.com).  User information is stored in your Cosmic JS dashboard for easy adding, editing and extending.  User data is made available through the [Cosmic JS CMS API](https://cosmicjs.com).

Current functionality includes:
- Sign up
- Log in
- View a list of users (after login)

## Demo
[Click here to view a demo](https://cosmicjs.com/apps/user-management/demo)

![Image of User Management App](https://cosmicjs.com/uploads/d0934110-a698-11e6-8ae9-e32496a689d4-user-management.gif)

## Features
- Fully manage user data using Cosmic JS.  Easily add, remove and extend user data.
- Form validation, server validation.
- Gravatar support.

## Get started
```
git clone https://github.com/cosmicjs/user-management
cd user-management
npm install
```

### Run in production
```
COSMIC_BUCKET=your-bucket-slug npm start
```
Go to [http://localhost:3000](http://localhost:3000).
### Run in development
Create a `config/development.js` file and match it to `config/production.js` with your values.
```
npm run development
```
Go to [http://localhost:5000](http://localhost:5000).

### Customize
This is a starting point.  Please feel free to fork and extend to suit your specific needs.
