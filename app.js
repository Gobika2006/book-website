const apiURL = '/api/books'; // Use Ingress to proxy /api/ to the backend

async function fetchBooks() {
  try {
    const response = await fetch(apiURL);
    const books = await response.json();
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = '';
    books.forEach(book => {
      const div = document.createElement('div');
      div.className = 'book';
      div.innerHTML = `<strong>${book.title}</strong> by ${book.author}`;
      bookList.appendChild(div);
    });
  } catch (error) {
    console.error('Error fetching books:', error);
  }
}

document.getElementById('book-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;

  try {
    await fetch(apiURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, author })
    });

    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    fetchBooks();
  } catch (error) {
    console.error('Error adding book:', error);
  }
});

// Initial load
fetchBooks();
