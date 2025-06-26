export function log_out() {
  const res = fetch("http://localhost:8000/api/logout", {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    console.log("LOGOUT Error");
    return;
  }
  return res;
}
