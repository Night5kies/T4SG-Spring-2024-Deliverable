'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast";
import React from "react"
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/client-utils";


export function ConfirmDelete({speciesId}:{speciesId:number}) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  async function onDelete(){
    // The `input` prop contains data that has already been processed by zod. We can now use it in a supabase query
    const supabase = createBrowserSupabaseClient();
    const { error } = await supabase.from("species").delete().eq('id',speciesId);
    if (error) {
      return toast({
        title: "Something went wrong.",
        description: error.message,
        variant: "destructive",
      });
    }
    setOpen(false);
    router.refresh();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive"> DELETE </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>DELETE SPECIES</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the selected species?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => void onDelete()} variant="destructive"> DELETE </Button>
          <Button variant="secondary" onClick={() => setOpen(false)}> Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
