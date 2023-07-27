import { BronzeCreditCard } from "../creditCards/bronzeCreditCard";
import { GoldCreditCard } from "../creditCards/goldCreditCard";
import { SilverCreditCard } from "../creditCards/silverCreditCard";

//visitor
export interface OfferVisitor {
  visitBronzeCard(card: BronzeCreditCard): void;
  visitSilverCard(card: SilverCreditCard): void;
  visitGoldCard(card: GoldCreditCard): void;
}
