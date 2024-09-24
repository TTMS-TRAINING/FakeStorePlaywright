import { AccountData } from "../models/AccountData";

export class AccountTestData {
    public static CorrectEmailLogin: AccountData = new AccountData('kamilakrystyna@gmail.com', 'AccountTest1234!@', '', '', true);
    public static WrongEmailLogin: AccountData = new AccountData('kamilakrystyna@gmail.com', 'Test1234', '', '', true);
    public static NotRegisteredEmail: AccountData = new AccountData('testtest@test.com', 'Test1234', '', '', true);
    public static CorrectLogin: AccountData = new AccountData('kamila.socha', 'Test123456!@#', '', '', false);
    public static WrongLogin: AccountData = new AccountData('kamila.socha', 'Test1234!@#', '', '', false);
    public static NotRegistered: AccountData = new AccountData('kamila.testowa123', 'Test1234', '', '', false);
    public static TestUserWishlist: AccountData = new AccountData('pawel.czaplejewicz@gmail.com', '#Q1w2e3r4t5!', '', '', true);
}