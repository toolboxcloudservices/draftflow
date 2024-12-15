"use client"; // Indicates that this file is client-side rendered in a Next.js application.

import Image from "next/image"; // Importing Next.js optimized Image component.
import { memo } from "react"; // Importing `memo` for optimizing re-renders by memoizing the component.

import { navElements } from "@/constants"; // Importing navigation elements configuration.
import { ActiveElement, NavbarProps } from "@/types/type"; // Importing type definitions for props and active elements.

import { Button } from "./ui/button"; // Importing a custom Button component.
import ShapesMenu from "./ShapesMenu"; // Importing ShapesMenu component for dropdown-style navigation items.
import ActiveUsers from "./users/ActiveUsers"; // Importing ActiveUsers component for displaying active users.
import { NewThread } from "./comments/NewThread"; // Importing NewThread component for comment-related interactions.

const Navbar = ({
  activeElement, // Currently selected element in the navbar.
  imageInputRef, // Reference to the hidden image input field.
  handleImageUpload, // Function to handle image uploads.
  handleActiveElement, // Function to update the active element in the navbar.
}: NavbarProps) => {
  // Helper function to determine if an element is active.
  const isActive = (value: string | Array<ActiveElement>) =>
    (activeElement && activeElement.value === value) || // Check if the value matches the active element's value.
    (Array.isArray(value) && value.some((val) => val?.value === activeElement?.value)); // Check if the value array contains the active element's value.

  return (
    <nav className="flex select-none items-center justify-between gap-4 bg-primary-black px-5 text-white">
      {/* Logo Section */}
      <Image src="/assets/draftflowlogo.png" alt="DraftFlow Logo" width={105} height={20} />

      {/* Navigation Menu */}
      <ul className="flex flex-row">
        {/* Iterate through the navigation elements */}
        {navElements.map((item: ActiveElement | any) => (
          <li
            key={item.name} // Unique key for each navigation item.
            onClick={() => {
              if (Array.isArray(item.value)) return; // Ignore clicks if the item has a dropdown menu.
              handleActiveElement(item); // Update the active element on click.
            }}
            className={`group px-2.5 py-5 flex justify-center items-center
            ${isActive(item.value) ? "bg-primary-green" : "hover:bg-primary-grey-200"}`}
          >
            {/* Render a dropdown menu if the item's value is an array */}
            {Array.isArray(item.value) ? (
              <ShapesMenu
                item={item} // Pass the current item to the ShapesMenu component.
                activeElement={activeElement} // Pass the current active element.
                imageInputRef={imageInputRef} // Pass the image input reference.
                handleActiveElement={handleActiveElement} // Pass the function to update the active element.
                handleImageUpload={handleImageUpload} // Pass the image upload handler.
              />
            ) : item?.value === "comments" ? (
              // Render a NewThread component if the item's value is "comments"
              <NewThread>
                <Button className="relative w-5 h-5 object-contain">
                  <Image
                    src={item.icon} // Icon for the comments nav element.
                    alt={item.name} // Accessible alternative text.
                    fill // Ensures the image fills its container.
                    className={isActive(item.value) ? "invert" : ""} // Inverts the color if the element is active.
                  />
                </Button>
              </NewThread>
            ) : (
              // Render a standard navigation button for non-dropdown, non-comments items
              <Button className="relative w-5 h-5 object-contain">
                <Image
                  src={item.icon} // Icon for the nav element.
                  alt={item.name} // Accessible alternative text.
                  fill // Ensures the image fills its container.
                  className={isActive(item.value) ? "invert" : ""} // Inverts the color if the element is active.
                />
              </Button>
            )}
          </li>
        ))}
      </ul>

      {/* Active Users Section */}
      <ActiveUsers />
    </nav>
  );
};

// Memoize the Navbar component to prevent unnecessary re-renders if the `activeElement` prop doesn't change.
export default memo(Navbar, (prevProps, nextProps) => prevProps.activeElement === nextProps.activeElement);
