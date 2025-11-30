import kefLogoImage from "@assets/IMG_3385-removebg-preview_1764497325569.png";

export function KEFLogo({ className = "h-16 w-auto" }: { className?: string }) {
  return (
    <img
      src={kefLogoImage}
      alt="Kerala Economic Forum"
      className={className}
    />
  );
}
