/**
 * Denzel & Angelica's Loopy & Crong Finance Tracker Engine
 * Full Google Sheets Auto-Save & Synchronization
 */

// Default Spreadsheet URL provided by Denzel & Angelica
const GOOGLE_SHEET_URL = "https://docs.google.com/spreadsheets/d/1Na-vuyyPL21sbJjvJaNFQ4KzhRDqCrQJFI_cDVmSU10/edit?usp=sharing";
const SPREADSHEET_ID = "1Na-vuyyPL21sbJjvJaNFQ4KzhRDqCrQJFI_cDVmSU10";

// Initial Seed Data (if local storage is empty)
const INITIAL_DATA = {
  settings: {
    scriptUrl: "",
    currency: "₱",
    autoSync: true
  },
  income: [
    { id: "inc-1", person: "Denzel", source: "Denzel's Salary", amount: 45000, frequency: "Monthly", date: "2026-10-01", notes: "Primary Income" },
    { id: "inc-2", person: "Angelica", source: "Angelica's Salary", amount: 42000, frequency: "Monthly", date: "2026-10-01", notes: "Primary Income" },
    { id: "inc-3", person: "Denzel", source: "Side Hustle / Freelance", amount: 8500, frequency: "One-time", date: "2026-09-28", notes: "Web Development" }
  ],
  debts: [
    { id: "debt-1", person: "Combined", title: "BPI Credit Card Installment", creditor: "BPI Bank", totalAmount: 24000, remainingAmount: 12000, minMonthlyPayment: 2000, dueDate: "2026-10-15", status: "Active", notes: "Appliance purchase 0% interest" },
    { id: "debt-2", person: "Denzel", title: "Gadget Loan", creditor: "Home Credit", totalAmount: 18000, remainingAmount: 6000, minMonthlyPayment: 1500, dueDate: "2026-10-20", status: "Active", notes: "Work Monitor" },
    { id: "debt-3", person: "Angelica", title: "Shopping Buy-Now-Pay-Later", creditor: "SpayLater", totalAmount: 4500, remainingAmount: 1500, minMonthlyPayment: 750, dueDate: "2026-10-10", status: "Active", notes: "Clothes & Essentials" }
  ],
  trips: [
    {
      id: "trip-1",
      destination: "Boracay Couple Vacation",
      startDate: "2026-11-15",
      endDate: "2026-11-18",
      totalBudget: 35000,
      bStay: 12000,
      bFood: 10000,
      bTranspo: 8000,
      bActivities: 5000,
      notes: "Beach getaway & anniversary celebration 🏖️"
    },
    {
      id: "trip-2",
      destination: "Tagaytay Weekend Trip",
      startDate: "2026-10-24",
      endDate: "2026-10-25",
      totalBudget: 8000,
      bStay: 3500,
      bFood: 3000,
      bTranspo: 1500,
      bActivities: 0,
      notes: "Cozy dinner date & cafe hopping ☕"
    }
  ],
  savingsGoals: [
    { id: "sav-1", title: "Emergency Savings Fund", targetAmount: 100000, currentAmount: 45000, targetDate: "2026-12-31" },
    { id: "sav-2", title: "Japan Couple Travel Fund", targetAmount: 80000, currentAmount: 25000, targetDate: "2027-05-15" }
  ],
  transactions: [
    { id: "tx-1", person: "Angelica", title: "Cleanser", category: "Angelica's Skincare", amount: 650, type: "Expense", period: "Monthly", date: "2026-10-02", notes: "Gentle facial restock" },
    { id: "tx-2", person: "Angelica", title: "Serum", category: "Angelica's Skincare", amount: 890, type: "Expense", period: "Monthly", date: "2026-10-02", notes: "Niacinamide glow serum" },
    { id: "tx-3", person: "Angelica", title: "Conditioner", category: "Angelica's Essentials", amount: 480, type: "Expense", period: "Every 2 Months", date: "2026-10-02", notes: "Hair care restock" },
    { id: "tx-4", person: "Angelica", title: "Shampoo", category: "Angelica's Essentials", amount: 420, type: "Expense", period: "Every 2 Months", date: "2026-10-01", notes: "Hair care restock" },
    { id: "tx-5", person: "Angelica", title: "Soap", category: "Angelica's Essentials", amount: 350, type: "Expense", period: "Monthly", date: "2026-10-01", notes: "Beauty bar soaps" },
    { id: "tx-6", person: "Denzel", title: "Hair Wax", category: "Denzel's Essentials", amount: 320, type: "Expense", period: "Every 3 Months", date: "2026-09-29", notes: "Styling wax" },
    { id: "tx-7", person: "Denzel", title: "Shaving Foam", category: "Denzel's Essentials", amount: 280, type: "Expense", period: "Every 6 Months", date: "2026-09-29", notes: "Personal grooming" },
    { id: "tx-8", person: "Combined", title: "Weekly Grocery Shopping", category: "Daily Needs & Groceries", amount: 3800, type: "Expense", period: "Weekly", date: "2026-10-02", notes: "Eggs, Milk, Vegetables, Meats, Fruits" },
    { id: "tx-9", person: "Combined", title: "Romantic Dinner & Coffee Date", category: "Dating & Outings", amount: 1650, type: "Expense", period: "Weekly", date: "2026-09-30", notes: "Weekend cozy date" },
    { id: "tx-10", person: "Combined", title: "Electricity & Fiber Internet Bill", category: "Utilities & Bills", amount: 4800, type: "Expense", period: "Monthly", date: "2026-09-25", notes: "Meralco + Converge" },
    { id: "tx-11", person: "Combined", title: "Boracay Flight Reservation", category: "Trip Expense", amount: 7500, type: "Expense", period: "One-Time / Random", date: "2026-09-20", notes: "Boracay Couple Vacation flight deposit" }
  ]
};

