/* =====================================================
   Malinja College - Complete Unified Script (js/script.js)
   ===================================================== */

var BRAND = "Malinja College";
var DEVELOPER = "Ordinary Person";
var perPage = 5;
var studentPage = 1, complaintPage = 1, activityPage = 1;

/* ---------- Helpers ---------- */
function pad(n) { return String(n).padStart(2, "0"); }
function esc(t) { var d = document.createElement("div"); d.textContent = t; return d.innerHTML; }
function to12(t) { var p = t.split(":"), h = +p[0]; return (h % 12 || 12) + ":" + p[1] + " " + (h >= 12 ? "PM" : "AM"); }

function loadData(key, fallback) {
  try {
    var d = localStorage.getItem(key);
    return d ? JSON.parse(d) : fallback;
  } catch (e) { return fallback; }
}
function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function fixPage(page, total) {
  var max = Math.max(1, Math.ceil(total / perPage));
  return Math.min(Math.max(1, page), max);
}

function makePager(elId, total, page, fnName) {
  var el = document.getElementById(elId);
  if (!el) return;
  var pages = Math.ceil(total / perPage);
  if (pages <= 1) { el.innerHTML = ""; return; }
  var h = "<nav class='mt-3'><ul class='pagination pagination-sm justify-content-end mb-0'>";
  h += "<li class='page-item" + (page === 1 ? " disabled" : "") + "'><a class='page-link' href='#' onclick='event.preventDefault();" + fnName + "(" + (page - 1) + ")'>Previous</a></li>";
  for (var i = 1; i <= pages; i++) {
    h += "<li class='page-item" + (i === page ? " active" : "") + "'><a class='page-link' href='#' onclick='event.preventDefault();" + fnName + "(" + i + ")'>" + i + "</a></li>";
  }
  h += "<li class='page-item" + (page === pages ? " disabled" : "") + "'><a class='page-link' href='#' onclick='event.preventDefault();" + fnName + "(" + (page + 1) + ")'>Next</a></li></ul></nav>";
  el.innerHTML = h;
}

function showToast(msg) {
  var t = document.createElement("div");
  t.className = "fixed bottom-4 right-4 bg-dark text-white px-4 py-2 rounded-pill shadow z-50";
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(function () { t.remove(); }, 2500);
}

function downloadCSV(csv, filename) {
  var a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  a.download = filename;
  a.click();
}

/* ---------- Default Sample Data (30 Students, 10 Activities, Full English) ---------- */
var users = loadData("crmsUsers", [
  { username: "admin", password: "admin123", role: "Admin" }
]);

var students = loadData("crmsStudents_v4", [
  { id: "2026101", name: "Ahmad Daniel Hakimi", programme: "Information Systems", block: "Block A", room: "A-101" },
  { id: "2026102", name: "Nur Aisyah Humaira", programme: "Computer Science", block: "Block B", room: "B-102" },
  { id: "2026103", name: "Siti Nurhaliza Zulkifli", programme: "Software Engineering", block: "Block B", room: "B-103" },
  { id: "2026104", name: "Muhammad Amirul Haziq", programme: "Data Analytics", block: "Block A", room: "A-104" },
  { id: "2026105", name: "Nurul Izzah Rahman", programme: "Information Management", block: "Block C", room: "C-105" },
  { id: "2026106", name: "Wan Muhammad Syafiq", programme: "Cyber Security", block: "Block A", room: "A-106" },
  { id: "2026107", name: "Puteri Balqis Azman", programme: "Business Computing", block: "Block B", room: "B-107" },
  { id: "2026108", name: "Khairul Anuar Ismail", programme: "Network Engineering", block: "Block A", room: "A-108" },
  { id: "2026109", name: "Farah Nabila Yusof", programme: "Library Science", block: "Block C", room: "C-109" },
  { id: "2026110", name: "Muhammad Hafizuddin", programme: "Multimedia Computing", block: "Block A", room: "A-110" },
  { id: "2026111", name: "Ainul Mardhiah Roslan", programme: "Records Management", block: "Block C", room: "C-201" },
  { id: "2026112", name: "Tengku Adam Harith", programme: "Artificial Intelligence", block: "Block B", room: "B-202" },
  { id: "2026113", name: "Nurin Qistina Salleh", programme: "Information Systems", block: "Block C", room: "C-203" },
  { id: "2026114", name: "Muhammad Irfan Zakaria", programme: "Computer Science", block: "Block A", room: "A-204" },
  { id: "2026115", name: "Aina Sofea Kamarudin", programme: "Software Engineering", block: "Block B", room: "B-205" },
  { id: "2026116", name: "Zulfadli Hakim Omar", programme: "Data Analytics", block: "Block A", room: "A-206" },
  { id: "2026117", name: "Syaza Batrisyia Hamid", programme: "Information Management", block: "Block C", room: "C-207" },
  { id: "2026118", name: "Amirul Mukminin Razak", programme: "Cyber Security", block: "Block A", room: "A-208" },
  { id: "2026119", name: "Nurul Huda Mohamad", programme: "Business Computing", block: "Block B", room: "B-209" },
  { id: "2026120", name: "Haziq Aiman Sulaiman", programme: "Network Engineering", block: "Block A", room: "A-210" },
  { id: "2026121", name: "Intan Syafinaz Bakar", programme: "Library Science", block: "Block C", room: "C-301" },
  { id: "2026122", name: "Muhammad Luqman Hakim", programme: "Multimedia Computing", block: "Block A", room: "A-302" },
  { id: "2026123", name: "Dahlia Yasmin Abdullah", programme: "Records Management", block: "Block B", room: "B-303" },
  { id: "2026124", name: "Firdaus Naim Mansor", programme: "Artificial Intelligence", block: "Block A", room: "A-304" },
  { id: "2026125", name: "Siti Sarah Hashim", programme: "Information Systems", block: "Block C", room: "C-305" },
  { id: "2026126", name: "Raja Iskandar Shah", programme: "Computer Science", block: "Block A", room: "A-306" },
  { id: "2026127", name: "Nadia Natasha Karim", programme: "Software Engineering", block: "Block B", room: "B-307" },
  { id: "2026128", name: "Muhammad Syahir Azmi", programme: "Data Analytics", block: "Block A", room: "A-308" },
  { id: "2026129", name: "Aleeya Maisarah Jalil", programme: "Information Management", block: "Block C", room: "C-309" },
  { id: "2026130", name: "Danish Haikal Fauzi", programme: "Cyber Security", block: "Block B", room: "B-310" }
]);

