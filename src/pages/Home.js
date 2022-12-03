import React, { useState } from "react"

function Home() {
  const [settings, setSettings] = useState({
    brightness: "50",
    contrast: "30",
    saturation: "40",
    vibrance: "100",
  })

  const changeFilter = (e) => {
    console.log(e.target.id, e.target.value)
    if (e.target.id === "brightness") {
      console.log("bright");
      setSettings({
        brightness: e.target.value,
      })
    } else if (e.target.id === "contrast") {
      console.log("con");
      setSettings({
        contrast: e.target.value,
      })
    } else if (e.target.id === "saturation") {
      setSettings({
        saturation: e.target.value,
      })
    } else {
      setSettings({
        vibrance: e.target.value,
      })
    }
  }

  return (
    <div className="flex items-center justify-center h-3/4 w-4/5 bg-blue-400">
      <div>
        {/* Image Selector */}
        <input type="file"></input>
        {/* Canvas */}
        <canvas></canvas>
        {/* Filters */}
        <div className="bg-red-200 mt-4 rounded-md p-2">
          <label
            for="default-range"
            className="block text-start mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Brightness
          </label>
          <input
            id="brightness"
            type="range"
            value={settings.brightness}
            onChange={changeFilter}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          ></input>
          <label
            for="default-range"
            className="block text-start mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Contrast
          </label>
          <input
            id="contrast"
            type="range"
            value={settings.contrast}
            onChange={changeFilter}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          ></input>
          <label
            for="default-range"
            className="block text-start mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Saturation
          </label>
          <input
            id="saturation"
            type="range"
            value={settings.saturation}
            onChange={changeFilter}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          ></input>
          <label
            for="default-range"
            className="block text-start mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Vibrance
          </label>
          <input
            id="vibrance"
            type="range"
            onChange={changeFilter}
            value={settings.vibrance}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          ></input>
        </div>
        <div className="flex flex-row justify-around mb-2 bg-red-200 mt-4 rounded-md p-4 text-start">
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-1 border border-gray-400 rounded shadow">
            Vintage
          </button>
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-1 border border-gray-400 rounded shadow">
            Lomo
          </button>
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-1 border border-gray-400 rounded shadow">
            Clarity
          </button>
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-1 border border-gray-400 rounded shadow">
            Sin City
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