// Cute Loopy & Crong Speech Messages
const LOOPY_CRONG_QUOTES = [
  "Loopy says: Angelica's skincare routine is fully budgeted! Glow on! 🎀✨",
  "Crong says: Denzel and Angelica are saving super well today! Rawr! REX! 🦖💪",
  "Loopy & Crong: Teamwork makes the dream work for both of your future goals! 💕",
  "Loopy says: Don't forget to check your shampoo and soap stock! 🧴🌸",
  "Crong says: Keeping our debts low means more fun vacations & date nights ahead! 🍲🎉",
  "Loopy says: Auto-sync is protecting your hard-earned budget in Google Sheets! 📊⭐"
];

// App State
let state = {
  ...INITIAL_DATA,
  activeTab: "dashboard",
  syncing: false
};

// DOM Content Loaded Handler
document.addEventListener("DOMContentLoaded", () => {
  loadLocalState();
  setupEventListeners();
  renderAll();
  initCharts();
  triggerRandomQuote();

  if (state.settings.scriptUrl) {
    syncWithGoogleSheets(true);
  }
});

// Save to LocalStorage
function saveLocalState() {
  localStorage.setItem("dna_finance_tracker_data", JSON.stringify({
    settings: state.settings,
    income: state.income,
    debts: state.debts,
    trips: state.trips,
    savingsGoals: state.savingsGoals,
    transactions: state.transactions
  }));
}

// Load from LocalStorage
function loadLocalState() {
  const saved = localStorage.getItem("dna_finance_tracker_data");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      state.settings = { ...INITIAL_DATA.settings, ...(parsed.settings || {}) };
      state.income = parsed.income || INITIAL_DATA.income;
      state.debts = parsed.debts || INITIAL_DATA.debts;
      state.trips = parsed.trips || INITIAL_DATA.trips;
      state.savingsGoals = parsed.savingsGoals || INITIAL_DATA.savingsGoals;
      state.transactions = parsed.transactions || INITIAL_DATA.transactions;
    } catch (e) {
      console.error("Error loading local state:", e);
    }
  }
}

// Setup Event Listeners
function setupEventListeners() {
  // Navigation Tabs
  document.querySelectorAll(".nav-tab").forEach(tab => {
    tab.addEventListener("click", (e) => {
      document.querySelectorAll(".nav-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const tabTarget = tab.getAttribute("data-tab");
      state.activeTab = tabTarget;
      
      document.querySelectorAll(".tab-content").forEach(content => {
        content.classList.add("hidden");
      });
      document.getElementById(`tab-${tabTarget}`)?.classList.remove("hidden");
      
      if (tabTarget === "analytics") {
        setTimeout(initCharts, 100);
      }
    });
  });

  // Modal Open Buttons
  document.getElementById("btn-add-expense")?.addEventListener("click", () => openModal("modal-transaction"));
  document.getElementById("btn-add-income")?.addEventListener("click", () => openModal("modal-income"));
  document.getElementById("btn-add-debt")?.addEventListener("click", () => openModal("modal-debt"));
  document.getElementById("btn-open-sync-settings")?.addEventListener("click", () => openModal("modal-sync"));
  document.getElementById("btn-manual-sync")?.addEventListener("click", () => syncWithGoogleSheets());

  // Modal Close Buttons
  document.querySelectorAll(".btn-close, .btn-modal-cancel").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const modal = e.target.closest(".modal-overlay");
      if (modal) modal.classList.remove("active");
    });
  });

  // Form Submissions
  document.getElementById("form-transaction")?.addEventListener("submit", handleAddTransaction);
  document.getElementById("form-income")?.addEventListener("submit", handleAddIncome);
  document.getElementById("form-debt")?.addEventListener("submit", handleAddDebt);
  document.getElementById("form-trip")?.addEventListener("submit", handleAddTrip);
  document.getElementById("form-savings")?.addEventListener("submit", handleAddSavingsGoal);
  document.getElementById("form-sync-settings")?.addEventListener("submit", handleSaveSyncSettings);

  // General Preset Chips Clicking (Skincare & Essentials shortcuts)
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("preset-chip")) {
      const title = e.target.getAttribute("data-title");
      const category = e.target.getAttribute("data-category");
      const person = e.target.getAttribute("data-person");
      
      openModal("modal-transaction");
      const titleInput = document.getElementById("tx-title");
      const catInput = document.getElementById("tx-category");
      const personInput = document.getElementById("tx-person");

      if (titleInput) titleInput.value = title;
      if (catInput) catInput.value = category;
      if (personInput) personInput.value = person;
    }
  });

  // Filter Listeners
  document.getElementById("filter-period")?.addEventListener("change", renderTransactions);
  document.getElementById("filter-person")?.addEventListener("change", renderTransactions);
  document.getElementById("filter-category")?.addEventListener("change", renderTransactions);
  document.getElementById("search-tx")?.addEventListener("input", renderTransactions);
}

