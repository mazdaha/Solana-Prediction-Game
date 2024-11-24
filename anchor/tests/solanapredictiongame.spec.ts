import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair} from '@solana/web3.js'
import {SolanaPredictionGame} from '../target/types/solana_prediction_game'

describe('Solana Prediction Game', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.SolanaPredictionGame as Program<SolanaPredictionGame>


  it('Initialize SolanaPredictionGame', async () => {
  })

})
