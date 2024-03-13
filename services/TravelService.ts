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

  static update(id: number, data: Travel) {
    return $fetch(`/api/travels/${id}`, {
      method: 'POST',
      body: data,
    });
  }

  static delete(id: number) {
    return $fetch(`/api/travels/${id}`, {
      method: 'DELETE',
    });
  }

}
