"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const RediredWithTimer = () => {
  const [rT, setRt] = useState(4);
  const router = useRouter();

  useEffect(() => {
    const time = setInterval(() => {
      setRt((r) => {
        if (r <= 1){
          router.push("/");
          clearInterval(time);
          return 0

        } 
        return r - 1;
      });
    }, 1000);

    return () => {
      clearInterval(time);
    };
  }, []);


  return (
    <div>
      <p className="text-lg">Redirecting In : {rT}</p>
    </div>
  );
};

export default RediredWithTimer;
