import { BronzeCreditCard } from "./creditCards/bronzeCreditCard";
import { GoldCreditCard } from "./creditCards/goldCreditCard";
import { CreditCardGasOffer } from "./offers/gasOffer";
import { CreditCardHotelOffer } from "./offers/hotelOffer";

//visitors - open/closed principle is followed
const hotelOffer = new CreditCardHotelOffer();
const gasOffer = new CreditCardGasOffer();

//visatables -- all the concrete credit cards wont need to be extended for every new offer created
const bronzeCard = new BronzeCreditCard();
const goldCard = new GoldCreditCard();

bronzeCard.acceptOffer(gasOffer);
bronzeCard.acceptOffer(hotelOffer);

goldCard.acceptOffer(gasOffer);
