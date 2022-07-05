# Full Stack open

**Part 13** from [Full Stack open 2021 course](https://fullstackopen.com/en/). 

Following the course recommendation this part is developed on his own repository.

[Main repository](https://github.com/adecora/fullstackopen) with the other content of the course.

---
## Entity relationship diagram

```mermaid
erDiagram
    users ||--o{ blogs : "writed by"
    blogs {
        integer id PK "autoincrement"
        timestamp created_at "not null, default now"
        timestamp updated_at "not null, default now"
        string author
        string url "not null"
        string title "not null"
        integer likes "default 0"
        integer user_id  FK "not null"
        integre year
    }
    users {
        integer id PK "autoincrement"
        timestamp created_at "not null, default now"
        timestamp updated_at "not null, default now"
        string username  "not null"
        string name "not null"
        string password_hash "not null"
    }
    migrations {
        string name "not null"
    }
    users ||--o{ readinglists : have
    blogs ||--o{ readinglists : "added to"
    readinglists {
        integer id PK "autoincrement"
        integer user_id FK "not null"
        integer blog_id FK "not null"
        boolean read "default false"
    }
    users ||--o{ active_sessions : "session by"
    active_sessions {
        integer id PK "autoincrement"
        integer user_id FK "not null, unique"
        string token "not null, unique"
    }
```