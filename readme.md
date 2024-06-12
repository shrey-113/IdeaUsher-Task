# API Documentation

## Overview

This documentation provides detailed information about the APIs for managing posts and tags. The APIs include functionality to fetch posts with filtering, sorting, and pagination, add new posts, and add new tags.

## Models

### Post Model

```javascript
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  image: { type: String },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
  createdAt: { type: Date, default: Date.now },
  category: { type: String },
});
```

### Tag Model

```javascript
const tagSchema = new mongoose.Schema({
  name: { type: String, required: true },
});
```

## API Endpoints

### Get Posts

#### Endpoint

`GET /post/get`

#### Description

Fetches posts with optional filtering, sorting, and pagination.

#### Query Parameters

- `sort` (optional): Sort order of the posts.
- `page` (optional): Page number for pagination (default is 1).
- `limit` (optional): Number of posts per page (default is 10).
- `keyword` (optional): Keyword to search in post titles and descriptions.
- `tag` (optional): Tag name to filter posts by tag.

#### Response

- `200 OK`: Returns an array of posts.
- `404 Not Found`: If the specified tag is not found.
- `400 BAD REQUEST`: If there is a bad request.

#### Example Request

```http
GET /post/get?sort=createdAt&keyword=nodejs&page=2&limit=5
```

#### Example Response

```json
[
  {
    "_id": "60d0fe4f5311236168a109ca",
    "title": "Learning Node.js",
    "desc": "This is a post about learning Node.js",
    "image": "http://example.com/image.jpg",
    "tags": [
      {
        "_id": "60d0fe4f5311236168a109cb",
        "name": "nodejs"
      }
    ],
    "createdAt": "2021-06-22T18:25:43.511Z",
    "category": "Programming"
  }
]
```

### Add Post

#### Endpoint

`POST /post/new`

#### Description

Adds a new post.

#### Request Body

- `title` (string, required): Title of the post.
- `desc` (string, required): Description of the post.
- `tags` (string, required): Comma-separated list of tag names.
- `category` (string, required): Category of the post.
- `image` (file, required): Image file uploaded via multipart/form-data. The middlewares create a `cloudinaryUrl` field containing the URL of the image.

#### Response

- `201 Created`: Returns the created post.
- `400 BAD REQUEST`: If one or more tags are not found or if there is a bad request.

#### Example Request

```http
POST /post/new
Content-Type: multipart/form-data

{
  "title": "Learning Express.js",
  "desc": "This is a post about learning Express.js",
  "tags": "nodejs,javascript",
  "category": "Programming",
  "image": <file>
}
```

#### Example Response

```json
{
  "_id": "60d0fe4f5311236168a109ca",
  "title": "Learning Express.js",
  "desc": "This is a post about learning Express.js",
  "image": "http://example.com/image.jpg",
  "tags": ["60d0fe4f5311236168a109cb", "60d0fe4f5311236168a109cc"],
  "createdAt": "2021-06-22T18:25:43.511Z",
  "category": "Programming"
}
```

### Add Tag

#### Endpoint

`POST /tag/new`

#### Description

Adds a new tag.

#### Request Body

- `tagName` (string, required): Name of the tag.

#### Response

- `201 Created`: Returns the created tag.
- `400 BAD REQUEST`: If the tag already exists.
- `500 INTERNAL SERVER ERROR`: If there is an internal server error.

#### Example Request

```http
POST /tag/new
Content-Type: application/json

{
  "tagName": "javascript"
}
```

#### Example Response

```json
{
  "_id": "60d0fe4f5311236168a109cb",
  "name": "javascript"
}
```

## Error Responses

- `400 BAD REQUEST`: The request was invalid or cannot be otherwise served.
- `404 NOT FOUND`: The requested resource could not be found.
- `500 INTERNAL SERVER ERROR`: There was an internal server error while processing the request.

## Notes

- Ensure that the tags specified in the `tags` parameter of the `addPost` endpoint exist in the database before creating a post.
- The `getPosts` endpoint supports flexible filtering options through query parameters.
- Pagination is handled through the `page` and `limit` query parameters in the `getPosts` endpoint.
