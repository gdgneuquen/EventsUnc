import { EventsUncPage } from './app.po';

describe('events-unc App', () => {
  let page: EventsUncPage;

  beforeEach(() => {
    page = new EventsUncPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
