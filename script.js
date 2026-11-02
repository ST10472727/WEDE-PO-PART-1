
document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.querySelector(".nav");
  if (toggle && nav) toggle.addEventListener("click", function () { nav.classList.toggle("open"); });

  
  var page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a").forEach(function (a) {
    if (a.getAttribute("href") === page) a.classList.add("active");
  });

 
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) e.target.classList.add("visible"); });
  }, { threshold: 0.15 });
  document.querySelectorAll(".fade-in").forEach(function (el) { observer.observe(el); });


  document.querySelectorAll(".newsletter").forEach(function (f) {
    f.addEventListener("submit", function (e) { e.preventDefault(); alert("Thanks for subscribing!"); f.reset(); });
  });

  initCatalogue();
  initGallery();
  initContact();
  initLoyalty();
});


function initCatalogue() {
  var buttons = document.querySelectorAll(".filter-btn");
  if (!buttons.length) return;
  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      buttons.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      var cat = btn.dataset.filter;
      document.querySelectorAll(".product").forEach(function (p) {
        p.style.display = cat === "all" || p.dataset.category === cat ? "" : "none";
      });
    });
  });
}


function initGallery() {
  var box = document.getElementById("lightbox");
  if (!box) return;
  var big = box.querySelector("img");
  document.querySelectorAll(".gallery img").forEach(function (img) {
    img.addEventListener("click", function () { big.src = img.src; big.alt = img.alt; box.classList.add("open"); });
  });
  box.addEventListener("click", function (e) { if (e.target !== big) box.classList.remove("open"); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") box.classList.remove("open"); });
}


function initContact() {
  var form = document.getElementById("contactForm");
  if (!form) return;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var ok = true;
    var name = form.name.value.trim(), email = form.email.value.trim(), msg = form.message.value.trim();
    setErr("nameErr", name.length < 2 ? "Please enter your full name." : "");
    setErr("emailErr", !/^\S+@\S+\.\S+$/.test(email) ? "Please enter a valid email." : "");
    setErr("msgErr", msg.length < 10 ? "Message must be at least 10 characters." : "");
    if (name.length < 2 || !/^\S+@\S+\.\S+$/.test(email) || msg.length < 10) ok = false;
    var box = document.getElementById("contactMsg");
    if (ok) { box.className = "message success"; box.textContent = "Thank you " + name + "! We will get back to you soon."; form.reset(); }
    else { box.className = "message fail"; box.textContent = "Please fix the errors below."; }
  });
}
function setErr(id, text) { var el = document.getElementById(id); if (el) el.textContent = text; }

/* ---------- Loyalty (login / sign up / dashboard) ---------- */
var USERS_KEY = "scc_users", SESSION_KEY = "scc_session";
function getUsers() { return JSON.parse(localStorage.getItem(USERS_KEY) || "{}"); }
function saveUsers(u) { localStorage.setItem(USERS_KEY, JSON.stringify(u)); }
function currentUser() { var id = localStorage.getItem(SESSION_KEY); return id ? getUsers()[id] : null; }
function saveUser(user) { var u = getUsers(); u[user.mobile] = user; saveUsers(u); }

