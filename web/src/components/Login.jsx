function Login() {

  return (
    <section className="border--medium">
      <h1>Identifícate</h1>
      <form>
        <label className="form__label display-block" htmlFor="email">
          Escribe tu email
        </label>
        <input
          className="form__input-text"
          type="text"
          name="email"
          id="email"
        />

        <label className="form__label display-block" htmlFor="password">
          Escribe tu contraseña
        </label>
        <input
          className="form__input-text"
          type="text"
          name="password"
          id="password"
        />

        <input className="form__btn display-block" type="submit" value="Entrar" />
      </form>
    </section>
  );
};

export default Login;
