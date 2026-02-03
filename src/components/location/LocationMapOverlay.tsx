import { UI_TEXT } from "@constant/index";
import { CommonButton } from "@components/common";

interface LocationMapOverlayProps {
    address: string;
    onCurrentLocationClick: () => void;
}

export const LocationMapOverlay = ({ address, onCurrentLocationClick }: LocationMapOverlayProps) => {
    return (
        <>
            {/* Fixed Center Pin (Visual) */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none pb-[38px]">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
                    <path d="M12 0C7.58172 0 4 3.58172 4 8C4 13.5 12 24 12 24C12 24 20 13.5 20 8C20 3.58172 16.4183 0 12 0Z" className="fill-main" />
                    <circle cx="12" cy="8" r="3.5" fill="white" />
                </svg>
            </div>

            {/* Current Location Button with Tooltip */}
            <div className="absolute bottom-[180px] right-5 z-40 flex items-center gap-3 select-none">
                {/* Tooltip */}
                <div className="bg-gray-700 text-white text-xs font-bold px-2 py-1.5 rounded-md relative shadow-md animate-fade-in-right">
                    {UI_TEXT.MY_LOCATION_TOOLTIP}
                    <div className="absolute top-1/2 -right-1.5 transform -translate-y-1/2 w-0 h-0 
                          border-t-[6px] border-t-transparent
                          border-l-[8px] border-l-gray-700
                          border-b-[6px] border-b-transparent">
                    </div>
                </div>

                {/* Button */}
                {/* Button */}
                <CommonButton
                    label=""
                    onClick={onCurrentLocationClick}
                    className="p-3 rounded-xl shadow-lg active:bg-gray-50 transition-all active:scale-95 w-auto" // w-auto override
                    bgColor="bg-white"
                    img="/icon/aim.svg"
                />
            </div>

            {/* Address Info Card (Floating) */}
            <div className="absolute top-[180px] left-5 right-5 z-20 pointer-events-none flex justify-center">
                <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-gray-100 flex items-center gap-2">
                    {/* Pin Icon */}
                    <img src="/icon/pin.svg" alt="Pin" className="w-5 h-5"
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.insertAdjacentHTML('afterend', `
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" class="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#FAB12F"/>
                  </svg>
              `);
                        }}
                    />
                    <span className="text-sm font-bold text-gray-700 truncate max-w-[200px]">
                        {address}
                    </span>
                </div>
            </div>
        </>
    );
};
