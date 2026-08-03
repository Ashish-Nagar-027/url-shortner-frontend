import { publicRoutes } from "@/constants"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const isCurrentPublicRoute = () => {
    const currentPath = window?.location?.pathname
    if(currentPath && publicRoutes.includes(currentPath)){
      return true
    }
    return false
}