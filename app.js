const EVENTS_DATA = [
    {
        id: 1,
        title: "Aksi Bersih Pantai Losari",
        category: "lingkungan",
        categoryLabel: "Lingkungan",
        date: "2026-08-22",
        time: "07:00 - 12:00 WIB",
        location: "Pantai Losari, Makassar",
        mapQuery: "Pantai+Losari+Makassar",
        organizer: "Komunitas Hijau Makassar",
        description: "Bergabunglah dalam aksi bersih pantai terbesar di Makassar! Kami akan membersihkan sampah plastik dan edukasi masyarakat tentang pentingnya menjaga kebersihan laut. Kegiatan ini diikuti oleh lebih dari 200 relawan setiap tahunnya.",
        requirements: ["Usia minimal 16 tahun", "Membawa sarung tangan sendiri (opsional)", "Menggunakan pakaian nyaman & sepatu tertutup", "Siap beraktivitas di bawah terik matahari"],
        volunteers: 23,
        maxVolunteers: 50,
        icon: "",
        gradient: "linear-gradient(135deg, #6c5ce7, #00cec9)"
    },
    {
        id: 2,
        title: "Mengajar Anak Desa Cerdas",
        category: "pendidikan",
        categoryLabel: "Pendidikan",
        date: "2026-08-29",
        time: "09:00 - 15:00 WIB",
        location: "SDN 3 Bogor, Jawa Barat",
        mapQuery: "SDN+3+Bogor+Jawa+Barat",
        organizer: "Yayasan Cerdas Bangsa",
        description: "Program mengajar satu hari untuk anak-anak di pedesaan Bogor. Relawan akan mengajar Matematika, Bahasa Inggris, dan kegiatan kreatif. Bawa semangat dan kreativitas kamu!",
        requirements: ["Minimal mahasiswa semester 3", "Pengalaman mengajar (diutamakan)", "Sabar dan menyukai anak-anak", "Membawa alat tulis dan materi sendiri"],
        volunteers: 15,
        maxVolunteers: 30,
        icon: "",
        gradient: "linear-gradient(135deg, #e17055, #fdcb6e)"
    },
    {
        id: 3,
        title: "Donor Darah Massal PMI",
        category: "kesehatan",
        categoryLabel: "Kesehatan",
        date: "2026-09-05",
        time: "08:00 - 16:00 WIB",
        location: "GOR Soemantri, Jakarta Selatan",
        mapQuery: "GOR+Soemantri+Jakarta+Selatan",
        organizer: "PMI DKI Jakarta",
        description: "Event donor darah bulanan bekerja sama dengan PMI DKI Jakarta. Setiap tetes darahmu bisa menyelamatkan nyawa. Tersedia snack dan sertifikat untuk setiap pendonor.",
        requirements: ["Usia 17-60 tahun", "Berat badan minimal 45 kg", "Tidak sedang minum obat tertentu", "Tidur cukup minimal 6 jam sebelum donor"],
        volunteers: 45,
        maxVolunteers: 100,
        icon: "",
        gradient: "linear-gradient(135deg, #e17055, #e056a0)"
    }
];

const MONTHS_ID = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
const MONTHS_FULL = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

function navigateTo(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

    const target = document.getElementById(pageId);
    if (target) {
        target.classList.add('active');
        target.style.animation = 'none';
        target.offsetHeight;
        target.style.animation = '';
    }

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.dataset.nav === pageId);
    });

    closeMobileMenu();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (pageId === 'home') {
        setTimeout(animateStats, 500);
    }
}

document.addEventListener('click', (e) => {
    const navEl = e.target.closest('[data-nav]');
    if (navEl) {
        e.preventDefault();
        navigateTo(navEl.dataset.nav);
    }
});

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
});

function closeMobileMenu() {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
}

window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

