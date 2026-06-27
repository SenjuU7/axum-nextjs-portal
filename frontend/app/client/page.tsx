'use client';

import { useState, useEffect } from "react";
import { getNewsList, createNews, deleteNews, News } from "../api";

export default function NewsPage() {
    const [newsList, setNewsList] = useState<News[]>([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [authorId, setAuthorId] = useState(1);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [deletingId, setDeletingId] = useState<number | null>(null);

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

    return (
        <div className="news-page">
            {error && (
                <div className="news-error">{error}</div>
            )}

            {/* ── LIST BERITA ── */}
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
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}