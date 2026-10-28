import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Model - InventoryPage (catalogue produits)
 */
export class InventoryPage {
  readonly page: Page;

  readonly productList: Locator;
  readonly sortDropdown: Locator;
  readonly cartIcon: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productList = page.locator('.inventory_item');
    this.sortDropdown = page.locator('[data-test="product_sort_container"]');
    this.cartIcon = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async expectPageLoaded() {
    await expect(this.page).toHaveURL(/inventory/);
    await expect(this.productList.first()).toBeVisible();
  }

  async getProductCount(): Promise<number> {
    return await this.productList.count();
  }

  async addFirstProductToCart() {
    const addButton = this.productList.first().locator('button');
    await addButton.click();
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(option);
  }

  async goToCart() {
    await this.cartIcon.click();
  }

  async expectCartBadgeCount(count: number) {
    await expect(this.cartBadge).toHaveText(String(count));
  }
}
