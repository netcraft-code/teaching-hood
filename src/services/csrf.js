import API from "./api";

let csrfReady = false;

export async function ensureCsrf() {
  if (csrfReady) return;
  await API.get("/sanctum/csrf-cookie");
  csrfReady = true;
}
