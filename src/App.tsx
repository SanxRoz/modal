import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  OpenAiLogo,
  AirplaneTilt,
  MagnifyingGlass,
} from "@phosphor-icons/react";

const flights = [
  {
    code: "AA890",
    destination: "Frankfurt, Germany",
    airline: "DELTA",
    price: "$$",
  },
  {
    code: "LH654",
    destination: "Tokyo, Japan",
    airline: "EMIRATES",
    price: "$$$",
  },
  { code: "KL765", destination: "Rome, Italy", airline: "RYANAIR", price: "$" },
  {
    code: "SQ210",
    destination: "Auckland, New Zealand",
    airline: "SOUTHWEST",
    price: "$$",
  },
  {
    code: "CX543",
    destination: "Paris, France",
    airline: "AIR FRANCE",
    price: "$",
  },
  {
    code: "BA567",
    destination: "Toronto, Canada",
    airline: "UNITED",
    price: "$$",
  },
  {
    code: "QF456",
    destination: "Amsterdam, Netherlands",
    airline: "DELTA",
    price: "$$",
  },
];

const flagEmojis = {
  "Frankfurt, Germany": "🇩🇪",
  "Tokyo, Japan": "🇯🇵",
  "Rome, Italy": "🇮🇹",
  "Auckland, New Zealand": "🇳🇿",
  "Paris, France": "🇫🇷",
  "Toronto, Canada": "🇨🇦",
  "Amsterdam, Netherlands": "🇳🇱",
};

const App = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const listRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : flights.length - 1,
        );
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedIndex((prevIndex) =>
          prevIndex < flights.length - 1 ? prevIndex + 1 : 0,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (listRef.current) {
      const selectedElement = listRef.current.children[selectedIndex];
      if (selectedElement) {
        selectedElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [selectedIndex]);

  const handleKeyDown = useCallback(
    (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "f") {
        event.preventDefault();
        setIsModalOpen((prevState) => !prevState);
      }
    },
    [isModalOpen],
  );

  const handleClick = (index) => () => {
    setSelectedIndex(index);
  };

  const hideModal = (event) => {
    if (event.target.id === "root") {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    document.getElementById("root")?.addEventListener("click", hideModal);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  if (isModalOpen) {
    return (
      <div className="absolute border-2 border-[#F4F4F4] font-sf-mono top-1/2 -translate-y-1/2 left-0 mx-auto right-0 bottom-auto bg-[#F4F4F4] w-[490px] p-2 rounded-xl">
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Where to next?"
            className="w-full font-Inter bg-transparent rounded-md py-2 pl-9 pr-4 text-gray-800 placeholder-gray-500 border-0"
          />
          <MagnifyingGlass
            className="absolute left-3 top-2.5 text-gray-400"
            size={18}
          />
        </div>

        <div className="text-xs gap-[5px] text-gray-500 py-2 px-3 mb-2 flex items-center">
          <OpenAiLogo size={14} />
          SUGGESTED
        </div>

        <div
          className="space-y-1 max-h-72 no-scrollbar overflow-y-auto"
          ref={listRef}
        >
          {flights.map((flight, index) => (
            <div
              key={flight.code}
              onClick={handleClick(index)}
              className={`flex justify-between items-center py-2 px-3 border-2 rounded-md transition-colors duration-200 ${
                index === selectedIndex
                  ? "bg-black text-white border-[#404040]"
                  : "bg-transparent border-transparent hover:bg-gray-200"
              }`}
            >
              <div className="flex items-center">
                <span className="font-Emoji text-sm">
                  {flagEmojis[flight.destination]}
                </span>

                <div
                  className={`ml-[5px] ${index === selectedIndex ? "" : "text-[#8B8C8B]"}`}
                >
                  {flight.code}
                </div>
                <div
                  className={`text-sm font-Inter ml-[15px] ${index === selectedIndex ? "text-gray-300" : "text-gray-500"}`}
                >
                  {flight.destination}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span
                  className={`text-xs ${index === selectedIndex ? "text-gray-300" : "text-gray-400"}`}
                >
                  {flight.airline}
                </span>
                <span className="text-[#31DD38]">
                  {"$".repeat(flight.price.length)}
                </span>
                {index === selectedIndex && <AirplaneTilt />}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else if (isModalOpen === false) {
    return (
      <h1 className="font-Inter mx-auto absolute top-1/2 -translate-y-1/2 left-0 right-0 max-w-56 mb-4 text-[#8B8C8B]">
        Press Ctrl+F (or Cmd+F on Mac) to open flight search
      </h1>
    );
  }
};

export default App;
