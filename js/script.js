/* ============================================================
   TechVibe - الجزء 1: بيانات الكورسات والعرض التفاعلي
   ============================================================ */

// 1. مصفوفة بيانات الدورات التدريبية
const courses = [
  {
    id: 1,
    title: 'دورة تعليم Python',
    desc: 'تعلم Python من الأساسيات حتى بناء التطبيقات والمشاريع البرمجية المتقدمة.',
    image: '../images/python.jpg',
    duration: '8 أسابيع',
    level: 'مبتدئ',
    students: '120 طالب',
    topics: [
      'أساسيات Python وأنواع البيانات',
      'الشروط والحلقات التكرارية',
      'الدوال والبرمجة الكائنية OOP',
      'التعامل مع الملفات والمشاريع التطبيقية'
    ]
  },
  {
    id: 2,
    title: 'دورة تعليم Oracle SQL',
    desc: 'تعلم قواعد البيانات والاستعلامات المتقدمة وإدارة البيانات باحترافية كاملة.',
    image: '../images/sql.jpg',
    duration: '6 أسابيع',
    level: 'متوسط',
    students: '95 طالب',
    topics: [
      'مفاهيم قواعد البيانات RDBMS',
      'جمل الاستعلام SELECT و WHERE و ORDER BY',
      'ربط الجداول JOIN والتجميع GROUP BY',
      'الاستعلامات الفرعية وبناء مشروع متكامل'
    ]
  },
  {
    id: 3,
    title: 'دورة تصميم وتطوير الويب',
    desc: 'تعلم HTML و CSS و JavaScript لبناء واجهات مواقع عصرية وتفاعلية ومتجاوبة.',
    image: '../images/desginweb.jpg',
    duration: '10 أسابيع',
    level: 'مبتدئ إلى متقدم',
    students: '150 طالب',
    topics: [
      'هيكلة الصفحات الدلالية HTML5',
      'تنسيقات CSS3 والتأثيرات الزجاجية',
      'أنظمة التخطيط Flexbox و Grid',
      'تفاعلية واجهات الويب عبر JavaScript'
    ]
  }
];

// 2. دالة توليد بطاقات الكورسات الثلاث في الصفحة الرئيسية
function renderCourses() {
  const container = document.getElementById('coursesContainer');
  if (!container) return;

  container.innerHTML = courses.map(c => `
    <div class="col-12 col-md-6 col-lg-4 mb-4">
      <article class="course-card glass">
        <div class="course-thumb">
          <img src="${c.image}" alt="${c.title}">
        </div>
        <div class="course-body">
          <h3>${c.title}</h3>
          <p>${c.desc}</p>
          <div class="meta">
            <span><i class="fa-regular fa-clock"></i> ${c.duration}</span>
            <span><i class="fa-solid fa-signal"></i> ${c.level}</span>
          </div>
          <a class="main-btn full mt-3" href="../html/course-details.html?id=${c.id}">
            عرض تفاصيل الدورة <i class="fa-solid fa-arrow-left"></i>
          </a>
        </div>
      </article>
    </div>
  `).join('');
}

