interface CommonButtonProps {
  textColor?: string;
  bgColor?: string;
  border?: string;
  shadow?: boolean;
  label: string;
  img?: string;
  className?: string;
  width?: string;
  padding?: string;
  onClick?: () => void;
  disabled?: boolean;
}
const CommonButton = ({
  textColor,
  bgColor,
  border,
  shadow = false,
  label,
  className,
  width,
  img,
  padding,
  onClick,
  disabled = false,
}: CommonButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${textColor ? textColor : "text-[#ffffff]"} 
        ${bgColor ? bgColor : "bg-[#fab12f]"}
        ${border}
        ${shadow ? "shadow-[0_2px_2px_rgba(0,0,0,0.12)]" : ""}
        ${width ? width : "w-full"}
        ${padding ? padding : "p-[11.5px]"}
        ${className}
        flex flex-row items-center justify-center
        ${disabled ? "cursor-not-allowed" : ""}
        `}
    >
      {label}
      {img && <img src={img} alt="buttonImage" />}
    </button>
  );
};

export default CommonButton;
