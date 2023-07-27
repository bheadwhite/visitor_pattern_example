import { BronzeCreditCard } from "../creditCards/bronzeCreditCard";
import { GoldCreditCard } from "../creditCards/goldCreditCard";
import { SilverCreditCard } from "../creditCards/silverCreditCard";
import { OfferVisitor } from "./offerVisitor";

export class CreditCardGasOfferVisitor implements OfferVisitor {
  visitBronzeCard(card: BronzeCreditCard): void {
    console.log("Bronze Credit Card Gas Offer: Applying a 1% discount");
  }

  visitSilverCard(card: SilverCreditCard): void {
    console.log("Silver Credit Card Gas Offer: Applying a 5% discount");
  }

  visitGoldCard(card: GoldCreditCard): void {
    card.lookFancy();
    console.log("Gold Credit Card Gas Offer: Applying a 5% discount");
  }
}
