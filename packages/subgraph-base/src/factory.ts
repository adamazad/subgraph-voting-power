import { Address, log } from "@graphprotocol/graph-ts";
import { PairCreated } from "../generated/Factory/Factory";
import { Pair } from "../generated/templates";
import { GNO_ADDRESS, createAMMPair } from "./helpers";

export function handleNewPair(event: PairCreated): void {
  const isGnoTradingPair =
    event.params.token0.equals(GNO_ADDRESS) ||
    event.params.token1.equals(GNO_ADDRESS);

  if (isGnoTradingPair) {
    createAMMPair(event.params.pair, event.params.token0, event.params.token1);
    // log.info("Found GNO in POOL: {}", [event.params.pair.toHex()]);
  }
}
