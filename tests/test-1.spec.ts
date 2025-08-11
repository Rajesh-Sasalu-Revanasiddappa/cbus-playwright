import {test} from '../page-object-model/fixtures/basePage';

// test('test', async ({ page }) => {
//   await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
//   await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
//   await page.getByRole('textbox', { name: 'Username' }).press('Tab');
//   await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
//   await page.getByRole('button', { name: 'Login' }).click();
//   await page.getByRole('link', { name: 'Admin' }).click();
//   await page.getByRole('button', { name: ' Add' }).click();
//   await page.getByText('-- Select --').first().click();
//   await page.getByRole('option', { name: 'ESS' }).click();
//   await page.getByRole('textbox', { name: 'Type for hints...' }).click();
//   await page.getByRole('textbox', { name: 'Type for hints...' }).fill('Hamilton');
//   await page.getByRole('option', { name: 'Russel Hamilton' }).click();
//   await page.getByText('-- Select --').click();
//   await page.getByRole('option', { name: 'Enabled' }).click();
//   await page.getByRole('textbox').nth(2).click();
//   await page.getByRole('textbox').nth(2).fill('russel-hamilton');
//   await page.getByRole('textbox').nth(3).click();
//   await page.getByRole('textbox').nth(3).fill('Pass123!');
//   await page.getByRole('textbox').nth(4).click();
//   await page.getByRole('textbox').nth(4).fill('Pass123!');
//   await page.getByText('Your password must contain').isVisible();
// });

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login(process.env.validUsername ?? '', process.env.validPassword ?? '');
  await loginPage.isDashboardVisible();
});

test('Navigate to admin page and add a new system user by not providing strong password', async ({ adminPage}) => {
  const randomSuffix = Math.floor(1000 + Math.random() * 9000); // Generates a random 4-digit number
  const uniqueUsername = `${process.env.employeeUsername ?? 'russel-hamilton'}-${randomSuffix}`;

  await adminPage.goToAdminSection();
  await adminPage.addUser({
    userRole: process.env.employeeUserRole ?? 'ESS',
    employeeName: process.env.employeeName ?? 'Russel Hamilton',
    status: process.env.employeeStatus ?? 'Enabled',
    username: uniqueUsername,
    password: process.env.employeeWeakPassword ?? 'Pass123!'  // Not a strong password
  });
  await adminPage.errorMessageDisplayedForWeakPassword();
});

test('Navigate to admin page and add a new system user with all mandatory fields', async ({ adminPage}) => {
  const randomSuffix = Math.floor(1000 + Math.random() * 9000); // Generates a random 4-digit number
  const uniqueUsername = `${process.env.employeeUsername ?? 'russel-hamilton'}-${randomSuffix}`;

  await adminPage.goToAdminSection();
  await adminPage.addUser({
    userRole: process.env.employeeUserRole ?? 'ESS',
    employeeName: process.env.employeeName ?? 'Russel Hamilton',
    status: process.env.employeeStatus ?? 'Enabled',
    username: uniqueUsername,
    password: process.env.employeeStrongPassword ?? 'Strong123!@#'  // strong password
  });
  await adminPage.confirmPasswordSaveNewlyCreatedUser({
    confirmPassword: process.env.employeeStrongPassword ?? 'Strong123!@#'  // strong password   
  });
  await adminPage.isUserAddedSuccessfully();
});