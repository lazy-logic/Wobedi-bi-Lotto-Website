/**
 * Regulatory references — single source of truth so license-related copy stays
 * consistent and verifiable across the site.
 *
 * The NLA collaborators page publicly lists every registered private lotto
 * operator. It does NOT publish the per-operator licence numbers — those
 * live on each operator's licence certificate. Use NLA_LICENCE_NUMBER for
 * the formal number when the owner supplies Wobedi Bi Lotto's; until then
 * it's null and components fall back to the "NLA-registered" wording
 * (verifiable via the linked register).
 */

export const NLA_REGISTER_URL =
  "https://www.nla.com.gh/products/collaborators#registed-private-lotto-operators";

export const NLA_REGISTERED_LABEL = "NLA-registered operator";

/**
 * Formal NLA-issued licence number. Owner to populate from the licence
 * certificate. Until then, components show the registered-operator badge
 * with a link to the public NLA register.
 */
export const NLA_LICENCE_NUMBER: string | null = null;

export const NLA_ACT_LABEL = "Act 722";
