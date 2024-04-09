"use client"

import { useState } from "react";
import Link from 'next/link';

export default function Home() {
  const [fileLists, setFileLists] = useState([]);

  const upload = () => {
    const fileInput = document.getElementById("fileInput"); // Replace with your HTML element ID
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append("file", file);

    fetch("/api/upload", {
      method: "POST",
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        setFileLists(item => {
          const newItem = [...item];
          newItem.push(data.filename)
          return newItem
        })
      })
      .catch(error => console.error(error));
  }

  return (
    <main className="flex min-h-screen flex-col items-center gap-5 p-24">
      <div className="font-[sans-serif] max-w-md mx-auto">
        <label className="text-sm text-black mb-2 block">Select a file for upload</label>
        <input type="file" id="fileInput"
          className="w-full text-black text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-2.5 file:px-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-black rounded" />
      </div>
      <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg"onClick={() => upload()}>upload</button>
      {
        fileLists.length > 0 && fileLists.map((item, id) => (
          <a download key={id} className="px-6 py-2 min-w-[120px] text-center text-white bg-violet-600 border border-violet-600 rounded active:text-violet-500 hover:bg-transparent hover:text-violet-600 focus:outline-none focus:ring" href={`/assets/${item}`}>
            {item} file Download
          </a>
        ))
      }
    </main>
  );
}
