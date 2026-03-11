# URL Shortening Service

A full-stack URL shortener with a RESTful API backend and a minimal React frontend.
This is a sample solution for the [url-shortening-service challenge](https://roadmap.sh/projects/url-shortening-service) from roadmap.sh.

## Tech Stack

- **Backend:** Node.js, Express.js, TypeScript
- **Frontend:** React, Vite, Tailwind CSS
- **Database:** Supabase (PostgreSQL)

## Prerequisites

- Node.js installed on your machine.
- A [Supabase](https://supabase.com/) project with a `urls` table.

### Database Schema

Create the following table in your Supabase project:

```sql
create table urls (
  short_code  varchar primary key,
  original_url text not null,
  clicks      integer default 0,
  created_at  timestamptz default now(),
  updated_at  timestamptz,
  last_visited timestamptz
);
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/pachara-n/url-shortening-service.git
cd url-shortening-service
```

2. Install dependencies for both server and client:

```bash
cd server && npm install
cd ../client && npm install
```

3. Set up environment variables for the server by copying the example file:

```bash
cd server
cp .env.example .env
```

Then fill in your Supabase credentials in `server/.env`.

## Running Locally

Start the backend server (runs on `http://localhost:8000`):

```bash
cd server
npm run dev
```

Start the frontend (runs on `http://localhost:5173`):

```bash
cd client
npm run dev
```

## API Endpoints

### Create Short URL

```
POST /api/shorten
Content-Type: application/json

{ "url": "https://www.example.com/some/long/url" }
```

### Retrieve URL Info

```
GET /shorten/:code
```

### Update URL

```
PUT /shorten/:code
Content-Type: application/json

{ "url": "https://www.example.com/updated/url" }
```

### Delete URL

```
DELETE /shorten/:code
```

### Get URL Statistics

```
GET /shorten/:code/stats
```

### Redirect to Original URL

```
GET /:code
```
