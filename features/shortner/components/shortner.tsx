"use client";

import ToggleTheme from "@/components/ToggleTheme";
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

export interface shortUrlType {
  fullUrl: string;
  originalUrl: string;
  createdAt: string;
  updatedAt: string;
}

function HomeCard() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState<shortUrlType | null>(null);

  const generateShortUrl = async () => {
    if (!longUrl) {
      return;
    }
    const urlSchema = z.url({ message: "Invalid URL provided" });
    const validateUrl = urlSchema.safeParse(longUrl);

    if (!validateUrl.success) {
      return;
    }

    const res = await fetch("http://localhost:8080/api/v1/url/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        originalUrl: validateUrl.data,
      }),
    });

    const data = await res.json();
    setShortUrl(data);
  };

  console.log("shortUrl", shortUrl);

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
            {shortUrl?.fullUrl && (
              <div className="border p-4 text-lg rounded-xl flex flex-col gap-4">
                <div className="text-xl ">Your Short Link : </div>
                <span>{shortUrl?.fullUrl}</span>
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
