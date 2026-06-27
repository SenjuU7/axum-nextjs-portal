export interface News {
    id: number;
    title: string;
    content: string;
    author_id: number;
}

export async function getNewsList(): Promise<News[]> {
    // Kita tembak ke port server Rust kamu
    const response = await fetch('http://127.0.0.1:3001/admin', {
        cache: 'no-store', // Biar Next.js selalu ambil data paling fresh (SSR/Dynamic)
    });

    if (!response.ok) {
        throw new Error('Gagal mengambil data dari server Rust');
    }

    const data: News[] = await response.json();
    return data;
}

// Interface untuk data input (tanpa ID karena ID di-generate otomatis oleh DB)
export interface CreateNewsInput {
    title: string;
    content: string;
    author_id: number;
}

export async function createNews(input: CreateNewsInput): Promise<News> {
    const response = await fetch('http://127.0.0.1:3001/admin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
    });

    if (!response.ok) {
        throw new Error('Gagal menambahkan berita ke server Rust');
    }

    return await response.json();
}

// Fungsi untuk menghapus berita berdasarkan ID
export async function deleteNews(id: number): Promise<void> {
    const response = await fetch(`http://127.0.0.1:3001/admin/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Gagal menghapus berita');
    }
}

export async function getNewsClient(): Promise<News[]> {
    // Kita tembak ke port server Rust kamu
    const response = await fetch('http://127.0.0.1:3001/client', {
        cache: 'no-store', // Biar Next.js selalu ambil data paling fresh (SSR/Dynamic)
    });

    if (!response.ok) {
        throw new Error('Gagal mengambil data dari server Rust');
    }

    const data: News[] = await response.json();
    return data;
}


