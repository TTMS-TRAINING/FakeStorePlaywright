import { CardData, PersonalData } from '../models/PaymentData';

export class PaymentTestData {
  public static CorrectPersonalData: PersonalData = new PersonalData("Jan", "Kowalski", "", /*"Polska",*/ "Jana Pawła", "" , "21345", "Lublin", "908567342", "Kowalski_Jan@gmail.com", /*false,*/ "TEST123");
  public static CorrectCardData: CardData = new CardData("4242424242424242", "1230", "1234", false);

}