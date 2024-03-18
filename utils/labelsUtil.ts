import { Gender, Payment } from '@/enums';

export const labelsUtil = {

  getGenderLabel(gender: Gender): string | null {
    const { $i18n } = useNuxtApp();
    switch (gender) {
      case Gender.female: return $i18n.t('GENDER.FEMALE');
      case Gender.male: return $i18n.t('GENDER.MALE');
      case Gender.pnts: return $i18n.t('GENDER.PNTS');
      default: return null;
    }
  },

  getPaymentLabel(payment: Payment): string | null {
    const { $i18n } = useNuxtApp();
    switch (payment) {
      case Payment.credit: return $i18n.t('PAYMENT.CREDIT');
      case Payment.paypal: return $i18n.t('PAYMENT.PAYPAL');
      case Payment.revolut: return $i18n.t('PAYMENT.REVOLUT');
      default: return null;
    }
  },

};
