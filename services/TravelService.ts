export default class {

  static get() {
    return $fetch('/api/travels');
  }

  static new(data: NewTravel) {
    return $fetch('/api/travels', {
      method: 'PUT',
      body: data,
    });
  }

  static update(data: Travel) {
    return $fetch('/api/travels', {
      method: 'POST',
      body: data,
    });
  }

  static delete(id: number) {
    return $fetch('/api/travels', {
      method: 'DELETE',
      body: id,
    });
  }

}
