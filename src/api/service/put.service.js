export default api => {
	api.put = {
    // Deffault //
    project(dto, token) {
      return api.instance.request({
        method: 'put',
        headers: { authorization: `Bearer ${token}` },
				url: `projects`,
        data: dto
      })
    },
    task(dto, token) {
      return api.instance.request({
        method: 'put',
        headers: { authorization: `Bearer ${token}` },
				url: `tasks`,
        data: dto
      })
    },
    user(dto, token) {
      return api.instance.request({
        method: 'put',
        headers: { authorization: `Bearer ${token}` },
				url: `users`,
        data: dto
      })
    },
    comment(dto, token) {
      return api.instance.request({
        method: 'put',
        headers: { authorization: `Bearer ${token}` },
        url: `comments`,
        data: dto
      })
    },
    times(dto, token) {
      return api.instance.request({
        method: 'put',
        headers: { authorization: `Bearer ${token}` },
				url: `times`,
        data: dto
      })
    },
    // Users put commands //
    userPass(dto, token) {
      return api.instance.request({
        method: 'put',
        headers: { authorization: `Bearer ${token}` },
				url: `users/password`,
        data: dto
      })
    },
    userStatus(dto, token) {
      return api.instance.request({
        method: 'put',
        headers: { authorization: `Bearer ${token}` },
				url: `users/status`,
        data: dto
      })
    },
    userPicture(dto, type, token) {
      return api.instance.request({
        method: 'put',
        headers: {
          'Content-Type' : `image/${type}`,
          authorization: `Bearer ${token}`
        },
				url: `users/picture`,
        data: dto
      })
    },
	}
}