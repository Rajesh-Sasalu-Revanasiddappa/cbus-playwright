import { test, Page, expect } from '@playwright/test';

export default class LoginPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public async goto() {
        await this.page.goto('/');
    }

    // locators
    usernameInput = () => this.page.getByRole('textbox', { name: 'Username' })
    passwordInput = () => this.page.getByRole('textbox', { name: 'Password' })
    loginButton = () => this.page.getByRole('button', { name: 'Login' })

    // actions
    public async login(username: string, password: string) {
        await this.usernameInput().fill(username);
        await this.passwordInput().fill(password);
        await this.loginButton().click();
    }

    public async isDashboardVisible(): Promise<void> {
    const dashboardHeading = this.page.getByRole('heading', { name: 'Dashboard' });
    await expect(dashboardHeading).toBeVisible();
    await expect(dashboardHeading).toHaveText('Dashboard');
    }

    public async isInvalidCredentialsMessageVisible(): Promise<void> {
    const errorMessage = this.page.getByText('Invalid credentials');
    await expect(errorMessage).toHaveText('Invalid credentials');
  }
}