var complaints = loadData("crmsComplaints_v4", [
  { id: "CMP-001", student: "Ahmad Daniel Hakimi", category: "Electrical", date: "2026-11-01", status: "Resolved" },
  { id: "CMP-002", student: "Nur Aisyah Humaira", category: "Internet", date: "2026-11-05", status: "In Progress" },
  { id: "CMP-003", student: "Siti Nurhaliza Zulkifli", category: "Plumbing", date: "2026-11-12", status: "Pending" },
  { id: "CMP-004", student: "Muhammad Amirul Haziq", category: "Furniture", date: "2026-11-15", status: "Pending" },
  { id: "CMP-005", student: "Nurul Izzah Rahman", category: "Cleanliness", date: "2026-11-18", status: "Resolved" }
]);

var facilities = loadData("crmsFacilities_v4", [
  { name: "Main Study Hall", block: "Block A", capacity: 60, status: "Available" },
  { name: "Self-Service Laundry", block: "Block B", capacity: 15, status: "Available" },
  { name: "Al-Malinja Prayer Hall", block: "Block C", capacity: 120, status: "Available" },
  { name: "Indoor Badminton Court", block: "Central", capacity: 20, status: "Maintenance" }
]);

var activities = loadData("crmsActivities_v4", [
  { name: "Freshmen Orientation Night", date: "2026-11-22", time: "20:30", location: "Malinja Main Hall", description: "Welcome session and ice-breaking activities for new college residents." },
  { name: "Campus Clean-Up Campaign", date: "2026-11-28", time: "08:00", location: "All Residential Blocks", description: "Community clean-up and recycling awareness program across all blocks." },
  { name: "Inter-Block Futsal Tournament", date: "2026-12-03", time: "16:30", location: "College Sports Complex", description: "Annual futsal championship competing for the Principal's Trophy." },
  { name: "Weekly Spiritual Talk & Prayer", date: "2026-12-06", time: "19:30", location: "Al-Malinja Prayer Hall", description: "Evening motivational lecture and congregational prayer before finals." },
  { name: "Time Management & Career Workshop", date: "2026-12-10", time: "09:00", location: "Block A Seminar Room", description: "Resume writing, interview preparation, and exam stress management." },
  { name: "Cultural & Appreciation Night", date: "2026-12-14", time: "20:00", location: "Malinja Main Hall", description: "Student cultural performances and excellence awards ceremony." },
  { name: "Fire Safety & Emergency Drill", date: "2026-12-18", time: "10:00", location: "Central Courtyard", description: "Mandatory evacuation briefing and fire extinguisher training with fire department." },
  { name: "Midnight Study & Coffee Session", date: "2026-12-22", time: "21:30", location: "Main Study Hall", description: "Peer tutoring and free coffee night during final examination week." },
  { name: "Community Charity & Blood Drive", date: "2026-12-27", time: "09:30", location: "College Foyer", description: "Blood donation campaign and charity collection in collaboration with local hospital." },
  { name: "End-of-Semester Townhall Meeting", date: "2026-12-30", time: "15:00", location: "Malinja Main Hall", description: "Open dialogue session between residents and college management." }
]);

var feedback = loadData("crmsFeedback_v4", [
  { name: "Nur Aisyah Humaira", stars: 5, text: "The portal is very clean and makes tracking room maintenance requests effortless.", date: "2026-11-10" },
  { name: "Muhammad Amirul Haziq", stars: 4, text: "Fast response from the management team. Would love to see even more sports events.", date: "2026-11-14" },
  { name: "Puteri Balqis Azman", stars: 5, text: "Dark mode is super comfortable at night and the activity schedule is very helpful!", date: "2026-11-18" }
]);
var fbStars = 0;

/* ---------- Navigation Menu ---------- */
var menu = [
  { page: "dashboard", file: "dashboard.html", icon: "bi-speedometer2", text: "Dashboard" },
  { page: "students", file: "students.html", icon: "bi-people", text: "Students" },
  { page: "complaints", file: "complaints.html", icon: "bi-exclamation-circle", text: "Complaints" },
  { page: "facilities", file: "facilities.html", icon: "bi-building-check", text: "Facilities" },
  { page: "activities", file: "activities.html", icon: "bi-calendar-event", text: "Activities" },
  { page: "feedback", file: "feedback.html", icon: "bi-star", text: "Feedback & Rating" },
  { page: "faq", file: "faq.html", icon: "bi-question-circle", text: "FAQ" }
];

/* ---------- Branding Setup ---------- */
document.title = document.title.replace("CRMS", BRAND);
(function () {
  var h = document.getElementById("loginForm") && document.querySelector(".card-body h4");
  if (h) { h.textContent = BRAND; }
  var lf = document.querySelector(".login-footer");
  if (lf) { lf.innerHTML = "&copy; 2026 " + BRAND + " | IMS566 Individual Project | Developed by " + DEVELOPER; }
})();

/* ---------- Auth (Login / Register / Logout) ---------- */
function showTab(tab) {
  document.getElementById("loginForm").classList.toggle("hidden", tab !== "login");
  document.getElementById("registerForm").classList.toggle("hidden", tab !== "register");
  document.getElementById("tabLogin").className = tab === "login" ? "btn btn-primary flex-1" : "btn btn-outline-secondary flex-1";
  document.getElementById("tabRegister").className = tab === "register" ? "btn btn-primary flex-1" : "btn btn-outline-secondary flex-1";
}

function login(e) {
  e.preventDefault();
  var u = document.getElementById("username").value.trim();
  var p = document.getElementById("password").value;
  var found = users.find(function (x) { return x.username === u && x.password === p; });
  if (found) {
    localStorage.setItem("crmsCurrentUser", u);
    window.location.href = "dashboard.html";
  } else {
    document.getElementById("loginError").classList.remove("hidden");
  }
}

