export const myAccountData = {
  accountDetailsValid: {
    firstName: 'Filip',
    lastName: 'Matyaszewski',
    company: 'Firma XYZ',
    country: 'Polska',
    address: 'Ulica 123',
    address2: 'Apt 1',
    postcode: '00-001',
    city: 'Warszawa',
    phone: '123456789',
    email: 'filip.matyaszewski@gmail.com',
    orderComments: 'Proszę o dostarczenie po 14:00',
    displayName: 'Filip.Matyaszewski'
  },
  accountDetailsInvalid: {
    firstName: 'Anna',
    lastName: 'Nowak',
    company: 'ABC Sp. z o.o.',
    country: 'Niemcy',
    address: 'Berliner Str. 89',
    address2: 'Lokal 3',
    postcode: '10115',
    city: 'Berlin',
    phone: '987654321',
    email: 'anna.nowak@example.com',
    orderComments: 'Dostawa możliwa do 18:00',
  },
  cardDetails: {
    cardNumber: '4242424242424242',
    cardExpiry: '1231', // MMYY format
    cardCVC: '123', // Trzycyfrowy kod CVC
  },
  cardDetailsSet2: {
    cardNumber: '4000056655665556', // Przykładowy inny numer testowy
    cardExpiry: '0125', // MMYY format
    cardCVC: '456', // Trzycyfrowy kod CVC
  },
};
