import { test, expect, USERS } from '../fixtures';

/**
 * SUITE : Authentification
 * Couvre les cas nominaux et les cas d'erreur du formulaire de login
 */
test.describe('Authentification', () => {

  test('Connexion réussie avec identifiants valides', async ({ loginPage, inventoryPage }) => {
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await inventoryPage.expectPageLoaded();
  });

  test('Erreur avec mot de passe incorrect', async ({ loginPage }) => {
    await loginPage.login(USERS.standard.username, 'wrong_password');
    await loginPage.expectErrorVisible('Username and password do not match');
  });

  test('Erreur avec champs vides', async ({ loginPage }) => {
    await loginPage.login('', '');
    await loginPage.expectErrorVisible('Username is required');
  });

  test('Compte verrouillé - message d\'erreur approprié', async ({ loginPage }) => {
    await loginPage.login(USERS.locked.username, USERS.locked.password);
    await loginPage.expectErrorVisible('Sorry, this user has been locked out');
  });

  test('Champ username visible et focusable au chargement', async ({ loginPage }) => {
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.usernameInput).toBeEnabled();
  });

});
