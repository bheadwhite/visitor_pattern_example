import { BronzeCreditCard } from "../creditCards/bronzeCreditCard";
import { GoldCreditCard } from "../creditCards/goldCreditCard";
import { SilverCreditCard } from "../creditCards/silverCreditCard";
import { OfferVisitor } from "./offerVisitor";

export class CreditCardHotelOffer implements OfferVisitor {
  visitBronzeCard(card: BronzeCreditCard): void {
    console.log("Bronze Credit Card Hotel Offer: Applying a 1% discount");
  }
  visitSilverCard(card: SilverCreditCard): void {
    console.log("Silver Credit Card Hotel Offer: Applying a 1% discount");
  }
  visitGoldCard(card: GoldCreditCard): void {
    console.log("Gold Credit Card Hotel Offer: Applying a 1% discount");
  }
}
