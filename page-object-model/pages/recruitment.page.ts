import { Page, expect } from '@playwright/test';

export default class RecruitmentPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // locators
    readonly recruitmentLink = () => this.page.getByRole('link', { name: 'Recruitment' });
    readonly candidatesLink = () => this.page.getByRole('link', { name: 'Candidates' });
    readonly jobTitleDropdown = () => this.page.locator('.oxd-icon.bi-caret-down-fill.oxd-select-text--arrow').first();
    readonly jobTitleOption = (title: string) => this.page.getByText(title);
    readonly searchButton = () => this.page.getByRole('button', { name: 'Search' });
    readonly noRecordsFoundMessage = () => this.page.locator('#oxd-toaster_1').getByText('No Records Found');

    // actions
    async navigateToRecruitment(): Promise<void> {
        await this.recruitmentLink().click();
    }

    async navigateToCandidates(): Promise<void> {
        await this.candidatesLink().click();
    }

    public async searchByJobTitle(jobTitle: string): Promise<void> {
    await this.jobTitleDropdown().click();
    await this.jobTitleOption(jobTitle).click();
    await this.searchButton().click();
    }

    public async isMessageVisible(): Promise<void> {
    await this.noRecordsFoundMessage().isVisible();
    await expect(this.noRecordsFoundMessage()).toHaveText('No Records Found');
    }
}