function getOrCreate(storage, key) {
  let id = storage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    storage.setItem(key, id);
  }
  return id;
}

function getSessionSeq() {
  const key = "hv_seq";
  const n = parseInt(sessionStorage.getItem(key) ?? "0", 10) + 1;
  sessionStorage.setItem(key, String(n));
  return n;
}

export function getVisitorContext() {
  return {
    visitor_id: getOrCreate(localStorage, "hv_visitor"),
    session_id: getOrCreate(sessionStorage, "hv_session"),
    screen: `${screen.width}x${screen.height}`,
    device_pixel_ratio: window.devicePixelRatio ?? null,
    language: navigator.language ?? null,
    user_agent: navigator.userAgent ?? null,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
}

export function getVisitorContextWithSeq() {
  return {
    ...getVisitorContext(),
    session_seq: getSessionSeq(),
  };
}

// --- helpers used by InsightsPanel ---

export function parseDevice(ua) {
  if (!ua) return "Unknown";
  if (/mobile|android|iphone|ipad/i.test(ua)) return "Mobile";
  return "Desktop";
}

export function parseBrowser(ua) {
  if (!ua) return "Unknown";
  if (/Edg\//.test(ua)) return "Edge";
  if (/OPR\/|Opera/.test(ua)) return "Opera";
  if (/Chrome\//.test(ua)) return "Chrome";
  if (/Firefox\//.test(ua)) return "Firefox";
  if (/Safari\//.test(ua)) return "Safari";
  return "Other";
}

export function parseOS(ua) {
  if (!ua) return "Unknown";
  if (/Windows/.test(ua)) return "Windows";
  if (/Mac OS X/.test(ua) && !/iPhone|iPad/.test(ua)) return "macOS";
  if (/Android/.test(ua)) return "Android";
  if (/iPhone|iPad/.test(ua)) return "iOS";
  if (/Linux/.test(ua)) return "Linux";
  return "Other";
}
