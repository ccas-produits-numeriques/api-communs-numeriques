import "./overwride.css";

import { headers } from "next/headers";

import RedocPageClient from "./components/redoc";

export default async function RedocPage() {
  const h = await headers();
  const nonce = h.get("x-nonce") ?? "";

  return <RedocPageClient nonce={nonce} />;
}
