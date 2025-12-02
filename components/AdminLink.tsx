'use client';

export default function AdminLink() {
  return (
    <div className="fixed top-3 right-3 z-50">
      <a
        href="/admin/login"
        className="bg-white/90 text-gray-700 px-2.5 py-1.5 rounded-md shadow-sm hover:bg-white hover:shadow-md transition-all text-xs font-normal border border-gray-200"
        title="Admin Sign In"
      >
        Admin
      </a>
    </div>
  );
}

