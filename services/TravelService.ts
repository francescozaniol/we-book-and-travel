export default class {

  static index({ q = '' } = {}) {
    return $fetch('/api/travels', {
      params: {
        q,
      },
    });
  }

  static show(id: number) {
    return $fetch(`/api/travels/${id}`);
  }

  static store(data: NewTravel) {
    return $fetch('/api/travels', {
      method: 'POST',
      body: data,
    });
  }

  static update(id: number, data: Travel) {
    return $fetch(`/api/travels/${id}`, {
      method: 'PUT',
      body: data,
    });
  }

  static delete(id: number) {
    return $fetch(`/api/travels/${id}`, {
      method: 'DELETE',
    });
  }

}