function register(e) {
  e.preventDefault();
  var u = document.getElementById("regUsername").value.trim();
  var p = document.getElementById("regPassword").value;
  var c = document.getElementById("regConfirm").value;
  var err = document.getElementById("registerError");
  if (p.length < 6) { err.textContent = "Password must be at least 6 characters."; err.classList.remove("hidden"); return; }
  if (p !== c) { err.textContent = "Passwords do not match."; err.classList.remove("hidden"); return; }
  if (users.some(function (x) { return x.username === u; })) { err.textContent = "Username already exists."; err.classList.remove("hidden"); return; }
  users.push({ username: u, password: p, role: "Resident" });
  saveData("crmsUsers", users);
  err.classList.add("hidden");
  showTab("login");
  document.getElementById("loginSuccess").classList.remove("hidden");
  document.getElementById("username").value = u;
}

function logout() {
  bgAudio.pause();
  bgAudio.currentTime = 0;
  musicPlaying = false;
  localStorage.setItem("crmsMusicOn", "false");
  localStorage.removeItem("crmsMusicTime");
  localStorage.removeItem("crmsCurrentUser");
  window.location.href = "index.html";
}

/* ---------- Theme & Cafe Lo-Fi Ambient Music (Persistent Across Pages) ---------- */
function applyTheme(t) {
  var dark = t === "dark";
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.setAttribute("data-bs-theme", dark ? "dark" : "light");
  document.querySelectorAll(".theme-icon").forEach(function (i) {
    i.className = "theme-icon bi " + (dark ? "bi-sun-fill" : "bi-moon-stars-fill");
  });
  if (document.getElementById("barChart") && window.Chart && window.ApexCharts) {
    showDashboard();
  }
}

function toggleTheme() {
  var next = localStorage.getItem("crmsTheme") === "dark" ? "light" : "dark";
  localStorage.setItem("crmsTheme", next);
  applyTheme(next);
}

var bgAudio = new Audio("cafe-music.mp3");
bgAudio.loop = true;
bgAudio.volume = 0.5;
var musicPlaying = localStorage.getItem("crmsMusicOn") === "true";

setInterval(function () {
  if (musicPlaying && !bgAudio.paused) {
    localStorage.setItem("crmsMusicTime", bgAudio.currentTime);
  }
}, 500);

function updateMusicButtons() {
  document.querySelectorAll(".music-icon").forEach(function (i) {
    i.className = "music-icon bi " + (musicPlaying ? "bi-volume-up-fill" : "bi-volume-mute-fill");
  });
  document.querySelectorAll(".music-text").forEach(function (s) {
    s.textContent = musicPlaying ? "Music On" : "Music Off";
  });
}

function resumeSavedMusic() {
  if (!musicPlaying) return;
  var savedTime = parseFloat(localStorage.getItem("crmsMusicTime") || "0");
  if (!isNaN(savedTime) && savedTime > 0) {
    bgAudio.currentTime = savedTime;
  }
  bgAudio.play().then(function () {
    updateMusicButtons();
  }).catch(function () {
    var unlock = function () {
      if (musicPlaying && bgAudio.paused) {
        bgAudio.play().then(updateMusicButtons);
      }
      document.removeEventListener("click", unlock);
    };
    document.addEventListener("click", unlock);
  });
}

function toggleMusic() {
  if (!musicPlaying) {
    bgAudio.play().then(function () {
      musicPlaying = true;
      localStorage.setItem("crmsMusicOn", "true");
      updateMusicButtons();
      showToast("Playing Cafe Lo-Fi music.");
    }).catch(function () {
      alert("Unable to play 'cafe-music.mp3'. Make sure the file is in your project folder.");
    });
  } else {
    bgAudio.pause();
    musicPlaying = false;
    localStorage.setItem("crmsMusicOn", "false");
    updateMusicButtons();
    showToast("Music paused.");
  }
}

resumeSavedMusic();

/* ---------- Sidebar, Footer & SPA Navigation ---------- */
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("-translate-x-full");
  document.getElementById("overlay").classList.toggle("hidden");
}

function addFooter() {
  document.querySelectorAll(".site-footer").forEach(function (f) { f.remove(); });
  var main = document.querySelector("main");
  if (!main) { return; }
  var links = menu.map(function (m) {
    return "<a href='" + m.file + "' data-nav class='mf-link'>" + m.text + "</a>";
  }).join("");
  main.insertAdjacentHTML("beforeend",
    "<footer class='site-footer'><div class='mf-grid'>" +
      "<div><h6>" + BRAND + "</h6><p class='mb-3'>A simple, calm way to manage residents, rooms, complaints and college life.</p>" +
        "<a href='feedback.html' data-nav class='btn btn-primary btn-sm'><i class='bi bi-star-fill'></i> Rate your experience</a></div>" +
      "<div><h6>Shortcuts</h6><div class='mf-links'>" + links + "</div></div>" +
      "<div><h6>Quick actions</h6><div class='mf-links'>" +
        "<button class='btn btn-sm btn-outline-secondary' onclick='window.scrollTo({top:0})'><i class='bi bi-arrow-up'></i> Back to top</button>" +
        "<button class='btn btn-sm btn-outline-secondary' onclick='toggleMusic()'><i class='music-icon bi'></i> <span class='music-text'></span></button>" +
        "<button class='btn btn-sm btn-outline-secondary' onclick='toggleTheme()'><i class='theme-icon bi'></i> Theme</button>" +
      "</div></div>" +
    "</div><div class='mf-bottom'>&copy; 2026 " + BRAND + " | IMS566 Individual Project | Developed by " + DEVELOPER + "</div></footer>");
  var isDark = (localStorage.getItem("crmsTheme") || "light") === "dark";
  document.querySelectorAll(".theme-icon").forEach(function (i) {
    i.className = "theme-icon bi " + (isDark ? "bi-sun-fill" : "bi-moon-stars-fill");
  });
  updateMusicButtons();
}

