import { PopupModal } from "react-calendly";

export default function CalendlyModal({ isOpen, onClose }) {
  if (typeof document === "undefined") return null;

  return (
    <PopupModal
      url="https://calendly.com/yasirmaqsood534/30min"
      open={isOpen}
      onModalClose={onClose}
      rootElement={document.getElementById("root")}
    />
  );
}
