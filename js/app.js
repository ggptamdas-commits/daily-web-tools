// Main Application Logic
let activeCategory = 'all';
let favorites = JSON.parse(localStorage.getItem('dwt_favorites') || '[]');

// DOM Elements
const toolsGrid = document.getElementById('tools-grid');
const noResults = document.getElementById('no-results');
const categoryTabs = document.querySelectorAll('.category-tab');
const globalSearch = document.getElementById('global-search');
const mobileSearch = document.getElementById('mobile-search');
const favCountSpan = document.getElementById('fav-count');
const toolCountSpan = document.getElementById('tool-count');

// Modal Elements
const toolModal = document.getElementById('tool-modal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalIcon = document.getElementById('modal-icon');
const modalContent = document.getElementById('modal-content');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modalFavBtn = document.getElementById('modal-fav-btn');
let currentModalToolId = null;

// Initialize
function init() {
  updateFavCount();
  if (toolCountSpan) toolCountSpan.textContent = `${TOOLS_DATA.length}+`;
  renderTools();
  setupTheme();
  setupEventListeners();
}

// Render Tools
function renderTools() {
  const searchTerm = (globalSearch?.value || mobileSearch?.value || '').toLowerCase().trim();
  toolsGrid.innerHTML = '';

  const filtered = TOOLS_DATA.filter(tool => {
    const matchesCategory = activeCategory === 'all' 
      ? true 
      : activeCategory === 'favorites' 
        ? favorites.includes(tool.id) 
        : tool.category === activeCategory;

    const matchesSearch = !searchTerm || 
      tool.name.toLowerCase().includes(searchTerm) ||
      tool.desc.toLowerCase().includes(searchTerm) ||
      tool.tags.some(tag => tag.toLowerCase().includes(searchTerm));

    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    noResults.classList.remove('hidden');
  } else {
    noResults.classList.add('hidden');
    filtered.forEach(tool => {
      const isFav = favorites.includes(tool.id);
      const card = document.createElement('div');
      card.className = "tool-card p-5 rounded-2xl bg-white dark:bg-dark-800 border border-gray-200 dark:border-gray-700/70 shadow-sm hover:shadow-md hover:border-brand-500/50 dark:hover:border-brand-500/50 flex flex-col justify-between cursor-pointer group";
      
      card.innerHTML = `
        <div>
          <div class="flex items-start justify-between gap-3 mb-3">
            <div class="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center text-lg group-hover:scale-105 group-hover:bg-brand-500 group-hover:text-white transition">
              <i class="${tool.icon}"></i>
            </div>
            <button class="fav-toggle-btn text-gray-300 dark:text-gray-600 hover:text-amber-500 dark:hover:text-amber-400 text-base transition p-1" data-id="${tool.id}">
              <i class="fa-solid fa-star ${isFav ? 'text-amber-500' : ''}"></i>
            </button>
          </div>
          <h3 class="text-sm sm:text-base font-bold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition mb-1">${tool.name}</h3>
          <p class="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed mb-4">${tool.desc}</p>
        </div>
        <div class="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700/50">
          <span class="text-[11px] font-semibold uppercase tracking-wider text-gray-400">${tool.category}</span>
          <span class="text-xs font-semibold text-brand-600 dark:text-brand-400 group-hover:translate-x-0.5 transition flex items-center gap-1">Open <i class="fa-solid fa-arrow-right text-[10px]"></i></span>
        </div>
      `;

      card.addEventListener('click', (e) => {
        if (e.target.closest('.fav-toggle-btn')) return;
        openToolModal(tool.id);
      });

      const favBtn = card.querySelector('.fav-toggle-btn');
      favBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(tool.id);
      });

      toolsGrid.appendChild(card);
    });
  }
}

// Open Modal
function openToolModal(toolId) {
  const tool = TOOLS_DATA.find(t => t.id === toolId);
  if (!tool) return;

  currentModalToolId = toolId;
  modalTitle.textContent = tool.name;
  modalDesc.textContent = tool.desc;
  modalIcon.innerHTML = `<i class="${tool.icon}"></i>`;
  updateModalFavIcon();

  modalContent.innerHTML = '';
  tool.render(modalContent);

  toolModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

// Close Modal
function closeModal() {
  toolModal.classList.add('hidden');
  document.body.style.overflow = 'auto';
  currentModalToolId = null;
}

// Favorites
function toggleFavorite(toolId) {
  if (favorites.includes(toolId)) {
    favorites = favorites.filter(id => id !== toolId);
    showToast('Removed from favorites');
  } else {
    favorites.push(toolId);
    showToast('Added to favorites!');
  }
  localStorage.setItem('dwt_favorites', JSON.stringify(favorites));
  updateFavCount();
  updateModalFavIcon();
  renderTools();
}

function updateFavCount() {
  if (favCountSpan) favCountSpan.textContent = favorites.length;
}

function updateModalFavIcon() {
  if (!modalFavBtn || !currentModalToolId) return;
  const isFav = favorites.includes(currentModalToolId);
  modalFavBtn.innerHTML = `<i class="fa-solid fa-star ${isFav ? 'text-amber-500' : 'text-gray-400'}"></i>`;
}

// Event Listeners
function setupEventListeners() {
  // Category tabs
  categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      categoryTabs.forEach(t => t.classList.remove('active-tab'));
      tab.classList.add('active-tab');
      activeCategory = tab.dataset.category;
      renderTools();
    });
  });

  // Search
  globalSearch?.addEventListener('input', (e) => {
    if (mobileSearch) mobileSearch.value = e.target.value;
    renderTools();
  });
  mobileSearch?.addEventListener('input', (e) => {
    if (globalSearch) globalSearch.value = e.target.value;
    renderTools();
  });

  // Shortcut / to search
  window.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== globalSearch && document.activeElement !== mobileSearch && !toolModal.contains(document.activeElement)) {
      e.preventDefault();
      globalSearch?.focus();
    }
    if (e.key === 'Escape' && !toolModal.classList.contains('hidden')) {
      closeModal();
    }
  });

  // Modal controls
  modalCloseBtn?.addEventListener('click', closeModal);
  modalFavBtn?.addEventListener('click', () => {
    if (currentModalToolId) toggleFavorite(currentModalToolId);
  });
  toolModal?.addEventListener('click', (e) => {
    if (e.target === toolModal) closeModal();
  });
}

// Dark/Light Theme
function setupTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const isDark = localStorage.getItem('dwt_theme') === 'dark' || 
    (!localStorage.getItem('dwt_theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);

  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  themeToggle?.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    const newTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('dwt_theme', newTheme);
  });
}

// Toast Helper
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  const icon = type === 'error' ? 'fa-triangle-exclamation' : 'fa-circle-check';
  const color = type === 'error' ? 'bg-rose-600 text-white' : 'bg-brand-600 text-white';

  toast.className = `toast-slide-in pointer-events-auto px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 text-xs font-semibold ${color}`;
  toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;

  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 2500);
}

// Copy to Clipboard Helper
function copyToClipboard(text) {
  if (!text) {
    showToast('Nothing to copy!', 'error');
    return;
  }
  navigator.clipboard.writeText(text).then(() => {
    showToast('Copied to clipboard!');
  }).catch(() => {
    showToast('Failed to copy', 'error');
  });
}

document.addEventListener('DOMContentLoaded', init);