function renderLayout() {
  var layout = document.getElementById("layout");
  if (!layout) return;
  var curPage = document.body.getAttribute("data-page");
  var user = localStorage.getItem("crmsCurrentUser") || "Admin";
  var navHtml = menu.map(function (m) {
    var active = m.page === curPage ? " active" : "";
    return "<a href='" + m.file + "' class='sb-link" + active + "'><i class='bi " + m.icon + "'></i><span>" + m.text + "</span></a>";
  }).join("");

  layout.innerHTML =
    "<div class='fixed top-0 left-0 right-0 h-14 px-4 flex items-center justify-between md:hidden z-30'>" +
      "<button onclick='toggleSidebar()' class='text-2xl'><i class='bi bi-list'></i></button>" +
      "<span class='font-bold'>" + BRAND + "</span>" +
      "<button onclick='toggleTheme()' class='text-xl'><i class='theme-icon bi'></i></button>" +
    "</div>" +
    "<div id='overlay' onclick='toggleSidebar()' class='fixed inset-0 bg-black/40 hidden md:hidden z-30'></div>" +
    "<aside id='sidebar' class='sidebar-box fixed top-0 left-0 bottom-0 w-64 flex flex-col -translate-x-full md:translate-x-0 transition-transform z-40'>" +
      "<div class='sb-brand'><div class='sb-logo'><i class='bi bi-building'></i></div><div><div class='sb-name'>" + BRAND + "</div><div class='sb-sub'>Residence Portal</div></div></div>" +
      "<div class='sb-label'>MENU</div>" +
      "<nav class='sb-nav'>" + navHtml + "</nav>" +
      "<div class='sb-footer'>" +
        "<div class='sb-user'><div class='sb-avatar'>" + user.charAt(0).toUpperCase() + "</div><div><div class='sb-username'>" + user + "</div><div class='sb-role'>Administrator</div></div></div>" +
        "<button onclick='toggleTheme()' class='sb-btn'><i class='theme-icon bi'></i><span>Switch Theme</span></button>" +
        "<button onclick='toggleMusic()' class='sb-btn'><i class='music-icon bi'></i><span class='music-text'>Music Off</span></button>" +
        "<button onclick='logout()' class='sb-btn sb-logout'><i class='bi bi-box-arrow-right'></i><span>Logout</span></button>" +
      "</div>" +
    "</aside>";
  addFooter();
}

function need(src, test) {
  return new Promise(function (res) {
    if (test()) { return res(); }
    var s = document.createElement("script");
    s.src = src; s.onload = res; document.head.appendChild(s);
  });
}

function go(href, noPush) {
  fetch(href).then(function (r) { if (!r.ok) { throw 0; } return r.text(); }).then(function (html) {
    var doc = new DOMParser().parseFromString(html, "text/html");
    document.querySelectorAll(".modal").forEach(function (m) {
      var i = bootstrap.Modal.getInstance(m); if (i) { i.dispose(); }
      m.remove();
    });
    document.querySelector("main").replaceWith(doc.querySelector("main"));
    doc.querySelectorAll(".modal").forEach(function (m) { document.body.appendChild(m); });
    document.querySelectorAll(".modal-backdrop").forEach(function (b) { b.remove(); });
    document.body.setAttribute("data-page", doc.body.getAttribute("data-page"));
    document.title = doc.title.replace("CRMS", BRAND);
    if (!noPush) { history.pushState({}, "", href); }
    document.querySelectorAll(".sb-link").forEach(function (l) {
      l.classList.toggle("active", l.getAttribute("href") === href);
    });
    var ov = document.getElementById("overlay");
    if (ov && !ov.classList.contains("hidden")) { toggleSidebar(); }
    addFooter();
    window.scrollTo(0, 0);
    initPage();
  }).catch(function () { location.href = href; });
}

document.addEventListener("click", function (e) {
  var a = e.target.closest("a[data-nav], a.sb-link");
  if (!a || e.metaKey || e.ctrlKey || !document.getElementById("layout")) { return; }
  e.preventDefault();
  go(a.getAttribute("href"));
});

window.addEventListener("popstate", function () {
  if (document.getElementById("layout")) { go(location.pathname.split("/").pop() || "dashboard.html", true); }
});

