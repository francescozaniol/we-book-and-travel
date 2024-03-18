export default class {

  static async get() {
    return $fetch('/api/bookings');
  }

  static store(data: NewBooking) {
    return $fetch('/api/bookings', {
      method: 'POST',
      body: data,
    });
  }

}
