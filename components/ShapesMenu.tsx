"use client"; // Indicates that this file is client-side rendered in a Next.js application.

import Image from "next/image"; // Importing the Image component from Next.js for optimized image rendering.
import { ShapesMenuProps } from "@/types/type"; // Importing the type definition for the component's props.

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu"; // Importing DropdownMenu components for creating a dropdown UI.
import { Button } from "./ui/button"; // Importing a custom Button component.

const ShapesMenu = ({
  item, // The current item passed to the menu, containing its properties like `icon`, `name`, and `value`.
  activeElement, // The currently selected element within the dropdown menu.
  handleActiveElement, // Callback function to handle selection changes.
  handleImageUpload, // Callback function to handle image upload events.
  imageInputRef, // Reference to the hidden file input element.
}: ShapesMenuProps) => {
  // Determines if the current active element is part of the dropdown options for the given `item`.
  const isDropdownElem = item.value.some((elem) => elem?.value === activeElement.value);

  return (
    <>
      {/* Dropdown menu container */}
      <DropdownMenu>
        {/* The button to trigger the dropdown menu */}
        <DropdownMenuTrigger asChild className="no-ring">
          <Button
            className="relative h-5 w-5 object-contain"
            onClick={() => handleActiveElement(item)} // Set the active element to the parent item when clicked.
          >
            {/* Displays the icon for the active element or the default item icon */}
            <Image
              src={isDropdownElem ? activeElement.icon : item.icon} // Conditional icon display.
              alt={item.name} // Accessible alternative text.
              fill // Ensures the image fills its parent container.
              className={isDropdownElem ? "invert" : ""} // Inverts the icon color if it matches the active element.
            />
          </Button>
        </DropdownMenuTrigger>

        {/* Dropdown menu content */}
        <DropdownMenuContent className="mt-5 flex flex-col gap-y-1 border-none bg-primary-black py-4 text-white">
          {/* Maps through the item's values to render each dropdown option */}
          {item.value.map((elem) => (
            <Button
              key={elem?.name} // Unique key for each dropdown option.
              onClick={() => {
                handleActiveElement(elem); // Updates the active element when an option is clicked.
              }}
              className={`flex h-fit justify-between gap-10 rounded-none px-5 py-3 focus:border-none ${
                activeElement.value === elem?.value
                  ? "bg-primary-green" // Highlights the selected option.
                  : "hover:bg-primary-grey-200" // Changes background on hover.
              }`}
            >
              {/* Content inside the dropdown option */}
              <div className="group flex items-center gap-2">
                {/* Option icon */}
                <Image
                  src={elem?.icon as string} // Renders the icon for each dropdown element.
                  alt={elem?.name as string} // Accessible alternative text.
                  width={20} // Icon width.
                  height={20} // Icon height.
                  className={activeElement.value === elem?.value ? "invert" : ""} // Inverts color if the option is active.
                />
                {/* Option label */}
                <p
                  className={`text-sm ${
                    activeElement.value === elem?.value
                      ? "text-primary-black" // Changes text color if active.
                      : "text-white" // Default text color.
                  }`}
                >
                  {elem?.name} {/* Renders the name of the dropdown option. */}
                </p>
              </div>
            </Button>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Hidden file input for uploading images */}
      <input
        type="file" // Specifies the input type as file.
        className="hidden" // Hides the input from the UI.
        ref={imageInputRef} // Ref allows programmatic interaction with this input.
        accept="image/*" // Restricts file selection to images only.
        onChange={handleImageUpload} // Triggers the callback when a file is selected.
      />
    </>
  );
};

export default ShapesMenu; // Exports the ShapesMenu component for use in other parts of the application.
