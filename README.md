# Full Stack open

**Part 13** from [Full Stack open 2021 course](https://fullstackopen.com/en/). 

Following the course recommendation this part is developed on his own repository.

[Main repository](https://github.com/adecora/fullstackopen) with the other content of the course.

---
## Entity relationship diagram

```mermaid
erDiagram
    users ||--o{ blogs : writes
    blogs {
        integer id PK "not null"
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
        integer id PK "not null"
        timestamp created_at "not null, default now"
        timestamp updated_at "not null, default now"
        string username  "not null"
        string name "not null"
        string password_hash "not null"
    }
    migrations {
        string name "not null"
    }
    users ||--o{ readings : have
    blogs ||--o{ readings : added
    readings {
        integer id PK "not null"
        integer user_id FK "not null"
        integer blog_id FK "not null"
        boolean read "default false"
    }
```