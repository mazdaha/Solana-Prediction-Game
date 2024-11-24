#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("AsjZ3kWAUSQRNt2pZVeJkywhZ6gpLpHZmJjduPmKZDZZ");

#[program]
pub mod solanapredictiongame {
    use super::*;

  pub fn close(_ctx: Context<CloseSolanapredictiongame>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.solanapredictiongame.count = ctx.accounts.solanapredictiongame.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.solanapredictiongame.count = ctx.accounts.solanapredictiongame.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeSolanapredictiongame>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.solanapredictiongame.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeSolanapredictiongame<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + Solanapredictiongame::INIT_SPACE,
  payer = payer
  )]
  pub solanapredictiongame: Account<'info, Solanapredictiongame>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseSolanapredictiongame<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub solanapredictiongame: Account<'info, Solanapredictiongame>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub solanapredictiongame: Account<'info, Solanapredictiongame>,
}

#[account]
#[derive(InitSpace)]
pub struct Solanapredictiongame {
  count: u8,
}
