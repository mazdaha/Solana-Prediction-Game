'use client'

import {getSolanapredictiongameProgram, getSolanapredictiongameProgramId} from '@project/anchor'
import {useConnection} from '@solana/wallet-adapter-react'
import {Cluster, Keypair, PublicKey} from '@solana/web3.js'
import {useMutation, useQuery} from '@tanstack/react-query'
import {useMemo} from 'react'
import toast from 'react-hot-toast'
import {useCluster} from '../cluster/cluster-data-access'
import {useAnchorProvider} from '../solana/solana-provider'
import {useTransactionToast} from '../ui/ui-layout'

export function useSolanapredictiongameProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getSolanapredictiongameProgramId(cluster.network as Cluster), [cluster])
  const program = getSolanapredictiongameProgram(provider)

  const accounts = useQuery({
    queryKey: ['solanapredictiongame', 'all', { cluster }],
    queryFn: () => program.account.solanapredictiongame.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const initialize = useMutation({
    mutationKey: ['solanapredictiongame', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods.initialize().accounts({ solanapredictiongame: keypair.publicKey }).signers([keypair]).rpc(),
    onSuccess: (signature) => {
      transactionToast(signature)
      return accounts.refetch()
    },
    onError: () => toast.error('Failed to initialize account'),
  })

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  }
}

export function useSolanapredictiongameProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program, accounts } = useSolanapredictiongameProgram()

  const accountQuery = useQuery({
    queryKey: ['solanapredictiongame', 'fetch', { cluster, account }],
    queryFn: () => program.account.solanapredictiongame.fetch(account),
  })

  const closeMutation = useMutation({
    mutationKey: ['solanapredictiongame', 'close', { cluster, account }],
    mutationFn: () => program.methods.close().accounts({ solanapredictiongame: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accounts.refetch()
    },
  })

  const decrementMutation = useMutation({
    mutationKey: ['solanapredictiongame', 'decrement', { cluster, account }],
    mutationFn: () => program.methods.decrement().accounts({ solanapredictiongame: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const incrementMutation = useMutation({
    mutationKey: ['solanapredictiongame', 'increment', { cluster, account }],
    mutationFn: () => program.methods.increment().accounts({ solanapredictiongame: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const setMutation = useMutation({
    mutationKey: ['solanapredictiongame', 'set', { cluster, account }],
    mutationFn: (value: number) => program.methods.set(value).accounts({ solanapredictiongame: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  return {
    accountQuery,
    closeMutation,
    decrementMutation,
    incrementMutation,
    setMutation,
  }
}
