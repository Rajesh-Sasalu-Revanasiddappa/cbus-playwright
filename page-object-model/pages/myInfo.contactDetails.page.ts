import { Page, expect } from '@playwright/test';
import path from 'path';

export default class MyInfoContactDetailsPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // locators
    readonly myInfoLink = () => this.page.getByRole('link', { name: 'My Info' });
    readonly contactDetailsLink = () => this.page.getByRole('link', { name: 'Contact Details' });
    readonly locationInput = () => this.page.locator('div:nth-child(3) > .oxd-input-group > div:nth-child(2) > .oxd-input').first();
    readonly locationInputFocused = () => this.page.locator('.oxd-input.oxd-input--focus');
    readonly addButton = () => this.page.getByRole('button', { name: ' Add' });
    readonly browseButton = () => this.page.getByText('Browse');
    readonly chooseFileButton = () => this.page.getByRole('button', { name: 'Choose File' });
    readonly commentInput = () => this.page.getByRole('textbox', { name: 'Type comment here' });
    readonly saveButton = () => this.page.getByRole('button', { name: 'Save' }).nth(1);
    readonly successMessage = () => this.page.getByText('Successfully Saved');
    readonly uploadedFileRow = (fileName: string) => this.page.getByRole('row', { name: ` ${fileName} test` });

    // actions
    public async setContactDetails(location: string): Promise<void> {
        await this.myInfoLink().click();
        await this.contactDetailsLink().click();
        await this.locationInput().click();
        await this.locationInputFocused().fill(location);
    }

    public async uploadFile(fileName : string): Promise<void> {
        const filePath = path.join(process.cwd(), 
            process.env.testDataDir ?? 'test-data', process.env.testDataFilesDir ?? 'files', fileName);
        await this.addButton().click();
        await this.browseButton().click();
        await this.chooseFileButton().setInputFiles(filePath);
        await this.commentInput().click();
        await this.commentInput().fill('test');
        await this.saveButton().click();
    }

    public async isDocumentUploadedSuccessfully(fileName : string): Promise<void> {
        await this.successMessage().isVisible();
        await expect(this.successMessage()).toHaveText('Successfully Saved');
        await this.uploadedFileRow(fileName).isVisible();
    }
  }