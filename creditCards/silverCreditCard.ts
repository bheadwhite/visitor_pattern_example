import { OfferVisitor } from "../offers/offerVisitor";
import { CreditCard } from "./creditCard";

export class SilverCreditCard implements CreditCard {
  getName(): string {
    return "Silver Credit Card";
  }

  acceptOffer(visitor: OfferVisitor): void {
    visitor.visitSilverCard(this);
  }
}
