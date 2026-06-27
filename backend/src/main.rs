use axum::routing::put;
#[warn(unused_imports)]
use axum::{
    Router,
    routing::{delete, get, post},
};
use sqlx::PgPool;
use std::net::SocketAddr;
use tower_http::cors::{Any, CorsLayer};

mod handlers;
mod models;
use handlers::{create::create_news, delete::delete_news, read::get_news, update::update_news};

#[tokio::main]
async fn main() {
    dotenvy::dotenv().ok();

    let database_url = std::env::var("DATABASE_URL").unwrap();
    let pool = PgPool::connect(&database_url).await.expect("Error");

    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    let app = Router::new()
        .route("/admin", post(create_news))
        .route("/admin", get(get_news))
        .route("/client", get(get_news))
        .route("/admin/{id}", delete(delete_news))
        .route("/admin/{id}", put(update_news))
        .with_state(pool)
        .layer(cors);

    let addr = SocketAddr::from(([127, 0, 0, 1], 3001));
    println!("Server berjalan di http://{}", addr);
    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
