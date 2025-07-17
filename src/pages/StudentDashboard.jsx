import React from "react";

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-[#111e22] text-white font-lexend">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-[#243e47] px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="text-white">
            <svg viewBox="0 0 48 48" className="w-5 h-5 fill-current">
              <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold">CampusConnect</h2>
        </div>
        <div className="flex items-center gap-6">
          <nav className="hidden sm:flex gap-6 text-sm font-medium">
            <a href="#">Dashboard</a>
            <a href="#">Classes</a>
            <a href="#">Attendance</a>
            <a href="#">Profile</a>
          </nav>
          <button className="rounded-full bg-[#243e47] h-10 w-10 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M221.8,175.94C216.25,166.38,208,139.33..." />
            </svg>
          </button>
          <div
            className="w-10 h-10 bg-cover rounded-full bg-center"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/a-/AFdZucq0dPrqStgwtG")',
            }}
          ></div>
        </div>
      </header>

      {/* Main Section */}
      <main className="px-4 md:px-16 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Hi, Krish 👋</h1>
          <p className="text-sm text-[#93bac8]">Today is Thursday, July 17th</p>
        </div>

        <div className="mb-10 flex justify-center">
          <button className="flex items-center gap-2 bg-[#19b2e5] text-[#111e22] font-bold px-6 py-3 rounded-full text-base shadow hover:scale-[1.02] transition">
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M104,40H56A16,16,0..." />
            </svg>
            <span>Scan QR to Mark Attendance</span>
          </button>
        </div>

        <div className="bg-[#1a2c32] rounded-xl p-5 shadow flex flex-col md:flex-row gap-4 items-center">
          <p className="font-bold text-base flex-1">
            Attendance: 11/12 classes | 92%
          </p>
          <div
            className="w-full md:w-1/2 aspect-video rounded-xl bg-cover bg-center"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDPU5YD...")',
            }}
          ></div>
        </div>
      </main>
    </div>
  );
}
