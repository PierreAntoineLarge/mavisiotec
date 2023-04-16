import { useDispatch, useSelector } from 'react-redux';
import Field from '../../Field';
import { updateSettingsField, submitFormContact } from '../../../actions/log';
import './contact.scss';

const Contact = () => {
  const nicknameValue = useSelector((state) => state.subscribe.nickname);
  const emailValue = useSelector((state) => state.subscribe.email);
  const formValue = useSelector((state) => state.subscribe.formValue);
  const dispatch = useDispatch();

  return (
    <div className="container">
      <div className="contact-wrapper flow">
        <h1>Contactez l'equipe Visiotech</h1>
        <div className="contact-flex">
          <form
            className="contact-form"
            onSubmit={(event) => {
              event.preventDefault();
              dispatch(submitFormContact());
            }}
          >
            <Field
              identifier="nickname"
              placeholder="Pseudo"
              type="text"
              value={nicknameValue}
              changeField={(identifier, newValue) => {
                const action = updateSettingsField(identifier, newValue);
                dispatch(action);
              }}
            />
            <Field
              identifier="email"
              placeholder="Votre e-mail"
              value={emailValue}
              changeField={(identifier, newValue) => {
                const action = updateSettingsField(identifier, newValue);
                dispatch(action);
              }}
            />
            <Field
              className="message-box"
              identifier="form"
              placeholder="Allez y vous pouvez meme nous spammer on a pas peur"
              value={formValue}
              changeField={(identifier, newValue) => {
                const action = updateSettingsField(identifier, newValue);
                dispatch(action);
              }}
            />
            <button type="submit" className="contact-button">Envoyer</button>
          </form>
          <div className="contact-content flow">
            <p className="page-description">
              Nous sommes toujours à l'écoute et heureux de recevoir
              vos commentaires et suggestions.
              Alors n'hésitez pas à nous faire part de vos idées, envies,
              critiques ou juste pour nous faire un petit coucou en utilisant
              ce formulaire de contact.
            </p>
            <p className="page-text">
              Notre équipe se chargera de vous répondre dans les plus brefs délais
              afin de répondre à vos demandes et s'assurer que votre expérience avec
              Visiotech est toujours satisfaisante.
            </p>
            <p className="page-text">
              Alors, qu'attendez-vous pour nous faire part de vos commentaires?
              Remplissez simplement le champ ci-dessous et cliquez sur "Envoyer".
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