function renderEventCards(events) {
    const grid = document.getElementById('eventGrid');
    if (!grid) return;

    if (events.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                <div style="font-size: 3rem; margin-bottom: 1rem;"></div>
                <h3 style="margin-bottom: 0.5rem;">Tidak ada event ditemukan</h3>
                <p style="color: var(--text-secondary);">Coba ubah kata kunci atau filter pencarian</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = events.map((event, i) => {
        const d = new Date(event.date);
        const day = d.getDate();
        const month = MONTHS_ID[d.getMonth()];
        const pct = Math.round((event.volunteers / event.maxVolunteers) * 100);

        return `
            <div class="event-card" style="animation-delay: ${i * 0.1}s" onclick="openEventDetail(${event.id})">
                <div class="event-card-image" style="background: ${event.gradient}">
                    <span class="event-card-category">${event.categoryLabel}</span>
                    <div class="event-card-date-badge">
                        <span class="day">${day}</span>
                        <span class="month">${month}</span>
                    </div>
                    <span style="font-size: 3rem; z-index: 1;">${event.icon}</span>
                </div>
                <div class="event-card-body">
                    <h3>${event.title}</h3>
                    <div class="event-card-meta">
                        <span>${event.location}</span>
                        <span>${event.time}</span>
                        <span>${event.organizer}</span>
                    </div>
                    <div class="event-card-footer">
                        <span class="event-card-volunteers">
                            <strong>${event.volunteers}</strong>/${event.maxVolunteers} relawan (${pct}%)
                        </span>
                        <button class="btn btn-sm btn-primary" onclick="event.stopPropagation(); openRsvpModal(${event.id})">Daftar</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function renderEventHub(events) {
    const grid = document.getElementById('eventHubGrid');
    if (!grid) return;

    grid.innerHTML = events.map((event, i) => {
        const d = new Date(event.date);
        const dateStr = `${d.getDate()} ${MONTHS_FULL[d.getMonth()]} ${d.getFullYear()}`;
        const pct = Math.round((event.volunteers / event.maxVolunteers) * 100);

        return `
            <div class="event-hub-card" style="animation-delay: ${i * 0.08}s">
                <div class="event-hub-card-header">
                    <div>
                        <h3>${event.title}</h3>
                        <span class="badge" style="margin-top: 0.5rem;">${event.categoryLabel}</span>
                    </div>
                </div>
                <div class="event-hub-card-body">
                    <p>${event.description}</p>
                    <div class="event-hub-meta">
                        <span class="event-hub-meta-item">${dateStr}</span>
                        <span class="event-hub-meta-item">${event.time}</span>
                        <span class="event-hub-meta-item">${event.location}</span>
                        <span class="event-hub-meta-item">${event.organizer}</span>
                        <span class="event-hub-meta-item">${event.volunteers}/${event.maxVolunteers} (${pct}%)</span>
                    </div>
                </div>
                <div class="event-hub-card-actions">
                    <button class="btn btn-primary" onclick="openEventDetail(${event.id})">Lihat Detail</button>
                    <button class="btn btn-outline" onclick="openRsvpModal(${event.id})">Daftar / RSVP</button>
                    <button class="btn btn-glass" onclick="addToCalendar(${event.id})">Kalender</button>
                </div>
            </div>
        `;
    }).join('');
}

let currentFilter = 'all';
let currentSearch = '';

function filterAndSearch() {
    let filtered = EVENTS_DATA;

    if (currentFilter !== 'all') {
        filtered = filtered.filter(e => e.category === currentFilter);
    }

    if (currentSearch.trim()) {
        const q = currentSearch.toLowerCase().trim();
        filtered = filtered.filter(e =>
            e.title.toLowerCase().includes(q) ||
            e.location.toLowerCase().includes(q) ||
            e.category.toLowerCase().includes(q) ||
            e.organizer.toLowerCase().includes(q) ||
            e.description.toLowerCase().includes(q)
        );
    }

    renderEventCards(filtered);
}

document.querySelectorAll('.pill[data-filter]').forEach(pill => {
    pill.addEventListener('click', () => {
        document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        currentFilter = pill.dataset.filter;
        filterAndSearch();
    });
});

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

searchInput.addEventListener('input', (e) => {
    currentSearch = e.target.value;
    filterAndSearch();
});

searchBtn.addEventListener('click', () => {
    filterAndSearch();
});

searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        filterAndSearch();
    }
});

function openEventDetail(eventId) {
    const event = EVENTS_DATA.find(e => e.id === eventId);
    if (!event) return;

    const d = new Date(event.date);
    const dateStr = `${d.getDate()} ${MONTHS_FULL[d.getMonth()]} ${d.getFullYear()}`;
    const pct = Math.round((event.volunteers / event.maxVolunteers) * 100);

    const modal = document.getElementById('eventModal');
    const content = document.getElementById('modalContent');

    content.innerHTML = `
        <div class="modal-event-icon">${event.icon}</div>
        <h2 class="modal-event-title">${event.title}</h2>
        <div class="modal-event-category"><span class="badge">${event.categoryLabel}</span></div>
        <p class="modal-event-desc">${event.description}</p>

        <div class="modal-event-info">
            <div class="modal-event-info-item">
                <strong>Tanggal</strong>
                <span>${dateStr}</span>
            </div>
            <div class="modal-event-info-item">
                <strong>Waktu</strong>
                <span>${event.time}</span>
            </div>
            <div class="modal-event-info-item">
                <strong>Lokasi</strong>
                <span>${event.location}</span>
            </div>
            <div class="modal-event-info-item">
                <strong>Penyelenggara</strong>
                <span>${event.organizer}</span>
            </div>
            <div class="modal-event-info-item">
                <strong>Relawan</strong>
                <span>${event.volunteers} / ${event.maxVolunteers} (${pct}%)</span>
            </div>
            <div class="modal-event-info-item">
                <strong>Status</strong>
                <span style="color: ${pct >= 80 ? 'var(--warning)' : 'var(--success)'}">
                    ${pct >= 100 ? 'Penuh' : pct >= 80 ? 'Hampir Penuh' : 'Tersedia'}
                </span>
            </div>
        </div>

        <div class="modal-event-requirements">
            <h4>Syarat & Ketentuan</h4>
            <ul>
                ${event.requirements.map(r => `<li>${r}</li>`).join('')}
            </ul>
        </div>

        <div class="modal-event-map">
            <iframe
                src="https://www.google.com/maps?q=${event.mapQuery}&output=embed"
                allowfullscreen
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                title="Lokasi ${event.title}"
            ></iframe>
        </div>

        <div class="modal-event-actions">
            <button class="btn btn-primary" onclick="closeModal('eventModal'); openRsvpModal(${event.id})">
                Daftar Sekarang
            </button>
            <button class="btn btn-outline" onclick="addToCalendar(${event.id})">
                Tambah ke Kalender
            </button>
        </div>
    `;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function openRsvpModal(eventId) {
    const event = EVENTS_DATA.find(e => e.id === eventId);
    if (!event) return;

    document.getElementById('rsvpEventName').textContent = event.title;
    document.getElementById('rsvpEventId').value = eventId;

    document.getElementById('rsvpForm').style.display = 'flex';
    document.getElementById('rsvpSuccess').style.display = 'none';
    document.getElementById('rsvpForm').reset();
    clearFormErrors('rsvpForm');

    document.getElementById('rsvpModal').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('open');
    document.body.style.overflow = '';
}

document.getElementById('modalClose').addEventListener('click', () => closeModal('eventModal'));
document.getElementById('rsvpModalClose').addEventListener('click', () => closeModal('rsvpModal'));

document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeModal(overlay.id);
        }
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.open').forEach(m => closeModal(m.id));
    }
});

function addToCalendar(eventId) {
    const event = EVENTS_DATA.find(e => e.id === eventId);
    if (!event) return;

    const d = new Date(event.date);
    const dateStr = d.toISOString().replace(/-|:|\.\d+/g, '').slice(0, 8);
    const title = encodeURIComponent(event.title);
    const details = encodeURIComponent(event.description);
    const location = encodeURIComponent(event.location);

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dateStr}/${dateStr}&details=${details}&location=${location}`;
    window.open(url, '_blank');
    showToast('Membuka Google Calendar...');
}

function shareToWhatsApp(eventId) {
    const event = EVENTS_DATA.find(e => e.id === eventId);
    if (!event) return;

    const d = new Date(event.date);
    const dateStr = `${d.getDate()} ${MONTHS_FULL[d.getMonth()]} ${d.getFullYear()}`;
    const text = encodeURIComponent(
        `*${event.title}*\n\n` +
        `${dateStr}\n` +
        `${event.time}\n` +
        `${event.location}\n` +
        `${event.organizer}\n\n` +
        `${event.description.slice(0, 150)}...\n\n` +
        `${event.volunteers}/${event.maxVolunteers} relawan sudah mendaftar!\n\n` +
        `Daftar sekarang di Evene!`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
    showToast('Membuka WhatsApp...');
}

function validateField(inputId, errorId, rules) {
    const input = document.getElementById(inputId);
    const errorEl = document.getElementById(errorId);
    const value = input.value.trim();
    let errorMsg = '';

    for (const rule of rules) {
        if (rule.required && !value) {
            errorMsg = rule.message || 'Field ini wajib diisi';
            break;
        }
        if (rule.email && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            errorMsg = rule.message || 'Format email tidak valid';
            break;
        }
        if (rule.phone && value && !/^(\+62|62|0)8[0-9]{8,12}$/.test(value)) {
            errorMsg = rule.message || 'Format nomor tidak valid (08xxxxxxxxxx)';
            break;
        }
        if (rule.minLength && value && value.length < rule.minLength) {
            errorMsg = rule.message || `Minimal ${rule.minLength} karakter`;
            break;
        }
    }

    if (errorMsg) {
        input.classList.add('error');
        errorEl.textContent = errorMsg;
        return false;
    } else {
        input.classList.remove('error');
        errorEl.textContent = '';
        return true;
    }
}

function clearFormErrors(formId) {
    const form = document.getElementById(formId);
    form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    form.querySelectorAll('.form-error').forEach(el => el.textContent = '');
}

document.getElementById('rsvpForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const nameOk = validateField('rsvpName', 'rsvpNameError', [
        { required: true, message: 'Nama wajib diisi' },
        { minLength: 3, message: 'Nama minimal 3 karakter' }
    ]);
    const emailOk = validateField('rsvpEmail', 'rsvpEmailError', [
        { required: true, message: 'Email wajib diisi' },
        { email: true, message: 'Format email tidak valid' }
    ]);
    const phoneOk = validateField('rsvpPhone', 'rsvpPhoneError', [
        { required: true, message: 'Nomor WhatsApp wajib diisi' },
        { phone: true, message: 'Format: 08xxxxxxxxxx' }
    ]);

    if (nameOk && emailOk && phoneOk) {
        document.getElementById('rsvpForm').style.display = 'none';
        document.getElementById('rsvpSuccess').style.display = 'block';
        showToast('Pendaftaran berhasil!');
    }
});

document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const nameOk = validateField('contactName', 'contactNameError', [
        { required: true, message: 'Nama wajib diisi' }
    ]);
    const emailOk = validateField('contactEmail', 'contactEmailError', [
        { required: true, message: 'Email wajib diisi' },
        { email: true, message: 'Format email tidak valid' }
    ]);
    const subjectOk = validateField('contactSubject', 'contactSubjectError', [
        { required: true, message: 'Pilih subjek pesan' }
    ]);
    const messageOk = validateField('contactMessage', 'contactMessageError', [
        { required: true, message: 'Pesan wajib diisi' },
        { minLength: 10, message: 'Pesan minimal 10 karakter' }
    ]);

    if (nameOk && emailOk && subjectOk && messageOk) {
        document.getElementById('contactForm').style.display = 'none';
        document.getElementById('contactSuccess').style.display = 'block';
        showToast('Pesan berhasil terkirim!');
    }
});

