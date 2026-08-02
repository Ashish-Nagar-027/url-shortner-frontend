"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import z from "zod";
import { shortUrlsFunctions } from "../Helpers/ShortUrls";
import Header from "@/components/Header";
import useUrlApi from "@/features/links/hooks/useUrlApi";

export interface shortUrlType {
  shortUrl: string;
  originalUrl: string;
  createdAt: string;
  updatedAt: string;
}

function HomeCard() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState<shortUrlType | null>(null);
  const { createUrlMutation } = useUrlApi();

  const generateShortUrl = async () => {
    if (!longUrl) {
      return;
    }
    const urlSchema = z.url({ message: "Invalid URL provided" });
    const validateUrl = urlSchema.safeParse(longUrl);

    if (!validateUrl.success) {
      return;
    }



    createUrlMutation.mutate({originalUrl: validateUrl.data}, {
    onSuccess:  (res) => {
    setShortUrl(res);
    setLongUrl("")
    },
  });


  };


  return (
    <main className="p-6">
      <Header />

      {/* Url shortner card */}
      <Card className="max-w-3/4 mx-auto mt-6">
        <CardHeader>
          <CardTitle className="text-2xl">Shorten a long link</CardTitle>
          <CardDescription>No credit card required</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 ">
          {/* short url form */}
          <div className="flex flex-col gap-4 ">
            <Label htmlFor="email" className="text-xl">
              Paste your long link here
            </Label>
            <Input
              id="long-url"
              type="text"
              placeholder="Enter Long Url"
              required
              className="py-6 h-8 text-lg"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
            />
            <Button
              className="w-fit px-6 text-lg cursor-pointer"
              onClick={generateShortUrl}
            >
              Shorten
            </Button>
          </div>
          <div>
            {shortUrl?.shortUrl && (
              <div className="border p-4 text-lg rounded-xl flex flex-col gap-4">
                <div className="text-xl ">Your Short Link : </div>
                <span>{shortUrl?.shortUrl}</span>
                <div className="flex gap-2">
                  <Button
                    size={"sm"}
                    className="cursor-pointer"
                    onClick={() => shortUrlsFunctions(shortUrl, "copy")}
                  >
                    Copy
                  </Button>
                  <Button
                    size={"sm"}
                    className="cursor-pointer"
                    onClick={() => shortUrlsFunctions(shortUrl, "visit")}
                  >
                    Visit Short url
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

export default HomeCard;
