
export const labelsUtil = {

  getGenderLabel(gender: any): string | null {
    switch (gender) {
      case Gender.female: return 'Female';
      case Gender.male: return 'Male';
      case Gender.pnts: return 'Prefer not to say';
      default: return null;
    }
  },

  getPaymentLabel(payment: any): string | null {
    switch (payment) {
      case Payment.credit: return 'Credit';
      case Payment.paypal: return 'Paypal';
      case Payment.revolut: return 'Revolut';
      default: return null;
    }
  },

}