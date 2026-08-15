/**
 * =====================================================================
 * TechFlow SPA - JavaScript DOM Manipulation Core
 * =====================================================================
 * File ini mendemonstrasikan berbagai teknik manipulasi DOM:
 * 1. DOM Querying (querySelector, getElementById, querySelectorAll)
 * 2. Event Handling (click, submit, input, scroll, change, popstate)
 * 3. Class & Style Manipulation (classList.add/remove/toggle)
 * 4. Dynamic DOM Element Creation (createElement, appendChild, remove)
 * 5. Single Page Application (SPA) Client-side Routing via DOM
 * 6. Dynamic Form Validation & Feedback Toasts
 * =====================================================================
 */

// ==========================================
// 1. DATA STATE & FITUR AWAL (DATA SOURCE)
// ==========================================
let featuresData = [
  {
    id: 1,
    title: "Client-Side SPA Routing",
    category: "dom",
    icon: "fa-route",
    color: "from-blue-500 to-indigo-500",
    desc: "Perpindahan tampilan (view) instan tanpa memuat ulang browser, menjaga state dan efisiensi memori."
  },
  {
    id: 2,
    title: "Dynamic Element Creation",
    category: "dom",
    icon: "fa-wand-magic-sparkles",
    desc: "Menghasilkan elemen HTML, kartu, dan notifikasi langsung dari array JavaScript menggunakan DocumentFragment.",
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 3,
    title: "Realtime Form Validation",
    category: "security",
    icon: "fa-shield-halved",
    desc: "Memeriksa input pengguna secara langsung dan memberikan pesan error instan pada DOM sebelum submit.",
    color: "from-emerald-500 to-teal-500"
  },
  {
    id: 4,
    title: "Light & Dark Mode Switcher",
    category: "performance",
    icon: "fa-circle-half-stroke",
    desc: "Manipulasi root document class (`dark`) yang tersimpan otomatis di LocalStorage peramban.",
    color: "from-amber-500 to-orange-500"
  },
  {
    id: 5,
    title: "Interactive Live Playground",
    category: "dom",
    icon: "fa-sliders",
    desc: "Ubah warna, konten teks, dan icon elemen secara instan melalui event listener pada DOM nodes.",
    color: "from-rose-500 to-red-500"
  },
  {
    id: 6,
    title: "Zero Heavy Framework",
    category: "performance",
    icon: "fa-bolt-lightning",
    desc: "Kecepatan rendering maksimal dengan Vanilla JS murni tanpa overhead framework berukuran besar.",
    color: "from-cyan-500 to-blue-500"
  }
];

// ==========================================
// 2. DOM ELEMENTS SELECTION (DOM QUERYING)
// ==========================================
const views = document.querySelectorAll('.page-view');
const navButtons = document.querySelectorAll('.nav-btn, .nav-link');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuIcon = document.getElementById('mobileMenuIcon');
const themeToggleBtn = document.getElementById('themeToggleBtn');
const themeIcon = document.getElementById('themeIcon');
const featuresGrid = document.getElementById('featuresGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const contactForm = document.getElementById('contactForm');
const toastContainer = document.getElementById('toastContainer');
const currentYearSpan = document.getElementById('currentYear');

// Modal Elements
const addFeatureModal = document.getElementById('addFeatureModal');
const btnOpenAddFeature = document.getElementById('btnOpenAddFeature');
const btnCloseModal = document.getElementById('btnCloseModal');
const newFeatureForm = document.getElementById('newFeatureForm');

// Interactive Hero Playground Elements
const interactiveBox = document.getElementById('interactiveBox');
const interactiveIcon = document.getElementById('interactiveIcon');
const interactiveTitle = document.getElementById('interactiveTitle');
const interactiveText = document.getElementById('interactiveText');
const btnColorChange = document.getElementById('btnColorChange');
const btnTextRandom = document.getElementById('btnTextRandom');
const domStatus = document.getElementById('domStatus');

// ==========================================
// 3. SPA ROUTING VIA DOM MANIPULATION
// ==========================================
/**
 * Berpindah tampilan (view) dengan menyembunyikan view lain
 * dan menampilkan view yang dipilih via manipulasi class 'hidden'.
 * @param {string} pageId - ID halaman target (home, about, fitur, contact)
 */
function navigateTo(pageId) {
  // 1. Validasi keberadaan elemen target
  const targetView = document.getElementById(`view-${pageId}`);
  if (!targetView) return;

  // 2. Sembunyikan semua page-view dengan menambahkan class 'hidden'
  views.forEach(view => {
    view.classList.add('hidden');
    view.classList.remove('animate-fade');
  });

  // 3. Tampilkan target view & picu animasi
  targetView.classList.remove('hidden');
  void targetView.offsetWidth; // Force reflow agar animasi CSS terpicu ulang
  targetView.classList.add('animate-fade');

  // 4. Perbarui indikator tombol navigasi yang aktif (Active State)
  updateActiveNav(pageId);

  // 5. Tutup mobile menu jika sedang terbuka
  if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
    toggleMobileMenu(false);
  }

  // 6. Update URL Hash tanpa memicu page reload
  window.history.pushState({ page: pageId }, '', `#${pageId}`);

  // 7. Scroll ke atas halaman dengan halus
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // 8. Jika membuka halaman home, trigger animasi counter angka
  if (pageId === 'home') {
    startCounters();
  }
}

