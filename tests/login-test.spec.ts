import {test} from '../page-object-model/fixtures/basePage';

test('Login successful user and verify the dashboard is loaded successfully', async ({page, loginPage }) => {
  await loginPage.goto();
  await loginPage.login(process.env.validUsername ?? '', process.env.validPassword ?? '');
  await loginPage.isDashboardVisible();
});

test('Incorrect user login verifies the login credentials are incorrect', async ({ page, loginPage}) => {
  await loginPage.goto();
  await loginPage.login('Admin', 'admin1234');
  await loginPage.login(process.env.validUsername ?? '', process.env.invalidPassword ?? '');
  await loginPage.isInvalidCredentialsMessageVisible();
});