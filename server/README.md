
## Routes
```json
{
  "root": "/api/v1",
  "auth": [
    {
      "method": "POST",
      "endpoint": "/login",
      "full_route": "api/v1/auth/login",
      "description": "Allows a client user to authenticate with the database"
    },
    {
      "method": "GET",
      "endpoint": "/current_user",
      "full_route": "api/v1/auth/current_user",
      "description": "Returns data on the currently authenticated user"
    },
    {
      "method": "GET",
      "endpoint": "/logout",
      "full_route": "api/v1/auth/logout",
      "description": "Allows a client user to end their authenticated session"
    },
    {
      "method": "POST",
      "endpoint": "/register",
      "full_route": "api/v1/auth/register",
      "description": "Allows a client user to create an account in the database"
    },
  ]
}
```
