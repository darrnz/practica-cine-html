// Estado simple
const moviesEl = document.getElementById('movies');
const favoriteIds = new Set(); // guarda solo IDs

// Un solo listener para todos los botones .fav (delegación)
moviesEl.addEventListener('click', (e) => {
  const btn = e.target.closest('.fav');
  if (!btn) return;

  const id = btn.getAttribute('data-id');
  if (favoriteIds.has(id)) {
    favoriteIds.delete(id);
  } else {
    favoriteIds.add(id);
  }

  // Actualiza solo ese botón (simple y rápido)
  const isFav = favoriteIds.has(id);
  btn.classList.toggle('active', isFav);
  btn.textContent = isFav ? '♥ Quitar favorito' : '♡ Marcar favorito';
});

// Example movies array (replace with your actual data source)
const movies = [
  { id: '1', title: 'Movie 1' },
  { id: '2', title: 'Movie 2' },
  { id: '3', title: 'Movie 3' },
  { id: '4', title: 'Movie 4' },
  { id: '5', title: 'Movie 5' }
];

// Render movie elements dynamically
moviesEl.innerHTML = movies.map(movie => `
  <article>
    <h2>${movie.title}</h2>
    <button class="fav" data-id="${movie.id}">♡ Marcar favorito</button>
  </article>
`).join('');
