export default function ({ store: { getters }, redirect }) {
  if (getters.isAuth) {
    return redirect('/')
  }
}
