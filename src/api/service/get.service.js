export default api => {
	api.get = {
    // Deffault //
    project(id, token) {
      return api.instance.request({
        method: 'get',
        headers: { authorization: `Bearer ${token}` },
				url: `projects/${id}`,
      })
    },
    task(id, token) {
      return api.instance.request({
        method: 'get',
        headers: { authorization: `Bearer ${token}` },
				url: `tasks/${id}`,
      })
    },
    // Users get's //
    currentUser(token) {
      return api.instance.request({
        method: 'get',
        headers: { authorization: `Bearer ${token}` },
				url: `users/current`,
      })
    },
    blobPicture(imgName) {
      return api.instance.request({
        method: 'get',
        responseType: 'blob',
        baseURL: 'http://45.12.239.156:8081',
        url: `${imgName}`
      })
    },
    // Task get's //
    taskComments(id, token) {
      return api.instance.request({
        method: 'get',
        headers: { authorization: `Bearer ${token}` },
				url: `comments/${id}`,
      })
    },
    taskHistory(id, token) {
      return api.instance.request({
        method: 'get',
        headers: { authorization: `Bearer ${token}` },
				url: `hystory/${id}`,
      })
    },
	}
}