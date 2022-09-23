export type VerifyInput = {
  merkle_root: string
  nullifier_hash: string
  action_id: string
  signal: string
  proof: string
}

export type VerifyOutput = {
  success: boolean
  nullifer_hash: string
  return_url: string
}
