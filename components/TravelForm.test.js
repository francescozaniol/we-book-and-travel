import { it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import TravelForm from './TravelForm.vue';

it('emits cancel event when cancel button is clicked', async () => {
  const wrapper = await mountSuspended(TravelForm, {
    attachTo: document.body,
    props: {
      travel: null,
      pending: false,
    },
  });

  await wrapper.find('button[type="submit"] + button').trigger('click');

  expect(wrapper.emitted()).toHaveProperty('cancel');

  wrapper.unmount();
});

it('submits valid new data + submit button remains disabled until all data has been entered', async () => {
  const wrapper = await mountSuspended(TravelForm, {
    attachTo: document.body,
    props: {
      travel: null,
      pending: false,
    },
  });

  const submitButton = wrapper.find('button[type="submit"]');

  await wrapper.find('input[id=editedTravel.title]').setValue('Test Title');
  expect(submitButton.attributes('disabled')).toEqual('');

  await wrapper.find('input[id=editedTravel.description]').setValue('Test Description');
  expect(submitButton.attributes('disabled')).toEqual('');

  await wrapper.find('select[id=editedTravel.rating]').setValue(String(5));
  expect(submitButton.attributes('disabled')).toEqual('');

  await wrapper.find('input[id=editedTravel.dates.departure]').setValue('2024-03-17');
  expect(submitButton.attributes('disabled')).toEqual('');

  await wrapper.find('input[id=editedTravel.dates.return]').setValue('2024-03-24');
  expect(submitButton.attributes('disabled')).toEqual('');

  await wrapper.find('input[id=editedTravel.img.src]').setValue('https://example.com/image.jpg');
  expect(submitButton.attributes('disabled')).toEqual('');

  await wrapper.find('input[id=editedTravel.price]').setValue(1000);

  expect(submitButton.attributes('disabled')).toBeUndefined();

  await wrapper.find('form').trigger('submit');

  expect(wrapper.emitted().submit[0]).toEqual([
    {
      id: null,
      title: 'Test Title',
      description: 'Test Description',
      rating: '5',
      price: 1000,
      dates: {
        departure: '2024-03-17',
        return: '2024-03-24',
      },
      img: {
        src: 'https://example.com/image.jpg',
      },
    },
  ]);

  wrapper.unmount();
});

it('receives and submits valid edited data', async () => {
  const wrapper = await mountSuspended(TravelForm, {
    attachTo: document.body,
    props: {
      travel:
      {
        id: 1,
        title: 'Test Title',
        description: 'Test Description',
        rating: '5',
        price: 1000,
        dates: {
          departure: '2024-03-17',
          return: '2024-03-24',
        },
        img: {
          src: 'https://example.com/image.jpg',
        },
      },
      pending: false,
    },
  });

  expect(wrapper.find('input[id=editedTravel.title]').element.value).toEqual('Test Title');
  expect(wrapper.find('input[id=editedTravel.description]').element.value).toEqual('Test Description');
  expect(wrapper.find('select[id=editedTravel.rating]').element.value).toEqual(String(5));
  expect(wrapper.find('input[id=editedTravel.dates.departure]').element.value).toEqual('2024-03-17');
  expect(wrapper.find('input[id=editedTravel.dates.return]').element.value).toEqual('2024-03-24');
  expect(wrapper.find('input[id=editedTravel.img.src]').element.value).toEqual('https://example.com/image.jpg');
  expect(wrapper.find('input[id=editedTravel.price]').element.value).toEqual(String(1000));

  await wrapper.find('input[id=editedTravel.title]').setValue('Test Title 2');
  await wrapper.find('input[id=editedTravel.description]').setValue('Test Description 2');
  await wrapper.find('select[id=editedTravel.rating]').setValue('4');
  await wrapper.find('input[id=editedTravel.dates.departure]').setValue('2024-03-16');
  await wrapper.find('input[id=editedTravel.dates.return]').setValue('2024-03-23');
  await wrapper.find('input[id=editedTravel.img.src]').setValue('https://example.com/image-2.jpg');
  await wrapper.find('input[id=editedTravel.price]').setValue(100);

  await wrapper.find('form').trigger('submit');

  expect(wrapper.emitted().submit[0]).toEqual([
    {
      id: 1,
      title: 'Test Title 2',
      description: 'Test Description 2',
      rating: '4',
      price: 100,
      dates: {
        departure: '2024-03-16',
        return: '2024-03-23',
      },
      img: {
        src: 'https://example.com/image-2.jpg',
      },
    },
  ]);

  wrapper.unmount();
});