// Open Custom Item Modal pre-filled for Angelica
function openAngelicaCustomAdd() {
  openModal("modal-transaction");
  document.getElementById("tx-person").value = "Angelica";
  document.getElementById("tx-category").value = "Angelica's Skincare";
  document.getElementById("tx-title").value = "";
  document.getElementById("tx-title").focus();
}

// Open Custom Item Modal pre-filled for Denzel
function openDenzelCustomAdd() {
  openModal("modal-transaction");
  document.getElementById("tx-person").value = "Denzel";
  document.getElementById("tx-category").value = "Denzel's Essentials";
  document.getElementById("tx-title").value = "";
  document.getElementById("tx-title").focus();
}

// Render All Views
function renderAll() {
  renderSummaryStats();
  renderTransactions();
  renderAngelicaCorner();
  renderDenzelCorner();
  renderTrips();
  renderDebts();
  renderIncomeTable();
  renderSavingsGoals();
  updateSyncStatusUI();
}

// Format Currency
function formatMoney(amount) {
  return (state.settings.currency || "₱") + Number(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Render Summary Statistics Card Values
function renderSummaryStats() {
  const totalIncome = state.income.reduce((sum, item) => sum + Number(item.amount), 0);
  const totalExpenses = state.transactions
    .filter(t => t.type === "Expense")
    .reduce((sum, item) => sum + Number(item.amount), 0);
  const totalActiveDebt = state.debts
    .filter(d => d.status !== "Paid Off")
    .reduce((sum, item) => sum + Number(item.remainingAmount), 0);
  
  const netSavings = totalIncome - totalExpenses;

  const angelicaSkincareCost = state.transactions
    .filter(t => t.category === "Angelica's Skincare" || t.category === "Angelica's Essentials")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  // Update DOM elements
  const elIncome = document.getElementById("stat-total-income");
  const elExpenses = document.getElementById("stat-total-expenses");
  const elDebt = document.getElementById("stat-total-debt");
  const elNet = document.getElementById("stat-net-savings");
  const elAngelicaEssentials = document.getElementById("stat-angelica-skincare");

  if (elIncome) elIncome.textContent = formatMoney(totalIncome);
  if (elExpenses) elExpenses.textContent = formatMoney(totalExpenses);
  if (elDebt) elDebt.textContent = formatMoney(totalActiveDebt);
  if (elNet) {
    elNet.textContent = formatMoney(netSavings);
    elNet.className = netSavings >= 0 ? "stat-value text-green" : "stat-value text-danger";
  }
  if (elAngelicaEssentials) elAngelicaEssentials.textContent = formatMoney(angelicaSkincareCost);

  // 50/30/20 Rule calculations
  const needsVal = totalIncome * 0.50;
  const wantsVal = totalIncome * 0.30;
  const savingsVal = totalIncome * 0.20;

  if (document.getElementById("rule-needs-val")) document.getElementById("rule-needs-val").textContent = formatMoney(needsVal);
  if (document.getElementById("rule-wants-val")) document.getElementById("rule-wants-val").textContent = formatMoney(wantsVal);
  if (document.getElementById("rule-savings-val")) document.getElementById("rule-savings-val").textContent = formatMoney(savingsVal);
}

// Render Main Transactions Table
function renderTransactions() {
  const tbody = document.getElementById("tbody-transactions");
  if (!tbody) return;

  const period = document.getElementById("filter-period")?.value || "all";
  const person = document.getElementById("filter-person")?.value || "all";
  const category = document.getElementById("filter-category")?.value || "all";
  const search = (document.getElementById("search-tx")?.value || "").toLowerCase();

  let filtered = [...state.transactions];

  if (person !== "all") {
    filtered = filtered.filter(t => t.person === person || t.person === "Combined");
  }

  if (category !== "all") {
    filtered = filtered.filter(t => t.category === category);
  }

  if (period !== "all") {
    filtered = filtered.filter(t => t.period === period);
  }

  if (search) {
    filtered = filtered.filter(t => 
      t.title.toLowerCase().includes(search) || 
      (t.notes && t.notes.toLowerCase().includes(search))
    );
  }

  filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="text-center text-muted" style="padding: 2rem;">No matching expenses found! 🐾</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(t => {
    const personBadge = t.person === "Angelica" 
      ? `<span class="badge-pill badge-loopy">🎀 Angelica</span>` 
      : t.person === "Denzel" 
      ? `<span class="badge-pill badge-crong">🦖 Denzel</span>` 
      : `<span class="badge-pill" style="background:#EDF2F7; color:#4A5568;">💑 Combined</span>`;

    const catClass = getCategoryBadgeClass(t.category);

    return `
      <tr>
        <td><strong>${t.date}</strong></td>
        <td>${personBadge}</td>
        <td>
          <div style="font-weight: 600;">${t.title}</div>
          ${t.notes ? `<small class="text-muted">${t.notes}</small>` : ''}
        </td>
        <td><span class="category-badge ${catClass}">${t.category}</span></td>
        <td><span class="badge-pill" style="background:#EDF2F7; font-size:0.75rem;">${t.period || 'Monthly'}</span></td>
        <td class="text-pink font-heading" style="font-size: 1.05rem;"><strong>${formatMoney(t.amount)}</strong></td>
        <td>
          <button class="btn btn-outline btn-sm" onclick="deleteTransaction('${t.id}')" title="Delete">🗑️</button>
        </td>
      </tr>
    `;
  }).join("");
}

// Render Angelica's Corner
function renderAngelicaCorner() {
  const container = document.getElementById("angelica-items-list");
  if (!container) return;

  const angelicaItems = state.transactions.filter(t => 
    t.person === "Angelica" || 
    t.category === "Angelica's Skincare" || 
    t.category === "Angelica's Essentials"
  );

  const totalAngelica = angelicaItems.reduce((sum, item) => sum + Number(item.amount), 0);
  const skincareOnly = angelicaItems.filter(t => t.category === "Angelica's Skincare").reduce((sum, t) => sum + Number(t.amount), 0);
  const essentialsOnly = angelicaItems.filter(t => t.category === "Angelica's Essentials").reduce((sum, t) => sum + Number(t.amount), 0);

  if (document.getElementById("angelica-total-spent")) document.getElementById("angelica-total-spent").textContent = formatMoney(totalAngelica);
  if (document.getElementById("angelica-skincare-spent")) document.getElementById("angelica-skincare-spent").textContent = formatMoney(skincareOnly);
  if (document.getElementById("angelica-essentials-spent")) document.getElementById("angelica-essentials-spent").textContent = formatMoney(essentialsOnly);

  if (angelicaItems.length === 0) {
    container.innerHTML = `<div class="text-muted text-center" style="padding: 1.5rem;">No skincare or personal care items added yet! Click quick-add chips or '+ Add Custom Item' above! 🎀</div>`;
    return;
  }

  container.innerHTML = angelicaItems.map(item => `
    <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.85rem; border-bottom: 1px dashed var(--border-pink);">
      <div>
        <strong style="color: var(--text-main);">${item.title}</strong>
        <div style="font-size:0.8rem;" class="text-muted">${item.date} • ${item.category} • <span style="color:var(--loopy-primary);">${item.period}</span></div>
        ${item.notes ? `<div style="font-size:0.75rem; color:#A0AEC0;">${item.notes}</div>` : ''}
      </div>
      <span class="font-heading text-pink" style="font-size: 1.1rem; font-weight:700;">${formatMoney(item.amount)}</span>
    </div>
  `).join("");
}

// Render Denzel's Corner
function renderDenzelCorner() {
  const container = document.getElementById("denzel-items-list");
  if (!container) return;

  const denzelItems = state.transactions.filter(t => 
    t.person === "Denzel" || 
    t.category === "Denzel's Essentials"
  );

  const totalDenzel = denzelItems.reduce((sum, item) => sum + Number(item.amount), 0);
  if (document.getElementById("denzel-total-spent")) document.getElementById("denzel-total-spent").textContent = formatMoney(totalDenzel);

  if (denzelItems.length === 0) {
    container.innerHTML = `<div class="text-muted text-center" style="padding: 1.5rem;">No items added for Denzel yet! 🦖</div>`;
    return;
  }

  container.innerHTML = denzelItems.map(item => `
    <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.85rem; border-bottom: 1px dashed var(--border-green);">
      <div>
        <strong style="color: var(--text-main);">${item.title}</strong>
        <div style="font-size:0.8rem;" class="text-muted">${item.date} • ${item.category} • <span style="color:var(--crong-primary);">${item.period}</span></div>
        ${item.notes ? `<div style="font-size:0.75rem; color:#A0AEC0;">${item.notes}</div>` : ''}
      </div>
      <span class="font-heading text-green" style="font-size: 1.1rem; font-weight:700;">${formatMoney(item.amount)}</span>
    </div>
  `).join("");
}

// Render Trip Planner Grid
function renderTrips() {
  const grid = document.getElementById("trips-grid");
  if (!grid) return;

  if (!state.trips || state.trips.length === 0) {
    grid.innerHTML = `<div class="col-12 text-center text-muted" style="padding: 2rem;">No planned couple trips yet! Click "+ Create New Trip" to schedule your next vacation! ✈️</div>`;
    return;
  }

  grid.innerHTML = state.trips.map(trip => {
    // Calculate total spent on this trip
    const tripExpenses = state.transactions.filter(t => t.notes && t.notes.includes(trip.destination));
    const spentOnTrip = tripExpenses.reduce((sum, t) => sum + Number(t.amount), 0);
    const percentSpent = Math.min(100, Math.round((spentOnTrip / trip.totalBudget) * 100));
    const isOver = spentOnTrip > trip.totalBudget;

    return `
      <div class="debt-card" style="border-color: #4299E1; background: #EBF8FF;">
        <div class="debt-card-header">
          <div>
            <div class="debt-name" style="color:#2B6CB0;">✈️ ${trip.destination}</div>
            <div class="debt-creditor">Dates: ${trip.startDate} ${trip.endDate ? 'to ' + trip.endDate : ''}</div>
          </div>
          <span class="badge-pill" style="background:${isOver ? '#FED7D7' : '#C6F6D5'}; color:${isOver ? '#9B2C2C' : '#22543D'};">
            ${isOver ? '⚠️ Over Budget' : '✈️ Planned'}
          </span>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:baseline;">
          <div class="debt-amount-big" style="color:#2B6CB0;">${formatMoney(trip.totalBudget)}</div>
          <div style="font-size:0.85rem;" class="text-muted">Spent: ${formatMoney(spentOnTrip)}</div>
        </div>

        <div class="progress-container">
          <div class="progress-bar" style="width: ${percentSpent}%; background:${isOver ? '#E53E3E' : 'linear-gradient(135deg, #4299E1, #9F7AEA)'}"></div>
        </div>

        <!-- Sub-budget pills -->
        <div style="display:flex; flex-wrap:wrap; gap:0.35rem; margin-bottom:1rem;">
          ${trip.bStay ? `<span class="badge-pill" style="background:#FFF; font-size:0.75rem;">🏨 Stay: ${formatMoney(trip.bStay)}</span>` : ''}
          ${trip.bFood ? `<span class="badge-pill" style="background:#FFF; font-size:0.75rem;">🍲 Food: ${formatMoney(trip.bFood)}</span>` : ''}
          ${trip.bTranspo ? `<span class="badge-pill" style="background:#FFF; font-size:0.75rem;">🚗 Transpo: ${formatMoney(trip.bTranspo)}</span>` : ''}
          ${trip.bActivities ? `<span class="badge-pill" style="background:#FFF; font-size:0.75rem;">🎟️ Fun: ${formatMoney(trip.bActivities)}</span>` : ''}
        </div>

        <div style="display:flex; gap:0.5rem;">
          <button class="btn btn-loopy btn-sm" style="flex:1;" onclick="addTripExpense('${trip.destination}')">
            💸 Log Trip Expense
          </button>
          <button class="btn btn-outline btn-sm" onclick="deleteTrip('${trip.id}')">🗑️</button>
        </div>
      </div>
    `;
  }).join("");
}

// Render Debts / Credits Payables Grid
function renderDebts() {
  const grid = document.getElementById("debt-card-grid");
  if (!grid) return;

  if (state.debts.length === 0) {
    grid.innerHTML = `<div class="col-12 text-center text-muted" style="padding: 2rem;">No active debts or credits to pay! Woohoo! 🎉</div>`;
    return;
  }

  grid.innerHTML = state.debts.map(debt => {
    const isPaid = debt.remainingAmount <= 0 || debt.status === "Paid Off";
    const percentPaid = Math.min(100, Math.round(((debt.totalAmount - debt.remainingAmount) / debt.totalAmount) * 100));

    return `
      <div class="debt-card ${isPaid ? 'paid-off' : ''}">
        <div class="debt-card-header">
          <div>
            <div class="debt-name">${debt.title}</div>
            <div class="debt-creditor">${debt.creditor} • ${debt.person}</div>
          </div>
          <span class="badge-pill ${isPaid ? 'badge-crong' : 'badge-loopy'}">
            ${isPaid ? '✅ Paid Off' : '⏳ Active'}
          </span>
        </div>
        <div class="debt-amount-big">${formatMoney(debt.remainingAmount)}</div>
        <div style="font-size: 0.825rem;" class="text-muted">Original Total: ${formatMoney(debt.totalAmount)}</div>

        <div class="progress-container">
          <div class="progress-bar" style="width: ${percentPaid}%;"></div>
        </div>

        <div class="debt-meta-info">
          <span>${percentPaid}% Paid</span>
          <span>Due: ${debt.dueDate}</span>
        </div>

        <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
          ${!isPaid ? `
            <button class="btn btn-loopy btn-sm" style="flex:1;" onclick="makeDebtPayment('${debt.id}')">
              💳 Make Payment
            </button>
          ` : ''}
          <button class="btn btn-outline btn-sm" onclick="deleteDebt('${debt.id}')">🗑️</button>
        </div>
      </div>
    `;
  }).join("");
}

// Render Income Table
function renderIncomeTable() {
  const tbody = document.getElementById("tbody-income");
  if (!tbody) return;

  tbody.innerHTML = state.income.map(inc => `
    <tr>
      <td>
        <span class="badge-pill ${inc.person === 'Angelica' ? 'badge-loopy' : 'badge-crong'}">
          ${inc.person === 'Angelica' ? '🎀 Angelica' : '🦖 Denzel'}
        </span>
      </td>
      <td><strong>${inc.source}</strong></td>
      <td><span class="badge-pill" style="background:#EDF2F7;">${inc.frequency}</span></td>
      <td>${inc.date}</td>
      <td class="text-success font-heading" style="font-size: 1.05rem;"><strong>${formatMoney(inc.amount)}</strong></td>
      <td>
        <button class="btn btn-outline btn-sm" onclick="deleteIncome('${inc.id}')">🗑️</button>
      </td>
    </tr>
  `).join("");
}

// Render Savings Goals Grid
function renderSavingsGoals() {
  const grid = document.getElementById("savings-card-grid");
  if (!grid) return;

  if (!state.savingsGoals || state.savingsGoals.length === 0) {
    grid.innerHTML = `<div class="col-12 text-center text-muted" style="padding: 2rem;">No savings goals set yet! Click "+ Create Savings Goal"! 🎯</div>`;
    return;
  }

  grid.innerHTML = state.savingsGoals.map(goal => {
    const percentSaved = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));

    return `
      <div class="debt-card" style="border-color: #38A169; background: #F0FFF4;">
        <div class="debt-card-header">
          <div>
            <div class="debt-name" style="color:#22543D;">🎯 ${goal.title}</div>
            <div class="debt-creditor">Target Date: ${goal.targetDate || 'No rush'}</div>
          </div>
          <span class="badge-pill badge-crong">${percentSaved}% Saved</span>
        </div>

        <div class="debt-amount-big text-green">${formatMoney(goal.currentAmount)}</div>
        <div style="font-size:0.85rem;" class="text-muted">Target Goal: ${formatMoney(goal.targetAmount)}</div>

        <div class="progress-container">
          <div class="progress-bar" style="width: ${percentSaved}%; background: linear-gradient(135deg, #38A169, #48BB78);"></div>
        </div>

        <div style="display:flex; gap:0.5rem; margin-top:1rem;">
          <button class="btn btn-crong btn-sm" style="flex:1;" onclick="depositSavings('${goal.id}')">
            💰 Deposit Savings
          </button>
          <button class="btn btn-outline btn-sm" onclick="deleteSavingsGoal('${goal.id}')">🗑️</button>
        </div>
      </div>
    `;
  }).join("");
}

