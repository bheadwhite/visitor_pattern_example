import type { OfferVisitor } from "../offers/offerVisitor";

//visitable
export interface CreditCard {
  acceptOffer(visitor: OfferVisitor): void; //double dispatch operation
}
