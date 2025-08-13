import {test} from '../page-object-model/fixtures/basePage';

test.beforeEach('Login successful user and verify the dashboard is loaded successfully', async ({page, loginPage }) => {
  await loginPage.goto();
  await loginPage.login(process.env.validUsername ?? '', process.env.validPassword ?? '');
  await loginPage.isDashboardVisible();
});

test('Search candidates by job title', async ({ recruitmentPage }) => {
  await recruitmentPage.navigateToRecruitment();
  await recruitmentPage.navigateToCandidates();
  await recruitmentPage.searchByJobTitle(process.env.jobTitle ?? 'Product Manager');
  await recruitmentPage.isMessageVisible();
});