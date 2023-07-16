export default api => {
	api.post = {
    // Deffault //
    project(dto, token) {
      return api.instance.request({
        method: 'post',
        headers: { authorization: `Bearer ${token}` },
				url: `projects`,
        data: dto
      })
    },
    task(dto, token) {
      return api.instance.request({
        method: 'post',
        headers: { authorization: `Bearer ${token}` },
				url: `tasks`,
        data: dto
      })
    },
    comment(dto, token) {
      return api.instance.request({
        method: 'post',
        headers: { authorization: `Bearer ${token}` },
        url: `comments`,
        data: dto
      })
    },
    // Post search //
    searchProjects(dto, token) {
      return api.instance.request({
        method: 'post',
        headers: { authorization: `Bearer ${token}` },
				url: `projects/search`,
        data: dto
      })
    },
    searchTasks(dto, token) {
      return api.instance.request({
        method: 'post',
        headers: { authorization: `Bearer ${token}` },
				url: `tasks/search`,
        data: dto
      })
    },
    searchUsers(dto, token) {
      return api.instance.request({
        method: 'post',
        headers: { authorization: `Bearer ${token}` },
				url: `users/search`,
        data: dto
      })
    },
    // Authorization //
    registration(dto) {
      return api.instance.request({
        method: 'post',
				url: `registration`,
        data: dto
      })
    },
    login(dto) {
      return api.instance.request({
        method: 'post',
				url: `login`,
        data: dto
      })
    },
	}
}