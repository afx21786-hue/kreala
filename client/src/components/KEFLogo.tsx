import kefLogoImage from "@assets/KEF-removebg-preview_1764485227046.png";

export function KEFLogo({ className = "h-16 w-auto" }: { className?: string }) {
  return (
    <img
      src={kefLogoImage}
      alt="Kerala Economic Forum"
      className={className}
    />
  );
}
