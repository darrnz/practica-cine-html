// Estado simple
const moviesEl = document.getElementById('movies');
const formEl = document.getElementById('movie-form');
const favoriteIds = new Set(); // guarda solo IDs
let movies = [];               // lista de películas

// Render básico: crea el HTML de todas las tarjetas
function render(list) {
  moviesEl.innerHTML = list.map(m => {
    const isFav = favoriteIds.has(m.id);
    return `
      <article class="card" data-id="${m.id}">
        <img src="${m.poster}" alt="Poster de ${m.title}"
             onerror="this.src='https://via.placeholder.com/300x450?text=Sin+poster';this.onerror=null">
        <h3>${m.title}</h3>
        <p>(${m.year || ''})</p>
        <button class="fav ${isFav ? 'active' : ''}" data-id="${m.id}">
          ${isFav ? '♥ Quitar favorito' : '♡ Marcar favorito'}
        </button>
      </article>
    `;
  }).join('');
}

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

// Carga rápida desde API (Ghibli). Si falla, pone un fallback simple.
async function loadFromAPI() {
  moviesEl.innerHTML = '<p class="msg">Cargando…</p>';
  try {
    const res = await fetch('https://ghibliapi.vercel.app/films');
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();

    movies = data.slice(0, 12).map(item => ({
      id: item.id,
      title: item.title,
      year: item.release_date,
      poster: item.image || item.movie_banner || 'https://via.placeholder.com/300x450?text=Sin+poster'
    }));
  } catch (err) {
    movies = [
      { id: 'f1', title: 'Fallback 1', year: 2000, poster: 'https://via.placeholder.com/300x450?text=Fallback+1' },
      { id: 'f2', title: 'Fallback 2', year: 2001, poster: 'https://via.placeholder.com/300x450?text=Fallback+2' }
    ];
  }
  render(movies);
}

// Formulario: agrega una peli arriba y re-renderiza
formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  const fd = new FormData(formEl);

  const title = String(fd.get('title') || '').trim();
  const year = Number(fd.get('year'));
  const poster = String(fd.get('poster') || '').trim();

  if (!title || !year || !poster) {
    alert('Completa título, año y póster.');
    return;
  }

  const newMovie = {
    id: 'u' + Date.now(),
    title,
    year,
    poster
  };

  movies.unshift(newMovie);
  render(movies);
  formEl.reset();
  document.getElementById('title').focus();
});

// Arranque
loadFromAPI();
