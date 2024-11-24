import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair} from '@solana/web3.js'
import {Solanapredictiongame} from '../target/types/solanapredictiongame'

describe('solanapredictiongame', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.Solanapredictiongame as Program<Solanapredictiongame>

  const solanapredictiongameKeypair = Keypair.generate()

  it('Initialize Solanapredictiongame', async () => {
    await program.methods
      .initialize()
      .accounts({
        solanapredictiongame: solanapredictiongameKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([solanapredictiongameKeypair])
      .rpc()

    const currentCount = await program.account.solanapredictiongame.fetch(solanapredictiongameKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment Solanapredictiongame', async () => {
    await program.methods.increment().accounts({ solanapredictiongame: solanapredictiongameKeypair.publicKey }).rpc()

    const currentCount = await program.account.solanapredictiongame.fetch(solanapredictiongameKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment Solanapredictiongame Again', async () => {
    await program.methods.increment().accounts({ solanapredictiongame: solanapredictiongameKeypair.publicKey }).rpc()

    const currentCount = await program.account.solanapredictiongame.fetch(solanapredictiongameKeypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement Solanapredictiongame', async () => {
    await program.methods.decrement().accounts({ solanapredictiongame: solanapredictiongameKeypair.publicKey }).rpc()

    const currentCount = await program.account.solanapredictiongame.fetch(solanapredictiongameKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set solanapredictiongame value', async () => {
    await program.methods.set(42).accounts({ solanapredictiongame: solanapredictiongameKeypair.publicKey }).rpc()

    const currentCount = await program.account.solanapredictiongame.fetch(solanapredictiongameKeypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the solanapredictiongame account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        solanapredictiongame: solanapredictiongameKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.solanapredictiongame.fetchNullable(solanapredictiongameKeypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
