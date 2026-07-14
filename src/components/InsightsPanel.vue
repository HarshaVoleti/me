<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { supabase } from "../utils/supabase.js";
import { showInsights } from "../utils/adminState.js";
import { parseDevice, parseBrowser, parseOS } from "../utils/visitor.js";

const views = ref([]);
const loading = ref(true);

async function load() {
  loading.value = true;
  const { data } = await supabase
    .from("page_views")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(500);
  views.value = data ?? [];
  loading.value = false;
}

onMounted(load);

function close() {
  showInsights.value = false;
}

function onKeydown(e) {
  if (e.key === "Escape") close();
}
onMounted(() => window.addEventListener("keydown", onKeydown));
onUnmounted(() => window.removeEventListener("keydown", onKeydown));

// --- stats ---
const totalVisits = computed(
  () => new Set(views.value.filter((v) => v.section === null).map((v) => v.session_id)).size
);
const uniqueVisitors = computed(
  () => new Set(views.value.map((v) => v.visitor_id)).size
);
const totalSectionViews = computed(
  () => views.value.filter((v) => v.section !== null).length
);

const sectionCounts = computed(() => {
  const map = {};
  views.value.forEach((v) => {
    if (!v.section) return;
    map[v.section] = (map[v.section] ?? 0) + 1;
  });
  return Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .map(([section, count]) => ({ section, count }));
});

const referrerCounts = computed(() => {
  const map = {};
  views.value.forEach((v) => {
    if (!v.referrer || v.section !== null) return;
    const host = (() => { try { return new URL(v.referrer).hostname; } catch { return v.referrer; } })();
    map[host] = (map[host] ?? 0) + 1;
  });
  return Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .map(([ref, count]) => ({ ref, count }));
});

const deviceCounts = computed(() => {
  const map = {};
  const seen = new Set();
  views.value.forEach((v) => {
    if (seen.has(v.session_id)) return;
    seen.add(v.session_id);
    const d = parseDevice(v.user_agent);
    map[d] = (map[d] ?? 0) + 1;
  });
  return Object.entries(map).sort((a, b) => b[1] - a[1]);
});

const browserCounts = computed(() => {
  const map = {};
  const seen = new Set();
  views.value.forEach((v) => {
    if (seen.has(v.session_id)) return;
    seen.add(v.session_id);
    const b = parseBrowser(v.user_agent);
    map[b] = (map[b] ?? 0) + 1;
  });
  return Object.entries(map).sort((a, b) => b[1] - a[1]);
});

const timezoneCounts = computed(() => {
  const map = {};
  const seen = new Set();
  views.value.forEach((v) => {
    if (!v.timezone || seen.has(v.visitor_id)) return;
    seen.add(v.visitor_id);
    map[v.timezone] = (map[v.timezone] ?? 0) + 1;
  });
  return Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);
});

const recentVisits = computed(() =>
  views.value
    .filter((v) => v.section === null)
    .slice(0, 15)
    .map((v) => ({
      visitor: v.visitor_id?.slice(0, 8) + "…",
      device: parseDevice(v.user_agent),
      browser: parseBrowser(v.user_agent),
      os: parseOS(v.user_agent),
      tz: v.timezone ?? "—",
      ref: v.referrer ? (() => { try { return new URL(v.referrer).hostname; } catch { return v.referrer; } })() : "direct",
      time: new Date(v.created_at).toLocaleString(),
    }))
);

const maxSection = computed(() =>
  sectionCounts.value.length ? sectionCounts.value[0].count : 1
);
</script>

