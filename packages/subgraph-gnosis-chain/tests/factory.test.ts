import {
  createMockedFunction,
  clearStore,
  test,
  assert,
  logStore,
} from "matchstick-as/assembly/index";
import { Address, BigInt, Bytes, ethereum } from "@graphprotocol/graph-ts";
import { AMMPair, User } from "../generated/schema";
import { log, newMockEvent } from "matchstick-as";
import {
  ADDRESS_ZERO,
  GNO_ADDRESS,
  gno,
  user1,
  user2,
  value,
  mockPair,
  value2x,
  data,
} from "../src/helpers";
import { PairCreated } from "../generated/Factory/Factory";
import { handleNewPair } from "../src/factory";
import { createPairCreatedEvent } from "./helpers";

// mock pair.totalSupply()
createMockedFunction(mockPair, "totalSupply", "totalSupply():(uint256)")
  .withArgs([])
  .returns([ethereum.Value.fromI32(100)]);

// mock gno.balanceOf(pair.address)
createMockedFunction(GNO_ADDRESS, "balanceOf", "balanceOf(address):(uint256)")
  .withArgs([ethereum.Value.fromAddress(mockPair)])
  .returns([ethereum.Value.fromI32(200)]);

test("Factory spawns pair", () => {
  clearStore();
  let otherToken = user1;
  let pairCreatedEvent = createPairCreatedEvent(
    GNO_ADDRESS,
    otherToken,
    mockPair,
    value
  );
  handleNewPair(pairCreatedEvent);
  assert.fieldEquals(
    "AMMPair",
    mockPair.toHexString(),
    "id",
    mockPair.toHexString()
  );
});

test("New pair GNO has correct totalSupply", () => {
  clearStore();
  let otherToken = user1;
  let pairCreatedEvent = createPairCreatedEvent(
    GNO_ADDRESS,
    otherToken,
    mockPair,
    value
  );
  handleNewPair(pairCreatedEvent);
  assert.fieldEquals("AMMPair", mockPair.toHexString(), "totalSupply", "100");
});

test("New pair has correct gnoReserves", () => {
  clearStore();
  let otherToken = user1;
  let pairCreatedEvent = createPairCreatedEvent(
    GNO_ADDRESS,
    otherToken,
    mockPair,
    value
  );
  handleNewPair(pairCreatedEvent);
  assert.fieldEquals("AMMPair", mockPair.toHexString(), "gnoReserves", "200");
});

test("New pair has correct previousRatio", () => {
  clearStore();
  let otherToken = user1;
  let pairCreatedEvent = createPairCreatedEvent(
    GNO_ADDRESS,
    otherToken,
    mockPair,
    value
  );
  handleNewPair(pairCreatedEvent);
  assert.fieldEquals("AMMPair", mockPair.toHexString(), "previousRatio", "0");
});

test("New pair has correct current ratio", () => {
  clearStore();
  let otherToken = user1;
  let pairCreatedEvent = createPairCreatedEvent(
    GNO_ADDRESS,
    otherToken,
    mockPair,
    value
  );
  handleNewPair(pairCreatedEvent);
  assert.fieldEquals("AMMPair", mockPair.toHexString(), "ratio", "2");
});

test("New pair has correct lps", () => {
  clearStore();
  let otherToken = user1;
  let pairCreatedEvent = createPairCreatedEvent(
    GNO_ADDRESS,
    otherToken,
    mockPair,
    value
  );
  handleNewPair(pairCreatedEvent);
  assert.fieldEquals("AMMPair", mockPair.toHexString(), "lps", "[]");
});
