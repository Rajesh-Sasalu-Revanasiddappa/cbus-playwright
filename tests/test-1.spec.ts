import {test} from '../page-object-model/fixtures/basePage';

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