function initLoyalty() {
  var auth = document.getElementById("authSection");
  if (!auth) return;
  var dash = document.getElementById("dashboard");
  var mode = "login";

 
  document.querySelectorAll(".tabs-auth button").forEach(function (b) {
    b.addEventListener("click", function () {
      mode = b.dataset.mode;
      document.querySelectorAll(".tabs-auth button").forEach(function (x) { x.classList.toggle("active", x === b); });
      document.querySelectorAll(".signup-only").forEach(function (el) { el.style.display = mode === "signup" ? "" : "none"; });
      document.getElementById("authBtn").textContent = mode === "signup" ? "Create Account" : "Login";
      document.getElementById("authMsg").className = "message";
    });
  });

  document.getElementById("authForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var f = e.target, msg = document.getElementById("authMsg");
    var mobile = f.mobile.value.replace(/\D/g, ""), pass = f.password.value;
    var users = getUsers();
    function fail(t) { msg.className = "message fail"; msg.textContent = t; }
    if (mobile.length < 9) return fail("Please enter a valid mobile number.");
    if (pass.length < 6) return fail("Password must be at least 6 characters.");

    if (mode === "signup") {
      var first = f.firstName.value.trim(), last = f.lastName.value.trim(), email = f.email.value.trim();
      if (!first || !last) return fail("Please enter your first and last name.");
      if (!/^\S+@\S+\.\S+$/.test(email)) return fail("Please enter a valid email address.");
      if (users[mobile]) return fail("An account with this number already exists. Please login.");
      var today = new Date().toLocaleDateString("en-US");
      users[mobile] = {
        mobile: mobile, password: pass, firstName: first, lastName: last, email: email, dob: "",
        visits: 0, points: 0, redeemed: 0, available: 0, vouchers: [],
        emailNotif: true, smsNotif: true,
        history: [{ date: today, type: "Created", points: 0, rewards: 0, store: "Seattle - Head Office" }]
      };
      saveUsers(users);
    } else {
      if (!users[mobile] || users[mobile].password !== pass) return fail("Incorrect mobile number or password.");
    }
    localStorage.setItem(SESSION_KEY, mobile);
    var u = currentUser(); u.visits++; saveUser(u);
    f.reset();
    showDashboard();
  });

  
  document.querySelectorAll(".loyalty-nav button[data-panel]").forEach(function (b) {
    b.addEventListener("click", function () { openPanel(b.dataset.panel); });
  });
  document.getElementById("signOut").addEventListener("click", function () {
    localStorage.removeItem(SESSION_KEY);
    dash.style.display = "none"; auth.style.display = "";
    document.querySelector(".site-header").style.display = "";
  });


  document.querySelectorAll(".subtabs button").forEach(function (b) {
    b.addEventListener("click", function () {
      document.querySelectorAll(".subtabs button").forEach(function (x) { x.classList.toggle("active", x === b); });
      document.getElementById("rewardsView").style.display = b.dataset.sub === "rewards" ? "" : "none";
      document.getElementById("securityView").style.display = b.dataset.sub === "security" ? "" : "none";
    });
  });

  // Log a purchase (demo): every 10 beverages = 1 free drink
  document.getElementById("addPurchase").addEventListener("click", function () {
    var u = currentUser();
    u.points++;
    var reward = 0;
    if (u.points % 10 === 0) {
      u.available++; reward = 1;
      u.vouchers.push({ code: "FREE-" + Math.random().toString(36).slice(2, 8).toUpperCase(), title: "Free beverage of your choice" });
    }
    u.history.unshift({ date: new Date().toLocaleDateString("en-US"), type: "Purchase", points: 1, rewards: reward, store: "Seattle - Wendywood" });
    saveUser(u); renderAll();
    if (reward) alert("Congratulations! Your 11th drink is on us – a free beverage voucher has been added.");
  });
  document.getElementById("redeemBtn").addEventListener("click", function () { redeem(0); });

 
  document.getElementById("passForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var f = e.target, u = currentUser(), m = document.getElementById("passMsg");
    if (f.current.value !== u.password) { m.className = "message fail"; m.textContent = "Current password is incorrect."; return; }
    if (f.newPass.value.length < 6) { m.className = "message fail"; m.textContent = "New password must be at least 6 characters."; return; }
    if (f.newPass.value !== f.confirm.value) { m.className = "message fail"; m.textContent = "Passwords do not match."; return; }
    u.password = f.newPass.value; saveUser(u); f.reset();
    m.className = "message success"; m.textContent = "Password updated successfully.";
  });

  
  document.getElementById("profileForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var f = e.target, u = currentUser(), m = document.getElementById("profileMsg");
    if (!/^\S+@\S+\.\S+$/.test(f.email.value.trim())) { m.className = "message fail"; m.textContent = "Please enter a valid email."; return; }
    u.firstName = f.firstName.value.trim(); u.lastName = f.lastName.value.trim();
    u.dob = f.dob.value; u.email = f.email.value.trim();
    u.emailNotif = f.emailNotif.checked; u.smsNotif = f.smsNotif.checked;
    saveUser(u);
    m.className = "message success"; m.textContent = "Profile saved.";
  });

 
  document.getElementById("prevPage").addEventListener("click", function () { page--; renderHistory(); });
  document.getElementById("nextPage").addEventListener("click", function () { page++; renderHistory(); });

  if (currentUser()) showDashboard();
}

function showDashboard() {
  document.getElementById("authSection").style.display = "none";
  document.getElementById("dashboard").style.display = "";
  document.querySelector(".site-header").style.display = "none";
  openPanel("home");
  renderAll();
}