/**
 * Memperbarui status tombol navigasi aktif
 */
function updateActiveNav(pageId) {
  navButtons.forEach(btn => {
    if (btn.dataset.page === pageId) {
      btn.classList.add('active-nav');
    } else {
      btn.classList.remove('active-nav');
    }
  });
}

// Pasang event listener ke seluruh tombol & link navigasi
navButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const targetPage = btn.dataset.page;
    if (targetPage) {
      navigateTo(targetPage);
    }
  });
});

// Listener untuk tombol Back/Forward browser
window.addEventListener('popstate', () => {
  const hash = window.location.hash.replace('#', '') || 'home';
  navigateTo(hash);
});

// ==========================================
// 4. DYNAMIC FEATURES RENDERING (DOM CREATION)
// ==========================================
/**
 * Merender daftar fitur ke dalam container #featuresGrid
 * @param {Array} list - Array objek fitur
 */
function renderFeatures(list) {
  // Kosongkan isi grid sebelumnya
  featuresGrid.innerHTML = '';

  if (list.length === 0) {
    featuresGrid.innerHTML = `
      <div class="col-span-full py-12 text-center text-slate-400">
        <i class="fa-solid fa-folder-open text-4xl mb-3"></i>
        <p>Tidak ada fitur dalam kategori ini.</p>
      </div>
    `;
    return;
  }

  // Fragment untuk optimalisasi performa rendering DOM
  const fragment = document.createDocumentFragment();

  list.forEach(item => {
    // 1. Buat elemen card utama
    const card = document.createElement('div');
    card.className = 'group bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between animate-fade';
    card.setAttribute('data-id', item.id);

    // 2. Isi konten card via template HTML
    card.innerHTML = `
      <div class="space-y-4">
        <div class="w-12 h-12 rounded-xl bg-gradient-to-tr ${item.color || 'from-indigo-500 to-brand-600'} text-white flex items-center justify-center text-xl shadow-md shadow-brand-500/20 group-hover:scale-110 transition-transform">
          <i class="fa-solid ${item.icon}"></i>
        </div>
        <div>
          <span class="inline-block px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-slate-100 dark:bg-slate-700/70 text-slate-600 dark:text-slate-300 mb-2">
            ${item.category.toUpperCase()}
          </span>
          <h3 class="text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-indigo-400 transition-colors">
            ${escapeHtml(item.title)}
          </h3>
        </div>
        <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
          ${escapeHtml(item.desc)}
        </p>
      </div>

      <div class="pt-5 mt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
        <span class="text-xs font-semibold text-brand-600 dark:text-indigo-400">Aktif & Siap Pakai</span>
        <button class="delete-feature-btn text-xs text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors p-1" title="Hapus Fitur (DOM remove)">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    `;

    // 3. Pasang Event Listener untuk tombol hapus kartu fitur (DOM Deletion)
    const deleteBtn = card.querySelector('.delete-feature-btn');
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteFeature(item.id, card);
    });

    fragment.appendChild(card);
  });

  // Masukkan fragment ke dalam DOM
  featuresGrid.appendChild(fragment);
}

