import createRepository from '~/api/repository'

export default (ctx, inject) => {
  const repositoryWithAxios = createRepository(ctx.$axios)

  inject('userRepository', repositoryWithAxios('/admin/user'))
  inject('moduleRepository', repositoryWithAxios('/admin/module'))

  inject('userRepositoryUser', repositoryWithAxios('/user/user'))
  inject('moduleRepositoryUser', repositoryWithAxios('/user/module'))

  inject('adminRepositoryControl', repositoryWithAxios('/admin/control'))
}
