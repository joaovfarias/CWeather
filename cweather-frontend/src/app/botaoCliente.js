"use client";

export default function BotaoCliente() {
  async function testBackend() {
    const res = await fetch("http://localhost:8000/weather/test");
    const data = await res.json();
    console.log(data);
  }

  return (
    <button
      onClick={testBackend}
      className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
    >
      Test Backend
    </button>
  );
}
