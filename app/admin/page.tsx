"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { PortfolioItem } from "@/drizzle/schema";

export default function AdminDashboard() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    const res = await fetch("/api/items");
    setItems(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function createItem(e: React.FormEvent) {
    e.preventDefault();
    if (!newTitle.trim()) return;
    await fetch("/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle }),
    });
    setNewTitle("");
    load();
  }

  async function togglePublished(item: PortfolioItem) {
    await fetch(`/api/items/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !item.published }),
    });
    load();
  }

  async function deleteItem(item: PortfolioItem) {
    if (!confirm(`"${item.title}" 항목을 삭제할까요?`)) return;
    await fetch(`/api/items/${item.id}`, { method: "DELETE" });
    load();
  }

  async function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;
    const reordered = [...items];
    [reordered[index], reordered[target]] = [reordered[target], reordered[index]];
    setItems(reordered);
    await fetch("/api/items/reorder", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: reordered.map((i) => i.id) }),
    });
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  if (loading) return <p style={{ padding: 24 }}>Loading…</p>;

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: 24 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", fontWeight: 600 }}>Portfolio Admin</h1>
        <button onClick={logout}>Log out</button>
      </div>

      <form
        onSubmit={createItem}
        style={{ display: "flex", gap: 8, margin: "16px 0" }}
      >
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="New item title"
          style={{ flex: 1 }}
        />
        <button type="submit">Add</button>
      </form>

      <ul style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map((item, index) => (
          <li
            key={item.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              border: "1px solid #ddd",
              borderRadius: 6,
              padding: 8,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <button onClick={() => move(index, -1)} disabled={index === 0}>
                ↑
              </button>
              <button
                onClick={() => move(index, 1)}
                disabled={index === items.length - 1}
              >
                ↓
              </button>
            </div>
            <Link href={`/admin/${item.id}`} style={{ flex: 1 }}>
              {item.title}{" "}
              <span style={{ color: "#888" }}>/{item.slug}</span>
            </Link>
            <label style={{ display: "flex", gap: 4, alignItems: "center" }}>
              <input
                type="checkbox"
                checked={item.published}
                onChange={() => togglePublished(item)}
              />
              Published
            </label>
            <button onClick={() => deleteItem(item)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
