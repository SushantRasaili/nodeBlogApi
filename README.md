# nodeBlogApi

## Introduction
This is the Api for the Blog web app.

## Prerequisites
- Node.js and npm installed
- MongoDB database  
- If your machine have no Node.js and npm installed, you may download them, here https://nodejs.org/en  
  Also you can download MongoDB, here https://www.mongodb.com/try/download/shell


## Setup Instructions
## Open a project folder on Code Editor(Vs Code) and Open the terminal after that follow the following steps:
1. Clone the repository  
   ```
   git clone https://github.com/SushantRasaili/nodeBlogApi.git
   ```
 

2. Change directory to the project folder  
   ```
   cd nodeBlogApi
   ```

3. Install dependencies 
   ```
   npm install  
   ```
   This should install all the necessary dependencies

4. Set up environment variables  
    Create .env file in the root directory i.e nodeBlogApi
    Insert "JWT_KEY=djfbdsjkcsdfbkdshfvdshj" in your .env file, this is only an example you can add any value for JWT_KEY. Additionally you can add more environment variables as per your need. 
  

5. Run the application  
   ```
   node index.js
   ```



## Usage
- After the completion of these steps, now the api can be called through the frontend ui or you may use applications like postman to test the Api.

The following routes can be called 
1. User Registration Route(Post method)  
   ```
   localhost:3000/userRegister
   ```
  Provide {username,fullname,email,password,role} with value in request body.

2. User Login Route(Post method) 
   ```
   localhost:3000/userLogin  
   ```
  Provide {username, password} with value in request body.

3. User LogOut(Post method) 
   ```
   localhost:3000/logout  
   ```
  Just call this route to logged out users
  
4. Add Post(Post method)  
   ```
   localhost:3000/addPost/:id  
   ```
   Provide the userId in "id" params and {title,description,tags} with value in request body, here tags is an array datatype. 

5. Update Post(Put method)  
   ```
   localhost:3000/updatePost/:postId  
   ```
   Provide postId in "postId" params and {title,description,tags} with value in request body, here tags is an array datatype.

6. Delete Post(Delete method)  
   ```
   localhost:3000/deletePost/:postId  
   ```
   Provide postId in "postId" params.

7. Add Tag(Put method)  
   ```
   localhost:3000/addTag/:postId  
   ```
   Provide postId in "postId" params and {tag} with value in request body, here tag consist a single value.

8. Remove Tag(Delete method)  
   ```
   localhost:3000/deleteTag/:postId?tagIndex=index  
   ```
   Provide postId in "postId" params and index number"[0,1,2,...]" in value of query "tagIndex".

9. Assign Role(Put method)  
   ```
   localhost:3000/assignRole/:loggedId  
   ```
   Provide logged in user's id in "loggedId" params and {userId,role} with values in request body, here userId should contain the id of the users who is to be assigned a new role.

10. Get Users List(Get method)  
   ```
   localhost:3000/users?page=pagenumber&limit=limit  
   ```
   Provide page and limit value as per your wish. Suppose the pagenumber could be 1 and limit could be 5.
   Here limit is the number of users you want to show in a single page. 

11. Get PostS List(Get method)  
    ```
    localhost:3000/posts?page=pagenumber&limit=limit  
    ```
   Provide page and limit value as per your wish. Suppose the pagenumber could be 1 and limit could be 5.
   Here limit is the number of posts you want to show in a single page.
   


