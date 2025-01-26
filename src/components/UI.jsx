import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";

const pictures = [
  "DSC00680",
  "DSC00933",
  "DSC00966",
  "DSC00983",
  "DSC01011",
  "DSC01040",
  "DSC01064",
  "DSC01071",
  "DSC01103",
  "DSC01145",
  "DSC01420",
  "DSC01461",
  "DSC01489",
  "DSC02031",
  "DSC02064",
  "DSC02069",
];

export const pageAtom = atom(0);
export const pages = [
  {
    front: "book-cover",
    back: pictures[0],
  },
];
for (let i = 1; i < pictures.length - 1; i += 2) {
  pages.push({
    front: pictures[i % pictures.length],
    back: pictures[(i + 1) % pictures.length],
  });
}

pages.push({
  front: pictures[pictures.length - 1],
  back: "book-back",
});

export const UI = () => {
  const [page, setPage] = useAtom(pageAtom);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const audio = new Audio("/audios/page-flip-01a.mp3");
    audio.play();
    setIsTransitioning(true);
    const timeout = setTimeout(() => setIsTransitioning(false), 500);
    return () => clearTimeout(timeout);
  }, [page]);

  const goToNextPage = () => {
    if (page < pages.length && !isTransitioning) {
      setPage(page + 1);
    }
  };

  const goToPreviousPage = () => {
    if (page > 0 && !isTransitioning) {
      setPage(page - 1);
    }
  };

  const handleSliderChange = (e) => {
    if (!isTransitioning) {
      setPage(parseInt(e.target.value));
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Title */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center">
        <h1 className="text-4xl font-bold text-gray-800 book-title mb-2">
          Interactive Photo Book
        </h1>
        <p className="text-gray-600">
          Page {page} of {pages.length}
        </p>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-12 pointer-events-auto">
        <button
          onClick={goToPreviousPage}
          disabled={page === 0 || isTransitioning}
          className="nav-arrow"
          aria-label="Previous page"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15 18L9 12L15 6"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          onClick={goToNextPage}
          disabled={page === pages.length || isTransitioning}
          className="nav-arrow"
          aria-label="Next page"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9 18L15 12L9 6"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Slider Control */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-1/2 pointer-events-auto">
        <input
          type="range"
          min="0"
          max={pages.length}
          value={page}
          onChange={handleSliderChange}
          className="page-slider w-full"
        />
      </div>

      {/* Watermark */}
      <div className="absolute bottom-6 right-6 text-gray-500 font-medium">
        <div className="flex items-center gap-2">
          <span>Created with ❤️</span>
          <span className="text-black font-bold">Photo Book Viewer</span>
        </div>
      </div>
    </div>
  );
};