// Category Badge Helper
function getCategoryBadgeClass(category) {
  switch (category) {
    case "Angelica's Skincare": return "cat-skincare";
    case "Angelica's Essentials": return "cat-essentials";
    case "Denzel's Essentials": return "cat-denzel-essentials";
    case "Daily Needs & Groceries": return "cat-groceries";
    case "Dating & Outings": return "cat-dating";
    case "Utilities & Bills": return "cat-utilities";
    case "Transportation": return "cat-transport";
    default: return "cat-misc";
  }
}

// Add Handlers
function handleAddTransaction(e) {
  e.preventDefault();
  const person = document.getElementById("tx-person").value;
  const title = document.getElementById("tx-title").value;
  const category = document.getElementById("tx-category").value;
  const amount = parseFloat(document.getElementById("tx-amount").value);
  const period = document.getElementById("tx-period").value;
  const date = document.getElementById("tx-date").value || new Date().toISOString().split('T')[0];
  const notes = document.getElementById("tx-notes").value;

  const newTx = {
    id: "tx-" + Date.now(),
    person,
    title,
    category,
    amount,
    type: "Expense",
    period,
    date,
    notes
  };

  state.transactions.unshift(newTx);
  saveLocalState();
  renderAll();
  closeModal("modal-transaction");
  document.getElementById("form-transaction").reset();
  triggerRandomQuote();
  autoSaveToSheets();
}

