# Zuri-Auth-API
### This is an implementation of the authentication and authorization process in Nodejs using JWT and bcrypt 

There are four roles of users: 
- User
- Staff
- Manager
- Admin

I utilised the REST client extension in VSCode. Thus the requests are in **test.rest**


Here is a snapshot of creating a new profile


Here are snapshots of protected routes


Here is a snapshot of password recovery. The implementation is very simple and goes straight into replacing the previously saved password with a default password. This can be changed to accomodate few extra steps such as validation and random new default password
