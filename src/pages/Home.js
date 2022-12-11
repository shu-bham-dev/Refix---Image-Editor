import React, { useState } from "react"
import ReactCrop from "react-image-crop"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "react-image-crop/dist/ReactCrop.css"
// Icons
import { BsFillBrightnessHighFill } from "react-icons/bs"
import { BsFillRecordCircleFill } from "react-icons/bs"
import { BsImageAlt } from "react-icons/bs"
import { IoContrastSharp } from "react-icons/io5"

function Home() {
  const [image, setImage] = useState("")
  const [details, setDetails] = useState("")
  const [crop, setCrop] = useState("")
  const [settings, setSettings] = useState({
    brightness: "100",
    contrast: "100",
    saturation: "100",
    grayscale: "0",
    rotate: 0,
    vertical: 1,
    horizontal: 1,
  })

  const saveImage = () => {
    const canvas = document.createElement("canvas")
    canvas.width = details.naturalHeight
    canvas.height = details.naturalHeight
    const ctx = canvas.getContext("2d")

    ctx.filter = `brightness(${settings.brightness}%) saturate(${settings.saturation}%) grayscale(${settings.grayscale}) contrast(${settings.contrast}%)`
    ctx.translate(canvas.width / 2, canvas.height / 2)
    ctx.rotate((settings.rotate * Math.PI) / 180)
    ctx.scale(settings.vertical, settings.horizontal)

    ctx.drawImage(
      details,
      -canvas.width / 2,
      -canvas.height / 2,
      canvas.width,
      canvas.height
    )

    const link = document.createElement("a")
    link.download = "image_edit.jpg"
    link.href = canvas.toDataURL()
    toast.success(`image is downloading`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    })
    link.click()
  }
  const imageHandle = (e) => {
    if (e.target.files.length !== 0) {
      resetFilter()
      const reader = new FileReader()
      reader.onload = () => {
        const name = e.target.files[0].name
        const lastDot = name.lastIndexOf(".")
        const ext = name.substring(lastDot + 1)
        if (
          ext === "png" ||
          ext === "jpg" ||
          ext === "jpeg" ||
          ext === "gif" ||
          ext === "svg"
        ) {
          setImage(reader.result)
        } else {
          toast.error(`${ext} file format not allowed`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          })
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }
  const changeFilter = (e) => {
    if (e.target.id === "brightness") {
      setSettings({ ...settings, brightness: e.target.value })
    } else if (e.target.id === "contrast") {
      setSettings({ ...settings, contrast: e.target.value })
    } else if (e.target.id === "saturation") {
      setSettings({ ...settings, saturation: e.target.value })
    } else {
      setSettings({ ...settings, grayscale: e.target.value })
    }
  }
  const imageCrop = () => {
    const canvas = document.createElement("canvas")
    const scaleX = details.naturalWidth / details.width
    const scaleY = details.naturalHeight / details.height
    canvas.width = crop.width
    canvas.height = crop.height
    const ctx = canvas.getContext("2d")

    ctx.drawImage(
      details,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    )

    const croppedImage = canvas.toDataURL("image/jpg")
    setImage(croppedImage)
  }
  const resetFilter = () => {
    setSettings({
      brightness: "100",
      contrast: "100",
      saturation: "100",
      grayscale: "0",
      rotate: 0,
      vertical: 1,
      horizontal: 1,
    })
  }
  // Image Modification
  const leftRotate = () => {
    setSettings({
      ...settings,
      rotate: settings.rotate - 90,
    })
    console.log(settings)
  }
  const rightRotate = () => {
    setSettings({
      ...settings,
      rotate: settings.rotate + 90,
    })
    console.log(settings)
  }
  const verticalFlip = () => {
    setSettings({
      ...settings,
      vertical: settings.vertical === 1 ? -1 : 1,
    })
    console.log(settings)
  }
  const horizontalFlip = () => {
    setSettings({
      ...settings,
      horizontal: settings.horizontal === 1 ? -1 : 1,
    })
    console.log(settings)
  }

  return (
    <div>
      <ToastContainer />
      {/* <div className="inline mt-40">Refix.io</div> */}
      <div className="flex items-center justify-evenly h-screen bg-bgColor">
        {/* Left Sidebar */}
        <div id="myCanvas" className="shadow-shadowBG rounded h-96 w-96">
          <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
            <img
              onLoad={(e) => setDetails(e.currentTarget)}
              src={image}
              style={{
                filter: `brightness(${settings.brightness}%) saturate(${settings.saturation}%) contrast(${settings.contrast}%) grayscale(${settings.grayscale}%)`,
                transform: `rotate(${settings.rotate}deg) scale(${settings.vertical},${settings.horizontal})`,
              }}
              alt="Please select an IMG"
            />
          </ReactCrop>
        </div>
        {/* Right Sidebar */}
        <div className="shadow-shadowBG rounded w-5/12">
          <div className="p-8">
            {/* Image Selector */}
            <label
              className="block mb-2 text-start text-textColor text-base font-medium dark:text-white"
              htmlFor="file_input"
            >
              Upload Image
            </label>
            <input
              className="block rounded mb-2 text-textColor cursor-pointer focus:outline-none
            w-fit"
              type="file"
              onChange={imageHandle}
            ></input>
            <p
              className="mb-2 text-sm text-textColor text-start"
              id="file_input_help"
            >
              *SVG, PNG, JPG or GIF.
            </p>
          </div>
          {/* Filters */}
          <div>
            <div className="rounded-md p-8">
              <div className="flex">
                <BsFillBrightnessHighFill color="white" size="20px" />
                <label
                  htmlFor="default-range"
                  className="text-textColor block text-start mb-2 ml-1.5 text-sm font-medium"
                >
                  Brightness
                  <div className="bg-white font-bold inline ml-4">
                    {settings.brightness}%
                  </div>
                  <button
                    className="ml-64 shadow-shadowBG2 text-textColor font-semibold py-1 px-1 rounded"
                    onClick={resetFilter}
                  >
                    Reset
                  </button>
                </label>
              </div>
              <input
                id="brightness"
                type="range"
                min="0"
                max="200"
                value={settings.brightness}
                onChange={changeFilter}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              ></input>
              <div className="flex">
                <IoContrastSharp color="white" size="20px" />
                <label
                  htmlFor="default-range"
                  className="text-textColor block text-start mb-2 ml-1.5 text-sm font-medium"
                >
                  Contrast
                  <div className="bg-white font-bold inline ml-4">
                    {settings.contrast}%
                  </div>
                </label>
              </div>
              <input
                id="contrast"
                type="range"
                min="0"
                max="200"
                value={settings.contrast}
                onChange={changeFilter}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              ></input>
              <div className="flex">
                <BsFillRecordCircleFill color="white" size="20px" />
                <label
                  htmlFor="default-range"
                  className="text-textColor block text-start mb-2 ml-1.5 text-sm font-medium"
                >
                  Saturation
                  <div className="bg-white font-bold inline ml-4">
                    {settings.saturation}%
                  </div>
                </label>
              </div>
              <input
                id="saturation"
                type="range"
                min="0"
                max="200"
                value={settings.saturation}
                onChange={changeFilter}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              ></input>
              <div className="flex">
                <BsImageAlt color="white" size="20px" />
                <label
                  htmlFor="default-range"
                  className="text-textColor block text-start mb-2 ml-1.5 text-sm font-medium"
                >
                  grayscale
                  <div className="bg-white font-bold inline ml-4">
                    {settings.grayscale}%
                  </div>
                </label>
              </div>
              <input
                id="grayscale"
                type="range"
                min="0"
                max="200"
                onChange={changeFilter}
                value={settings.grayscale}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              ></input>
            </div>
            <div className="flex flex-row justify-around mb-2 mt-4 rounded-md p-4">
              <div className="shadow-shadowBG2 text-textColor font-semibold py-1 px-1 rounded">
                Vintage
              </div>
              <button className="shadow-shadowBG2 text-textColor font-semibold py-1 px-1 rounded">
                Lomo
              </button>
              <button className="shadow-shadowBG2 text-textColor font-semibold py-1 px-1 rounded">
                Clarity
              </button>
              <button className="shadow-shadowBG2 text-textColor font-semibold py-1 px-1 rounded">
                Sin City
              </button>
            </div>
            <div className="flex flex-row justify-around mb-2 mt-4 rounded-md p-4">
              {crop && (
                <button
                  className="crop shadow-shadowBG2 text-textColor font-semibold py-1 px-1 rounded"
                  onClick={imageCrop}
                >
                  Crop Image
                </button>
              )}
              <button
                className="shadow-shadowBG2 text-textColor font-semibold py-1 px-1 rounded"
                onClick={saveImage}
              >
                Download Image
              </button>
              <button
                className="shadow-shadowBG2 text-textColor font-semibold py-1 px-1 rounded"
                onClick={leftRotate}
              >
                Rotate Left
              </button>
              <button
                className="shadow-shadowBG2 text-textColor font-semibold py-1 px-1 rounded"
                onClick={rightRotate}
              >
                Rotate Right
              </button>
              <button
                className="shadow-shadowBG2 text-textColor font-semibold py-1 px-1 rounded"
                onClick={horizontalFlip}
              >
                horizontalFlip
              </button>
              <button
                className="shadow-shadowBG2 text-textColor font-semibold py-1 px-1 rounded"
                onClick={verticalFlip}
              >
                verticalFlip
              </button>
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
