import './cgu.scss';

const CGU = () => (
  <div className="container flow">
    <h1 className="Title-CGU">Conditions générales d'utilisation</h1>
    <p className="intro-rules">En utilisant notre application, vous acceptez les conditions suivantes :</p>
    <ul className="ul-CGU flow">
      <li className="li-CGU">
        Vous garantissez que les informations fournies lors de l'inscription sont exactes et à jour.
      </li>
      <li className="li-CGU">
        Nous nous engageons à protéger vos données personnelles conformément
        à notre politique de confidentialité.
      </li>
      <li className="li-CGU">
        Vous ne devez pas utiliser notre application à des fins
        illégales ou non autorisées.
      </li>
      <li className="li-CGU">
        Nous nous réservons le droit de refuser ou de retirer l'accès à notre
        application à tout moment et pour toute raison.
      </li>
      <li className="li-CGU">
        Nous nous réservons le droit de modifier ces conditions générales
        d'utilisation à tout moment et sans préavis.
      </li>
    </ul>
  </div>
);

export default CGU;