/* ---------- Dashboard ---------- */
var barChartInst = null, pieChartInst = null, heatChartInst = null;
function showDashboard() {
  var isDark = document.documentElement.classList.contains("dark");
  var axisColor = isDark ? "#e5e7eb" : "#334155";
  var gridColor = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)";

  document.getElementById("totalStudents").textContent = students.length;
  document.getElementById("totalRooms").textContent = 120;
  document.getElementById("totalComplaints").textContent = complaints.length;
  document.getElementById("totalActivities").textContent = activities.length;

  var occ = Math.min(100, Math.round((students.length / 120) * 100));
  document.getElementById("occupancyText").textContent = occ + "%";
  document.getElementById("occupancyBar").style.width = occ + "%";

  var resCount = complaints.filter(function (c) { return c.status === "Resolved"; }).length;
  var resPct = complaints.length ? Math.round((resCount / complaints.length) * 100) : 0;
  document.getElementById("resolvedText").textContent = resPct + "%";
  document.getElementById("resolvedBar").style.width = resPct + "%";

  var recent = complaints.slice(-5).reverse().map(function (c) {
    return "<tr><td>" + esc(c.student) + "</td><td>" + esc(c.category) + "</td><td>" + c.date + "</td><td><span class='badge bg-secondary'>" + c.status + "</span></td></tr>";
  }).join("");
  document.getElementById("recentTable").innerHTML = recent || "<tr><td colspan='4' class='text-center text-muted'>No recent complaints.</td></tr>";

  var cats = ["Electrical", "Plumbing", "Furniture", "Cleanliness", "Internet"];
  var catCounts = cats.map(function (cat) { return complaints.filter(function (c) { return c.category === cat; }).length; });
  if (barChartInst) barChartInst.destroy();
  barChartInst = new Chart(document.getElementById("barChart"), {
    type: "bar",
    data: { labels: cats, datasets: [{ label: "Complaints", data: catCounts, backgroundColor: "#0071e3", borderRadius: 8 }] },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { labels: { color: axisColor } } },
      scales: {
        x: { ticks: { color: axisColor }, grid: { color: gridColor } },
        y: { ticks: { color: axisColor, stepSize: 1 }, grid: { color: gridColor } }
      }
    }
  });

  var stats = ["Pending", "In Progress", "Resolved"];
  var statCounts = stats.map(function (st) { return complaints.filter(function (c) { return c.status === st; }).length; });
  if (pieChartInst) pieChartInst.destroy();
  pieChartInst = new Chart(document.getElementById("pieChart"), {
    type: "doughnut",
    data: { labels: stats, datasets: [{ data: statCounts, backgroundColor: ["#ff3b30", "#ff9f0a", "#34c759"], borderWidth: 0 }] },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { labels: { color: axisColor } } }
    }
  });

  /* Clear & High-Contrast Heatmap */
  var heatMatrix = {
    "Electrical":  [2, 3, 1, 2],
    "Plumbing":    [0, 4, 1, 4],
    "Furniture":   [1, 4, 1, 2],
    "Cleanliness": [3, 3, 1, 3],
    "Internet":    [4, 2, 1, 0]
  };
  var months = ["Aug", "Sep", "Oct", "Nov"];

  if (heatChartInst) heatChartInst.destroy();
  heatChartInst = new ApexCharts(document.getElementById("heatChart"), {
    chart: {
      type: "heatmap",
      height: 260,
      toolbar: { show: false },
      background: "transparent",
      foreColor: axisColor
    },
    theme: { mode: isDark ? "dark" : "light" },
    series: cats.map(function (cat) {
      return {
        name: cat,
        data: months.map(function (m, idx) {
          return { x: m, y: heatMatrix[cat][idx] };
        })
      };
    }),
    stroke: {
      width: 2,
      colors: [isDark ? "#1c2430" : "#ffffff"]
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "13px",
        fontWeight: 700,
        colors: [isDark ? "#ffffff" : "#0f172a"]
      },
      formatter: function (val) { return val; }
    },
    plotOptions: {
      heatmap: {
        radius: 6,
        enableShades: false,
        colorScale: {
          ranges: [
            { from: 0, to: 0, name: "0 (None)", color: isDark ? "#2d3748" : "#e2e8f0" },
            { from: 1, to: 1, name: "1 (Low)", color: isDark ? "#1e40af" : "#93c5fd" },
            { from: 2, to: 2, name: "2 (Moderate)", color: isDark ? "#1d4ed8" : "#60a5fa" },
            { from: 3, to: 3, name: "3 (High)", color: isDark ? "#2563eb" : "#2563eb" },
            { from: 4, to: 10, name: "4+ (Critical)", color: isDark ? "#0ea5e9" : "#1d4ed8" }
          ]
        }
      }
    },
    xaxis: {
      labels: { style: { colors: axisColor, fontSize: "12px", fontWeight: 600 } },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: {
      labels: { style: { colors: axisColor, fontSize: "12px", fontWeight: 600 } }
    },
    legend: {
      show: true,
      position: "bottom",
      labels: { colors: axisColor }
    },
    tooltip: {
      theme: isDark ? "dark" : "light",
      y: { formatter: function (val) { return val + " complaint" + (val === 1 ? "" : "s"); } }
    }
  });
  heatChartInst.render();
}

/* ---------- Students CRUD ---------- */
function goStudentPage(p) { studentPage = p; showStudents(); }
function showStudents() {
  var kw = document.getElementById("searchStudent").value.toLowerCase();
  var by = document.getElementById("sortStudentBy").value;
  var ord = document.getElementById("sortStudentOrder").value;
  var list = students.map(function (s, i) { return i; }).filter(function (i) {
    var s = students[i];
    return (s.id + " " + s.name + " " + s.programme + " " + s.block + " " + s.room).toLowerCase().indexOf(kw) !== -1;
  });
  list.sort(function (a, b) {
    var cmp = String(students[a][by]).localeCompare(String(students[b][by]));
    return ord === "asc" ? cmp : -cmp;
  });
  studentPage = fixPage(studentPage, list.length);
  var start = (studentPage - 1) * perPage, end = Math.min(start + perPage, list.length), html = "";
  for (var n = start; n < end; n++) {
    var idx = list[n], s = students[idx];
    html += "<tr><td>" + esc(s.id) + "</td><td>" + esc(s.name) + "</td><td>" + esc(s.programme) + "</td><td>" + esc(s.block) + "</td><td>" + esc(s.room) + "</td>" +
      "<td class='text-nowrap'><button class='btn btn-sm btn-warning me-1' onclick='editStudent(" + idx + ")'><i class='bi bi-pencil'></i></button>" +
      "<button class='btn btn-sm btn-danger' onclick='deleteStudent(" + idx + ")'><i class='bi bi-trash'></i></button></td></tr>";
  }
  document.getElementById("studentTable").innerHTML = html || "<tr><td colspan='6' class='text-center text-muted'>No students found.</td></tr>";
  makePager("studentPager", list.length, studentPage, "goStudentPage");
}

function openAddStudent() {
  document.getElementById("studentModalTitle").innerText = "Add Student";
  document.getElementById("studentEditIndex").value = "";
  ["studentId", "studentName", "studentProgramme", "studentRoom"].forEach(function (id) { document.getElementById(id).value = ""; });
  bootstrap.Modal.getOrCreateInstance(document.getElementById("studentModal")).show();
}

function editStudent(idx) {
  var s = students[idx];
  document.getElementById("studentModalTitle").innerText = "Edit Student";
  document.getElementById("studentEditIndex").value = idx;
  document.getElementById("studentId").value = s.id;
  document.getElementById("studentName").value = s.name;
  document.getElementById("studentProgramme").value = s.programme;
  document.getElementById("studentBlock").value = s.block;
  document.getElementById("studentRoom").value = s.room;
  bootstrap.Modal.getOrCreateInstance(document.getElementById("studentModal")).show();
}

function saveStudent() {
  var idx = document.getElementById("studentEditIndex").value;
  var s = {
    id: document.getElementById("studentId").value.trim(),
    name: document.getElementById("studentName").value.trim(),
    programme: document.getElementById("studentProgramme").value.trim(),
    block: document.getElementById("studentBlock").value,
    room: document.getElementById("studentRoom").value.trim()
  };
  if (!s.id || !s.name || !s.programme || !s.room) { alert("Please fill in all fields."); return; }
  if (idx === "") { students.push(s); showToast("Student added."); }
  else { students[idx] = s; showToast("Student updated."); }
  saveData("crmsStudents_v4", students);
  bootstrap.Modal.getInstance(document.getElementById("studentModal")).hide();
  showStudents();
}

function deleteStudent(idx) {
  if (confirm("Delete this student?")) { students.splice(idx, 1); saveData("crmsStudents_v4", students); showStudents(); }
}

