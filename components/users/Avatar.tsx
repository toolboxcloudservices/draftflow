import Image from "next/image";

import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type Props = {
  name: string; // Name to be displayed in the tooltip.
  otherStyles?: string; // Optional additional CSS styles for the avatar container.
};

const Avatar = ({ name, otherStyles }: Props) => (
  <>
    <Tooltip>
      <TooltipTrigger>
        <div className={`relative h-9 w-9 rounded-full ${otherStyles}`} data-tooltip={name}>
          <Image
            src="/assets/profile.jpg" // Corrected the path to reference the public folder image.
            fill // Allows the image to completely fill the container.
            className="rounded-full object-cover" // Ensures the image maintains its aspect ratio and is fully contained.
            alt={name} // Accessible alternative text for the avatar image.
          />
        </div>
      </TooltipTrigger>
      <TooltipContent className="border-none bg-primary-grey-200 px-2.5 py-1.5 text-xs">
        {name} {/* Tooltip displaying the user's name */}
      </TooltipContent>
    </Tooltip>
  </>
);

export default Avatar;