function handleAddIncome(e) {
  e.preventDefault();
  const person = document.getElementById("inc-person").value;
  const source = document.getElementById("inc-source").value;
  const amount = parseFloat(document.getElementById("inc-amount").value);
  const frequency = document.getElementById("inc-frequency").value;
  const date = document.getElementById("inc-date").value || new Date().toISOString().split('T')[0];

  const newInc = {
    id: "inc-" + Date.now(),
    person,
    source,
    amount,
    frequency,
    date
  };

  state.income.unshift(newInc);
  saveLocalState();
  renderAll();
  closeModal("modal-income");
  document.getElementById("form-income").reset();
  autoSaveToSheets();
}

function handleAddDebt(e) {
  e.preventDefault();
  const person = document.getElementById("debt-person").value;
  const title = document.getElementById("debt-title").value;
  const creditor = document.getElementById("debt-creditor").value;
  const totalAmount = parseFloat(document.getElementById("debt-total").value);
  const remainingAmount = parseFloat(document.getElementById("debt-remaining").value || totalAmount);
  const minMonthlyPayment = parseFloat(document.getElementById("debt-min-pay").value || 0);
  const dueDate = document.getElementById("debt-due-date").value;

  const newDebt = {
    id: "debt-" + Date.now(),
    person,
    title,
    creditor,
    totalAmount,
    remainingAmount,
    minMonthlyPayment,
    dueDate,
    status: remainingAmount <= 0 ? "Paid Off" : "Active"
  };

  state.debts.unshift(newDebt);
  saveLocalState();
  renderAll();
  closeModal("modal-debt");
  document.getElementById("form-debt").reset();
  autoSaveToSheets();
}

