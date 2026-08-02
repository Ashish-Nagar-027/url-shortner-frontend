"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CreateAndUpdateLinkPopup, { type FormValues } from "./LnkPopup";

const LnkButton = ({updateUrl, setUpdateUrl} : {updateUrl : Partial<FormValues>  | null, setUpdateUrl: React.Dispatch<React.SetStateAction<Partial<FormValues> | null>>}) => {
  const [show, setShow] = useState(false);


  return (
    <>
      <div className="">
        <Button onClick={() => setShow(!show)} className="cursor-pointer">
          Create New Link
        </Button>
      </div>
      <CreateAndUpdateLinkPopup
        open={show || !!updateUrl}
        onOpenChange={(isOpen) => show ?  setShow(isOpen) : setUpdateUrl(null) }
        updateUrl={updateUrl}
      />
    </>
  );
};

export default LnkButton;
