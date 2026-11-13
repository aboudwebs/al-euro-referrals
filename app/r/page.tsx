import ReferralLanding from "./referral-landing";

export const dynamic = "force-dynamic";

type Props = {
  // Next.js 15: searchParams is a Promise.
  searchParams: Promise<{ ref?: string | string[]; sig?: string | string[]; launch?: string | string[] }>;
};

/** Only the characters a real marketer code / signature can contain are passed on to the app link. */
const CODE_RE = /^[A-Za-z0-9_-]{1,80}$/;
const SIGNATURE_RE = /^[0-9a-f]{64}$/i;

function single(value: string | string[] | undefined): string {
  return typeof value === "string" ? value : "";
}

export default async function ReferralPage({ searchParams }: Props) {
  const params = await searchParams;
  const ref = single(params.ref).trim();
  const sig = single(params.sig).trim();
  const code = CODE_RE.test(ref) ? ref : "";
  const signature = code && SIGNATURE_RE.test(sig) ? sig : "";
  return <ReferralLanding code={code} signature={signature} autoLaunch={single(params.launch) !== "0"} />;
}
