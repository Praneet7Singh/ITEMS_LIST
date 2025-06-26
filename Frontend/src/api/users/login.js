export async function login(email, password) {
  const res = await fetch("http://localhost:8000/api/login", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    console.log("Login Error");
    return;
  }
  return res.json();
}
