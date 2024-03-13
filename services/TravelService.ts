export default class {

  static index() {
    return $fetch('/api/travels');
  }

  static show(id: number) {
    return $fetch(`/api/travels/${id}`);
  }

  static store(data: NewTravel) {
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
