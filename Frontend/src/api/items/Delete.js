export async function delete_item(id) {
  const res = await fetch("http://localhost:8000/api/delete_item/" + id, {
    method: "DELETE",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    console.log("DELETE Error");
    return;
  }
  return res;
}
