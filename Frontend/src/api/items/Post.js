export async function add_item(type, item, price, quantity) {
  const res = await fetch("http://localhost:8000/api/add_item", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, item, price, quantity }),
  });
  if (!res.ok) {
    console.log("POST Error");
    return;
  }
  return res.json();
}
