import Image from "next/image"; // Importing Next.js optimized Image component.

const Loader = () => (
  // A full-screen loader component to indicate a loading state.
  <div className="flex h-screen w-screen flex-col items-center justify-center gap-2">
    {/* Display a loading GIF */}
    <Image
      src="/assets/loader.gif" // Path to the loader GIF file.
      alt="loader" // Accessible alternative text for screen readers.
      width={100} // Sets the width of the loader image to 100px.
      height={100} // Sets the height of the loader image to 100px.
      className="object-contain" // Ensures the image scales without cropping.
    />
    {/* Loading text displayed below the loader */}
    <p className="text-sm font-bold text-primary-grey-300">Loading...</p>
  </div>
);

export default Loader; // Exports the Loader component for use in other parts of the application.
