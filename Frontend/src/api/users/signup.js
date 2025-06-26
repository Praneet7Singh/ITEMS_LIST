export async function sign_up(name, email, password) {
  const res = await fetch("http://localhost:8000/api/signup", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  if (!res.ok) {
    console.log("Signup Error");
    return;
  }
  return res.json();
}
