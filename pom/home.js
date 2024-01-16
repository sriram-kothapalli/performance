export class HomePage {
  static async selectDeviceType(device, page) {
    await page.waitForSelector('.q-card__section.text-center'); 
    const mainBgElements = await page.$$('.q-card__section.text-center');

    for (const mainBgElement of mainBgElements) {
      const deviceName = await mainBgElement.$eval('.col', el => el.innerText.trim());

      if (deviceName === device) {
        const selectButton = await mainBgElement.$('button[type="button"]');

        if (selectButton) {
          await selectButton.click();
          break; // Exit the loop once the button is clicked
        }
      }
    }
  }
}