function handleAddTrip(e) {
  e.preventDefault();
  const destination = document.getElementById("trip-destination").value;
  const startDate = document.getElementById("trip-start-date").value;
  const endDate = document.getElementById("trip-end-date").value;
  const totalBudget = parseFloat(document.getElementById("trip-total-budget").value);
  const bStay = parseFloat(document.getElementById("trip-b-stay").value || 0);
  const bFood = parseFloat(document.getElementById("trip-b-food").value || 0);
  const bTranspo = parseFloat(document.getElementById("trip-b-transpo").value || 0);
  const bActivities = parseFloat(document.getElementById("trip-b-activities").value || 0);

  const newTrip = {
    id: "trip-" + Date.now(),
    destination,
    startDate,
    endDate,
    totalBudget,
    bStay,
    bFood,
    bTranspo,
    bActivities
  };

  if (!state.trips) state.trips = [];
  state.trips.unshift(newTrip);
  saveLocalState();
  renderAll();
  closeModal("modal-trip");
  document.getElementById("form-trip").reset();
  autoSaveToSheets();
}

function handleAddSavingsGoal(e) {
  e.preventDefault();
  const title = document.getElementById("sav-title").value;
  const targetAmount = parseFloat(document.getElementById("sav-target").value);
  const currentAmount = parseFloat(document.getElementById("sav-current").value || 0);
  const targetDate = document.getElementById("sav-target-date").value;

  const newGoal = {
    id: "sav-" + Date.now(),
    title,
    targetAmount,
    currentAmount,
    targetDate
  };

  if (!state.savingsGoals) state.savingsGoals = [];
  state.savingsGoals.unshift(newGoal);
  saveLocalState();
  renderAll();
  closeModal("modal-savings");
  document.getElementById("form-savings").reset();
  autoSaveToSheets();
}

