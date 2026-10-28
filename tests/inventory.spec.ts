import { test, expect } from '../fixtures';

/**
 * SUITE : Catalogue produits
 * Couvre l'affichage, le tri et l'ajout au panier
 */
test.describe('Catalogue produits', () => {

  test('Le catalogue affiche 6 produits', async ({ authenticatedPage }) => {
    const count = await authenticatedPage.getProductCount();
    expect(count).toBe(6);
  });

  test('Tri A-Z : premier produit correct', async ({ authenticatedPage, page }) => {
    await authenticatedPage.sortBy('az');
    const firstProduct = page.locator('.inventory_item_name').first();
    await expect(firstProduct).toHaveText('Backpack'.trim());
  });

  test('Tri Z-A : premier produit correct', async ({ authenticatedPage, page }) => {
    await authenticatedPage.sortBy('za');
    const firstProduct = page.locator('.inventory_item_name').first();
    await expect(firstProduct).toContainText('T-Shirt');
  });

  test('Ajout d\'un produit au panier - badge mis à jour', async ({ authenticatedPage }) => {
    await authenticatedPage.addFirstProductToCart();
    await authenticatedPage.expectCartBadgeCount(1);
  });

  test('Tri par prix croissant', async ({ authenticatedPage, page }) => {
    await authenticatedPage.sortBy('lohi');
    const prices = page.locator('.inventory_item_price');
    const firstPrice = await prices.first().textContent();
    const lastPrice = await prices.last().textContent();
    const first = parseFloat(firstPrice?.replace('$', '') ?? '0');
    const last = parseFloat(lastPrice?.replace('$', '') ?? '0');
    expect(first).toBeLessThanOrEqual(last);
  });

});
