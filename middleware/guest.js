export default function ({ store: { state }, redirect }) {
  if (state.accessToken) {
    return redirect('/')
  }
}