function exportStudents() {
  var csv = "Student ID,Name,Programme,Block,Room\n" + students.map(function (s) { return [s.id, s.name, s.programme, s.block, s.room].join(","); }).join("\n");
  downloadCSV(csv, "students.csv");
}

/* ---------- Complaints CRUD ---------- */
function goComplaintPage(p) { complaintPage = p; showComplaints(); }
function showComplaints() {
  var table = document.getElementById("complaintTable");
  var keyword = document.getElementById("searchComplaint").value.toLowerCase();
  var filter = document.getElementById("filterStatus").value;
  var list = [];
  for (var i = 0; i < complaints.length; i++) {
    var c = complaints[i];
    var text = (c.id + " " + c.student + " " + c.category + " " + c.date).toLowerCase();
    if (text.indexOf(keyword) !== -1 && (filter === "All" || c.status === filter)) { list.push(i); }
  }
  complaintPage = fixPage(complaintPage, list.length);
  var start = (complaintPage - 1) * perPage, end = Math.min(start + perPage, list.length);
  var html = "";
  for (var n = start; n < end; n++) {
    var index = list[n], it = complaints[index];
    var opts = ["Pending", "In Progress", "Resolved"].map(function (s) {
      return "<option" + (it.status === s ? " selected" : "") + ">" + s + "</option>";
    }).join("");
    html += "<tr><td>" + it.id + "</td><td>" + esc(it.student) + "</td><td>" + it.category + "</td><td>" + it.date + "</td>" +
      "<td><select class='form-select form-select-sm st-select' data-status='" + it.status + "' onchange='updateStatus(" + index + ", this.value)'>" + opts + "</select></td>" +
      "<td class='text-nowrap'><button class='btn btn-sm btn-warning me-1' onclick='editComplaint(" + index + ")'><i class='bi bi-pencil'></i></button>" +
      "<button class='btn btn-sm btn-danger' onclick='deleteComplaint(" + index + ")'><i class='bi bi-trash'></i></button></td></tr>";
  }
  table.innerHTML = html || "<tr><td colspan='6' class='text-center text-muted'>No complaints found.</td></tr>";
  makePager("complaintPager", list.length, complaintPage, "goComplaintPage");
}

function updateStatus(idx, val) {
  complaints[idx].status = val;
  saveData("crmsComplaints_v4", complaints);
  showComplaints();
  showToast("Status updated to " + val);
}

function openAddComplaint() {
  document.getElementById("complaintModalTitle").innerText = "Add Complaint";
  document.getElementById("complaintEditIndex").value = "";
  document.getElementById("complaintStudent").value = "";
  document.getElementById("complaintDate").value = new Date().toISOString().split("T")[0];
  document.getElementById("complaintStatus").value = "Pending";
  bootstrap.Modal.getOrCreateInstance(document.getElementById("complaintModal")).show();
}

function editComplaint(idx) {
  var c = complaints[idx];
  document.getElementById("complaintModalTitle").innerText = "Edit Complaint";
  document.getElementById("complaintEditIndex").value = idx;
  document.getElementById("complaintStudent").value = c.student;
  document.getElementById("complaintCategory").value = c.category;
  document.getElementById("complaintDate").value = c.date;
  document.getElementById("complaintStatus").value = c.status;
  bootstrap.Modal.getOrCreateInstance(document.getElementById("complaintModal")).show();
}

function saveComplaint() {
  var idx = document.getElementById("complaintEditIndex").value;
  var st = document.getElementById("complaintStudent").value.trim();
  var dt = document.getElementById("complaintDate").value;
  if (!st || !dt) { alert("Please fill in all fields."); return; }
  if (idx === "") {
    complaints.push({ id: "CMP-" + String(complaints.length + 1).padStart(3, "0"), student: st, category: document.getElementById("complaintCategory").value, date: dt, status: document.getElementById("complaintStatus").value });
    showToast("Complaint added.");
  } else {
    complaints[idx].student = st;
    complaints[idx].category = document.getElementById("complaintCategory").value;
    complaints[idx].date = dt;
    complaints[idx].status = document.getElementById("complaintStatus").value;
    showToast("Complaint updated.");
  }
  saveData("crmsComplaints_v4", complaints);
  bootstrap.Modal.getInstance(document.getElementById("complaintModal")).hide();
  showComplaints();
}

function deleteComplaint(idx) {
  if (confirm("Delete this complaint?")) { complaints.splice(idx, 1); saveData("crmsComplaints_v4", complaints); showComplaints(); }
}

function exportComplaints() {
  var csv = "ID,Student,Category,Date,Status\n" + complaints.map(function (c) { return [c.id, c.student, c.category, c.date, c.status].join(","); }).join("\n");
  downloadCSV(csv, "complaints.csv");
}

/* ---------- Facilities ---------- */
function showFacilities() {
  var tb = document.getElementById("facilityTable");
  if (!tb) return;
  tb.innerHTML = facilities.map(function (f, i) {
    var badge = f.status === "Available" ? "bg-success" : "bg-warning text-dark";
    return "<tr><td>" + esc(f.name) + "</td><td>" + esc(f.block) + "</td><td>" + f.capacity + " pax</td>" +
      "<td><span class='badge " + badge + "'>" + f.status + "</span></td>" +
      "<td><button class='btn btn-sm btn-outline-primary' onclick='toggleFacility(" + i + ")'>Toggle Status</button></td></tr>";
  }).join("");
}

function toggleFacility(i) {
  facilities[i].status = facilities[i].status === "Available" ? "Maintenance" : "Available";
  saveData("crmsFacilities_v4", facilities);
  showFacilities();
  showToast("Facility status updated.");
}

