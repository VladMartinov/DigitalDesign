export default api => {
	api.delete = {
    // Deffault //
    project(id, token) {
      return api.instance.request({
        method: 'delete',
        headers: { authorization: `Bearer ${token}` },
				url: `projects/${id}`,
      })
    },
    task(id, token) {
      return api.instance.request({
        method: 'delete',
        headers: { authorization: `Bearer ${token}` },
				url: `tasks/${id}`,
      })
    },
    comment(id, token) {
      return api.instance.request({
        method: 'delete',
        headers: { authorization: `Bearer ${token}` },
        url: `comments/${id}`
      })
    }
	}
}