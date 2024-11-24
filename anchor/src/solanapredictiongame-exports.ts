// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import SolanapredictiongameIDL from '../target/idl/solanapredictiongame.json'
import type { Solanapredictiongame } from '../target/types/solanapredictiongame'

// Re-export the generated IDL and type
export { Solanapredictiongame, SolanapredictiongameIDL }

// The programId is imported from the program IDL.
export const SOLANAPREDICTIONGAME_PROGRAM_ID = new PublicKey(SolanapredictiongameIDL.address)

// This is a helper function to get the Solanapredictiongame Anchor program.
export function getSolanapredictiongameProgram(provider: AnchorProvider) {
  return new Program(SolanapredictiongameIDL as Solanapredictiongame, provider)
}

// This is a helper function to get the program ID for the Solanapredictiongame program depending on the cluster.
export function getSolanapredictiongameProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Solanapredictiongame program on devnet and testnet.
      return new PublicKey('CounNZdmsQmWh7uVngV9FXW2dZ6zAgbJyYsvBpqbykg')
    case 'mainnet-beta':
    default:
      return SOLANAPREDICTIONGAME_PROGRAM_ID
  }
}