/* ---------- Activities CRUD ---------- */
function goActivityPage(p) { activityPage = p; showActivities(); }
function showActivities() {
  var table = document.getElementById("activityTable");
  var keyword = document.getElementById("searchActivity").value.toLowerCase();
  var list = [];
  for (var i = 0; i < activities.length; i++) {
    var a = activities[i];
    if ((a.name + " " + a.date + " " + a.location + " " + a.description).toLowerCase().indexOf(keyword) !== -1) { list.push(i); }
  }
  list.sort(function (x, y) {
    return (activities[x].date + (activities[x].time || "")).localeCompare(activities[y].date + (activities[y].time || ""));
  });
  activityPage = fixPage(activityPage, list.length);
  var start = (activityPage - 1) * perPage, end = Math.min(start + perPage, list.length), html = "";
  for (var n = start; n < end; n++) {
    var index = list[n], it = activities[index];
    html += "<tr><td>" + esc(it.name) + "</td><td class='text-nowrap'>" + it.date + (it.time ? "<br><small class='text-secondary'>" + to12(it.time) + "</small>" : "") + "</td>" +
      "<td>" + esc(it.location) + "</td><td>" + esc(it.description) + "</td>" +
      "<td class='text-nowrap'><button class='btn btn-sm btn-warning me-1' onclick='editActivity(" + index + ")'><i class='bi bi-pencil'></i></button>" +
      "<button class='btn btn-sm btn-danger' onclick='deleteActivity(" + index + ")'><i class='bi bi-trash'></i></button></td></tr>";
  }
  table.innerHTML = html || "<tr><td colspan='5' class='text-center text-muted'>No activities found.</td></tr>";
  makePager("activityPager", list.length, activityPage, "goActivityPage");
}

function openAddActivity() {
  document.getElementById("activityModalTitle").innerText = "Add Activity";
  document.getElementById("activityEditIndex").value = "";
  document.getElementById("activityName").value = "";
  document.getElementById("activityDate").value = new Date().toISOString().split("T")[0];
  document.getElementById("activityTime").value = "09:00";
  document.getElementById("activityLocation").value = "";
  document.getElementById("activityDescription").value = "";
  bootstrap.Modal.getOrCreateInstance(document.getElementById("activityModal")).show();
}

function editActivity(index) {
  var a = activities[index];
  document.getElementById("activityModalTitle").innerText = "Edit Activity";
  document.getElementById("activityEditIndex").value = index;
  document.getElementById("activityName").value = a.name;
  document.getElementById("activityDate").value = a.date;
  document.getElementById("activityTime").value = a.time || "";
  document.getElementById("activityLocation").value = a.location;
  document.getElementById("activityDescription").value = a.description;
  bootstrap.Modal.getOrCreateInstance(document.getElementById("activityModal")).show();
}

function saveActivity() {
  var index = document.getElementById("activityEditIndex").value;
  var a = {
    name: document.getElementById("activityName").value.trim(),
    date: document.getElementById("activityDate").value,
    time: document.getElementById("activityTime").value,
    location: document.getElementById("activityLocation").value.trim(),
    description: document.getElementById("activityDescription").value.trim()
  };
  if (!a.name || !a.date || !a.location || !a.description) { alert("Please fill in all the fields."); return; }
  if (index === "") { activities.push(a); showToast("Activity added successfully."); }
  else { activities[index] = a; showToast("Activity updated successfully."); }
  saveData("crmsActivities_v4", activities);
  bootstrap.Modal.getInstance(document.getElementById("activityModal")).hide();
  showActivities();
}

function deleteActivity(idx) {
  if (confirm("Delete this activity?")) { activities.splice(idx, 1); saveData("crmsActivities_v4", activities); showActivities(); }
}

/* ---------- Fancy Date & Time Picker ---------- */
var dpOpen = null;
function hook(el, fn) {
  var d = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value");
  Object.defineProperty(el, "value", { get: function () { return d.get.call(el); }, set: function (v) { d.set.call(el, v); fn(); } });
}
document.addEventListener("mousedown", function (e) {
  if (dpOpen && !dpOpen.pop.contains(e.target) && !e.target.closest(".dp-btn")) { dpOpen.close(); }
});

function enhance(inp) {
  if (inp.dataset.fp) { return; }
  inp.dataset.fp = "1";
  var tIn = inp.dataset.time ? document.getElementById(inp.dataset.time) : null;
  inp.type = "hidden";
  var btn = document.createElement("button");
  btn.type = "button"; btn.className = "dp-btn";
  btn.innerHTML = "<i class='bi bi-calendar3'></i><span></span>";
  inp.insertAdjacentElement("afterend", btn);
  var view = new Date(), pop = null;

  function label() {
    var txt = inp.value ? new Date(inp.value + "T00:00").toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" }) : "Choose date";
    if (tIn && tIn.value) { txt += " at " + to12(tIn.value); }
    btn.querySelector("span").textContent = txt;
  }
  hook(inp, label); if (tIn) { hook(tIn, label); } label();

  function close() { if (pop) { pop.remove(); pop = null; dpOpen = null; } }
  function place() {
    var r = btn.getBoundingClientRect(), top = r.bottom + 8;
    if (top + pop.offsetHeight > innerHeight - 8) { top = Math.max(8, r.top - pop.offsetHeight - 8); }
    pop.style.left = Math.max(8, Math.min(r.left, innerWidth - pop.offsetWidth - 8)) + "px";
    pop.style.top = top + "px";
  }
  function draw() {
    var y = view.getFullYear(), m = view.getMonth(), first = new Date(y, m, 1).getDay(), days = new Date(y, m + 1, 0).getDate();
    var today = new Date().toISOString().split("T")[0], h = "";
    h += "<div class='dp-head'><button type='button' data-a='prev'><i class='bi bi-chevron-left'></i></button><b>" +
      view.toLocaleDateString("en-GB", { month: "long", year: "numeric" }) +
      "</b><button type='button' data-a='next'><i class='bi bi-chevron-right'></i></button></div>";
    h += "<div class='dp-grid dp-wd'>" + "SMTWTFS".split("").map(function (d) { return "<span>" + d + "</span>"; }).join("") + "</div><div class='dp-grid'>";
    for (var i = 0; i < first; i++) { h += "<span></span>"; }
    for (var d = 1; d <= days; d++) {
      var s = y + "-" + pad(m + 1) + "-" + pad(d);
      h += "<button type='button' data-d='" + s + "' class='" + (s === inp.value ? "on " : "") + (s === today ? "today" : "") + "'>" + d + "</button>";
    }
    h += "</div>";
    if (tIn) {
      var t = (tIn.value || "09:00").split(":"), H = +t[0], M = +t[1];
      h += "<div class='dp-tl'>Hour</div><div class='dp-chips'>";
      for (var k = 1; k <= 12; k++) { h += "<button type='button' data-h='" + k + "' class='" + (k === (H % 12 || 12) ? "on" : "") + "'>" + k + "</button>"; }
      h += "</div><div class='dp-tl'>Minute</div><div class='dp-chips'>";
      for (var q = 0; q < 60; q += 5) { h += "<button type='button' data-m='" + q + "' class='" + (q === M ? "on" : "") + "'>" + pad(q) + "</button>"; }
      h += "</div><div class='dp-ampm'><button type='button' data-p='AM' class='" + (H < 12 ? "on" : "") + "'>AM</button><button type='button' data-p='PM' class='" + (H >= 12 ? "on" : "") + "'>PM</button></div>";
    }
    h += "<div class='dp-foot'><button type='button' data-a='today'>Today</button><button type='button' data-a='done' class='go'>Done</button></div>";
    pop.innerHTML = h; place();
  }
  function setTime(h12, min, pm) { tIn.value = pad((h12 % 12) + (pm ? 12 : 0)) + ":" + pad(min); }

  btn.onclick = function () {
    if (pop) { close(); return; }
    if (dpOpen) { dpOpen.close(); }
    if (inp.value) { view = new Date(inp.value + "T00:00"); }
    pop = document.createElement("div"); pop.className = "dp-pop";
    document.body.appendChild(pop);
    dpOpen = { pop: pop, close: close };
    pop.onclick = function (e) {
      var b = e.target.closest("button"); if (!b) { return; }
      var d = b.dataset, t = (tIn && tIn.value ? tIn.value : "09:00").split(":"), H = +t[0], M = +t[1];
      if (d.a === "prev") { view = new Date(view.getFullYear(), view.getMonth() - 1, 1); }
      else if (d.a === "next") { view = new Date(view.getFullYear(), view.getMonth() + 1, 1); }
      else if (d.a === "today") { inp.value = new Date().toISOString().split("T")[0]; view = new Date(); }
      else if (d.a === "done") { close(); return; }
      else if (d.d) { inp.value = d.d; }
      else if (d.h) { setTime(+d.h, M, H >= 12); }
      else if (d.m) { setTime(H % 12 || 12, +d.m, H >= 12); }
      else if (d.p) { setTime(H % 12 || 12, M, d.p === "PM"); }
      draw();
    };
    draw();
  };
}

