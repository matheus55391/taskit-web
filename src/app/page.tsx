import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold">Taskit</h1>
      <p className="text-2xl">Gerencie suas tarefas de forma fácil e rápida</p>
      <Link href="/login" className="mt-10 px-6 py-3 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded">
        Entrar
      </Link>
    </main>
  );
}

