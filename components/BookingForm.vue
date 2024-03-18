<template>
  <form @submit.prevent="submit">
    <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <div class="flex justify-between items-center">
          <h1 class="text-3xl">
            {{ $t('BOOKINGS.ADD_NEW') }}
          </h1>
          <div class="*:align-middle whitespace-nowrap">
            <strong class="text-green-700 text-xl">{{ currentStep }}</strong><span class="text-sm text-slate-400"> / </span><span class="text-slate-400">3</span>
          </div>
        </div>
      </template>

      <div
        class="relative z-10"
        aria-live="assertive"
      >
        <TransitionGroup
          enter-from-class="translate-x-[3%] opacity-0 max-h-0"
          enter-active-class="transition-[opacity,max-height,transform] delay-[250ms] duration-[1000ms]"
          enter-to-class="translate-none opacity-1 max-h-[500vh]"
          leave-from-class="translate-none opacity-1 max-h-[500vh]"
          leave-active-class="transition-[opacity,max-height,transform] duration-[500ms,500ms,1000ms]"
          leave-to-class="-translate-x-[3%] opacity-0 max-h-0"
        >
          <fieldset
            v-if="currentStep === 1"
            :key="currentStep"
            class="space-y-3"
            aria-current="step"
          >
            <div>
              <legend class="mb-2 text-center">
                <span class="text-md">1. </span><span class="text-xl">{{ stepsTitle[0] }}</span>
              </legend>
            </div>

            <div>
              <label for="editedBooking.travel">{{ $t('BOOKINGS.TRAVEL') }}</label>
              <UInputMenu
                id="editedBooking.travel"
                v-model="editedBooking.travel"
                size="lg"
                class="w-full"
                name="editedBooking.travel"
                by="id"
                :search="searchTravels"
                option-attribute="title"
                :search-attributes="['title']"
                :loading="searchTravelsPending"
                placeholder="Search for a travel"
                required
              />
            </div>

            <Transition
              enter-from-class="opacity-0"
              enter-active-class="transition duration-200"
            >
              <div v-if="editedBooking.travel">
                <UAlert
                  :title="editedBooking.travel.title"
                  color="white"
                  class="bg-slate-100"
                >
                  <template #description>
                    {{ $t('BOOKINGS.TRAVEL_DATES', { from: editedBooking.travel.dates.departure, to: editedBooking.travel.dates.return }) }}<br>
                    {{ $t('BOOKINGS.TRAVEL_PRICE', { n: editedBooking.travel.price }) }}
                  </template>
                </UAlert>
              </div>
            </Transition>
          </fieldset>

          <fieldset
            v-if="currentStep === 2"
            :key="currentStep"
            class="space-y-3"
            aria-current="step"
          >
            <div>
              <legend class="mb-2 text-center">
                <span class="text-md">2. </span><span class="text-xl">{{ stepsTitle[1] }}</span>
              </legend>
            </div>

            <div>
              <label for="editedBooking.customer.name">{{ $t('CUSTOMERS.NAME') }}</label>
              <UInput
                id="editedBooking.customer.name"
                v-model="editedBooking.customer.name"
                size="lg"
                class="w-full"
                type="text"
                name="editedBooking.customer.name"
                required
              />
            </div>

            <div>
              <label for="editedBooking.customer.email">{{ $t('CUSTOMERS.EMAIL') }}</label>
              <UInput
                id="editedBooking.customer.email"
                v-model="editedBooking.customer.email"
                size="lg"
                class="w-full"
                type="email"
                name="editedBooking.customer.email"
                required
              />
            </div>

            <div>
              <label for="editedBooking.customer.phone">{{ $t('CUSTOMERS.PHONE') }}</label>
              <UInput
                id="editedBooking.customer.phone"
                v-model="editedBooking.customer.phone"
                size="lg"
                class="w-full"
                type="text"
                name="editedBooking.customer.phone"
                required
              />
            </div>

            <div>
              <label for="editedBooking.customer.age">{{ $t('CUSTOMERS.AGE') }}</label>
              <UInput
                id="editedBooking.customer.age"
                v-model="editedBooking.customer.age"
                size="lg"
                class="w-full"
                type="number"
                name="editedBooking.customer.age"
                required
              />
            </div>

            <div>
              <label for="editedBooking.customer.gender">{{ $t('CUSTOMERS.GENDER') }}</label>
              <USelect
                id="editedBooking.customer.gender"
                v-model="editedBooking.customer.gender"
                size="lg"
                class="w-full"
                :options="options.customer.gender"
                name="editedBooking.customer.gender"
                value-attribute="key"
                required
              />
            </div>
          </fieldset>

          <fieldset
            v-if="currentStep === 3"
            :key="currentStep"
            class="space-y-3"
            aria-current="step"
          >
            <div>
              <legend class="mb-2 text-center">
                <span class="text-md">3. </span><span class="text-xl">{{ stepsTitle[2] }}</span>
              </legend>
            </div>

            <div>
              <label for="editedBooking.payment">{{ $t('BOOKINGS.PAYMENT_TYPE') }}</label>
              <USelect
                id="editedBooking.payment"
                v-model="editedBooking.payment"
                size="lg"
                class="w-full"
                :options="options.payment"
                name="editedBooking.payment"
                value-attribute="key"
                required
              />
            </div>

            <div>
              <label for="editedBooking.notes">{{ $t('BOOKINGS.NOTES') }} <span class="text-slate-500 text-xs">({{ $t('GENERIC.OPTIONAL') }})</span></label>
              <UTextarea
                id="editedBooking.notes"
                v-model="editedBooking.notes"
                size="lg"
                class="w-full"
                type="number"
                name="editedBooking.notes"
              />
            </div>
          </fieldset>
        </TransitionGroup>
      </div>

      <template #footer>
        <div class="flex space-x-2 max-sm:block max-sm:space-y-2 max-sm:space-x-0">
          <UButton
            color="white"
            variant="solid"
            size="md"
            class="px-5 mr-auto disabled:opacity-40 max-sm:w-full"
            icon="i-heroicons-chevron-left"
            :disabled="currentStep === 1"
            @click="currentStep--"
          >
            {{ $t('GENERIC.BACK') }}
          </UButton>
          <UButton
            v-if="currentStep !== 3"
            color="white"
            size="md"
            class="px-5 disabled:opacity-40 max-sm:w-full max-sm:justify-center"
            icon="i-heroicons-chevron-right"
            :disabled="!isDataValid[currentStep-1]"
            @click="currentStep++"
          >
            {{ $t('GENERIC.NEXT') }}
          </UButton>
          <UButton
            v-else
            color="green"
            size="md"
            class="px-5 disabled:opacity-40 max-sm:w-full max-sm:justify-center"
            icon="i-heroicons-check"
            type="submit"
            :disabled="!isDataValid[currentStep-1]"
            :loading="pending"
          >
            {{ $t('GENERIC.SAVE') }}
          </UButton>
          <UButton
            color="black"
            size="md"
            class="px-5 max-sm:w-full max-sm:justify-center"
            icon="i-heroicons-x-circle"
            @click="$emit('cancel')"
          >
            {{ $t('GENERIC.CANCEL') }}
          </UButton>
        </div>
      </template>
    </UCard>
  </form>
