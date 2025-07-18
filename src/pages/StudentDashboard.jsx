import React from "react";

export default function StudentDashboard() {
  return (
    <div
      className="relative flex min-h-screen flex-col bg-[#111e22] text-white overflow-x-hidden"
      style={{ fontFamily: "Lexend, 'Noto Sans', sans-serif" }}
    >
      <header className="flex flex-wrap items-center justify-between border-b border-[#243e47] px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="size-5">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor" />
            </svg>
          </div>
          <h2 className="text-lg font-bold">CampusConnect</h2>
        </div>
        <nav className="flex flex-wrap items-center gap-4 text-sm font-medium mt-2 md:mt-0">
          <a href="#">Dashboard</a>
          <a href="#">Classes</a>
          <a href="#">Attendance</a>
          <a href="#">Profile</a>
        </nav>
        <div className="flex items-center gap-3 mt-2 md:mt-0">
          <button className="h-9 w-9 flex items-center justify-center rounded-full bg-[#243e47]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06Z" />
            </svg>
          </button>
          <div
            className="h-9 w-9 rounded-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAAqk7lIJb4gNmuuucpeosd2gguH9eQl05N4QNuV70_RgY8hnNkzaFoGhSg-ZyDNV8VQNZBF4PE0m3vL9dQzunZLGi7mDv0npGf5WxeSXCjzzHnwv4Y5JsP7WqM7Is7lRFftZrJ8TSwQtAafAl0Ppsi-4ZTwDz7t52TbxrmlTaNuP9pcTBXixNMJckGse-hAVP0Hw8_2XUSc_DJGfhzpe2t5EUKc3BM55aFsuw5KOVEmCjblqK2mQ9yDQb9v6fEI1xAtgnyfJF7jGU')",
            }}
          ></div>
        </div>
      </header>

      <main className="flex-1 px-4 sm:px-6 py-6 max-w-4xl mx-auto">
        <div className="mb-6 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold">Hi, Krish 👋</h1>
          <p className="text-sm text-[#93bac8] mt-1">Today is Monday, August 14th</p>
        </div>

        <div className="mb-6 flex justify-center">
          <button
            className="flex items-center gap-2 px-5 py-2.5 bg-[#19b2e5] text-[#111e22] rounded-full font-bold text-sm sm:text-base"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M104,40H56A16,16,0,0,0,40,56v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,104,40Zm0,64H56V56h48v48Zm0,32H56a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,104,136Zm0,64H56V152h48v48ZM200,40H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm0,64H152V56h48v48Zm-64,72V144a8,8,0,0,1,16,0v32a8,8,0,0,1-16,0Zm80-16a8,8,0,0,1-8,8H184v40a8,8,0,0,1-8,8H144a8,8,0,0,1,0-16h24V144a8,8,0,0,1,16,0v8h24A8,8,0,0,1,216,160Zm0,32v16a8,8,0,0,1-16,0V192a8,8,0,0,1,16,0Z" />
            </svg>
            <span>Scan QR to Mark Attendance</span>
          </button>
        </div>

        <section className="rounded-xl bg-[#1a2c32] p-4 flex flex-col sm:flex-row gap-4 items-center">
          <p className="flex-1 text-sm sm:text-base font-bold">
            Attendance: 11/12 classes | 92%
          </p>
          <div
            className="aspect-video w-full sm:w-1/2 rounded-xl bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDPU5YDQ9oC20Z6Hs-Ohouj6diaml2qqJcBpkVCzEOzZIX5STV6RxSVRAy1kd0e566OVm2joKini8vQaXFVK41T6o7IW-jjhZWXO6TV_0m1w6EnCBOvLLAl1gVdX5guIwC779kgwFRaEF2RDoOYhN-s5v_nvOPXSQ3FPz4r47vBrzjBN2PyaqtjfIBKjOb2QkCs5jIO6RK1gZr23t5WmeN5062U7kpYsViWl4Mow7LmuMuSOtKgO_tglRhwq8qrqiqK4vmiHPHJDg0')",
            }}
          ></div>
        </section>
      </main>
    </div>
  );
}
