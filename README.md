# Zuri-Auth-API
### This is an implementation of the authentication and authorization process in Nodejs using JWT and bcrypt 

There are four roles of users: 
- User
- Staff
- Manager
- Admin

### All Routes

![Routes](https://user-images.githubusercontent.com/51035289/184552548-5f50a3c2-7698-4240-a078-1f2bcc2c352e.png)

I utilised the REST client extension in VSCode. Thus the requests are in **test.rest**

![test client](https://user-images.githubusercontent.com/51035289/184552462-a5a0444b-ff46-46c0-9e5c-b356f132974b.png)

### Creating a new profile

![Profile Reg](https://user-images.githubusercontent.com/51035289/184552470-98709393-5530-447d-ac47-c80ca2fe2ebc.png)

### Protected routes
- User

![User-Protected](https://user-images.githubusercontent.com/51035289/184552502-5cea6365-a6e0-450c-ac94-531250d5cce6.png)

- Staff

![Staff-Protected](https://user-images.githubusercontent.com/51035289/184552509-6eb7c775-8d13-4194-9038-13a808072a1b.png)

- Manager

![Manager-Protected](https://user-images.githubusercontent.com/51035289/184552634-edbe2589-3d3b-4d80-9ac5-239706a741bf.png)

- Admin

![Admin-Protected](https://user-images.githubusercontent.com/51035289/184552523-5161436d-6647-4066-a5b8-33752ccb0603.png)

### Password recovery.

The implementation is very simple and goes straight into replacing the previously saved password with a default password. This can be changed to accomodate few extra steps such as validation and random new default password
![Reset](https://user-images.githubusercontent.com/51035289/184552538-c732daba-6762-4084-b8c6-03e5425c1d1e.png)