document.getElementById('submitEventForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const fields = [
        ['eventTitle', 'eventTitleError', [{ required: true, message: 'Nama event wajib diisi' }]],
        ['eventCategory', 'eventCategoryError', [{ required: true, message: 'Pilih kategori' }]],
        ['eventDate', 'eventDateError', [{ required: true, message: 'Tanggal wajib diisi' }]],
        ['eventLocation', 'eventLocationError', [{ required: true, message: 'Lokasi wajib diisi' }]],
        ['eventDescription', 'eventDescriptionError', [{ required: true, message: 'Deskripsi wajib diisi' }, { minLength: 20, message: 'Deskripsi minimal 20 karakter' }]],
        ['eventOrganizerName', 'eventOrganizerNameError', [{ required: true, message: 'Nama penyelenggara wajib diisi' }]],
        ['eventOrganizerEmail', 'eventOrganizerEmailError', [{ required: true, message: 'Email wajib diisi' }, { email: true, message: 'Format email tidak valid' }]]
    ];

    let allOk = true;
    for (const [id, errorId, rules] of fields) {
        if (!validateField(id, errorId, rules)) allOk = false;
    }

    if (allOk) {
        document.getElementById('submitEventForm').style.display = 'none';
        document.getElementById('submitEventSuccess').style.display = 'block';
        showToast('Event berhasil diajukan!');
    }
});

