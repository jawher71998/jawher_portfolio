import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('Portfolio de Jawher Sbabti', () => {
  test('affiche le nom et les sections principales', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { level: 1, name: /jawher sbabti/i })
    ).toBeInTheDocument();

    ['À propos de moi', 'Certifications', 'Mes Compétences', 'Mes Projets', 'Contactez-moi'].forEach(
      titre => {
        expect(screen.getByRole('heading', { level: 2, name: titre })).toBeInTheDocument();
      }
    );
  });

  test('le menu permet de naviguer vers chaque section', () => {
    render(<App />);
    ['Accueil', 'À propos', 'Compétences', 'Projets', 'Contact'].forEach(nom => {
      expect(screen.getAllByRole('button', { name: nom }).length).toBeGreaterThan(0);
    });
  });

  test('un clic sur une certification ouvre le certificat, Échap le ferme', () => {
    render(<App />);

    fireEvent.click(screen.getByText('TOSA Python 3'));
    const image = screen.getByAltText('TOSA Python 3');
    expect(image).toHaveAttribute('src', expect.stringContaining('certif_tosa_python.jpg'));

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByAltText('TOSA Python 3')).not.toBeInTheDocument();
  });

  test('le certificat Power BI pointe vers un fichier .jpg', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Data Analysis Power BI'));
    expect(screen.getByAltText('Data Analysis Power BI')).toHaveAttribute(
      'src',
      expect.stringContaining('certif_powerbi.jpg')
    );
  });

  test('le bouton « Voir la démo » ouvre la vidéo du projet', () => {
    const { container } = render(<App />);

    fireEvent.click(screen.getAllByRole('button', { name: /voir la démo/i })[0]);
    expect(
      screen.getByRole('heading', { name: /gestion crédit bancaire \(pfe\) — démo/i })
    ).toBeInTheDocument();
    // Le lecteur vidéo n'a pas de rôle accessible : on lit sa source directement.
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.ownerDocument.querySelector('video source')).toHaveAttribute(
      'src',
      expect.stringContaining('demo_credit_bancaire.mp4')
    );
  });

  describe('formulaire de contact', () => {
    const envoyer = () =>
      fireEvent.click(screen.getByRole('button', { name: /envoyer le message/i }));

    test('demande de remplir les champs obligatoires', () => {
      render(<App />);
      envoyer();
      expect(screen.getByText(/remplissez le nom, l'email et le message/i)).toBeInTheDocument();
    });

    test('refuse une adresse email invalide', () => {
      render(<App />);
      fireEvent.change(screen.getByLabelText('Votre nom'), { target: { value: 'Test' } });
      fireEvent.change(screen.getByLabelText('Votre email'), { target: { value: 'pas-un-email' } });
      fireEvent.change(screen.getByLabelText('Votre message'), { target: { value: 'Bonjour' } });
      envoyer();
      expect(screen.getByText(/adresse email n'est pas valide/i)).toBeInTheDocument();
    });
  });
});