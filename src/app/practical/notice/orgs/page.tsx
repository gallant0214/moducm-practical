import { supabase } from "@/app/lib/supabase";
import OrgsClient, { type Org } from "./OrgsClient";

export const dynamic = "force-dynamic";

async function getOrgs(audience: "main" | "disabled"): Promise<Org[]> {
  const { data } = await supabase
    .from("sport_organizations")
    .select("id, sport_name, org_name, phone, zipcode, address, website")
    .eq("audience", audience)
    .order("sport_name", { ascending: true });
  return (data || []) as Org[];
}

export default async function OrgsPage(props: {
  searchParams: Promise<{ audience?: string }>;
}) {
  const { audience: audParam } = await props.searchParams;
  const initialAudience: "main" | "disabled" = audParam === "disabled" ? "disabled" : "main";

  const [mainOrgs, disabledOrgs] = await Promise.all([
    getOrgs("main"),
    getOrgs("disabled"),
  ]);

  return (
    <OrgsClient
      initialAudience={initialAudience}
      mainOrgs={mainOrgs}
      disabledOrgs={disabledOrgs}
    />
  );
}
