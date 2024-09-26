import { AccountData } from "../models/AccountData";

export class AccountTestData {
    public static CorrectEmailLogin: AccountData = new AccountData('kamilakrystyna@gmail.com', 'AccountTest1234!@', '', '', true);
    public static WrongEmailLogin: AccountData = new AccountData('kamilakrystyna@gmail.com', 'Test1234', '', '', true);
    public static NotRegisteredEmail: AccountData = new AccountData('testtest@test.com', 'Test1234', '', '', true);
    public static CorrectLogin: AccountData = new AccountData('kamila.socha','Test123456!@#','', '', false);
    public static WrongLogin: AccountData = new AccountData('kamila.socha', 'Test1234!@#', '', '', false);
    public static NotRegistered: AccountData = new AccountData('kamila.testowa123', 'Test1234', '', '', false);
    public static NewEmail:AccountData = new AccountData('','','testowymail@email.com', 'Test1234567!@#', false);
    public static ExistingEmail:AccountData = new AccountData('','','kamilakrystyna@gmail.com', 'AccountTest12345!@',false);
    public static NotCorrectEmail:AccountData = new AccountData('','','test.test@test','Test1234567!@#',false)
    public static WeakPassword:AccountData = new AccountData('','','weakpasstest@email.com','Test1234',false)
}