<template>
  <Teleport to="body">
    <div class="insights-backdrop" @click.self="close">
      <div class="insights-panel" role="dialog" aria-label="Insights">
        <div class="insights-header">
          <h2 class="insights-title">Insights</h2>
          <div class="insights-header-actions">
            <button class="refresh-btn" @click="load" :disabled="loading">
              {{ loading ? "Loading…" : "Refresh" }}
            </button>
            <button class="close-btn" @click="close" aria-label="Close">✕</button>
          </div>
        </div>

        <div v-if="loading" class="insights-loading">Loading data…</div>

        <div v-else class="insights-body">
          <!-- Stats row -->
          <div class="stats-row">
            <div class="stat-card">
              <span class="stat-num">{{ uniqueVisitors }}</span>
              <span class="stat-lbl">Unique Visitors</span>
            </div>
            <div class="stat-card">
              <span class="stat-num">{{ totalVisits }}</span>
              <span class="stat-lbl">Sessions</span>
            </div>
            <div class="stat-card">
              <span class="stat-num">{{ totalSectionViews }}</span>
              <span class="stat-lbl">Section Views</span>
            </div>
          </div>

          <div class="insights-grid">
            <!-- Sections -->
            <div class="card">
              <h3 class="card-title">Sections</h3>
              <div class="bar-list">
                <div v-for="s in sectionCounts" :key="s.section" class="bar-row">
                  <span class="bar-label">{{ s.section }}</span>
                  <div class="bar-track">
                    <div class="bar-fill" :style="{ width: (s.count / maxSection * 100) + '%' }" />
                  </div>
                  <span class="bar-count">{{ s.count }}</span>
                </div>
                <p v-if="!sectionCounts.length" class="empty">No data yet</p>
              </div>
            </div>

            <!-- Referrers -->
            <div class="card">
              <h3 class="card-title">Referrers</h3>
              <div class="list">
                <div v-for="r in referrerCounts" :key="r.ref" class="list-row">
                  <span class="list-label">{{ r.ref }}</span>
                  <span class="list-count">{{ r.count }}</span>
                </div>
                <p v-if="!referrerCounts.length" class="empty">No referrer data yet</p>
              </div>
            </div>

            <!-- Devices -->
            <div class="card">
              <h3 class="card-title">Device / Browser</h3>
              <div class="list">
                <div v-for="[d, c] in deviceCounts" :key="d" class="list-row">
                  <span class="list-label">{{ d }}</span>
                  <span class="list-count">{{ c }}</span>
                </div>
              </div>
              <div class="list" style="margin-top:0.75rem">
                <div v-for="[b, c] in browserCounts" :key="b" class="list-row">
                  <span class="list-label">{{ b }}</span>
                  <span class="list-count">{{ c }}</span>
                </div>
              </div>
            </div>

            <!-- Timezones -->
            <div class="card">
              <h3 class="card-title">Timezones</h3>
              <div class="list">
                <div v-for="[tz, c] in timezoneCounts" :key="tz" class="list-row">
                  <span class="list-label">{{ tz }}</span>
                  <span class="list-count">{{ c }}</span>
                </div>
                <p v-if="!timezoneCounts.length" class="empty">No data yet</p>
              </div>
            </div>
          </div>

          <!-- Recent visits -->
          <div class="card recent-card">
            <h3 class="card-title">Recent Visits</h3>
            <div class="table-wrap">
              <table class="visits-table">
                <thead>
                  <tr>
                    <th>Visitor</th>
                    <th>Device</th>
                    <th>Browser</th>
                    <th>OS</th>
                    <th>Timezone</th>
                    <th>Referrer</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(v, i) in recentVisits" :key="i">
                    <td class="mono">{{ v.visitor }}</td>
                    <td>{{ v.device }}</td>
                    <td>{{ v.browser }}</td>
                    <td>{{ v.os }}</td>
                    <td>{{ v.tz }}</td>
                    <td>{{ v.ref }}</td>
                    <td class="mono">{{ v.time }}</td>
                  </tr>
                  <tr v-if="!recentVisits.length">
                    <td colspan="7" class="empty">No visits yet</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.insights-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1000;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 2rem 1rem;
  overflow-y: auto;
}

.insights-panel {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  width: 100%;
  max-width: 900px;
  padding: 1.5rem;
}

.insights-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 1rem;
}

.insights-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text);
}

.insights-header-actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.refresh-btn {
  font-size: 0.8rem;
  padding: 0.3rem 0.8rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background: none;
  color: var(--color-text-secondary);
  cursor: pointer;
}

.close-btn {
  font-size: 1rem;
  padding: 0.3rem 0.6rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background: none;
  color: var(--color-text);
  cursor: pointer;
  line-height: 1;
}

.insights-loading {
  text-align: center;
  color: var(--color-text-secondary);
  padding: 2rem;
  font-size: 0.9rem;
}

.insights-body {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.stat-card {
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  align-items: center;
}

.stat-num {
  font-size: 2rem;
  font-weight: 700;
  font-family: var(--font-mono);
  color: var(--color-text);
}

.stat-lbl {
  font-size: 0.78rem;
  color: var(--color-text-secondary);
}

.insights-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.card {
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  padding: 1rem 1.1rem;
}

.recent-card {
  grid-column: 1 / -1;
}

.card-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0.75rem;
}

.bar-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.bar-row {
  display: grid;
  grid-template-columns: 90px 1fr 36px;
  align-items: center;
  gap: 0.5rem;
}

.bar-label {
  font-size: 0.8rem;
  color: var(--color-text-secondary);
  text-transform: capitalize;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.bar-track {
  height: 6px;
  background: var(--color-border);
  border-radius: 3px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background: var(--color-text);
  border-radius: 3px;
  transition: width 0.3s ease;
}

.bar-count {
  font-size: 0.78rem;
  font-family: var(--font-mono);
  color: var(--color-text-secondary);
  text-align: right;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.list-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}

.list-label {
  font-size: 0.82rem;
  color: var(--color-text-secondary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.list-count {
  font-size: 0.78rem;
  font-family: var(--font-mono);
  color: var(--color-text);
  flex-shrink: 0;
}

.table-wrap {
  overflow-x: auto;
}

.visits-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.8rem;
}

.visits-table th {
  text-align: left;
  padding: 0.4rem 0.6rem;
  color: var(--color-text-secondary);
  font-weight: 500;
  border-bottom: 1px solid var(--color-border);
  white-space: nowrap;
}

.visits-table td {
  padding: 0.4rem 0.6rem;
  color: var(--color-text-secondary);
  border-bottom: 1px solid var(--color-border);
  white-space: nowrap;
}

.visits-table tr:last-child td {
  border-bottom: none;
}

.mono {
  font-family: var(--font-mono);
  font-size: 0.75rem;
}

.empty {
  font-size: 0.82rem;
  color: var(--color-text-secondary);
  font-style: italic;
}

@media (max-width: 640px) {
  .insights-grid {
    grid-template-columns: 1fr;
  }
  .stats-row {
    grid-template-columns: 1fr;
  }
  .insights-backdrop {
    padding: 0.5rem;
  }
}
</style>
