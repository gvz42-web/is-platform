import createRepository from '~/api/repository'

export default (ctx, inject) => {
  const repositoryWithAxios = createRepository(ctx.$axios)

  inject('userRepository', repositoryWithAxios('/api/admin/user'))
  inject('moduleRepository', repositoryWithAxios('/api/admin/module'))

  inject('userRepositoryUser', repositoryWithAxios('/api/user/user'))
  inject('moduleRepositoryUser', repositoryWithAxios('/api/user/module'))
}
