import { test, expect } from '../fixtures';

/**
 * SUITE : Parcours d'achat (E2E)
 * Simule un utilisateur qui ajoute un produit et procède au checkout
 */
test.describe('Parcours achat E2E', () => {

  test('Ajouter un produit au panier et vérifier le contenu', async ({
    authenticatedPage,
    cartPage,
    page,

  }) => {
    // Étape 1 : Ajouter le premier produit
    await authenticatedPage.addFirstProductToCart();
    await authenticatedPage.expectCartBadgeCount(1);

    // Étape 2 : Aller au panier
    await authenticatedPage.goToCart();
    await cartPage.expectPageLoaded();

    // Étape 3 : Vérifier qu'il y a bien 1 article
    const itemCount = await cartPage.getItemCount();
    expect(itemCount).toBe(1);

  });

  test('Accéder au checkout depuis le panier', async ({
    authenticatedPage,
    cartPage,
    page,
    
  }) => {
    await authenticatedPage.addFirstProductToCart();
    await authenticatedPage.goToCart();
    await cartPage.expectPageLoaded();
    await cartPage.proceedToCheckout();

    // Vérifier qu'on est bien sur la page checkout
    await expect(page).toHaveURL(/checkout-step-one/);
  });

  test('Checkout complet avec informations valides', async ({
    authenticatedPage,
    cartPage,
    page,
  }) => {
    // Ajouter produit
    await authenticatedPage.addFirstProductToCart();
    await authenticatedPage.goToCart();
    await cartPage.proceedToCheckout();

    // Remplir les informations de livraison
    await page.locator('[data-test="firstName"]').fill('Ousmane');
    await page.locator('[data-test="lastName"]').fill('Sy');
    await page.locator('[data-test="postalCode"]').fill('75001');
    await page.locator('[data-test="continue"]').click();

    // Vérifier le récapitulatif
    await expect(page).toHaveURL(/checkout-step-two/);
    await expect(page.locator('.cart_item')).toBeVisible();

    // Finaliser la commande
    await page.locator('[data-test="finish"]').click();
    await expect(page.locator('.complete-header')).toContainText('Thank you');
  });

});
