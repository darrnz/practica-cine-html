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