/**
 * Menghapus fitur dari Array & menghapus node dari DOM
 */
function deleteFeature(id, cardElement) {
  // Hapus dari data array
  featuresData = featuresData.filter(f => f.id !== id);

  // Animasi pengecilan sebelum node di-remove dari DOM
  cardElement.style.transition = 'all 0.25s ease';
  cardElement.style.opacity = '0';
  cardElement.style.transform = 'scale(0.8)';

  setTimeout(() => {
    cardElement.remove(); // DOM element remove() method
    showToast('Fitur berhasil dihapus dari DOM!', 'info');
  }, 250);
}

/**
 * Filter fitur berdasarkan kategori
 */
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // 1. Update status tombol filter
    filterButtons.forEach(b => {
      b.classList.remove('active-filter');
      b.classList.add('bg-white', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300', 'border', 'border-slate-200', 'dark:border-slate-700');
    });

    btn.classList.add('active-filter');
    btn.classList.remove('bg-white', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300', 'border', 'border-slate-200', 'dark:border-slate-700');

    // 2. Filter data
    const category = btn.dataset.category;
    if (category === 'all') {
      renderFeatures(featuresData);
    } else {
      const filtered = featuresData.filter(f => f.category === category);
      renderFeatures(filtered);
    }
  });
});

// ==========================================
// 5. MODAL TAMBAH FITUR DINAMIS
// ==========================================
function toggleModal(show) {
  if (show) {
    addFeatureModal.classList.remove('hidden');
    addFeatureModal.classList.add('flex');
    document.body.classList.add('overflow-hidden');
  } else {
    addFeatureModal.classList.add('hidden');
    addFeatureModal.classList.remove('flex');
    document.body.classList.remove('overflow-hidden');
    newFeatureForm.reset();
  }
}

btnOpenAddFeature.addEventListener('click', () => toggleModal(true));
btnCloseModal.addEventListener('click', () => toggleModal(false));
addFeatureModal.addEventListener('click', (e) => {
  if (e.target === addFeatureModal) toggleModal(false);
});

// Form submit untuk menambah data fitur baru ke DOM
newFeatureForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('newFeatureTitle').value.trim();
  const desc = document.getElementById('newFeatureDesc').value.trim();
  const category = document.getElementById('newFeatureCategory').value;
  const icon = document.getElementById('newFeatureIcon').value;

  if (!title || !desc) return;

  // Warna gradasi acak
  const gradientList = [
    'from-emerald-500 to-teal-500',
    'from-pink-500 to-rose-500',
    'from-cyan-500 to-blue-500',
    'from-violet-500 to-purple-500',
    'from-amber-500 to-yellow-500'
  ];
  const randomGradient = gradientList[Math.floor(Math.random() * gradientList.length)];

  const newFeature = {
    id: Date.now(),
    title,
    desc,
    category,
    icon,
    color: randomGradient
  };

  // Tambahkan ke array
  featuresData.unshift(newFeature);

  // Render ulang ke DOM
  renderFeatures(featuresData);

  // Reset tombol filter ke 'Semua'
  filterButtons[0].click();

  toggleModal(false);
  showToast('Fitur baru berhasil ditambahkan ke DOM!', 'success');
});

// ==========================================
// 6. INTERACTIVE HERO DOM PLAYGROUND
// ==========================================
const sampleColors = [
  { name: 'Indigo Dream', bg: 'from-indigo-500 to-purple-600', icon: 'fa-wand-magic-sparkles' },
  { name: 'Emerald Forest', bg: 'from-emerald-500 to-teal-600', icon: 'fa-leaf' },
  { name: 'Sunset Glow', bg: 'from-rose-500 to-orange-500', icon: 'fa-fire' },
  { name: 'Cyber Neon', bg: 'from-cyan-500 to-blue-600', icon: 'fa-microchip' },
  { name: 'Golden Sun', bg: 'from-amber-500 to-yellow-500', icon: 'fa-sun' }
];

const sampleQuotes = [
  "DOM Manipulation memungkinkan pengalaman web yang sangat cepat dan interaktif!",
  "Manipulasi state langsung mengubah antarmuka seketika tanpa refresh.",
  "Event Listener siap merespon setiap klik, ketikan, dan pergerakan kursor.",
  "Performa murni JavaScript Vanilla sangat ringan dan hemat sumber daya."
];