/* ---------- Feedback & Rating ---------- */
function paintStars(activeVal) {
  var box = document.getElementById("starBox");
  if (!box) return;
  box.querySelectorAll(".star").forEach(function (el, idx) {
    el.classList.toggle("on", (idx + 1) <= activeVal);
  });
}

function initStars() {
  var box = document.getElementById("starBox");
  if (!box) return;
  box.innerHTML = "";
  for (var i = 1; i <= 5; i++) {
    (function (val) {
      var star = document.createElement("i");
      star.className = "bi bi-star-fill star me-1" + (val <= fbStars ? " on" : "");
      star.addEventListener("mouseenter", function () { paintStars(val); });
      star.addEventListener("click", function () {
        fbStars = val;
        paintStars(fbStars);
      });
      box.appendChild(star);
    })(i);
  }
  box.onmouseleave = function () { paintStars(fbStars); };
}

function showFeedback() {
  initStars();
  var total = feedback.length, sum = 0, counts = [0, 0, 0, 0, 0, 0], html = "";
  feedback.forEach(function (f) { sum += f.stars; counts[f.stars]++; });
  var avg = total ? (sum / total).toFixed(1) : "0.0";
  document.getElementById("fbAvg").textContent = avg;
  document.getElementById("fbCount").textContent = total + " review" + (total === 1 ? "" : "s");
  document.getElementById("fbBars").innerHTML = [5, 4, 3, 2, 1].map(function (s) {
    var pct = total ? Math.round(counts[s] / total * 100) : 0;
    return "<div class='bar-row'><span>" + s + " <i class='bi bi-star-fill' style='color:#ff9f0a'></i></span><div class='track'><div class='fill' style='width:" + pct + "%'></div></div><span>" + pct + "%</span></div>";
  }).join("");
  for (var i = feedback.length - 1; i >= 0; i--) {
    var f = feedback[i], st = "";
    for (var k = 1; k <= 5; k++) { st += "<i class='bi bi-star-fill' style='color:" + (k <= f.stars ? "#ff9f0a" : "#d2d2d7") + "'></i>"; }
    html += "<div class='fb-item'><div class='flex justify-between'><strong>" + esc(f.name) + "</strong><small class='text-secondary'>" + f.date + "</small></div><div class='my-1'>" + st + "</div><div>" + esc(f.text) + "</div></div>";
  }
  document.getElementById("fbList").innerHTML = html;
}

function submitFeedback() {
  var text = document.getElementById("fbText").value.trim();
  if (fbStars < 1) { alert("Please tap a star to rate us."); return; }
  if (!text) { alert("Please write a short comment."); return; }
  feedback.push({
    name: document.getElementById("fbName").value.trim() || "Anonymous Resident",
    stars: fbStars,
    text: text,
    date: new Date().toISOString().split("T")[0]
  });
  saveData("crmsFeedback_v4", feedback);
  fbStars = 0;
  document.getElementById("fbText").value = "";
  document.getElementById("fbName").value = "";
  showFeedback();
  showToast("Thank you for your feedback!");
}

/* ---------- Initialize Current Page ---------- */
function initPage() {
  var p = Promise.resolve();
  if (document.getElementById("barChart")) {
    p = need("https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js", function () { return window.Chart; })
      .then(function () { return need("https://cdn.jsdelivr.net/npm/apexcharts@3.54.1/dist/apexcharts.min.js", function () { return window.ApexCharts; }); });
  }
  p.then(function () {
    if (document.getElementById("barChart")) { showDashboard(); }
    if (document.getElementById("studentTable")) { showStudents(); }
    if (document.getElementById("complaintTable")) { showComplaints(); }
    if (document.getElementById("facilityTable")) { showFacilities(); }
    if (document.getElementById("activityTable")) { showActivities(); }
    if (document.getElementById("fbList")) { showFeedback(); }
    document.querySelectorAll("input[type=date]").forEach(enhance);
  });
}

applyTheme(localStorage.getItem("crmsTheme") || "light");
updateMusicButtons();
if (document.getElementById("layout")) { renderLayout(); }
initPage();