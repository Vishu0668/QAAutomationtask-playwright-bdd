const { Before, After, Status } = require('@cucumber/cucumber');

// For login scenarios — fresh browser, no session
Before({ tags: 'not @cart' }, async function () {
  await this.init();
});

// For cart scenarios — reuse saved session (skip login)
Before({ tags: '@cart' }, async function () {
  await this.initWithSession();
});

After(async function (scenario) {
  if (scenario.result?.status === Status.FAILED && this.page) {
    const shot = await this.page.screenshot({ fullPage: true });
    await this.attach(shot, 'image/png');
  }
  await this.close();
});
