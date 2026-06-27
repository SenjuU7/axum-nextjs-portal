use axum::{
    Json,
    extract::{State},
};

use crate::models::news::{CreateNewsInput, NewsResponse};
use sqlx::PgPool;

pub async fn create_news(
    State(pool): State<PgPool>,
    Json(payload): Json<CreateNewsInput>,
) -> Result<Json<NewsResponse>, String> {
    let inserted_news = sqlx::query_as!(
        NewsResponse,
        r#"
        INSERT INTO news (title, content, author_id)
        VALUES ($1, $2, $3)
        RETURNING id, title, content, author_id as "author_id!"
        "#,
        payload.title,
        payload.content,
        payload.author_id
    )
    .fetch_one(&pool)
    .await
    .map_err(|e| e.to_string())?;

    Ok(Json(inserted_news))
}
