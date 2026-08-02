"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useUrlApi from "../hooks/useUrlApi";
import { useEffect } from "react";

const formSchema = z.object({
  id: z.string().optional(),
  originalUrl: z.string().trim().url("Please enter a valid URL"),
  alias: z.string().trim().optional(),
});

export type FormValues = z.infer<typeof formSchema>;

type CreateLinkPopupProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  updateUrl: Partial<FormValues>  | null;
};

function CreateAndUpdateLinkPopup({
  open,
  onOpenChange,
  updateUrl,
}: CreateLinkPopupProps) {


  const { createUrlMutation, updateMutation } = useUrlApi();
  const mutationFn = updateUrl ? updateMutation : createUrlMutation;
  const { isPending, isError, error } = mutationFn;

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      originalUrl: "",
      alias: "",
    },
  });



  // handle Submit for creating new link and updating
  const handlesuccesMutaion = () => {
    reset();
    onOpenChange(false);
  };
  const submit = (values: FormValues) => {
    const data: Partial<FormValues> =  {};

    for (const key in values) {
      const typedKey = key as keyof FormValues;

      if (values[typedKey] !== "") {
        data[typedKey] = values[typedKey];
      }
    }

    // update 
   if (updateUrl) {
  updateMutation.mutate(
    {
      id: updateUrl.id!,
      data,
    },
    {
      onSuccess: handlesuccesMutaion,
    }
  );
} else {
  // create new url
  createUrlMutation.mutate(data, {
    onSuccess: handlesuccesMutaion,
  });
}
  };

  useEffect(() => {
    if (updateUrl) {
      reset({
        originalUrl: updateUrl.originalUrl,
        alias: updateUrl.alias,
      });
    } else {
      reset({
        originalUrl: "",
        alias: "",
      });
    }
  }, [updateUrl, reset]);


  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="border-b pb-3">
          <DialogTitle className="font-bold text-lg">
            {updateUrl ? "Update Link Info" : "Create Link"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(submit)} className="space-y-5">
          {/* <div className="space-y-2">
            <Label htmlFor="title">Title (Optional)</Label>
            <Input
              id="title"
              placeholder="My Portfolio"
              {...register("title")}
            />
          </div> */}

          <div className="space-y-2">
            <Label htmlFor="longUrl">Long URL</Label>
            <Input
              id="originalUrl"
              placeholder="https://example.com"
              {...register("originalUrl")}
            />
            {errors.originalUrl && (
              <p className="text-sm text-destructive">
                {errors.originalUrl.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Alias / Slug (Optional)</Label>
            <Input
              id="slug"
              placeholder="my-custom-link"
              {...register("alias")}
            />
          </div>
          {isError && <p className="text-red-400">{error.message}</p>}

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={isPending}>
              {updateUrl
                ? isPending
                  ? "Updating..."
                  : "Update Link"
                : isPending
                  ? "Creating..."
                  : "Create Link"}
              {}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateAndUpdateLinkPopup;
