import { MdClose } from "react-icons/md";
import { ReactNode } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div aria-modal="true" className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity" role="dialog">
            <div className="bg-white dark:bg-[#202020] rounded-xl shadow-2xl w-full max-w-md mx-4 border border-border-light dark:border-border-dark overflow-hidden transform transition-all scale-100 opacity-100">
                <div className="flex items-center justify-between px-6 py-4 border-b border-border-light dark:border-border-dark">
                    <h2 className="text-lg font-semibold text-text-light-primary dark:text-text-dark-primary">{title}</h2>
                    <button onClick={onClose} className="text-text-light-secondary dark:text-text-dark-secondary hover:text-text-light-primary dark:hover:text-text-dark-primary transition-colors rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-800">
                        <MdClose size={20} />
                    </button>
                </div>
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    )
}