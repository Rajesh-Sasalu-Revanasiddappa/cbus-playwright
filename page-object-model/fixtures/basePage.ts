import { test as base } from '@playwright/test';
import LoginPage from '../pages/login.page.ts';
import AdminPage from '../pages/admin.page.ts';
import MyInfoContactDetailsPage from '../pages/myInfo.contactDetails.page.ts';
import RecruitmentPage from '../pages/recruitment.page.ts';

const createPageObject = <T>(PageObject: new (page: any) => T) => async ({ page }, use: (obj: T) => Promise<void>) => {
    await use(new PageObject(page));
};

export const test = base.extend<{
    loginPage: LoginPage
    adminPage: AdminPage
    myInfoContactDetailsPage: MyInfoContactDetailsPage,
    recruitmentPage: RecruitmentPage
}>({
    loginPage: createPageObject(LoginPage),
    adminPage: createPageObject(AdminPage),
    myInfoContactDetailsPage: createPageObject(MyInfoContactDetailsPage),
    recruitmentPage: createPageObject(RecruitmentPage)
});