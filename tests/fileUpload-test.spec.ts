import {test} from '../page-object-model/fixtures/basePage';

test.beforeEach('Login successful user and verify the dashboard is loaded successfully', async ({page, loginPage }) => {
  await loginPage.goto();
  await loginPage.login(process.env.validUsername ?? '', process.env.validPassword ?? '');
  await loginPage.isDashboardVisible();
});

test('Add contact details with attaching a document file', async ({ myInfoContactDetailsPage }) => {
  await myInfoContactDetailsPage.setContactDetails('London');
  await myInfoContactDetailsPage.uploadFile(process.env.testDocumentFileName ?? 'test document.pdf');
  await myInfoContactDetailsPage.isDocumentUploadedSuccessfully(process.env.testDocumentFileName ?? 'test document.pdf');
});