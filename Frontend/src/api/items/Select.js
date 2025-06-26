export async function select_item(id) {
  const res = await fetch("http://localhost:8000/api/items/" + id, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    console.log("SELECT Error");
  }
  return res.json();
}