</template>

<script lang="ts" setup>
import { Gender, Payment } from '@/enums';
const { $store, $i18n } = useNuxtApp();

const { pending } = defineProps({
  pending: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const editedBooking = reactive({
  id: null,
  travel: null as null | Travel,
  customer: {
    name: '',
    email: '',
    phone: '',
    age: null,
    gender: null,
  },
  payment: null,
  notes: '',
});

const options = {
  customer: {
    gender: [
      {
        key: Gender.male,
        label: labelsUtil.getGenderLabel(Gender.male),
      },
      {
        key: Gender.female,
        label: labelsUtil.getGenderLabel(Gender.female),
      },
      {
        key: Gender.pnts,
        label: labelsUtil.getGenderLabel(Gender.pnts),
      },
    ],
  },
  payment: [
    {
      key: Payment.credit,
      label: labelsUtil.getPaymentLabel(Payment.credit),
    },
    {
      key: Payment.paypal,
      label: labelsUtil.getPaymentLabel(Payment.paypal),
    },
    {
      key: Payment.revolut,
      label: labelsUtil.getPaymentLabel(Payment.revolut),
    },
  ],
};

const currentStep = ref(1);

const stepsTitle = [
  $i18n.t('BOOKINGS.ADD_NEW_STEP_1'),
  $i18n.t('BOOKINGS.ADD_NEW_STEP_2'),
  $i18n.t('BOOKINGS.ADD_NEW_STEP_3'),
];

const isDataValid = computed(() => ([
  !!(
    editedBooking.travel !== null
  ),
  !!(
    editedBooking.customer.name &&
    editedBooking.customer.email &&
    editedBooking.customer.phone &&
    editedBooking.customer.age &&
    editedBooking.customer.gender !== null
  ),
  !!(
    editedBooking.payment !== null
  ),
]));

const searchTravelsPending = ref(false);
async function searchTravels (q: string) {
  searchTravelsPending.value = true;
  const { data } = await $store.travels.searchTravels(q);
  searchTravelsPending.value = false;
  return data;
}

const emit = defineEmits(['submit', 'cancel']);
function submit () {
  emit('submit', {
    id: editedBooking.id,
    travelId: editedBooking.travel?.id,
    customer: {
      ...unref(editedBooking.customer),
      gender: Number(editedBooking.customer.gender),
    },
    payment: Number(editedBooking.payment),
    notes: editedBooking.notes,
  });
}
</script>