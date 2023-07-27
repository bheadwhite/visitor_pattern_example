use case:
two abstract objects interacting with each other and there can be many concrete versions of both
how do you follow open closed principle by way of polymorphism

## credit cards vs offers

a few credit cards and many offers

credit cards = visitable
offers = visitors

rationale: if we have many offers and these things will grow at a decent rate, visitors are very extensible without having to worry about modifying a "visitable" interface.

```ts
interface Visitable {
    accept(visitor Visitor)
}

interface Visitor {
    visit(v Visitable)
}
```

step 1 present the problem
step 2 introduce the pattern/solution to the problem
step 3

problem example:

```ts
interface CreditCard {
  // Other credit card methods...
  applyHotelOffer(): void;
  applyGasOffer(): void;
  //applyAirlineOffer(): void
}

class VisaCard implements CreditCard {
  applyHotelOffer(): void {
    console.log("Applying cashback offer to Visa card.");
  }

  applyGasOffer(): void {
    console.log("Applying reward points offer to Visa card.");
  }
}

class MasterCard implements CreditCard {
  applyHotelOffer(): void {
    console.log("Applying cashback offer to MasterCard.");
  }

  applyGasOffer(): void {
    console.log("Applying reward points offer to MasterCard.");
  }
}

class AmericanExpressCard implements CreditCard {
  applyHotelOffer(): void {
    console.log("Applying cashback offer to American Express card.");
  }

  applyGasOffer(): void {
    console.log("Applying reward points offer to American Express card.");
  }
}

// Usage
const visaCard = new VisaCard();
const masterCard = new MasterCard();
const amexCard = new AmericanExpressCard();

visaCard.applyHotelOffer();
masterCard.applyGasOffer();
amexCard.applyGasOffer();
```

### reading notes

intent: visitor lets you define a new operation without changing the classes of the elements on which it operates.

!visit methods have access to the concrete element when defining the visitor abstract interface.

lets not get into `single dispatch` and `double dispatch` until later

### code along

```ts
//visitables
export interface CreditCard {
  acceptOffer(visitor: OfferVisitor): void;
}

export class BronzeCreditCard implements CreditCard {
  getName(): string {
    return "Bronze Credit Card";
  }

  acceptOffer(visitor: OfferVisitor): void {
    visitor.visitBronzeCard(this);
  }
}

export class SilverCreditCard implements CreditCard {
  getName(): string {
    return "Silver Credit Card";
  }

  acceptOffer(visitor: OfferVisitor): void {
    visitor.visitSilverCard(this);
  }
}

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

//visitors
export interface OfferVisitor {
  visitBronzeCard(card: BronzeCreditCard): void;
  visitSilverCard(card: SilverCreditCard): void;
  visitGoldCard(card: GoldCreditCard): void;
}

export class GasOfferVisitor implements OfferVisitor {
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

export class HotelOfferVistor implements OfferVisitor {
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

//visatables -- all the concrete credit cards wont need to be extended for every new offer created
const bronzeCard = new BronzeCreditCard();
const goldCard = new GoldCreditCard();

//visitors - open/closed principle is followed
const hotelOffer = new CreditCardHotelOffer();
const gasOffer = new CreditCardGasOffer();

bronzeCard.acceptOffer(gasOffer);
bronzeCard.acceptOffer(hotelOffer);

goldCard.acceptOffer(gasOffer);
```

# MORE EXAMPLES

### Shapes

```ts
interface Shape {
  accept(visitor: ShapeVisitor): void;
}

class Circle implements Shape {
  accept(visitor: ShapeVisitor): void {
    visitor.visitCircle(this);
  }

  getRadius(): number {
    return 5;
  }
}

class Square implements Shape {
  accept(visitor: ShapeVisitor): void {
    visitor.visitSquare(this);
  }

  getSideLength(): number {
    return 10;
  }
}

// Visitor interface
interface ShapeVisitor {
  visitCircle(circle: Circle): void;
  visitSquare(square: Square): void;
}

// Concrete visitor performing calculations
class AreaCalculator implements ShapeVisitor {
  visitCircle(circle: Circle): void {
    const radius = circle.getRadius();
    const area = 3.14 * radius * radius;
    console.log(`Area of the circle: ${area}`);
  }

  visitSquare(square: Square): void {
    const sideLength = square.getSideLength();
    const area = sideLength * sideLength;
    console.log(`Area of the square: ${area}`);
  }
}

// Client code
const shapes: Shape[] = [new Circle(), new Square()];
const areaCalculator: ShapeVisitor = new AreaCalculator();
shapes.forEach((shape) => shape.accept(areaCalculator));
```

### Smart Home Devices

```ts
interface SmartHomeDevice {
  accept(visitor: HomeVisitor): void;
}

class Light implements SmartHomeDevice {
  accept(visitor: HomeVisitor): void {
    visitor.visitLight(this);
  }

  turnOn(): void {
    console.log("Light turned on.");
  }
}

class Thermostat implements SmartHomeDevice {
  accept(visitor: HomeVisitor): void {
    visitor.visitThermostat(this);
  }

  setTemperature(temperature: number): void {
    console.log(`Thermostat set to ${temperature} degrees Celsius.`);
  }
}

// Visitor interface
interface HomeVisitor {
  visitLight(light: Light): void;
  visitThermostat(thermostat: Thermostat): void;
}

// Concrete visitor performing operations
class VoiceCommandProcessor implements HomeVisitor {
  visitLight(light: Light): void {
    light.turnOn();
    // Additional voice command processing for lights
  }

  visitThermostat(thermostat: Thermostat): void {
    thermostat.setTemperature(22);
    // Additional voice command processing for thermostats
  }
}

// Client code
const devices: SmartHomeDevice[] = [new Light(), new Thermostat()];
const voiceCommandProcessor: HomeVisitor = new VoiceCommandProcessor();
devices.forEach((device) => device.accept(voiceCommandProcessor));
```

### Payment Methods

```ts
interface PaymentMethod {
  accept(visitor: PaymentVisitor): void;
}

class CreditCard implements PaymentMethod {
  accept(visitor: PaymentVisitor): void {
    visitor.visitCreditCard(this);
  }

  getCardNumber(): string {
    return "1234-5678-9012-3456";
  }
}

class PayPal implements PaymentMethod {
  accept(visitor: PaymentVisitor): void {
    visitor.visitPayPal(this);
  }

  getEmail(): string {
    return "user@example.com";
  }
}

// Visitor interface
interface PaymentVisitor {
  visitCreditCard(creditCard: CreditCard): void;
  visitPayPal(paypal: PayPal): void;
}

// Concrete visitor performing payment processing
class PaymentProcessor implements PaymentVisitor {
  visitCreditCard(creditCard: CreditCard): void {
    const cardNumber = creditCard.getCardNumber();
    console.log(`Processing payment using credit card: ${cardNumber}`);
  }

  visitPayPal(paypal: PayPal): void {
    const email = paypal.getEmail();
    console.log(`Processing payment using PayPal: ${email}`);
  }
}

// Client code
const paymentMethods: PaymentMethod[] = [new CreditCard(), new PayPal()];
const paymentProcessor: PaymentVisitor = new PaymentProcessor();
paymentMethods.forEach((paymentMethod) =>
  paymentMethod.accept(paymentProcessor)
);
```
