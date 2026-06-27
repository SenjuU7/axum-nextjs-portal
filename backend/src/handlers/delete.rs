#[warn(unused_imports)]
use axum::{
    extract::{Path, State},
};

use sqlx::PgPool;

pub async fn delete_news(
    State(pool): State<PgPool>,
    Path(id): Path<i32>,
) -> Result<String, String> {
    
    let result = sqlx::query!(
        r#"
        DELETE FROM news WHERE id = $1
        "#,
        id
    )
    .execute(&pool)
    .await
    .map_err(|e| e.to_string())?;

    // Cek apakah ada baris yang terhapus
    if result.rows_affected() == 0 {
        return Err("Berita tidak ditemukan".to_string());
    }

    Ok("Berita berhasil dihapus".to_string())
}