function openPanel(name) {
  document.querySelectorAll(".loyalty-nav button[data-panel]").forEach(function (b) { b.classList.toggle("active", b.dataset.panel === name); });
  document.querySelectorAll(".panel").forEach(function (p) { p.classList.toggle("active", p.id === "panel-" + name); });
  window.scrollTo(0, 0);
}

function renderAll() {
  var u = currentUser(); if (!u) return;
  document.getElementById("statVisits").textContent = u.visits;
  document.getElementById("statPoints").textContent = u.points % 10;
  document.getElementById("statRedeemed").textContent = u.redeemed;
  document.getElementById("statAvailable").textContent = u.available;
  document.getElementById("welcome").textContent = "Welcome back, " + u.firstName + "!";

  
  var cups = document.getElementById("cups"); cups.innerHTML = "";
  for (var i = 1; i <= 11; i++) {
    var c = document.createElement("div");
    c.className = "cup" + (i <= u.points % 10 ? " filled" : "") + (i === 11 ? " free" : "");
    c.textContent = i === 11 ? "★" : i;
    cups.appendChild(c);
  }
  document.getElementById("redeemBtn").disabled = u.available === 0;

  renderVouchers(); page = 1; renderHistory();

  var f = document.getElementById("profileForm");
  f.firstName.value = u.firstName; f.lastName.value = u.lastName; f.dob.value = u.dob || "";
  f.email.value = u.email; f.emailNotif.checked = u.emailNotif; f.smsNotif.checked = u.smsNotif;
}

function renderVouchers() {
  var u = currentUser(), list = document.getElementById("voucherList");
  if (!u.vouchers.length) { list.innerHTML = '<p class="empty">No vouchers available at the moment.</p>'; return; }
  list.innerHTML = "";
  u.vouchers.forEach(function (v, i) {
    var d = document.createElement("div"); d.className = "voucher";
    d.innerHTML = "<div><strong>" + v.title + "</strong><br>Code: <code>" + v.code + "</code></div>";
    var b = document.createElement("button"); b.className = "btn"; b.textContent = "Redeem";
    b.addEventListener("click", function () { redeem(i); });
    d.appendChild(b); list.appendChild(d);
  });
}

function redeem(index) {
  var u = currentUser(); if (!u.vouchers.length) return;
  u.vouchers.splice(index, 1); u.available--; u.redeemed++;
  u.history.unshift({ date: new Date().toLocaleDateString("en-US"), type: "Redeemed", points: 0, rewards: -1, store: "Seattle - Wendywood" });
  saveUser(u); renderAll(); alert("Enjoy your free beverage!");
}

var page = 1, PER_PAGE = 5;
function renderHistory() {
  var u = currentUser(), body = document.getElementById("historyBody");
  var pages = Math.max(1, Math.ceil(u.history.length / PER_PAGE));
  page = Math.min(Math.max(page, 1), pages);
  body.innerHTML = "";
  u.history.slice((page - 1) * PER_PAGE, page * PER_PAGE).forEach(function (h) {
    var tr = document.createElement("tr");
    [h.date, h.type, h.points, h.rewards, h.store].forEach(function (v) { var td = document.createElement("td"); td.textContent = v; tr.appendChild(td); });
    body.appendChild(tr);
  });
  document.getElementById("pageInfo").textContent = "Page " + page + " of " + pages;
  document.getElementById("prevPage").disabled = page === 1;
  document.getElementById("nextPage").disabled = page === pages;
}


