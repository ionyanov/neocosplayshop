# NeoCosplayShop

Internet shop for handmade cosplay staff. Design by customer.
Admin panel contains pages:

1. Category administration (It's allow build dynamic menu)
2. Products properties administration
3. Products administration
4. User administration
5. General settings administration

## Stack

Backend

-   Nest.js
-   Multer
-   Prisma
-   MYSQL

Frontend

-   Vite
-   React.js
-   Material UI
-   RTK Query

## Quickstart

### Backend

1. Create file /server/.env

```
DATABASE_URL="mysql://user:password@host/db"
PORT=5000
TOKEN_KEY=SECRET_SECRET_key_WORD1
TOKEN_DURATION=1h
TOKEN_REFRESH_KEY=TROLOLO
TOKEN_REFRESH_DURATION=7d
AVATAR_DEFAULT=/images/noavatar.png
PASSWORD_DEFAULT=SimplePassword
MAILER_SERVER=smtp.server
MAILER_PORT=25
MAILER_USER=email@mydoomain.net
MAILER_PASSOWRD=email_password
LOCK_LIMIT=5
UPLOAD_DIR=../../../client/public/images/public
```

2. Run server

```bash
  cd server 			- change directory
  npm install   		- Install dependencies
  npm run start:debug	- Start the server
```

---

### Frontend

1. Create file /client/.env

```
_API_URL_=http://localhost:5000/api
```

2. Run client

```bash
  cd client		- change directory
  npm install	- Install dependencies
  npm run dev	- run client
```

#### Architecture

Feature sliced design - [feature sliced design](https://feature-sliced.design/docs/get-started/tutorial)
