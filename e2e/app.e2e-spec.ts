import { OneloginOauthPage } from './app.po';

describe('onelogin-oauth App', () => {
  let page: OneloginOauthPage;

  beforeEach(() => {
    page = new OneloginOauthPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
