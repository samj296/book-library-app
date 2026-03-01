# **--------Book Library App--------**

## **Overview**

### This project implemented a role based authentication system using Node.js, Express, Passport.js and MongoDB. The system support multiple user roles (admin, staff, user) and includes a secure "first-time steup" flow for creating and managing the initial admin account. The backend enforces all access rules, redirect, and password-change requirements to ensure consistent and secure behavior across the application.

### **Background and Inspiration**
Before Joining this course, I built a billing system in VBA/Access where I implemented role-based access control:

* Cashiers could only see current-day records.
* Managers could see full record history and more sensitive data.
* Managers could not add users.
* Admin account can add users and have all the rights(seeing past reocrds pulling out the salary details and all.)
* Certain operations were restricted based on role.

Working on that system shaped how I think about backend logic, permissions, and user flows. When desiging this project, I naturally applied the same principles.

### **Key Features**
1) <u>_Automatic Admin Bootstrap:_</u> <br>
When the server starts, it checks whether an admin exists in the database. If not, it automatically creates one with:

* Default email
* A temp password(eg., PASSWORD123)
* A `mustChangePassword` flag set to `true`
* Role set to `admin`

This ensures the system is always recoverable, even with a fresh database.

2) <u>_Temporary Password and Forced Password Change:_</u> <br>

* if `mustChangePassword === true`, adminUser is forced to change the Password
* The new password is hashed and the user is updated in the MongoDB
* The admin is redirected to the admin dashboard.

This prevents the default password from becoming a long-term security risk.

3) <u>_Role-based Redirect after login_</u>

After Passport authenticates the user, the backend decides where the user should go: <br>
* Admin --> `/admin` "admin dashboard"
* Staff --> `/staff` "staff dashboard"
* User --> `/user` "user dashboard"
* Admin with temporary password --> `/change-password`

This keeps the user experience clean and ensures each user lands on the correct dashboard.