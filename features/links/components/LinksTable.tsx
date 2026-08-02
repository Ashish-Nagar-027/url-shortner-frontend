import React from 'react'
import useCopyText from "../hooks/useCopyText";
import useUrlApi from "../hooks/useUrlApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Copy, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import type { FormValues } from './LnkPopup';
import type { linkType } from '../types';
import { formateDate } from '../utils';

function LinksTable({ setUpdateUrl} : { setUpdateUrl: React.Dispatch<React.SetStateAction<Partial<FormValues> | null>>}) {
  const { currentUserUrls , deleteMutation} = useUrlApi();
  const { isLoading, isError, data } = currentUserUrls;

const { handleCopy, copiedId } = useCopyText();

  const handleDeleteUrl = (id: string) => {
    deleteMutation.mutate(id)
  }

  return (
    <div>
      {/* list of link */}
      <Card className="mt-6 max-w-5/6">
        <CardHeader className="border-b-2 pb-2">
          <CardTitle>List Of LInks</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && <p className="text-2xl text-center">Loading...</p>}
          {isError && !data?.data && <p>failed to fetch urls</p>}

          {data?.data && (
            <div className="grid grid-cols-[auto_1fr_auto] border ">
              <div className="font-bold text-xl border p-4 text-center">#</div>
              <div className="font-bold text-xl border p-2">Link</div>
              <div className="font-bold text-xl border p-4 text-center">
                Action
              </div>

              {data?.data?.map((link: linkType, index:number) => {
                return (
                  <React.Fragment key={link?.id || index}>
                    <div className="border p-2 text-center">{index + 1}</div>
                    <div className="flex flex-col gap-2 gap-y-4 border  overflow-hidden">
                      <div className="border p-4">
                        <Link
                          href={link.shortUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-blue-600"
                        >
                          {link.shortUrl}
                        </Link>

                        <p className="text-sm text-gray-500 break-all">
                          {link.originalUrl}
                        </p>

                        <div className="mt-2 flex gap-4 text-sm text-gray-500">
                          <span>
                            {/* 📅 {new Date(link.createdAt).toLocaleDateString()} */}
                            📅 {formateDate(link.createdAt)}
                          </span>
                          <span>👆 {link.clicks} clicks</span>
                        </div>
                      </div>
                    </div>
                    <div className=" border p-2 text-center flex flex-wrap gap-2 ">
                      <Button
                        onClick={() => handleCopy(link.shortUrl, link.id)}
                        variant={"outline"}
                        className="cursor-pointer"
                      >
                        {copiedId === link.id ? <Check /> : <Copy size={20} />}
                      </Button>
                      <Button
                        onClick={() => setUpdateUrl(link)}
                        variant={"outline"}
                        className="cursor-pointer"
                      >
                       <Pencil />
                      </Button>
                      <Button
                        onClick={() => handleDeleteUrl(link.id)}
                        variant={"outline"}
                        className="cursor-pointer"
                      >
                   <Trash2 />
                      </Button>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default LinksTable