(function () {
  var KEY = "seattleCart";
  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } }
  function save(c) { localStorage.setItem(KEY, JSON.stringify(c)); render(); }
  function money(n) { return "R" + n.toFixed(2); }
  var cart = load();

  document.addEventListener("DOMContentLoaded", function () {
    // Cart button in the header
    var wrap = document.querySelector(".site-header .wrap");
    var btn = document.createElement("button");
    btn.className = "cart-toggle"; btn.setAttribute("aria-label", "Open cart");
    btn.innerHTML = "&#128722; Cart<span class='cart-count'>0</span>";
    if (wrap) wrap.appendChild(btn);

    
    document.body.insertAdjacentHTML("beforeend",
      "<div class='cart-overlay'></div>" +
      "<aside class='cart-drawer' aria-label='Shopping cart'>" +
      "<div class='cart-head'><h3>Your Cart</h3><button class='cart-close' aria-label='Close cart'>&times;</button></div>" +
      "<div class='cart-items'></div>" +
      "<div class='cart-foot'><div class='cart-total'><span>Total</span><span class='cart-sum'>R0.00</span></div>" +
      "<form class='checkout-form'><input name='name' placeholder='Your name' required>" +
      "<input name='phone' type='tel' placeholder='Phone number' required>" +
      "<select name='type'><option>Collect in store</option><option>Delivery</option></select></form>" +
      "<button class='btn block checkout-btn'>Checkout</button>" +
      "<button class='btn navy block clear-btn' style='margin-top:8px'>Clear Cart</button></div></aside>" +
      "<div class='cart-toast'></div>");

    function open() { document.body.classList.add("cart-open"); }
    function close() { document.body.classList.remove("cart-open"); }
    btn.addEventListener("click", open);
    document.querySelector(".cart-close").addEventListener("click", close);
    document.querySelector(".cart-overlay").addEventListener("click", close);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });

    
    document.querySelectorAll(".add-to-cart").forEach(function (b) {
      b.addEventListener("click", function () {
        var card = b.closest(".product");
        var name = card.querySelector("h3").textContent.trim();
        var price = parseFloat(card.querySelector(".price").textContent.replace(/[^\d.]/g, ""));
        var img = card.querySelector("img").getAttribute("src");
        var item = cart.find(function (i) { return i.name === name; });
        if (item) item.qty++; else cart.push({ name: name, price: price, img: img, qty: 1 });
        save(cart); toast(name + " added to cart");
      });
    });

   
    document.querySelector(".cart-items").addEventListener("click", function (e) {
      var i = e.target.dataset.i; if (i === undefined) return;
      if (e.target.dataset.act === "plus") cart[i].qty++;
      if (e.target.dataset.act === "minus") cart[i].qty--;
      if (e.target.dataset.act === "remove" || cart[i].qty < 1) cart.splice(i, 1);
      save(cart);
    });

    document.querySelector(".clear-btn").addEventListener("click", function () {
      if (cart.length && confirm("Remove all items from your cart?")) { cart = []; save(cart); }
    });

    var form = document.querySelector(".checkout-form");
    document.querySelector(".checkout-btn").addEventListener("click", function () {
      if (!cart.length) { toast("Your cart is empty"); return; }
      if (!form.classList.contains("show")) { form.classList.add("show"); this.textContent = "Place Order"; return; }
      if (!form.reportValidity()) return;
      var total = cart.reduce(function (s, i) { return s + i.price * i.qty; }, 0);
      alert("Thank you, " + form.name.value + "! Your order of " + money(total) +
        " has been received (" + form.type.value + "). We'll call you on " + form.phone.value + ".");
      cart = []; save(cart); form.reset(); form.classList.remove("show");
      this.textContent = "Checkout"; close();
    });

    render();
  });

  function toast(msg) {
    var t = document.querySelector(".cart-toast"); if (!t) return;
    t.textContent = msg; t.classList.add("show");
    clearTimeout(t._h); t._h = setTimeout(function () { t.classList.remove("show"); }, 1800);
  }

  function render() {
    var list = document.querySelector(".cart-items"); if (!list) return;
    var count = 0, total = 0;
    list.innerHTML = cart.length ? "" : "<p class='cart-empty'>Your cart is empty.<br><a href='catalogue.html'>Browse the catalogue</a></p>";
    cart.forEach(function (it, i) {
      count += it.qty; total += it.price * it.qty;
      list.insertAdjacentHTML("beforeend",
        "<div class='cart-item'><img src='" + it.img + "' alt=''><div class='info'><h4>" + it.name + "</h4>" +
        "<div class='unit'>" + money(it.price) + " each</div>" +
        "<div class='qty'><button data-i='" + i + "' data-act='minus' aria-label='Less'>-</button><span>" + it.qty + "</span>" +
        "<button data-i='" + i + "' data-act='plus' aria-label='More'>+</button></div></div>" +
        "<div><strong>" + money(it.price * it.qty) + "</strong><br><button class='remove' data-i='" + i + "' data-act='remove'>Remove</button></div></div>");
    });
    document.querySelector(".cart-count").textContent = count;
    document.querySelector(".cart-sum").textContent = money(total);
  }
})();
