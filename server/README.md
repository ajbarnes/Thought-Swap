
## Routes
```json
{
  "root": "/api",
  "auth": [
    {
      "method": "POST",
      "endpoint": "/login",
      "full_route": "api/auth/login",
      "description": "Allows a client user to authenticate with the database"
    },
    {
      "method": "GET",
      "endpoint": "/current_user",
      "full_route": "api/auth/current_user",
      "description": "Returns data on the currently authenticated user"
    },
    {
      "method": "GET",
      "endpoint": "/logout",
      "full_route": "api/auth/logout",
      "description": "Allows a client user to end their authenticated session"
    },
    {
      "method": "POST",
      "endpoint": "/register",
      "full_route": "api/auth/register",
      "description": "Allows a client user to create an account in the database"
    },
  ]
}
```
