export async function get_items() {
  const res = await fetch("http://localhost:8000/api/items", {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application" },
  });
  if (!res.ok) {
    console.log("GET Error");
    return;
  }
  return res.json();
}
