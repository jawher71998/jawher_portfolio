import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('Portfolio de Jawher Sbabti', () => {
  test('affiche le nom et les sections principales', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { level: 1, name: /jawher sbabti/i })
    ).toBeInTheDocument();

    ['À propos de moi', 'Mes Études', 'Mes Stages', 'Certifications', 'Mes Compétences', 'Mes Projets', 'Contactez-moi'].forEach(
      titre => {
        expect(screen.getByRole('heading', { level: 2, name: titre })).toBeInTheDocument();
      }
    );
  });

  test('le menu permet de naviguer vers chaque section', () => {
    render(<App />);
    ['Accueil', 'À propos', 'Mes Études', 'Stages', 'Compétences', 'Projets', 'Contact'].forEach(nom => {
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


  test('un clic sur un stage ouvre son attestation', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Bee Coders'));
    expect(screen.getByAltText('Stage Data & BI')).toHaveAttribute(
      'src',
      expect.stringContaining('attestation_beecoders.jpg')
    );
  });



  test('un clic sur un diplôme ouvre son image', () => {
    render(<App />);
    fireEvent.click(screen.getByText('BTS Informatique de Gestion'));
    expect(screen.getByAltText('BTS Informatique de Gestion')).toHaveAttribute(
      'src',
      expect.stringContaining('diplome_bts_informatique.jpg')
    );
  });

  test('le bouton EN traduit le site en anglais', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 2, name: 'À propos de moi' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'EN' }));

    expect(screen.getByRole('heading', { level: 2, name: 'About Me' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'My Internships' })).toBeInTheDocument();
  });

  test('le bouton retour en haut est présent', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /retour en haut/i })).toBeInTheDocument();
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