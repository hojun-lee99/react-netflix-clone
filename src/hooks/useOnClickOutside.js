import { useEffect } from 'react';

export default function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listner = (event) => {
      console.log(ref.current);
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler();
    };
    document.addEventListener('mousedown', listner);
    document.addEventListener('touchstart', listner);
    // modal 창이 종료되면 이벤트 리스너 반환
    return () => {
      document.removeEventListener('mousedown', listner);
      document.removeEventListener('touchstart', listner);
    };
  }, [ref, handler]);
}
