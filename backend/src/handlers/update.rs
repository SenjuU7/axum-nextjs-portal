use axum::{
    Json,
    extract::{Path, State},
};

use crate::models::news::{CreateNewsInput, NewsResponse};
use sqlx::PgPool;

pub async fn update_news(
    State(pool): State<PgPool>,
    Path(id): Path<i32>,
    Json(payload): Json<CreateNewsInput>,
) -> Result<Json<NewsResponse>, String> {
    let inserted_news = sqlx::query_as!(
        NewsResponse,
        r#"
        UPDATE news 
        SET title = $2, content = $3, author_id = $4
        WHERE id = $1
        RETURNING id, title, content, author_id as "author_id!"
        "#,
        id,
        payload.title,
        payload.content,
        payload.author_id
    )
    .fetch_one(&pool)
    .await
    .map_err(|e| e.to_string())?;

    Ok(Json(inserted_news))
}
