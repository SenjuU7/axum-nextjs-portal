#[warn(unused_imports)]
use axum::{
    Json,
    extract::{State},
};

use crate::models::news::{NewsResponse};
use sqlx::PgPool;

pub async fn get_news(State(pool): State<PgPool>) -> Result<Json<Vec<NewsResponse>>, String> {
    let news_list = sqlx::query_as!(
        NewsResponse,
        r#"
        SELECT id, title, content, author_id as "author_id!" FROM news 
        ORDER BY created_at DESC
        "# // ---------------> Perhatikan: author_id as "author_id!"
    )
    .fetch_all(&pool)
    .await
    .map_err(|e| e.to_string())?;

    Ok(Json(news_list))
}
