import { test, Page, expect } from '@playwright/test';

export default class AdminPage {
    readonly page: Page;
    readonly adminLink = () => this.page.getByRole('link', { name: 'Admin' });
    readonly addButton = () => this.page.getByRole('button', { name: ' Add' });
    readonly userRoleSelect = () => this.page.getByText('-- Select --').first();
    readonly userRoleOption = (role: string) => this.page.getByRole('option', { name: role });
    readonly employeeNameInput = () => this.page.getByRole('textbox', { name: 'Type for hints...' });
    readonly employeeNameOption = (name: string) => this.page.getByRole('option', { name });
    readonly statusSelect = () => this.page.getByText('-- Select --');
    readonly statusOption = (status: string) => this.page.getByRole('option', { name: status });
    // Using nth to select the correct textbox for username, password, and confirm password
    readonly usernameInput = () => this.page.getByRole('textbox').nth(2);
    readonly passwordInput = () => this.page.getByRole('textbox').nth(3);
    readonly confirmPasswordInput = () => this.page.getByRole('textbox').nth(4);
    readonly errorMessage = () => this.page.getByText('Should have at least 7');
    readonly saveButton = () => this.page.getByRole('button', { name: 'Save' });
    readonly successMessage = () => this.page.getByText('SuccessSuccessfully Saved');

    constructor(page: Page) {
        this.page = page;
    }

    public async goToAdminSection(): Promise<void> {
    await this.adminLink().click();
    }

    public async addUser({
    userRole,
    employeeName,
    status,
    username,
    password,
    }: {
    userRole: string;
    employeeName: string;
    status: string;
    username: string;
    password: string;
    }): Promise<void> {
    await this.addButton().click();
    await this.userRoleSelect().click();
    await this.userRoleOption(userRole).click();
    await this.employeeNameInput().click();
    await this.employeeNameInput().fill(employeeName);
    await this.employeeNameOption(employeeName).click();
    await this.statusSelect().click();
    await this.statusOption(status).click();
    await this.usernameInput().click();
    await this.usernameInput().fill(username);
    await this.passwordInput().click();
    await this.passwordInput().fill(password);
    }

    public async errorMessageDisplayedForWeakPassword(): Promise<void> {
            await expect(this.errorMessage()).toBeVisible();
    }

    public async confirmPasswordSaveNewlyCreatedUser({confirmPassword
    }: { confirmPassword: string
    }): Promise<void> {
    await this.confirmPasswordInput().fill(confirmPassword);
    await this.saveButton().click();
    }

    public async isUserAddedSuccessfully(): Promise<void> {
    await expect(this.successMessage()).toBeVisible();
    await expect(this.successMessage()).toHaveText('SuccessSuccessfully Saved');
    }
}