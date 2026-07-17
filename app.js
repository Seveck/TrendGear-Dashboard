/* ============================================================
   TrendGear Dashboard - app.js
   Fase III: Fetch de Firebase + Renderizado dinámico en el DOM
   ============================================================

   IMPORTANTE:
   - FIREBASE_URL apunta a tu Realtime Database.
   - Se asume que el dataset vive en el nodo "/customers".
     Si subiste el JSON en la raíz en lugar de en "/customers",
     cambia DATA_PATH a "" (cadena vacía).
   - Requiere que las reglas de lectura permitan el acceso
     (".read": true) en este entorno de prueba/desarrollo.
============================================================ */

const FIREBASE_URL = "https://trendgear-dashboard-c9188-default-rtdb.firebaseio.com";
const DATA_PATH = ""; // el dataset quedó importado en la raíz de la base de datos

let allCustomers = [];

/* ---------- Helpers de formato ---------- */

function formatCurrency(value) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
}

function formatDate(isoDate) {
  const [year, month, day] = isoDate.split("-");
  return `${day}/${month}/${year}`;
}

function membershipBadgeClass(status) {
  const key = status.toLowerCase();
  return `badge badge--${key}`;
}

/* ---------- Fetch de datos ---------- */

async function fetchCustomers() {
  const url = `${FIREBASE_URL}/${DATA_PATH}.json`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Firebase respondió con estado ${response.status}`);
    }

    const data = await response.json();

    if (!data) {
      throw new Error("El nodo de Firebase está vacío. Verifica DATA_PATH y que el dataset se haya subido.");
    }

    // El dataset se guarda como objeto { "CUST-0001": {...}, "CUST-0002": {...} }
    allCustomers = Object.values(data);

    renderAll();
    updateSyncStatus(true);
  } catch (error) {
    // Protocolo de depuración asistida: registra el error completo en consola
    // para poder copiarlo y pedir ayuda de forma puntual (asincronía, URL, reglas, etc.)
    console.error("Error al conectar con Firebase:", error);
    updateSyncStatus(false, error.message);
  }
}

function updateSyncStatus(success, message) {
  const el = document.getElementById("last-sync");
  if (success) {
    const now = new Date().toLocaleTimeString("es-CO");
    el.textContent = `Última sincronización: ${now}`;
  } else {
    el.textContent = `No se pudo sincronizar con Firebase (${message}).`;
  }
}

/* ---------- Renderizado: KPIs ---------- */

function renderKPIs(customers) {
  const total = customers.length;
  const revenue = customers.reduce((sum, c) => sum + Number(c.amount_spent), 0);
  const avgTicket = total ? revenue / total : 0;
  const avgAge = total ? customers.reduce((sum, c) => sum + Number(c.age), 0) / total : 0;

  document.getElementById("kpi-total").textContent = total;
  document.getElementById("kpi-revenue").textContent = formatCurrency(revenue);
  document.getElementById("kpi-avg").textContent = formatCurrency(avgTicket);
  document.getElementById("kpi-age").textContent = `${avgAge.toFixed(1)} años`;
}

/* ---------- Renderizado: Tabla de clientes ---------- */

function renderTable(customers) {
  const tbody = document.getElementById("customers-tbody");
  const emptyState = document.getElementById("empty-state");

  if (customers.length === 0) {
    tbody.innerHTML = "";
    emptyState.hidden = false;
    return;
  }

  emptyState.hidden = true;

  // Recorremos el arreglo con forEach y construimos un Template Literal por fila
  const rowsHtml = [];
  customers.forEach((c) => {
    rowsHtml.push(`
      <tr>
        <td data-label="ID">${c.customer_id}</td>
        <td data-label="Cliente">${c.name}</td>
        <td data-label="Email">${c.email}</td>
        <td data-label="Producto">${c.product_purchased}</td>
        <td data-label="Fecha de compra">${formatDate(c.purchase_date)}</td>
        <td data-label="Monto">${formatCurrency(c.amount_spent)}</td>
        <td data-label="Edad">${c.age}</td>
        <td data-label="Ciudad">${c.city}</td>
        <td data-label="Método de pago">${c.payment_method}</td>
        <td data-label="Último login">${formatDate(c.last_login_date)}</td>
        <td data-label="Membresía"><span class="${membershipBadgeClass(c.membership_status)}">${c.membership_status}</span></td>
      </tr>
    `);
  });

  tbody.innerHTML = rowsHtml.join("");
}

/* ---------- Renderizado: Distribución por membresía ---------- */

function renderMembershipBars(customers) {
  const container = document.getElementById("membership-bars");
  const order = ["Platinum", "Gold", "Silver", "Bronze"];

  const counts = order.map((level) => ({
    level,
    count: customers.filter((c) => c.membership_status === level).length,
  }));

  const maxCount = Math.max(...counts.map((c) => c.count), 1);

  const barsHtml = counts.map(({ level, count }) => {
    const widthPct = (count / maxCount) * 100;
    return `
      <div class="membership-bar">
        <span>${level}</span>
        <div class="membership-bar__track">
          <div class="membership-bar__fill" style="width: ${widthPct}%"></div>
        </div>
        <span>${count}</span>
      </div>
    `;
  });

  container.innerHTML = barsHtml.join("");
}

function renderAll(filtered = allCustomers) {
  renderKPIs(filtered);
  renderTable(filtered);
  renderMembershipBars(filtered);
}

/* ---------- Búsqueda ---------- */

document.getElementById("search-input").addEventListener("input", (event) => {
  const query = event.target.value.trim().toLowerCase();

  const filtered = allCustomers.filter((c) => {
    return (
      c.name.toLowerCase().includes(query) ||
      c.email.toLowerCase().includes(query) ||
      c.city.toLowerCase().includes(query) ||
      c.product_purchased.toLowerCase().includes(query)
    );
  });

  renderAll(filtered);
});

/* ---------- Navegación por pestañas ---------- */

const navLinks = document.querySelectorAll(".nav__link");
const viewPanels = document.querySelectorAll(".view");

function setActiveView(viewName) {
  viewPanels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.viewPanel === viewName);
  });
  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.dataset.view === viewName);
  });
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => setActiveView(link.dataset.view));
});

/* ---------- Menú hamburguesa (móvil) ---------- */

const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");

hamburger.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  hamburger.classList.toggle("is-open", isOpen);
  hamburger.setAttribute("aria-expanded", String(isOpen));
});

// Cierra el menú al elegir una pestaña (útil en móvil)
nav.querySelectorAll(".nav__link").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    hamburger.classList.remove("is-open");
    hamburger.setAttribute("aria-expanded", "false");
  });
});

/* ---------- Inicio ---------- */

fetchCustomers();