function depositSavings(goalId) {
  const goal = state.savingsGoals.find(g => g.id === goalId);
  if (!goal) return;

  const depStr = prompt(`Enter deposit amount for ${goal.title}:`, "1000");
  if (!depStr) return;
  const dep = parseFloat(depStr);
  if (isNaN(dep) || dep <= 0) return;

  goal.currentAmount = (goal.currentAmount || 0) + dep;
  saveLocalState();
  renderAll();
  autoSaveToSheets();
}

function addTripExpense(tripDestination) {
  openModal("modal-transaction");
  document.getElementById("tx-category").value = "Trip Expense";
  document.getElementById("tx-notes").value = `Trip: ${tripDestination}`;
  document.getElementById("tx-title").value = "";
  document.getElementById("tx-title").focus();
}

function deleteTransaction(id) {
  if (confirm("Delete this expense entry?")) {
    state.transactions = state.transactions.filter(t => t.id !== id);
    saveLocalState();
    renderAll();
    autoSaveToSheets();
  }
}

function deleteIncome(id) {
  if (confirm("Delete this income entry?")) {
    state.income = state.income.filter(i => i.id !== id);
    saveLocalState();
    renderAll();
    autoSaveToSheets();
  }
}

function deleteDebt(id) {
  if (confirm("Delete this credit / debt item?")) {
    state.debts = state.debts.filter(d => d.id !== id);
    saveLocalState();
    renderAll();
    autoSaveToSheets();
  }
}

function deleteTrip(id) {
  if (confirm("Delete this planned trip?")) {
    state.trips = state.trips.filter(t => t.id !== id);
    saveLocalState();
    renderAll();
    autoSaveToSheets();
  }
}

function deleteSavingsGoal(id) {
  if (confirm("Delete this savings goal?")) {
    state.savingsGoals = state.savingsGoals.filter(s => s.id !== id);
    saveLocalState();
    renderAll();
    autoSaveToSheets();
  }
}

function makeDebtPayment(debtId) {
  const debt = state.debts.find(d => d.id === debtId);
  if (!debt) return;

  const payAmountStr = prompt(`Enter payment amount for ${debt.title}:`, debt.minMonthlyPayment || 1000);
  if (!payAmountStr) return;
  const payAmount = parseFloat(payAmountStr);
  if (isNaN(payAmount) || payAmount <= 0) return;

  debt.remainingAmount = Math.max(0, debt.remainingAmount - payAmount);
  if (debt.remainingAmount <= 0) {
    debt.status = "Paid Off";
  }

  state.transactions.unshift({
    id: "tx-" + Date.now(),
    person: debt.person,
    title: `Payment for ${debt.title}`,
    category: "Debt Repayment",
    amount: payAmount,
    type: "Expense",
    period: "Monthly",
    date: new Date().toISOString().split('T')[0],
    notes: `Paid to ${debt.creditor}`
  });

  saveLocalState();
  renderAll();
  alert(`Payment of ${formatMoney(payAmount)} recorded successfully! 🎉`);
  autoSaveToSheets();
}

