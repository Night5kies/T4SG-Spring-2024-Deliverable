import { Separator } from "@/components/ui/separator";
import { TypographyH2 } from "@/components/ui/typography";
import { createServerSupabaseClient } from "@/lib/server-utils";
import { redirect } from "next/navigation";

export default async function UserList() {
  // Create supabase server component client and obtain user session from stored cookie
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    // this is a protected route - only users who are signed in can view this route
    redirect("/");
  }

  // Obtain the ID of the currently signed-in user

  const { data: users } = await supabase.from("profiles").select("*").order("id", { ascending: false });

  return (
    <>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <TypographyH2>User List</TypographyH2>
      </div>
      <Separator className="my-4" />

      <div className="justify-center">
        {users?.map((users) => <h1 key={users.id}> {users.display_name}: {users.email} <br/> Bio: {users.biography} <br/><br/></h1>)}
      </div>
    </>
  );
}
