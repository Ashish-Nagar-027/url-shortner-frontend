"use client";
import React, { useState } from "react";
import LnkButton from "./LnkButton";

import type { FormValues } from "./LnkPopup";
import LinksTable from "./LinksTable";

const LinkManagement = () => {

  const [updateUrl, setUpdateUrl] = useState<Partial<FormValues> | null>(null)


  return (
    <div>
      {/* New Link Button */}
      <LnkButton updateUrl={updateUrl} setUpdateUrl={setUpdateUrl} />
      
      {/* all Links table */}
      <LinksTable  setUpdateUrl={setUpdateUrl}  />

    </div>
  );
};

export default LinkManagement;