let colorIndex = 0;

btnColorChange.addEventListener('click', () => {
  colorIndex = (colorIndex + 1) % sampleColors.length;
  const current = sampleColors[colorIndex];

  // Ganti icon class
  interactiveIcon.className = `fa-solid ${current.icon}`;
  
  // Ganti icon wrapper gradient background
  const iconWrapper = interactiveIcon.parentElement;
  iconWrapper.className = `w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr ${current.bg} text-white flex items-center justify-center text-2xl shadow-lg transition-all duration-300`;

  // Update status label
  domStatus.innerText = `Tema diubah ke '${current.name}' (Manipulasi classList & className)`;
});

btnTextRandom.addEventListener('click', () => {
  const randomText = sampleQuotes[Math.floor(Math.random() * sampleQuotes.length)];
  interactiveText.innerText = randomText;
  
  // Animasi kedip teks via manipulasi style
  interactiveText.style.opacity = '0';
  setTimeout(() => {
    interactiveText.style.opacity = '1';
    interactiveText.style.transition = 'opacity 0.3s ease';
  }, 50);

  domStatus.innerText = `Teks diubah menggunakan innerText property`;
});

// ==========================================
// 7. ACCORDION FAQ DOM MANIPULATION
// ==========================================
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
  header.addEventListener('click', () => {
    const body = header.nextElementSibling;
    const icon = header.querySelector('i');

    const isOpen = !body.classList.contains('hidden');

    // Tutup semua accordion body lainnya
    document.querySelectorAll('.accordion-body').forEach(b => b.classList.add('hidden'));
    document.querySelectorAll('.accordion-header i').forEach(i => i.classList.remove('rotate-180'));

    // Toggle current
    if (!isOpen) {
      body.classList.remove('hidden');
      icon.classList.add('rotate-180');
    }
  });
});

// ==========================================
// 8. CONTACT FORM DYNAMIC VALIDATION & SUBMISSION
// ==========================================
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const nameInput = document.getElementById('contactName');
  const emailInput = document.getElementById('contactEmail');
  const messageInput = document.getElementById('contactMessage');

  const errorName = document.getElementById('errorName');
  const errorEmail = document.getElementById('errorEmail');
  const errorMessage = document.getElementById('errorMessage');

  let isValid = true;

  // 1. Validasi Nama (Minimal 3 karakter)
  if (nameInput.value.trim().length < 3) {
    errorName.classList.remove('hidden');
    nameInput.classList.add('border-red-500', 'focus:ring-red-500');
    isValid = false;
  } else {
    errorName.classList.add('hidden');
    nameInput.classList.remove('border-red-500', 'focus:ring-red-500');
  }

  // 2. Validasi Email dengan Regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailInput.value.trim())) {
    errorEmail.classList.remove('hidden');
    emailInput.classList.add('border-red-500', 'focus:ring-red-500');
    isValid = false;
  } else {
    errorEmail.classList.add('hidden');
    emailInput.classList.remove('border-red-500', 'focus:ring-red-500');
  }

  // 3. Validasi Pesan (Minimal 10 karakter)
  if (messageInput.value.trim().length < 10) {
    errorMessage.classList.remove('hidden');
    messageInput.classList.add('border-red-500', 'focus:ring-red-500');
    isValid = false;
  } else {
    errorMessage.classList.add('hidden');
    messageInput.classList.remove('border-red-500', 'focus:ring-red-500');
  }

  if (!isValid) return;

  // Manipulasi tombol saat proses pengiriman simulasi
  const submitBtn = document.getElementById('btnSubmitContact');
  const submitText = document.getElementById('btnSubmitText');
  const submitIcon = document.getElementById('btnSubmitIcon');

  submitBtn.disabled = true;
  submitText.innerText = 'Mengirim Pesan...';
  submitIcon.className = 'fa-solid fa-spinner fa-spin text-xs';

  setTimeout(() => {
    // Reset Form & Tombol
    contactForm.reset();
    submitBtn.disabled = false;
    submitText.innerText = 'Kirim Pesan Sekarang';
    submitIcon.className = 'fa-solid fa-paper-plane text-xs';

    // Tampilkan Toast Notifikasi Dinamis
    showToast(`Terima kasih, ${escapeHtml(nameInput.value.trim())}! Pesan Anda telah terkirim.`, 'success');
  }, 1000);
});

