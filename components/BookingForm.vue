<template>
  <form @submit.prevent="submit">
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">

        <template #header>
          <h1 class="text-3xl">
            Add new Booking
          </h1>
        </template>

        <div class="flex justify-between items-center">
          <h2 class="text-xl">{{ stepTitle }}</h2>
          <div class="*:align-middle"><strong class="text-green-700 text-xl">{{ currentStep }}</strong><span class="text-sm text-slate-400"> / </span><span class="text-slate-400">3</span></div>
        </div>

        <hr class="my-4" />

        <fieldset class="space-y-3" :aria-current="currentStep === 1 ? 'step' : undefined">

            <div>
              <label for="editedBooking.travelId">Travel</label>
              <UInputMenu id="editedBooking.title" size="lg" class="w-full" name="editedBooking.title" by="id" v-model="editedBooking.travel" :search="searchTravels" option-attribute="title" :search-attributes="['title']" :loading="searchTravelsPending" placeholder="Search for a travel" required />
            </div>

            <div v-if="editedBooking.travel">
              <UAlert
                :title="editedBooking.travel.title"
                color="white"
                class="bg-slate-100"
              >
                <template #description>
                  Dates: {{ editedBooking.travel.dates.departure }} to {{ editedBooking.travel.dates.return }}<br/>
                  Price: {{ editedBooking.travel.price }}$
                </template>
              </UAlert>
            </div>

        </fieldset>

        <fieldset class="space-y-3" :aria-current="currentStep === 1 ? 'step' : undefined">

          <div>
            <label for="editedBooking.customer.name">Name</label>
            <UInput size="lg" id="editedBooking.customer.name" class="w-full" type="text" name="editedBooking.customer.name" v-model="editedBooking.customer.name" required />
          </div>

          <div>
            <label for="editedBooking.customer.email">Email</label>
            <UInput size="lg" id="editedBooking.customer.email" class="w-full" type="email" name="editedBooking.customer.email" v-model="editedBooking.customer.email" required />
          </div>

          <div>
            <label for="editedBooking.customer.phone">Phone</label>
            <UInput size="lg" id="editedBooking.customer.phone" class="w-full" type="text" name="editedBooking.customer.phone" v-model="editedBooking.customer.phone" required />
          </div>

          <div>
            <label for="editedBooking.customer.age">Age</label>
            <UInput size="lg" id="editedBooking.customer.age" class="w-full" type="number" name="editedBooking.customer.age" v-model="editedBooking.customer.age" required />
          </div>

          <div>
            <label for="editedBooking.customer.gender">Gender</label>
            <USelect size="lg" id="editedBooking.customer.gender" class="w-full" :options="options.customer.gender" name="editedBooking.customer.gender" v-model="editedBooking.customer.gender" value-attribute="key" required />
          </div>

        </fieldset>

        <fieldset class="space-y-3" :aria-current="currentStep === 1 ? 'step' : undefined">

          <div>
            <label for="editedBooking.payment">Payment type</label>
            <USelect size="lg" id="editedBooking.payment" class="w-full" :options="options.payment" name="editedBooking.payment" v-model="editedBooking.payment" value-attribute="key" required />
          </div>

          <div>
            <label for="editedBooking.notes">Notes <span class="text-slate-500 text-xs">(optional)</span></label>
            <UTextarea size="lg" id="editedBooking.notes" class="w-full" type="number" name="editedBooking.notes" v-model="editedBooking.notes" />
          </div>

        </fieldset>

        <template #footer>
          <div class="flex space-x-2">
            <UButton color="white" variant="solid" size="md" class="px-5 mr-auto disabled:opacity-40" icon="i-heroicons-chevron-left" :disabled="currentStep === 1" @click="currentStep--">Back</UButton>
            <UButton v-if="currentStep !== 3" color="white" size="md" class="px-5 disabled:opacity-40" icon="i-heroicons-chevron-right" :disabled="!isDataValid[currentStep-1]" @click="currentStep++">Next</UButton>
            <UButton v-else color="green" size="md" class="px-5 disabled:opacity-40" icon="i-heroicons-check" type="submit" :disabled="!isDataValid[currentStep-1]" :loading="pending">Save</UButton>
            <UButton color="black" size="md" class="px-5" icon="i-heroicons-x-circle" @click="$emit('cancel')">Cancel</UButton>
          </div>
        </template>

      </UCard>

  </form>
</template>

<script lang="ts" setup>
const { $store } = useNuxtApp();

const { pending } = defineProps({
  pending: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const editedBooking = reactive({
  id: null,
  travel: <null | Travel>null,
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
}

let currentStep = ref(1);

const stepTitle = computed(() => {
  switch (currentStep.value) {
    case 1: return 'Select Travel:';
    case 2: return 'Fill Customer Info';
    case 3: return 'Select Payment Type';
    default: return null;
  }
});

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
    ...(({ travel: Travel, ...o }) => o)(unref(editedBooking)),
    travelId: editedBooking.travel?.id,
    customer: {
      ...unref(editedBooking.customer),
      gender: Number(editedBooking.customer.gender),
    },
    payment: Number(editedBooking.payment),
  })
}
</script>
