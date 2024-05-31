'use client';

import { useCallback, useEffect, useRef } from 'react';

// Types
import ModalProps from './modal.type';

export default function Modal({
  children,
  showModal,
  setShowModal,
  containerClasses,
}: ModalProps) {
  const desktopModalRef = useRef<HTMLDivElement>(null);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowModal(false);
      }
    },
    [setShowModal],
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (desktopModalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const baseClasses = 'overflow relative w-full max-w-lg transform rounded-xl border border-gray-200 bg-white p-6 text-left shadow-2xl transition-all';
  const modalClasses = `${baseClasses} ${containerClasses}`.trim();

  if (!showModal) return null;

  return (
    <>
      <div
        ref={desktopModalRef}
        className="fixed inset-0 z-40 hidden min-h-screen items-center justify-center md:flex"
        onMouseDown={handleOutsideClick}
      >
        <div className={modalClasses}>
          {children}
        </div>
      </div>
      <div
        className="fixed inset-0 z-30 bg-gray-100 bg-opacity-10 backdrop-blur"
        onClick={() => setShowModal(false)}
      />
    </>
  );
}
