import { OfferVisitor } from "../offers/offerVisitor";
import { CreditCard } from "./creditCard";

export class GoldCreditCard implements CreditCard {
  private _isInGoodStanding: boolean = true;

  private _doOfferPrerequisiteChecks(): void {
    const isNotInGoodStanding = !this._isInGoodStanding;
    if (isNotInGoodStanding) {
      throw new Error("Gold Credit Card: Cannot apply offer");
    }
  }

  lookFancy() {
    console.log("looking at my gold card. self esteem + 1");
  }

  acceptOffer(visitor: OfferVisitor): void {
    this._doOfferPrerequisiteChecks();

    visitor.visitGoldCard(this); //double dispatch operation
  }
}
