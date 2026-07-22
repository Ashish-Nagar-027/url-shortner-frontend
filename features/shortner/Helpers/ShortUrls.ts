import type { shortUrlType } from "../components/shortner";


type actionType = 'visit' | 'copy' | 'share' | "qr"

export const shortUrlsFunctions = async (url : shortUrlType, action: actionType) => {
         if(action === "visit") {
             window.open(url.fullUrl, "_blank", "noopener,noreferrer");
         }

         if(action === "copy") {
            await window.navigator.clipboard.writeText(url.fullUrl)
         }

}