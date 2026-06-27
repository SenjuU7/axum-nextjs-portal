'use client';

import { useState, useEffect } from "react";
import { getNewsList, createNews, deleteNews ,News } from "../api";

export default function NewsPage() {
  const [newsList, setNewsList] = useState<News[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [authorId, setAuthorId] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  interface UpdateNewsInput {
    title: string;
    content: string;
    author_id: number;
  }

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getNewsList();
      setNewsList(data);
    } catch (err) {
      setError("Gagal memuat berita. Pastikan server Rust jalan!");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return alert("Judul dan konten wajib diisi!");

    setLoading(true);
    try {
      await createNews({ title, content, author_id: authorId });
      setTitle("");
      setContent("");
      fetchData();
    } catch (err) {
      alert("Gagal menambah berita! Cek Foreign Key Author ID di DB.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus berita ini?")) return;
    setDeletingId(id);
    try {
      await deleteNews(id);
      fetchData();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  

  return (
    <div className="news-page">

      {/* ── FORM ── */}
      <div className="news-card news-form-card">
        <div className="news-form-header">
          <div className="news-form-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0F6E56" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z" />
            </svg>
          </div>
          <h2 className="news-form-title">Tambah berita baru</h2>
        </div>

        <form onSubmit={handleSubmit} className="news-form-body">
          <div>
            <label className="news-label">Judul berita</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nama judul..."
              className="news-input"
            />
          </div>

          <div>
            <label className="news-label">Isi konten</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Tulis detail beritanya di sini..."
              rows={3}
              className="news-textarea"
            />
          </div>

          <div>
            <label className="news-label">Author ID</label>
            <input
              type="number"
              value={authorId}
              onChange={(e) => setAuthorId(Number(e.target.value))}
              className="news-input news-input-small"
            />
          </div>

          <button type="submit" disabled={loading} className="news-submit">
            {loading ? "Publishing..." : "Publish berita"}
          </button>
        </form>
      </div>

      {/* ── HEADER ── */}
      <div className="news-header">
        <div>
          <h1 className="news-header-title">Portal berita</h1>
          <p className="news-header-sub">Rust × TypeScript</p>
        </div>
        {newsList.length > 0 && (
          <span className="news-count-badge">
            {newsList.length} artikel
          </span>
        )}
      </div>

      {/* ── ERROR ── */}
      {error && (
        <div className="news-error">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#993C1D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {error}
        </div>
      )}

      {/* ── EMPTY STATE ── */}
      {newsList.length === 0 && !error && (
        <div className="news-empty">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="news-empty-icon" aria-hidden="true">
            <path d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10l4 4v10a2 2 0 0 1-2 2z" /><line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <p>Belum ada berita. Publish yang pertama!</p>
        </div>
      )}

      {/* ── LIST ── */}
      <div className="news-list">
        {newsList.map((news) => (
          <article key={news.id} className="news-card news-article">
            <div className="news-article-head">
              <h2 className="news-article-title">{news.title}</h2>
              <span className="news-article-id">#{news.id}</span>
            </div>

            <p className="news-article-content">{news.content}</p>

            <div className="news-article-footer">
              <div className="news-author">
                <div className="news-author-icon">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0F6E56" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <span className="news-author-label">
                  Author ID:{" "}
                  <span className="news-author-id">{news.author_id}</span>
                </span>
              </div>

              <button
                onClick={() => handleDelete(news.id)}
                disabled={deletingId === news.id}
                aria-label="Hapus berita"
                className="news-delete"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4h6v2" />
                </svg>
                {deletingId === news.id ? "Menghapus..." : "Hapus"}
              </button>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
}