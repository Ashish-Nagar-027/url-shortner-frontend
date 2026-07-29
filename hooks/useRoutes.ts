import { Clock, Link2, QrCode, UserRoundPenIcon } from "lucide-react";
import { usePathname } from "next/navigation";

const ROUTES_INFO = [
  {
    label: "Dashboard",
    pathName: "/dashboard",
    icon: Clock,
    title: "Dashboard",
  },
  {
    label: "Links",
    title: "Links",
    pathName: "/links",
    icon: Link2,
  },
  {
    label: "QR Codes",
    title: "QR Codes",
    pathName: "/qr",
    icon: QrCode,
  },
  {
    label: "Link In bio",
    title: "Link In bio",
    pathName: "bio",
    icon: UserRoundPenIcon,
  },
];

const useRoutes = () => {
  const path = usePathname();

  const isCurrentPath = (r: string) => getCurrentPathInfo()?.pathName === r
  
  const getCurrentPathInfo = () => {

    const currentPathInfo = ROUTES_INFO.find(r  => r.pathName === path)

    if(!currentPathInfo) return null

    return currentPathInfo
  }
  

  return {
    ROUTES_INFO,
    isCurrentPath,
    getCurrentPathInfo
  };
};

export default useRoutes;
