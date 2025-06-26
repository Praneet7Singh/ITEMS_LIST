export async function edit_item(id, type, item, price, quantity) {
  const res = await fetch("http://localhost:8000/api/edit_item/" + id, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, item, price, quantity }),
  });
  if (!res.ok) {
    console.log("PUT Error");
    return;
  }
  return res.json();
}
