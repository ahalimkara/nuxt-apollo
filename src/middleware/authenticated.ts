import { Context } from '@nuxt/types'

export default function ({
  store: { state },
  route: { params },
  redirect,
}: Context) {
  if (!state.viewer) {
    return redirect((params.locale ? `/${params.locale}` : '') + '/login')
  }
}