// 3. دالة عرض تفاصيل الدورة في صفحة course-details.html
function renderCourseDetails() {
  const box = document.getElementById('courseDetails');
  if (!box) return;

  const params = new URLSearchParams(window.location.search);
  const courseId = Number(params.get('id')) || 1;
  const course = courses.find(item => item.id === courseId) || courses[0];

  box.innerHTML = `
    <article class="detail-card glass">
      <div class="detail-top">
        <div class="course-thumb" style="width:120px; height:80px; border-radius:12px; overflow:hidden;">
          <img src="${course.image}" alt="${course.title}" style="width:100%; height:100%; object-fit:cover;">
        </div>
        <div>
          <span class="section-label">الدورة التدريبية</span>
          <h1>${course.title}</h1>
        </div>
      </div>
      <p style="margin: 18px 0; font-size: 16px; color: var(--muted);">${course.desc}</p>
      <div class="meta">
        <span><i class="fa-regular fa-clock"></i> المدة: ${course.duration}</span>
        <span><i class="fa-solid fa-signal"></i> المستوى: ${course.level}</span>
        <span><i class="fa-solid fa-users"></i> المسجلين: ${course.students}</span>
      </div>
      <h2 style="margin-top: 25px; font-size: 22px;">محاور الدورة</h2>
      <ul class="detail-list" style="margin-top: 12px;">
        ${course.topics.map(t => `<li><i class="fa-solid fa-circle-check"></i> ${t}</li>`).join('')}
      ${course.topics.map(t => `<li><i class="fa-solid fa-circle-check"></i> ${t}</li>`).join('')}
      </ul>
      <div class="detail-actions" style="margin-top: 25px; display: flex; gap: 15px;">
        <button class="main-btn" type="button" onclick="showToast('تم إرسال طلب تسجيلك في (${course.title}) بنجاح!')">
          <i class="fa-solid fa-user-plus"></i> التسجيل المباشر
        </button>
        <a class="outline-btn" href="courses.html#coursesSection">
          <i class="fa-solid fa-arrow-right"></i> العودة للدورات
        </a>
      </div>
    </article>
  `;
}
/* ============================================================
   TechVibe - الجزء 2: التنبيهات، المودال، وقائمة الهاتف
   ============================================================ */

// 4. إظهار إشعار Toast عند أي تفاعل ناجح
function showToast(message) {
  const toastEl = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMessage');
  if (!toastEl || !toastMsg) {
    alert(message);
    return;
  }
  toastMsg.textContent = message;

  if (window.bootstrap) {
    bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 3500 }).show();
  } else {
    toastEl.classList.add('show');
    setTimeout(() => toastEl.classList.remove('show'), 3500);
  }
}

// 5. تفعيل قائمة الهاتف المتجاوبة
function initMenu() {
  const toggleBtn = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
  });
}

// 6. نافذة التسجيل السريع المنبثقة Modal
function initModal() {
  const openBtn = document.getElementById('openRegister');
  const modalEl = document.getElementById('registerModal');
  const content = document.getElementById('modalContent');
  if (!openBtn || !modalEl || !content) return;

  openBtn.addEventListener('click', () => {
    const modal = window.bootstrap ? bootstrap.Modal.getOrCreateInstance(modalEl) : null;
    modal?.show();

    content.innerHTML = `
      <form id="ajaxRegisterForm" novalidate>
        <div class="form-group mb-3 text-start">
          <label class="form-label">الاسم الكامل</label>
          <input class="form-control" id="regName" required placeholder="أدخل اسمك الكريم">
        </div>
        <div class="form-group mb-3 text-start">
          <label class="form-label">اختر الدورة</label>
          <select class="form-control" id="regCourse" required>
            <option value="">-- اضغط لاختيار الدورة --</option>
            <option>دورة تعليم Python</option>
            <option>دورة تعليم Oracle SQL</option>
            <option>دورة تصميم وتطوير الويب</option>
          </select>
        </div>
        <button class="main-btn full w-100 mt-2" type="submit">تأكيد التسجيل</button>
      </form>
    `;

    const form = document.getElementById('ajaxRegisterForm');
    form?.addEventListener('submit', e => {
      e.preventDefault();
      modal?.hide();
      showToast('تم استلام طلب تسجيلك بنجاح! سنتواصل معك قريباً.');
    });
  });
}

// 7. تشغيل الدوال فور اكتمال تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  renderCourses();
  renderCourseDetails();
  initMenu();
  initModal();
});
// تشغيل السلايدر التفاعلي البسيط بدون أي مكاتب خارجية
let currentSlideIndex = 0;

function changeSlide(direction) {
  const slides = document.querySelectorAll('.slide-item');
  if (!slides.length) return;

  slides[currentSlideIndex].classList.remove('active');
  currentSlideIndex = (currentSlideIndex + direction + slides.length) % slides.length;
  slides[currentSlideIndex].classList.add('active');
}

// تبديل تلقائي كل 4 ثوانٍ
setInterval(() => {
  changeSlide(1);
}, 4000);
