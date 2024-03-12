<template>
  <div class="px-5 container">

    <div class="flex align-middle justify-end py-6">
      <button v-if="!editedTravel" @click="addTravel">Add new Travel</button>
    </div>

    <ul v-if="$store.travels.travels" class="list-none m-0 p-0 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 gap-6">
      <li class="m-0 p-0" v-for="travel in $store.travels.travels">
        <Card :item="travel">
          <template #actions>
            <div class="flex p-2 align-bottom justify-end space-x-2">
              <button @click="editTravel(travel)">
                Edit
              </button>
              <button @click="removeTravel(travel)">
                Delete
              </button>
            </div>
          </template>
        </Card>
      </li>
    </ul>

    <div v-else>Hold on, I'm fetching...</div>

    <div v-if="editedTravel">
      <hr />
      <form @submit.prevent="saveEditedTravel">
        <input class="w-full" type="text" name="title" v-model="editedTravel.title" />
        <input class="w-full" type="text" name="description" v-model="editedTravel.description" />
        <button type="submit">Save</button>
        <button @click="editedTravel = null">Cancel</button>
      </form>
    </div>

  </div>
</template>

<script lang="ts" setup>
const { $store } = useNuxtApp()

useAsyncData(() => Promise.all([
  $store.travels.fetchTravels(),
]), {
  lazy: true,
  server: false,
});

let editedTravel = <Ref<null | Travel | NewTravel>>ref(null);

function editTravel (travel: Travel) {
  editedTravel.value = JSON.parse(JSON.stringify(toRaw(travel)));
}

async function saveEditedTravel () {
  if ( !editedTravel.value ) return;
  if ( editedTravel.value.id === null ){
    await useAsyncData(() => $store.travels.addNewTravel(editedTravel.value as NewTravel));
  } else {
    await useAsyncData(() => $store.travels.updateTravel(editedTravel.value as Travel));
  }
  editedTravel.value = null;
}

function addTravel () {
  editedTravel.value = {
    id: null,
    title: '',
    description: '',
    img: null,
  };
}

function removeTravel (travel: Travel) {
  if (confirm('Mate, u sure u wanna delete this travel?')) {
    useAsyncData(() => $store.travels.removeTravel(travel));
  }
}
</script>
