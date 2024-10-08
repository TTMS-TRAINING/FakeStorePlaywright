export class PersonalData {
  name!: string;
  surname!: string;
  companyName!: string;
  //country!: string;
  street_1!: string;
  street_2!: string;
  postalCode!: string;
  city!: string;
  phoneNumber!: string;
  email!: string;
  //createAcc!: boolean;
  orderNotes!: string;

  constructor(
    name: string,
    surname: string,
    companyName: string,
    //country: string,
    street_1: string,
    street_2: string,
    postalCode: string,
    city: string,
    phoneNumber: string,
    email: string,
    //createAcc: boolean,
    orderNotes: string
  ) {
    this.name = name;
    this.surname = surname;
    this.companyName = companyName;
    //this.country = country;
    this.street_1 = street_1;
    this.street_2 = street_2;
    this.postalCode = postalCode;
    this.city = city;
    this.phoneNumber = phoneNumber;
    this.email = email;
    //this.createAcc = createAcc;
    this.orderNotes = orderNotes;
  }
}

export class CardData {
  cardNumber!: string;
  cardExpirationDate!: string;
  cardCVC!: string;
  savePaymentsData!: boolean;
  //acceptStatute!: boolean;

  constructor(cardNumber: string, cardExpirationDate: string, cardCVC: string, savePaymentsData: boolean, /*acceptStatute: boolean*/) {
    this.cardNumber = cardNumber;
    this.cardExpirationDate = cardExpirationDate;
    this.cardCVC = cardCVC;
    this.savePaymentsData = savePaymentsData;
    //this.acceptStatute = acceptStatute;
  }
}
