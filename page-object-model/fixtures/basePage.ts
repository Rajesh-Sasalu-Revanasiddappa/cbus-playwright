import { test as base } from '@playwright/test';
import LoginPage from '../pages/login.page.ts';
import AdminPage from '../pages/admin.page.ts';
import MyInfoContactDetailsPage from '../pages/myInfo.contactDetails.page.ts';

const createPageObject = <T>(PageObject: new (page: any) => T) => async ({ page }, use: (obj: T) => Promise<void>) => {
    await use(new PageObject(page));
};

export const test = base.extend<{
    loginPage: LoginPage
    adminPage: AdminPage
    myInfoContactDetailsPage: MyInfoContactDetailsPage
}>({
    loginPage: createPageObject(LoginPage),
    adminPage: createPageObject(AdminPage),
    myInfoContactDetailsPage: createPageObject(MyInfoContactDetailsPage)
});