// ==========================================
// 9. DYNAMIC TOAST NOTIFICATION (DOM INJECTION)
// ==========================================
/**
 * Membuat notifikasi toast dinamis dan menempelkannya ke dalam DOM
 * @param {string} message - Pesan notifikasi
 * @param {'success'|'info'|'error'} type - Tipe notifikasi
 */
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  
  let bgGradient = 'from-slate-900 to-slate-800 text-white';
  let iconClass = 'fa-circle-info text-blue-400';

  if (type === 'success') {
    bgGradient = 'from-emerald-600 to-teal-700 text-white';
    iconClass = 'fa-circle-check text-emerald-200';
  } else if (type === 'error') {
    bgGradient = 'from-rose-600 to-red-700 text-white';
    iconClass = 'fa-circle-exclamation text-rose-200';
  }

  toast.className = `pointer-events-auto flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-gradient-to-r ${bgGradient} shadow-2xl border border-white/10 text-sm font-medium animate-fadeIn transition-all duration-300`;
  
  toast.innerHTML = `
    <i class="fa-solid ${iconClass} text-base"></i>
    <span class="flex-grow">${message}</span>
    <button class="text-white/70 hover:text-white ml-2 transition-colors">
      <i class="fa-solid fa-xmark"></i>
    </button>
  `;

  // Tombol close manual
  toast.querySelector('button').addEventListener('click', () => {
    toast.remove();
  });

  toastContainer.appendChild(toast);

  // Auto remove setelah 3.5 detik
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ==========================================
// 10. THEME SWITCHER (DARK / LIGHT MODE)
// ==========================================
function initTheme() {
  const savedTheme = localStorage.getItem('techflow_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
    themeIcon.className = 'fa-solid fa-sun';
  } else {
    document.documentElement.classList.remove('dark');
    themeIcon.className = 'fa-solid fa-moon';
  }
}

themeToggleBtn.addEventListener('click', () => {
  const isDark = document.documentElement.classList.toggle('dark');
  if (isDark) {
    themeIcon.className = 'fa-solid fa-sun';
    localStorage.setItem('techflow_theme', 'dark');
    showToast('Mode gelap diaktifkan', 'info');
  } else {
    themeIcon.className = 'fa-solid fa-moon';
    localStorage.setItem('techflow_theme', 'light');
    showToast('Mode terang diaktifkan', 'info');
  }
});

// ==========================================
// 11. MOBILE MENU TOGGLE
// ==========================================
function toggleMobileMenu(forceState) {
  const shouldOpen = forceState !== undefined ? forceState : mobileMenu.classList.contains('hidden');
  
  if (shouldOpen) {
    mobileMenu.classList.remove('hidden');
    mobileMenuIcon.className = 'fa-solid fa-xmark text-lg';
  } else {
    mobileMenu.classList.add('hidden');
    mobileMenuIcon.className = 'fa-solid fa-bars text-lg';
  }
}

mobileMenuBtn.addEventListener('click', () => toggleMobileMenu());

// ==========================================
// 12. ANIMATED STATISTICS COUNTER
// ==========================================
let counterStarted = false;

function startCounters() {
  const counters = document.querySelectorAll('.stat-counter');
  
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    let count = 0;
    const speed = 20;
    const increment = Math.ceil(target / 40);

    const updateCount = () => {
      count += increment;
      if (count < target) {
        counter.innerText = count;
        setTimeout(updateCount, speed);
      } else {
        counter.innerText = target + (target === 99 ? '%' : '+');
      }
    };

    updateCount();
  });
}

// ==========================================
// 13. UTILITY HELPER FUNCTIONS
// ==========================================
function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ==========================================
// 14. APPLICATION INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // 1. Inisialisasi tema
  initTheme();

  // 2. Set tahun otomatis pada footer
  if (currentYearSpan) {
    currentYearSpan.innerText = new Date().getFullYear();
  }

  // 3. Render data fitur awal ke dalam DOM
  renderFeatures(featuresData);

  // 4. Periksa initial URL Hash untuk SPA routing
  const initialPage = window.location.hash.replace('#', '') || 'home';
  navigateTo(initialPage);
});