// Settings
function handleSaveSyncSettings(e) {
  e.preventDefault();
  const scriptUrl = document.getElementById("setting-script-url").value.trim();
  state.settings.scriptUrl = scriptUrl;
  saveLocalState();
  closeModal("modal-sync");
  updateSyncStatusUI();

  if (scriptUrl) {
    syncWithGoogleSheets();
  }
}

// Google Sheets Sync
async function syncWithGoogleSheets(isInitialLoad = false) {
  if (!state.settings.scriptUrl) {
    updateSyncStatusUI("Not Connected", "error");
    return;
  }

  state.syncing = true;
  updateSyncStatusUI("Syncing with Google Sheets...", "syncing");

  try {
    if (isInitialLoad) {
      const response = await fetch(state.settings.scriptUrl + "?action=get");
      if (response.ok) {
        const data = await response.json();
        if (data.transactions && data.transactions.length > 0) state.transactions = data.transactions;
        if (data.income && data.income.length > 0) state.income = data.income;
        if (data.debts && data.debts.length > 0) state.debts = data.debts;
        if (data.trips && data.trips.length > 0) state.trips = data.trips;
        if (data.savingsGoals && data.savingsGoals.length > 0) state.savingsGoals = data.savingsGoals;
        saveLocalState();
        renderAll();
      }
    } else {
      const payload = {
        action: "sync",
        transactions: state.transactions,
        income: state.income,
        debts: state.debts,
        trips: state.trips || [],
        savingsGoals: state.savingsGoals || []
      };

      await fetch(state.settings.scriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    }

    state.syncing = false;
    updateSyncStatusUI("Auto-Synced with Google Sheets ✅", "success");
  } catch (err) {
    console.error("Google Sheets sync error:", err);
    state.syncing = false;
    updateSyncStatusUI("Sync Pending (Offline mode)", "error");
  }
}

function autoSaveToSheets() {
  if (state.settings.scriptUrl) {
    syncWithGoogleSheets(false);
  }
}

function updateSyncStatusUI(message, statusType = "success") {
  const dot = document.getElementById("status-dot");
  const text = document.getElementById("status-text");

  if (!text || !dot) return;

  if (state.settings.scriptUrl) {
    text.textContent = message || "Auto-Synced with Google Sheets ✅";
    dot.className = `status-dot ${statusType}`;
  } else {
    text.textContent = "Google Sheets Setup Available (Offline Backup Active)";
    dot.className = "status-dot error";
  }
}

// Modal Helpers
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add("active");
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove("active");
}

function triggerRandomQuote() {
  const quoteEl = document.getElementById("loopy-speech-quote");
  if (!quoteEl) return;
  const randomIndex = Math.floor(Math.random() * LOOPY_CRONG_QUOTES.length);
  quoteEl.textContent = LOOPY_CRONG_QUOTES[randomIndex];
}

// Charts
let catChartInstance = null;
let trendChartInstance = null;

function initCharts() {
  if (typeof Chart === "undefined") return;

  const catCanvas = document.getElementById("chart-categories") || document.getElementById("chart-analytics-cat");
  if (catCanvas) {
    const categoriesMap = {};
    state.transactions.filter(t => t.type === "Expense").forEach(t => {
      categoriesMap[t.category] = (categoriesMap[t.category] || 0) + Number(t.amount);
    });

    const labels = Object.keys(categoriesMap);
    const data = Object.values(categoriesMap);

    if (catChartInstance) catChartInstance.destroy();

    catChartInstance = new Chart(catCanvas.getContext("2d"), {
      type: "doughnut",
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: [
            "#FF7096", "#FF94B9", "#38A169", "#48BB78", "#9F7AEA", "#4299E1", "#ECC94B", "#CBD5E0"
          ],
          borderWidth: 2,
          borderColor: "#FFFFFF"
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { position: "bottom" } }
      }
    });
  }

  const trendCanvas = document.getElementById("chart-comparison") || document.getElementById("chart-analytics-split");
  if (trendCanvas) {
    const denzelSpent = state.transactions.filter(t => t.person === "Denzel").reduce((sum, t) => sum + Number(t.amount), 0);
    const angelicaSpent = state.transactions.filter(t => t.person === "Angelica").reduce((sum, t) => sum + Number(t.amount), 0);
    const combinedSpent = state.transactions.filter(t => t.person === "Combined").reduce((sum, t) => sum + Number(t.amount), 0);

    if (trendChartInstance) trendChartInstance.destroy();

    trendChartInstance = new Chart(trendCanvas.getContext("2d"), {
      type: "bar",
      data: {
        labels: ["Angelica 🎀", "Denzel 🦖", "Shared Couple 💑"],
        datasets: [{
          label: "Total Expenses (₱)",
          data: [angelicaSpent, denzelSpent, combinedSpent],
          backgroundColor: ["#FF7096", "#38A169", "#9F7AEA"],
          borderRadius: 12
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } }
      }
    });
  }
}
