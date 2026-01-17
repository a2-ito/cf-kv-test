
"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [keys, setKeys] = useState<string[]>([]);
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");

type KVKey = {
  name: string;
};

async function load() {
  const res = await fetch("/api/kv/list");
  const data = (await res.json()) as KVKey[];
  setKeys(data.map((k) => k.name));
}

type GetResponse = {
  key: string;
  value: string | null;
};

async function select(k: string) {
  const res = await fetch(`/api/kv/get?key=${encodeURIComponent(k)}`);
  const data = (await res.json()) as GetResponse;

  setKey(data.key);
  setValue(data.value ?? "");
}

  async function save() {
    await fetch("/api/kv/put", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, value }),
    });
    load();
  }

  async function del() {
    await fetch("/api/kv/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key }),
    });
    setKey("");
    setValue("");
    load();
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <main style={{ padding: 20 }}>
      <h1>KV TEST (Next.js)</h1>

      <input
        placeholder="key"
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />

      <textarea
        placeholder="value"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <div>
        <button onClick={save}
    style={{
      padding: "10px 16px",
      background: "#16a34a",
      color: "white",
      border: "none",
      borderRadius: 8,
      fontWeight: 600,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: 6,
    }}
				>Save</button>
        <button onClick={del}
    style={{
      padding: "10px 16px",
      background: "#dc2626",
      color: "white",
      border: "none",
      borderRadius: 8,
      fontWeight: 600,
      cursor: key ? "pointer" : "not-allowed",
      opacity: key ? 1 : 0.4,
      display: "flex",
      alignItems: "center",
      gap: 6,
    }}
					>Delete</button>
      </div>

      <hr />

      <ul>
        {keys.map((k) => (
          <li key={k} onClick={() => select(k)}>
            {k}
          </li>
        ))}
      </ul>
    </main>
  );
}

