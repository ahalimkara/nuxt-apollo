export default function ({ store: { state }, route, redirect }) {
  if (state.accessToken) {
    return redirect('/' + (route.params.locale || ''))
  }
}