function renderFAQ() {
    const list = document.getElementById('faqList');
    if (!list) return;

    list.innerHTML = FAQ_DATA.map((faq, i) => `
        <div class="faq-item" data-faq="${i}">
            <button class="faq-question" onclick="toggleFaq(${i})">
                <span>${faq.q}</span>
                <span class="faq-toggle">+</span>
            </button>
            <div class="faq-answer">
                <p>${faq.a}</p>
            </div>
        </div>
    `).join('');
}

function toggleFaq(index) {
    const item = document.querySelector(`.faq-item[data-faq="${index}"]`);
    if (!item) return;

    const isOpen = item.classList.contains('open');

    document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('open'));

    if (!isOpen) {
        item.classList.add('open');
    }
}

let statsAnimated = false;

function animateStats() {
    if (statsAnimated) return;

    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    if (statNumbers.length === 0) return;

    statsAnimated = true;

    statNumbers.forEach(el => {
        const target = parseInt(el.dataset.target);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = Math.floor(current).toLocaleString('id-ID') + (target >= 100 ? '+' : '');
        }, 16);
    });
}

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
            }
        });
    }, { threshold: 0.3 });

    observer.observe(statsSection);
}

function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMessage');
    toastMsg.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function init() {
    renderEventCards(EVENTS_DATA);
    renderEventHub(EVENTS_DATA);
    renderFAQ();
    setTimeout(animateStats, 1000);
}

document.addEventListener('DOMContentLoaded', init);
