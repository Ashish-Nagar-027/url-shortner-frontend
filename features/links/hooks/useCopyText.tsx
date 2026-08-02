
import { useEffect, useRef, useState } from "react";

const useCopyText = () => {

const [copiedId, setCopiedId] = useState<string | null>(null);
const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

const handleCopy = async (text: string,id: string) => {
  await navigator.clipboard.writeText(text);

  setCopiedId(id);

  // Clear any existing timeout
  if (timeoutRef.current) {
    clearTimeout(timeoutRef.current);
  }

  timeoutRef.current = setTimeout(() => {
    setCopiedId(null);
  }, 2000);
};

useEffect(() => {
  return () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };
}, []);

return {handleCopy, copiedId}
}

export default useCopyText