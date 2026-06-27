use serde::{Deserialize, Serialize};

// 1. Definisikan struct untuk mencocokkan data dari Frontend (JSON)
#[derive(Deserialize)]
pub struct CreateNewsInput {
    pub title: String,
    pub content: String,
    pub author_id: Option<i32>,
}

// 2. Definisikan struct untuk respon balik ke Frontend
#[derive(Serialize)]
pub struct NewsResponse {
    pub id: i32,
    pub title: String,
    pub content: String,
    pub author_id: i32,
}
