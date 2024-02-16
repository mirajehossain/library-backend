# Digital Library

The Digital Library provides library management solution digitally, where user can create new books,
user can see the list of books, update and delete book from the library.

## Setting Up the Project

### Prerequisites

-   Install Node.js
-   Install Docker
-   Install Minikube (optional)

### Install dependencies

```shell
npm install
```

Copy Env file

```shell
cp example.env .env # copy env
```

Run project in docker

```shell
docker compose up --build # run docker compose for build and start the service
```

## How to use the APIs

### 1. Create Book

-   **Endpoint:** `POST /api/v1.0.0/books`
-   **Payload:**

```json
{
    "author": "Mr Author",
    "title": "System design fundamental",
    "publication": "DIMIC PUB",
    "publicationYear": "2018",
    "category": "Technology",
    "description": "System design fundamental"
}
```

-   **Response:**

```json
{
    "success": true,
    "message": "Book is created successfully",
    "data": {
        "title": "System design fundamental",
        "author": "Miraje",
        "publication": "MR PUB",
        "publicationYear": "2018",
        "category": "Tech",
        "slug": "system-design-fundamental",
        "_id": "65ccd2099a97d3a6c81f3170",
        "description": "System design fundamental",
        "createdAt": "2024-02-14T14:45:29.711Z",
        "updatedAt": "2024-02-14T14:45:29.711Z"
    }
}
```

### 2. Get Books

-   **Endpoint:** `GET /api/v1.0.0/books`
-   **Query Parameters:**
    -   page: Page number for pagination.
    -   limit: (optional): Limit per page, default 20.
    -   search: (optional): Text based search on title
-   **Response:**

```json
{
    "success": true,
    "message": "Books fetched successfully",
    "data": [
        {
            "_id": "65cbd2014ffb37cd7421df8b",
            "title": "System design fundamental",
            "author": "Miraje H",
            "publication": "MR PUB",
            "publicationYear": "2018",
            "category": "Tech",
            "slug": "system-design-fundamental",
            "createdAt": "2024-02-13T20:33:05.286Z",
            "updatedAt": "2024-02-13T20:54:33.058Z",
            "summary": "system design handbook"
        }
    ]
}
```

### 3. Get Book Details

-   **Endpoint:** `GET /api/v1.0.0/books/{bookId}`

-   **Response:**

```json
{
    "success": true,
    "message": "Book fetched successfully",
    "data": {
        "_id": "65cbd2014ffb37cd7421df8b",
        "title": "System design fundamental",
        "author": "Miraje H",
        "publication": "MR PUB",
        "publicationYear": "2018",
        "category": "Tech",
        "slug": "system-design-fundamental",
        "createdAt": "2024-02-13T20:33:05.286Z",
        "updatedAt": "2024-02-13T20:54:33.058Z",
        "summary": "system design handbook"
    }
}
```

### 4. Update Book

-   **Endpoint:** `PATCH /api/v1.0.0/books/{bookId}`
-   **Payload:**

```json
{
    "author": "Miraje H",
    "summary": "system design handbook",
    "publication": "MR PUB",
    "publicationYear": "2018",
    "category": "Tech"
}
```

-   **Response:**

```json
{
    "success": true,
    "message": "Book updated successfully",
    "data": {
        "_id": "65cbd2014ffb37cd7421df8b",
        "title": "System design fundamental",
        "author": "Miraje H",
        "publication": "MR PUB",
        "publicationYear": "2018",
        "category": "Tech",
        "slug": "system-design-fundamental",
        "createdAt": "2024-02-13T20:33:05.286Z",
        "updatedAt": "2024-02-13T20:54:33.058Z",
        "summary": "system design handbook"
    }
}
```

### 5. Delete Book

-   **Endpoint:** `DELETE /api/v1.0.0/books/{bookId}`
-   **Response:**

```json
{
    "success": true,
    "message": "Book deleted successfully"
}
```

## Performance consideration

For server scalability, we utilize Kubernetes for efficient orchestration and resource scaling. To
optimize database performance, we will implement replication strategies to manage read-write
operations effectively across multiple instances. Additionally, we can optimize application
performance by implementing caching using Redis. These measures ensure high performance and
reliability of the application.

## Improvement

There are several things that we can improve in current system.

1. **Redis Cache Integration**: Utilizing Redis caching can improve application latency, reducing
   the need for repetitive database queries.

2. **Additional Authorization**: Adding an extra authorization layer enhances security measures,
   ensuring that only authorized users can access the application, and also mitigating unauthorized
   access.

3. **Rate Limiting**: Implementing a rate limiter adds a layer of protection against DDoS attacks
   and malicious bot activity.

4. **Soft Deletion Approach**: Currently, we hard-delete the data from the collection. I believe
   it's best practice to soft-delete rather than hard-delete any data in production. It's allow us
   to easier data recovery and maintaining data integrity over time.
