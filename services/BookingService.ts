export default class {

  static async get() {
    return $fetch('/api/bookings');
  }

}
