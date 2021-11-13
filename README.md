# CS6550-Project
CS6550 Info Retrieval Project - South Park Search &amp; Recommendation System

![PngItem_1338445](https://user-images.githubusercontent.com/8848080/140250244-c2cb3ca1-0438-4ac7-bf8d-e89b0ab1b5f5.png)

# Frontend

## Setup
Install dependencies:

```
cd frontend
npm install
```

## Run Development Web Server

```
cd frontend
npm run serve:dev
```

# Backend

## Setup 
Install the requirements:

```
cd backend
pip install -r requirements.txt
```

## Run Web Server

```
cd backend
python manage.py runserver
```

## API

- You can get recommendations by sending a JSON encoded list of favorites as a `GET` request to `http://localhost:8000/api/recommend`. For example:
  ```json
  [
    {
        "id": 2,
        "season": 3
    },
    {
        "id": 3,
        "season": 3
    },
    {
        "id": 4,
        "season": 5
    }
  ]
  ```
  The result will be a JSON list of episodes like above.

- You can search by sending a query as a plain text body to `http://localhost:8000/api/search`. For example:
  ```
  Oh my god, they killed Kenny!
  ```
  The result will be a JSON list of episodes like above.
