import Link from "next/link";

export default function Home() {
  return (
     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 text-white">
      <h1 className="text-5xl font-extrabold mb-6">Welcome to Task Manager</h1>
      <p className="text-lg mb-6">Manage your tasks efficiently and stay organized</p>
      <Link
        href={"/todos"}
        className="bg-purple-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-purple-700 transition text-xl"
      >
        Ready to manage your tasks
      </Link>
    </div>
  );
}
