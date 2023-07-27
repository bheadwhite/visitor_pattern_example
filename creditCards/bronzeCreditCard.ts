import { OfferVisitor } from "../offers/offerVisitor";
import { CreditCard } from "./creditCard";

//visitable
export class BronzeCreditCard implements CreditCard {
  getName(): string {
    return "Bronze Credit Card";
  }

  acceptOffer(visitor: OfferVisitor): void {
    visitor.visitBronzeCard(this);
  }
}
