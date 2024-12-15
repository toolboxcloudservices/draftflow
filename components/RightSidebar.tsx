import React, { useMemo, useRef } from "react"; // Importing React and hooks for memoization and references.

import { RightSidebarProps } from "@/types/type"; // Importing type definition for component props.
import { bringElement, modifyShape } from "@/lib/shapes"; // Importing helper functions for shape manipulation.

import Text from "./settings/Text"; // Importing Text settings component.
import Color from "./settings/Color"; // Importing Color settings component.
import Export from "./settings/Export"; // Importing Export settings component.
import Dimensions from "./settings/Dimensions"; // Importing Dimensions settings component.

const RightSidebar = ({
  elementAttributes, // Attributes of the currently active object (e.g., dimensions, color, text settings).
  setElementAttributes, // State setter to update element attributes.
  fabricRef, // Reference to the Fabric.js canvas.
  activeObjectRef, // Reference to the active object on the canvas.
  isEditingRef, // Reference to track whether the user is currently editing an object.
  syncShapeInStorage, // Function to sync shape changes with storage or a backend.
}: RightSidebarProps) => {
  // Refs for color and stroke inputs to access and manipulate these DOM elements directly.
  const colorInputRef = useRef(null);
  const strokeInputRef = useRef(null);

  // Handles changes to input fields for object properties like color, size, and text.
  const handleInputChange = (property: string, value: string) => {
    if (!isEditingRef.current) isEditingRef.current = true; // Mark the object as being edited.

    // Update the attributes of the active element.
    setElementAttributes((prev) => ({ ...prev, [property]: value }));

    // Apply the changes to the canvas object using Fabric.js and sync with storage.
    modifyShape({
      canvas: fabricRef.current as fabric.Canvas, // Fabric.js canvas instance.
      property, // Property being modified (e.g., "fill", "stroke", "fontSize").
      value, // New value for the property.
      activeObjectRef, // Reference to the active canvas object.
      syncShapeInStorage, // Function to sync changes to storage.
    });
  };

  // Memoizes the sidebar content to prevent unnecessary re-renders unless `elementAttributes` changes.
  const memoizedContent = useMemo(
    () => (
      <section className="flex flex-col border-t border-primary-grey-200 bg-primary-black text-primary-grey-300 min-w-[227px] sticky right-0 h-full max-sm:hidden select-none">
        {/* Header for the design section */}
        <h3 className="px-5 pt-4 text-xs uppercase">Design</h3>
        <span className="text-xs text-primary-grey-300 mt-3 px-5 border-b border-primary-grey-200 pb-4">
          Make changes to canvas as you like
        </span>

        {/* Dimensions settings component */}
        <Dimensions
          isEditingRef={isEditingRef} // Editing status ref.
          width={elementAttributes.width} // Current width of the active element.
          height={elementAttributes.height} // Current height of the active element.
          handleInputChange={handleInputChange} // Handles changes to dimensions.
        />

        {/* Text settings component */}
        <Text
          fontFamily={elementAttributes.fontFamily} // Current font family of the active element.
          fontSize={elementAttributes.fontSize} // Current font size of the active element.
          fontWeight={elementAttributes.fontWeight} // Current font weight of the active element.
          handleInputChange={handleInputChange} // Handles changes to text properties.
        />

        {/* Fill color settings component */}
        <Color
          inputRef={colorInputRef} // Ref for the color input field.
          attribute={elementAttributes.fill} // Current fill color of the active element.
          placeholder="color" // Placeholder text for the input.
          attributeType="fill" // Indicates this is for the "fill" property.
          handleInputChange={handleInputChange} // Handles changes to the fill color.
        />

        {/* Stroke color settings component */}
        <Color
          inputRef={strokeInputRef} // Ref for the stroke input field.
          attribute={elementAttributes.stroke} // Current stroke color of the active element.
          placeholder="stroke" // Placeholder text for the input.
          attributeType="stroke" // Indicates this is for the "stroke" property.
          handleInputChange={handleInputChange} // Handles changes to the stroke color.
        />

        {/* Export button/component */}
        <Export />
      </section>
    ),
    [elementAttributes] // Recomputes only when `elementAttributes` changes.
  );

  // Returns the memoized content to avoid re-rendering on each interaction.
  return memoizedContent;
};

export default RightSidebar; // Exports the RightSidebar component for use in other parts of the application.
