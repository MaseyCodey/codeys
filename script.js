const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function randomChars(length) {
  const nums = new Uint32Array(length);
  crypto.getRandomValues(nums);
  return [...nums].map(num => alphabet[num % alphabet.length]).join("");
}

function chunkKey(raw) {
  return raw.match(/.{1,5}/g).join("-");
}

function makeKey(type) {
  if (type === "extended") return chunkKey(randomChars(25));
  if (type === "special") {
    const raw = randomChars(17);
    return `${raw.slice(0, 15)} ${raw.slice(15)}`;
  }
  return chunkKey(randomChars(15));
}

function showKeys(keys) {
  const box = document.getElementById("keys");
  box.innerHTML = "";
  keys.forEach(key => {
    const row = document.createElement("div");
    row.className = "key";
    row.textContent = key;
    box.appendChild(row);
  });
  document.getElementById("count").textContent = `${keys.length} generated`;
}

function generate() {
  const type = document.getElementById("type").value;
  const amount = Math.min(100, Math.max(1, Number(document.getElementById("amount").value) || 24));
  showKeys(Array.from({ length: amount }, () => makeKey(type)));
}

function getAllKeys() {
  return [...document.querySelectorAll(".key")].map(el => el.textContent).join("\n");
}

document.getElementById("generate").addEventListener("click", generate);

document.getElementById("copy").addEventListener("click", async () => {
  await navigator.clipboard.writeText(getAllKeys());
});

document.getElementById("download").addEventListener("click", () => {
  const blob = new Blob([getAllKeys()], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "demo-keys.txt";
  link.click();
  URL.revokeObjectURL(link.href);
});

document.getElementById("loadNightly").addEventListener("click", async () => {
  try {
    const res = await fetch("data/generated-keys.json", { cache: "no-store" });
    const data = await res.json();
    showKeys(data.keys || []);
  } catch {
    alert("No scheduled batch found yet. Run the GitHub Action once.");
  }
});

generate();
